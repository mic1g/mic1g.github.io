"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type BlockType =
  | "heading"
  | "paragraph"
  | "list"
  | "quote"
  | "callout"
  | "equation"
  | "figure"
  | "table"
  | "citation"
  | "reference"
  | "code"
  | "break"
  | "latex";

type Block = {
  id: string;
  type: BlockType;
  text: string;
  level?: 1 | 2 | 3;
  caption?: string;
  label?: string;
  language?: string;
  author?: string;
  year?: string;
  imageData?: string;
};

type DocumentState = {
  title: string;
  subtitle: string;
  author: string;
  institution: string;
  date: string;
  template: "research" | "report" | "thesis";
  blocks: Block[];
};

const STORAGE_KEY = "foliotex-document-v1";

const INITIAL_DOCUMENT: DocumentState = {
  title: "The Role of Structured Writing in Academic Work",
  subtitle: "A short study of block-based authoring and reproducible typesetting",
  author: "Michael Fung",
  institution: "Department of Digital Research",
  date: "July 2026",
  template: "research",
  blocks: [
    {
      id: "intro-heading",
      type: "heading",
      level: 1,
      text: "Introduction",
      label: "sec:introduction",
    },
    {
      id: "intro-copy",
      type: "paragraph",
      text: "Academic writing tools often force authors to choose between visual simplicity and typographic control. This report explores a structured approach in which content remains easy to arrange while LaTeX handles the final composition.",
    },
    {
      id: "question-callout",
      type: "callout",
      text: "Research question: can a block editor preserve academic structure without asking the author to manage LaTeX syntax?",
    },
    {
      id: "method-heading",
      type: "heading",
      level: 1,
      text: "Method",
      label: "sec:method",
    },
    {
      id: "method-list",
      type: "list",
      text: "Observe common academic writing tasks\nModel each task as a typed block\nGenerate a deterministic LaTeX document\nValidate the rendered sequence",
    },
    {
      id: "model-equation",
      type: "equation",
      text: "Q = S \\times C \\times R",
      caption: "Document quality as a function of structure, consistency, and review",
      label: "eq:quality",
    },
    {
      id: "results-heading",
      type: "heading",
      level: 1,
      text: "Initial observations",
      label: "sec:results",
    },
    {
      id: "results-table",
      type: "table",
      text: "Capability | Traditional editor | Block workflow\nReordering | Source-level | Direct manipulation\nReferences | Manual setup | Structured fields\nTypesetting | User-managed | Generated",
      caption: "Comparison of common authoring workflows",
      label: "tab:workflow",
    },
    {
      id: "result-copy",
      type: "paragraph",
      text: "The structured workflow reduces the number of formatting decisions made during drafting. Authors remain responsible for meaning and evidence, while the template controls presentation.",
    },
    {
      id: "source-citation",
      type: "citation",
      text: "The LaTeX Project. LaTeX — A document preparation system.",
      label: "latex-project",
      author: "The LaTeX Project",
      year: "2026",
    },
  ],
};

const BLOCK_META: Record<BlockType, { label: string; icon: string; description: string }> = {
  heading: { label: "Heading", icon: "H", description: "Section or subsection" },
  paragraph: { label: "Paragraph", icon: "¶", description: "Academic prose" },
  list: { label: "List", icon: "≡", description: "One item per line" },
  quote: { label: "Quote", icon: "“", description: "Block quotation" },
  callout: { label: "Callout", icon: "!", description: "Definition or note" },
  equation: { label: "Equation", icon: "∑", description: "LaTeX mathematics" },
  figure: { label: "Figure", icon: "▧", description: "Image with caption" },
  table: { label: "Table", icon: "▦", description: "Pipe-separated cells" },
  citation: { label: "Citation", icon: "@", description: "Bibliography entry" },
  reference: { label: "Cross-reference", icon: "↗", description: "Reference a label" },
  code: { label: "Code", icon: "</>", description: "Source listing" },
  break: { label: "Page break", icon: "—", description: "Start a new page" },
  latex: { label: "Raw LaTeX", icon: "Tx", description: "Advanced escape hatch" },
};

const BLOCK_TYPES = Object.keys(BLOCK_META) as BlockType[];

