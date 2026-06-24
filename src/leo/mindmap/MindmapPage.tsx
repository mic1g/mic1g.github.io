import mindmapHtml from "./scleral_lenses_mind_map.html?raw";

function MindmapPage() {
  return (
    <iframe
      title="Contemporary Scleral Lenses Interactive Mind Map"
      srcDoc={mindmapHtml}
      className="h-screen w-screen border-0"
    />
  );
}

export default MindmapPage;
