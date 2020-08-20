function saveCaretPosition(context: Node | null) {
  if (!context) return () => { };

  const selection = window.getSelection();
  if (!selection) return () => { };

  const range = selection.getRangeAt(0);
  range.setStart(context, 0);
  const len = range.toString().length;

  return function restore() {
    const pos = getTextNodeAtPosition(context, len);

    selection.removeAllRanges();
    const range = new Range();
    range.setStart(pos.node, pos.position);
    selection.addRange(range);
  }
}

function getTextNodeAtPosition(root: Node, index: number) {
  console.log("Running from root to the element with index " + index);

  const filter = {
    acceptNode: (elem: Node) => {
      if (index > (elem.textContent?.length ?? 0)) {
        index -= elem.textContent?.length ?? 0;
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  }

  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, filter);

  const c = treeWalker.nextNode();
  const node = c ? c : root;

  return {
    node,
    position: index
  };
}

export { saveCaretPosition };