function newId() {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function createBlock(type: BlockType): Block {
  const defaults: Partial<Record<BlockType, Partial<Block>>> = {
    heading: { text: "New section", level: 1, label: `sec:${Date.now()}` },
    paragraph: { text: "Start writing…" },
    list: { text: "First item\nSecond item" },
    quote: { text: "Add a quotation and its context." },
    callout: { text: "Add an important note or definition." },
    equation: { text: "E = mc^2", caption: "", label: `eq:${Date.now()}` },
    figure: { text: "", caption: "Figure caption", label: `fig:${Date.now()}` },
    table: {
      text: "Column A | Column B\nValue 1 | Value 2",
      caption: "Table caption",
      label: `tab:${Date.now()}`,
    },
    citation: {
      text: "Reference title",
      label: `source-${Date.now()}`,
      author: "Author name",
      year: "2026",
    },
    reference: { text: "sec:introduction" },
    code: { text: "print(\"Hello, research\")", language: "Python", caption: "" },
    break: { text: "" },
    latex: { text: "% Advanced LaTeX\n\\medskip" },
  };

  return { id: newId(), type, text: "", ...defaults[type] };
}

function escapeLatex(value: string) {
  const replacements: Record<string, string> = {
    "\\": "\\textbackslash{}",
    "&": "\\&",
    "%": "\\%",
    "$": "\\$",
    "#": "\\#",
    "_": "\\_",
    "{": "\\{",
    "}": "\\}",
    "~": "\\textasciitilde{}",
    "^": "\\textasciicircum{}",
  };
  return value.replace(/[\\&%$#_{}~^]/g, (character) => replacements[character]);
}

function parseTable(value: string) {
  return value
    .split("\n")
    .map((row) => row.split("|").map((cell) => cell.trim()))
    .filter((row) => row.some(Boolean));
}

function generateLatex(document: DocumentState) {
  const bibliography = document.blocks.filter((block) => block.type === "citation");
  const body = document.blocks
    .map((block) => {
      switch (block.type) {
        case "heading": {
          const command = block.level === 3 ? "subsubsection" : block.level === 2 ? "subsection" : "section";
          return `\\${command}{${escapeLatex(block.text)}}${block.label ? `\\label{${escapeLatex(block.label)}}` : ""}`;
        }
        case "paragraph":
          return escapeLatex(block.text);
        case "list":
          return `\\begin{itemize}\n${block.text
            .split("\n")
            .filter(Boolean)
            .map((item) => `  \\item ${escapeLatex(item)}`)
            .join("\n")}\n\\end{itemize}`;
        case "quote":
          return `\\begin{quote}\n${escapeLatex(block.text)}\n\\end{quote}`;
        case "callout":
          return `\\begin{tcolorbox}[colback=teal!4,colframe=teal!45!black]\n${escapeLatex(block.text)}\n\\end{tcolorbox}`;
        case "equation":
          return `\\begin{equation}\n  ${block.text}\n  ${block.label ? `\\label{${escapeLatex(block.label)}}` : ""}\n\\end{equation}${block.caption ? `\n\\begin{center}\\small ${escapeLatex(block.caption)}\\end{center}` : ""}`;
        case "figure":
          return `\\begin{figure}[htbp]\n  \\centering\n  \\fbox{\\parbox[c][4cm][c]{0.75\\linewidth}{\\centering Export the uploaded image into the project assets folder}}\n  \\caption{${escapeLatex(block.caption || "Untitled figure")}}\n  ${block.label ? `\\label{${escapeLatex(block.label)}}` : ""}\n\\end{figure}`;
        case "table": {
          const rows = parseTable(block.text);
          const columns = Math.max(1, ...rows.map((row) => row.length));
          const tableBody = rows
            .map((row, index) => `${row.map((cell) => escapeLatex(cell)).join(" & ")} \\\\${index === 0 ? " \\midrule" : ""}`)
            .join("\n");
          return `\\begin{table}[htbp]\n  \\centering\n  \\begin{tabular}{${"l".repeat(columns)}}\n    \\toprule\n${tableBody}\n    \\bottomrule\n  \\end{tabular}\n  \\caption{${escapeLatex(block.caption || "Untitled table")}}\n  ${block.label ? `\\label{${escapeLatex(block.label)}}` : ""}\n\\end{table}`;
        }
        case "citation":
          return `\\noindent Source used in this report: \\cite{${escapeLatex(block.label || block.id)}}.`;
        case "reference":
          return `See \\ref{${escapeLatex(block.text)}}.`;
        case "code":
          return `\\begin{lstlisting}[language=${escapeLatex(block.language || "text")}${block.caption ? `,caption={${escapeLatex(block.caption)}}` : ""}]\n${block.text}\n\\end{lstlisting}`;
        case "break":
          return "\\newpage";
        case "latex":
          return block.text;
      }
    })
    .join("\n\n");

  const references = bibliography.length
    ? `\n\\begin{thebibliography}{99}\n${bibliography
        .map(
          (item) =>
            `  \\bibitem{${escapeLatex(item.label || item.id)}} ${escapeLatex(item.author || "Unknown author")} (${escapeLatex(item.year || "n.d.")}). \\textit{${escapeLatex(item.text)}}.`,
        )
        .join("\n")}\n\\end{thebibliography}`
    : "";

  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=25mm]{geometry}
\\usepackage{fontspec}
\\usepackage{xeCJK}
\\usepackage{amsmath,booktabs,graphicx,listings,tcolorbox,hyperref}
\\setmainfont{TeX Gyre Pagella}
\\IfFontExistsTF{Noto Serif CJK TC}
  {\\setCJKmainfont{Noto Serif CJK TC}}
  {\\setCJKmainfont{PingFang TC}}
\\hypersetup{colorlinks=true,linkcolor=teal!55!black,citecolor=teal!55!black}

\\title{${escapeLatex(document.title)}${document.subtitle ? `\\\\[6pt]\\large ${escapeLatex(document.subtitle)}` : ""}}
\\author{${escapeLatex(document.author)}${document.institution ? `\\\\${escapeLatex(document.institution)}` : ""}}
\\date{${escapeLatex(document.date)}}

\\begin{document}
\\maketitle
\\tableofcontents
\\newpage

${body}
${references}

\\end{document}
`;
}

function validateDocument(document: DocumentState) {
  const issues: string[] = [];
  if (!document.title.trim()) issues.push("Add a document title.");
  if (!document.author.trim()) issues.push("Add at least one author.");
  if (!document.blocks.some((block) => block.type === "heading")) issues.push("Add at least one section heading.");
  document.blocks.forEach((block) => {
    if (block.type !== "break" && !block.text.trim() && block.type !== "figure") {
      issues.push(`${BLOCK_META[block.type].label} block is empty.`);
    }
    if (block.type === "figure" && !block.caption?.trim()) issues.push("A figure needs a caption.");
    if (block.type === "table" && parseTable(block.text).length < 2) issues.push("A table needs at least two rows.");
    if (["heading", "equation", "figure", "table"].includes(block.type) && !block.label?.trim()) {
      issues.push(`${BLOCK_META[block.type].label} needs a stable label.`);
    }
  });
  return issues;
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const link = window.document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function EditableField({
  value,
  onChange,
  multiline = true,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
}) {
  if (multiline) {
    return (
      <textarea
        className={`block-input ${className}`}
        value={value}
        placeholder={placeholder}
        rows={Math.min(8, Math.max(2, value.split("\n").length))}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  return (
    <input
      className={`block-input ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function PreviewBlock({ block, citationIndex }: { block: Block; citationIndex: number }) {
  switch (block.type) {
    case "heading": {
      const HeadingTag = block.level === 3 ? "h4" : block.level === 2 ? "h3" : "h2";
      return <HeadingTag id={`preview-${block.id}`}>{block.text || "Untitled section"}</HeadingTag>;
    }
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.text.split("\n").filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "callout":
      return <aside className="paper-callout"><strong>Note.</strong> {block.text}</aside>;
    case "equation":
      return (
        <figure className="paper-equation">
          <div>{block.text}</div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "figure":
      return (
        <figure className="paper-figure">
          {block.imageData ? (
            // Uploaded figures are local data URLs and do not benefit from Next image optimization.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.imageData} alt={block.caption || "Uploaded academic figure"} />
          ) : <div className="figure-placeholder"><span>Figure</span><small>Upload an image in the editor</small></div>}
          <figcaption><strong>Figure.</strong> {block.caption || "Untitled figure"}</figcaption>
        </figure>
      );
    case "table": {
      const rows = parseTable(block.text);
      return (
        <figure className="paper-table-wrap">
          <table>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${block.id}-row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => rowIndex === 0 ? <th key={`${block.id}-${rowIndex}-${cellIndex}`}>{cell}</th> : <td key={`${block.id}-${rowIndex}-${cellIndex}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <figcaption><strong>Table.</strong> {block.caption || "Untitled table"}</figcaption>
        </figure>
      );
    }
    case "citation":
      return <p className="paper-source"><sup>[{citationIndex}]</sup> {block.author} ({block.year}). <em>{block.text}</em>.</p>;
    case "reference":
      return <p>See reference <strong>{block.text}</strong>.</p>;
    case "code":
      return <figure className="paper-code"><pre>{block.text}</pre>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
    case "break":
      return <div className="paper-page-break"><span>page break</span></div>;
    case "latex":
      return <div className="paper-raw"><span>Raw LaTeX</span><code>{block.text}</code></div>;
  }
}

export default function Home() {
  const [documentState, setDocumentState] = useState<DocumentState>(INITIAL_DOCUMENT);
  const [past, setPast] = useState<DocumentState[]>([]);
  const [future, setFuture] = useState<DocumentState[]>([]);
  const [selectedId, setSelectedId] = useState(INITIAL_DOCUMENT.blocks[0].id);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuQuery, setMenuQuery] = useState("");
  const [rightTab, setRightTab] = useState<"preview" | "source" | "checks">("preview");
  const [saveState, setSaveState] = useState<"saved" | "saving">("saved");
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setDocumentState(JSON.parse(stored) as DocumentState);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        hydrated.current = true;
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    setSaveState("saving");
    const timer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documentState));
      setSaveState("saved");
    }, 350);
    return () => window.clearTimeout(timer);
  }, [documentState]);

  const commit = useCallback(
    (next: DocumentState) => {
      setPast((items) => [...items.slice(-49), documentState]);
      setFuture([]);
      setDocumentState(next);
    },
    [documentState],
  );

  const undo = useCallback(() => {
    const previous = past[past.length - 1];
    if (!previous) return;
    setPast((items) => items.slice(0, -1));
    setFuture((items) => [documentState, ...items].slice(0, 50));
    setDocumentState(previous);
  }, [documentState, past]);

  const redo = useCallback(() => {
    const next = future[0];
    if (!next) return;
    setFuture((items) => items.slice(1));
    setPast((items) => [...items.slice(-49), documentState]);
    setDocumentState(next);
  }, [documentState, future]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;
      if (modifier && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) redo(); else undo();
      }
      if (modifier && event.key.toLowerCase() === "s") {
        event.preventDefault();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(documentState));
        setSaveState("saved");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [documentState, redo, undo]);

  const latex = useMemo(() => generateLatex(documentState), [documentState]);
  const issues = useMemo(() => validateDocument(documentState), [documentState]);
  const outline = documentState.blocks.filter((block) => block.type === "heading");
  const wordCount = useMemo(
    () => documentState.blocks.map((block) => block.text).join(" ").trim().split(/\s+/).filter(Boolean).length,
    [documentState.blocks],
  );

  const updateMetadata = <K extends keyof Omit<DocumentState, "blocks">>(field: K, value: DocumentState[K]) => {
    commit({ ...documentState, [field]: value });
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    commit({
      ...documentState,
      blocks: documentState.blocks.map((block) => block.id === id ? { ...block, ...updates } : block),
    });
  };

  const addBlock = (type: BlockType) => {
    const block = createBlock(type);
    const selectedIndex = documentState.blocks.findIndex((item) => item.id === selectedId);
    const insertAt = selectedIndex >= 0 ? selectedIndex + 1 : documentState.blocks.length;
    const blocks = [...documentState.blocks];
    blocks.splice(insertAt, 0, block);
    commit({ ...documentState, blocks });
    setSelectedId(block.id);
    setMenuOpen(false);
    setMenuQuery("");
    window.setTimeout(() => window.document.getElementById(`editor-${block.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
  };

  const duplicateBlock = (id: string) => {
    const index = documentState.blocks.findIndex((block) => block.id === id);
    if (index < 0) return;
    const duplicate = { ...documentState.blocks[index], id: newId() };
    const blocks = [...documentState.blocks];
    blocks.splice(index + 1, 0, duplicate);
    commit({ ...documentState, blocks });
    setSelectedId(duplicate.id);
  };

  const deleteBlock = (id: string) => {
    if (documentState.blocks.length === 1) return;
    const index = documentState.blocks.findIndex((block) => block.id === id);
    const blocks = documentState.blocks.filter((block) => block.id !== id);
    commit({ ...documentState, blocks });
    setSelectedId(blocks[Math.max(0, index - 1)]?.id || "");
  };

  const moveBlock = (id: string, direction: -1 | 1) => {
    const index = documentState.blocks.findIndex((block) => block.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= documentState.blocks.length) return;
    const blocks = [...documentState.blocks];
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    commit({ ...documentState, blocks });
  };

  const dropBlock = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    const blocks = [...documentState.blocks];
    const from = blocks.findIndex((block) => block.id === draggedId);
    const to = blocks.findIndex((block) => block.id === targetId);
    const [moved] = blocks.splice(from, 1);
    blocks.splice(to, 0, moved);
    commit({ ...documentState, blocks });
    setDraggedId(null);
  };

  const resetDocument = () => {
    if (!window.confirm("Reset this local draft to the sample academic report?")) return;
    commit(INITIAL_DOCUMENT);
    setSelectedId(INITIAL_DOCUMENT.blocks[0].id);
  };

  const filteredTypes = BLOCK_TYPES.filter((type) => {
    const meta = BLOCK_META[type];
    return `${meta.label} ${meta.description}`.toLowerCase().includes(menuQuery.toLowerCase());
  });

  return (
    <main className="studio-shell">
      <header className="topbar">
        <div className="brand-group">
          <button className="panel-toggle" onClick={() => setLeftOpen((open) => !open)} aria-label="Toggle project sidebar">☰</button>
          <div className="brand-mark" aria-hidden="true">T</div>
          <div>
            <div className="brand-name">FolioTeX</div>
            <div className="brand-kicker">academic report studio</div>
          </div>
        </div>

        <div className="project-name-wrap">
          <input
            className="project-name"
            aria-label="Document title"
            value={documentState.title}
            onChange={(event) => updateMetadata("title", event.target.value)}
          />
          <span className={`save-state ${saveState}`}><span />{saveState === "saving" ? "Saving" : "Saved locally"}</span>
        </div>

        <div className="topbar-actions">
          <div className="history-actions" aria-label="Editing history">
            <button onClick={undo} disabled={!past.length} title="Undo (⌘Z)">↶</button>
            <button onClick={redo} disabled={!future.length} title="Redo (⇧⌘Z)">↷</button>
          </div>
          <button className="quiet-button" onClick={() => { setRightOpen(true); setRightTab("source"); }}>LaTeX</button>
          <button className="quiet-button" onClick={() => { setRightOpen(true); setRightTab("preview"); }}>Preview</button>
          <button className="export-button" onClick={() => downloadFile("academic-report.tex", latex, "text/x-tex")}>Export <span>.tex</span></button>
          <button className="panel-toggle" onClick={() => setRightOpen((open) => !open)} aria-label="Toggle preview sidebar">◫</button>
        </div>
      </header>

      <div className={`workspace-grid ${leftOpen ? "" : "hide-left"} ${rightOpen ? "" : "hide-right"}`}>
        <aside className={`left-panel ${leftOpen ? "mobile-open" : ""}`}>
          <section className="sidebar-section project-summary">
            <div className="eyebrow">Current project</div>
            <div className="summary-row"><span className="summary-icon">R</span><div><strong>Research paper</strong><small>A4 · XeLaTeX</small></div></div>
          </section>

          <section className="sidebar-section outline-section">
            <div className="section-heading"><span>Document outline</span><small>{outline.length}</small></div>
            <nav aria-label="Document outline" className="outline-list">
              <button className="outline-title" onClick={() => window.document.querySelector(".editor-title")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="outline-dot" />{documentState.title || "Untitled report"}
              </button>
              {outline.map((block, index) => (
                <button
                  key={block.id}
                  className={`outline-item level-${block.level || 1} ${selectedId === block.id ? "active" : ""}`}
                  onClick={() => {
                    setSelectedId(block.id);
                    window.document.getElementById(`editor-${block.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                >
                  <span>{index + 1}</span>{block.text || "Untitled section"}
                </button>
              ))}
            </nav>
          </section>

          <section className="sidebar-section library-section">
            <div className="section-heading"><span>Block library</span></div>
            <div className="library-grid">
              {(["heading", "paragraph", "equation", "figure", "table", "citation"] as BlockType[]).map((type) => (
                <button key={type} onClick={() => addBlock(type)} title={`Add ${BLOCK_META[type].label}`}>
                  <span>{BLOCK_META[type].icon}</span>{BLOCK_META[type].label}
                </button>
              ))}
            </div>
          </section>

          <section className="sidebar-section template-section">
            <label htmlFor="template-select">Document template</label>
            <select
              id="template-select"
              value={documentState.template}
              onChange={(event) => updateMetadata("template", event.target.value as DocumentState["template"])}
            >
              <option value="research">Research paper</option>
              <option value="report">Technical report</option>
              <option value="thesis">Thesis draft</option>
            </select>
            <button className="reset-button" onClick={resetDocument}>Reset sample document</button>
          </section>

          <div className="sidebar-stats"><span>{documentState.blocks.length} blocks</span><span>{wordCount} words</span></div>
        </aside>

        <section className="editor-panel" aria-label="Block editor">
          <div className="editor-toolbar">
            <div className="format-actions">
              <button title="Bold"><strong>B</strong></button>
              <button title="Italic"><em>I</em></button>
              <span />
              <button onClick={() => addBlock("citation")} title="Insert citation">@ Cite</button>
              <button onClick={() => addBlock("equation")} title="Insert equation">∑ Math</button>
            </div>
            <div className="editor-toolbar-meta"><span>Academic report</span><span>100%</span></div>
          </div>

          <div className="editor-scroll">
            <article className="editor-canvas">
              <header className="editor-title">
                <div className="template-badge">{documentState.template === "research" ? "Research paper" : documentState.template === "report" ? "Technical report" : "Thesis draft"}</div>
                <textarea
                  aria-label="Report title"
                  className="title-input"
                  value={documentState.title}
                  rows={2}
                  onChange={(event) => updateMetadata("title", event.target.value)}
                />
                <textarea
                  aria-label="Report subtitle"
                  className="subtitle-input"
                  value={documentState.subtitle}
                  rows={2}
                  onChange={(event) => updateMetadata("subtitle", event.target.value)}
                />
                <div className="metadata-row">
                  <input aria-label="Author" value={documentState.author} onChange={(event) => updateMetadata("author", event.target.value)} />
                  <input aria-label="Institution" value={documentState.institution} onChange={(event) => updateMetadata("institution", event.target.value)} />
                  <input aria-label="Date" value={documentState.date} onChange={(event) => updateMetadata("date", event.target.value)} />
                </div>
              </header>

              <div className="blocks-list">
                {documentState.blocks.map((block, index) => (
                  <div
                    key={block.id}
                    id={`editor-${block.id}`}
                    className={`editor-block ${selectedId === block.id ? "selected" : ""} ${draggedId === block.id ? "dragging" : ""}`}
                    onClick={() => setSelectedId(block.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => dropBlock(block.id)}
                  >
                    <div className="block-rail">
                      <button
                        className="drag-handle"
                        draggable
                        onDragStart={() => setDraggedId(block.id)}
                        onDragEnd={() => setDraggedId(null)}
                        aria-label={`Drag ${BLOCK_META[block.type].label} block`}
                        title="Drag to reorder"
                      >⋮⋮</button>
                      <span className="block-number">{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="block-body">
                      <div className="block-label-row">
                        <span className="block-type-icon">{BLOCK_META[block.type].icon}</span>
                        <span>{BLOCK_META[block.type].label}</span>
                        {block.type === "latex" && <span className="advanced-pill">advanced</span>}
                      </div>

                      {block.type === "heading" && (
                        <div className="heading-editor-row">
                          <select value={block.level || 1} onChange={(event) => updateBlock(block.id, { level: Number(event.target.value) as 1 | 2 | 3 })} aria-label="Heading level">
                            <option value="1">H1</option><option value="2">H2</option><option value="3">H3</option>
                          </select>
                          <EditableField value={block.text} multiline={false} onChange={(text) => updateBlock(block.id, { text })} className={`heading-level-${block.level || 1}`} />
                        </div>
                      )}

                      {(["paragraph", "list", "quote", "callout", "reference"] as BlockType[]).includes(block.type) && (
                        <EditableField value={block.text} onChange={(text) => updateBlock(block.id, { text })} placeholder={block.type === "list" ? "One item per line" : "Write here…"} />
                      )}

                      {block.type === "equation" && (
                        <div className="structured-fields">
                          <EditableField value={block.text} onChange={(text) => updateBlock(block.id, { text })} className="equation-input" />
                          <div className="two-fields">
                            <input value={block.caption || ""} placeholder="Equation note (optional)" onChange={(event) => updateBlock(block.id, { caption: event.target.value })} />
                            <input value={block.label || ""} placeholder="eq:label" onChange={(event) => updateBlock(block.id, { label: event.target.value })} />
                          </div>
                        </div>
                      )}

                      {block.type === "figure" && (
                        <div className="structured-fields figure-fields">
                          <label className="image-drop">
                            {block.imageData ? (
                              // Uploaded figures are local data URLs and do not benefit from Next image optimization.
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={block.imageData} alt="Uploaded preview" />
                            ) : <><span>＋</span><strong>Add figure</strong><small>PNG or JPEG · stored locally</small></>}
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = () => updateBlock(block.id, { imageData: String(reader.result) });
                                reader.readAsDataURL(file);
                              }}
                            />
                          </label>
                          <div className="two-fields">
                            <input value={block.caption || ""} placeholder="Figure caption" onChange={(event) => updateBlock(block.id, { caption: event.target.value })} />
                            <input value={block.label || ""} placeholder="fig:label" onChange={(event) => updateBlock(block.id, { label: event.target.value })} />
                          </div>
                        </div>
                      )}

                      {block.type === "table" && (
                        <div className="structured-fields">
                          <EditableField value={block.text} onChange={(text) => updateBlock(block.id, { text })} className="table-input" />
                          <small className="field-hint">Separate cells with <code>|</code> and rows with a new line.</small>
                          <div className="two-fields">
                            <input value={block.caption || ""} placeholder="Table caption" onChange={(event) => updateBlock(block.id, { caption: event.target.value })} />
                            <input value={block.label || ""} placeholder="tab:label" onChange={(event) => updateBlock(block.id, { label: event.target.value })} />
                          </div>
                        </div>
                      )}

                      {block.type === "citation" && (
                        <div className="structured-fields citation-fields">
                          <EditableField value={block.text} multiline={false} onChange={(text) => updateBlock(block.id, { text })} placeholder="Reference title" />
                          <div className="three-fields">
                            <input value={block.author || ""} placeholder="Author" onChange={(event) => updateBlock(block.id, { author: event.target.value })} />
                            <input value={block.year || ""} placeholder="Year" onChange={(event) => updateBlock(block.id, { year: event.target.value })} />
                            <input value={block.label || ""} placeholder="Citation key" onChange={(event) => updateBlock(block.id, { label: event.target.value })} />
                          </div>
                        </div>
                      )}

                      {block.type === "code" && (
                        <div className="structured-fields">
                          <EditableField value={block.text} onChange={(text) => updateBlock(block.id, { text })} className="code-input" />
                          <div className="two-fields">
                            <input value={block.language || ""} placeholder="Language" onChange={(event) => updateBlock(block.id, { language: event.target.value })} />
                            <input value={block.caption || ""} placeholder="Caption (optional)" onChange={(event) => updateBlock(block.id, { caption: event.target.value })} />
                          </div>
                        </div>
                      )}

                      {block.type === "break" && <div className="break-editor"><span /> Page break <span /></div>}
                      {block.type === "latex" && <EditableField value={block.text} onChange={(text) => updateBlock(block.id, { text })} className="code-input raw-input" />}

                      {(["heading", "equation"] as BlockType[]).includes(block.type) && block.type === "heading" && (
                        <input className="label-input" value={block.label || ""} placeholder="Stable label" onChange={(event) => updateBlock(block.id, { label: event.target.value })} />
                      )}
                    </div>

                    <div className="block-actions" aria-label="Block actions">
                      <button onClick={() => moveBlock(block.id, -1)} disabled={index === 0} title="Move up">↑</button>
                      <button onClick={() => moveBlock(block.id, 1)} disabled={index === documentState.blocks.length - 1} title="Move down">↓</button>
                      <button onClick={() => duplicateBlock(block.id)} title="Duplicate">⧉</button>
                      <button onClick={() => deleteBlock(block.id)} disabled={documentState.blocks.length === 1} title="Delete">×</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="add-block-wrap">
                <button className="add-block-button" onClick={() => setMenuOpen(true)}><span>＋</span> Add block <kbd>/</kbd></button>
                {menuOpen && (
                  <div className="command-menu" role="dialog" aria-label="Add a block">
                    <div className="command-search"><span>⌕</span><input autoFocus placeholder="Search blocks…" value={menuQuery} onChange={(event) => setMenuQuery(event.target.value)} /></div>
                    <div className="command-title"><span>Basic and academic blocks</span><button onClick={() => setMenuOpen(false)}>Esc</button></div>
                    <div className="command-options">
                      {filteredTypes.map((type) => (
                        <button key={type} onClick={() => addBlock(type)}>
                          <span className="command-icon">{BLOCK_META[type].icon}</span>
                          <span><strong>{BLOCK_META[type].label}</strong><small>{BLOCK_META[type].description}</small></span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>

        <aside className={`right-panel ${rightOpen ? "mobile-open" : ""}`}>
          <div className="right-tabs" role="tablist" aria-label="Output view">
            <button className={rightTab === "preview" ? "active" : ""} onClick={() => setRightTab("preview")}>Preview</button>
            <button className={rightTab === "source" ? "active" : ""} onClick={() => setRightTab("source")}>LaTeX</button>
            <button className={rightTab === "checks" ? "active" : ""} onClick={() => setRightTab("checks")}>Checks {issues.length > 0 && <span>{issues.length}</span>}</button>
          </div>

          {rightTab === "preview" && (
            <div className="preview-pane">
              <div className="preview-toolbar">
                <div className="compile-status"><span /> Layout ready <small>browser preview</small></div>
                <div><button title="Decrease preview size">−</button><span>82%</span><button title="Increase preview size">＋</button></div>
              </div>
              <div className="preview-scroll">
                <article className="paper-preview">
                  <header className="paper-title-page">
                    <div className="paper-rule" />
                    <h1>{documentState.title || "Untitled report"}</h1>
                    {documentState.subtitle && <p className="paper-subtitle">{documentState.subtitle}</p>}
                    <div className="paper-author"><strong>{documentState.author || "Unnamed author"}</strong><span>{documentState.institution}</span><span>{documentState.date}</span></div>
                  </header>
                  <section className="paper-content">
                    {documentState.blocks.map((block) => (
                      <PreviewBlock
                        key={block.id}
                        block={block}
                        citationIndex={documentState.blocks.filter((item) => item.type === "citation").findIndex((item) => item.id === block.id) + 1}
                      />
                    ))}
                  </section>
                  <footer><span>FolioTeX draft</span><span>1</span></footer>
                </article>
              </div>
              <div className="preview-footer">
                <span>XeLaTeX-ready source</span>
                <button onClick={() => window.print()}>Print / Save PDF</button>
              </div>
            </div>
          )}

          {rightTab === "source" && (
            <div className="source-pane">
              <div className="source-toolbar"><div><span className="source-dot red" /><span className="source-dot yellow" /><span className="source-dot green" /><strong>main.tex</strong></div><button onClick={async () => { await navigator.clipboard.writeText(latex); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }}>{copied ? "Copied" : "Copy source"}</button></div>
              <pre><code>{latex}</code></pre>
              <div className="source-footer"><span>{latex.split("\n").length} lines</span><button onClick={() => downloadFile("academic-report.tex", latex, "text/x-tex")}>Download .tex</button></div>
            </div>
          )}

          {rightTab === "checks" && (
            <div className="checks-pane">
              <div className={`checks-hero ${issues.length ? "warning" : "success"}`}>
                <span>{issues.length ? "!" : "✓"}</span>
                <div><strong>{issues.length ? `${issues.length} item${issues.length > 1 ? "s" : ""} to review` : "Ready to export"}</strong><p>{issues.length ? "Resolve these checks before final submission." : "Document structure and required fields look good."}</p></div>
              </div>
              <div className="check-list">
                {issues.length ? issues.map((issue, index) => <div className="check-item" key={`${issue}-${index}`}><span>{index + 1}</span><div><strong>Document check</strong><p>{issue}</p></div></div>) : (
                  <>
                    <div className="check-item passed"><span>✓</span><div><strong>Metadata complete</strong><p>Title and author are present.</p></div></div>
                    <div className="check-item passed"><span>✓</span><div><strong>Structure valid</strong><p>{outline.length} section headings detected.</p></div></div>
                    <div className="check-item passed"><span>✓</span><div><strong>Export source ready</strong><p>Generated for XeLaTeX with Unicode support.</p></div></div>
                  </>
                )}
              </div>
              <div className="checks-note"><strong>About this preview</strong><p>The browser renders an immediate layout preview. Exported source is designed for XeLaTeX; connect a compilation service for byte-identical PDF output.</p></div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
