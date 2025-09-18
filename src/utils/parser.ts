import { htmlToDOM, domToReact } from "html-react-parser";

export function htmlToText(html: string) {
  const dom = htmlToDOM(html);
  const text = domToReact(dom, {
    replace: node => {
      if (node.type === "tag" && node.name === "br") {
        return "\n";
      }
      return node;
    },
  });

  return text;
}
