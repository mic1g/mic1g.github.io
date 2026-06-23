import { ArrowLeft, ExternalLink } from "lucide-react";

function Dp700Page() {
  return (
    <div className="min-h-screen bg-[#f3f5f8] text-[#172033]">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Back to Michael Fung
          </a>
          <a
            href="/dp700/flashcards.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
          >
            Open full screen
            <ExternalLink size={16} />
          </a>
        </div>
      </header>
      <iframe
        title="DP-700 interactive flashcards"
        src="/dp700/flashcards.html"
        className="block h-[calc(100vh-57px)] w-full border-0"
      />
    </div>
  );
}

export default Dp700Page;
