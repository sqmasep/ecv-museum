import { htmlToDOM } from "html-react-parser";

export function htmlToText(html: string) {
  const dom = htmlToDOM(html);
  return dom.textContent || "";
}
