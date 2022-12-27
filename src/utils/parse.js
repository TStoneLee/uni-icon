import { XMLParser } from "fast-xml-parser";
import { encodeSvg } from "./encode";

export const parseXml = (content = "") => {
  const alwaysArray = ["svg.symbol", "svg.symbol.path"];
  const xmlParserOptions = {
    attributeNamePrefix: "",
    attributesGroupName: "$",
    ignoreAttributes: false,
    isArray: (name, jpath) => {
      if (alwaysArray.indexOf(jpath) !== -1) return true;
    },
  };
  const parser = new XMLParser(xmlParserOptions);
  const matches = String(content).match(/'<svg>(.+?)<\/svg>'/);
  const result = parser.parse(`<svg>${matches ? matches[1] : ""}</svg>`);
  return result;
};

export const transformXML2CSS = (cssContent, xmlContent, iconList = []) => {
  if (
    !xmlContent ||
    !xmlContent.svg ||
    !xmlContent.svg.symbol ||
    !Array.isArray(xmlContent.svg.symbol)
  ) {
    throw new Error("转换后的xml对象格式错误");
  }
  for (const item of xmlContent.svg.symbol) {
    const iconId = item.$.id;
    if (iconId) {
      let svgString = "";
      const fillColor = new Set();
      for (const path of item.path) {
        const keys = Object.keys(path.$);
        let attributeString = "";
        for (const k of keys) {
          attributeString += `${k}="${path.$[k]}" `;
          if (k === "fill") {
            fillColor.add(path.$[k]);
          }
        }
        svgString = `${svgString}<path ${attributeString.trim()}></path>`;
      }
      if (fillColor.size > 1 || iconList.includes(iconId)) {
        // 去除阿里图标库生成的类名对应的css
        const temporaryReg = /\.((icon-[\w-]+)(.(\n?))*)/gi;
        cssContent = cssContent.replace(temporaryReg, (big, $1, $2) => {
          if ($2 === iconId) {
            return "";
          }
          return big;
        });
        svgString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${svgString}</svg>`;
        // const inlineSvg = "data:image/svg+xml," + encodeURIComponent(svgStr)
        // const inlineSvg = "data:image/svg+xml," + svgStr
        const inlineSvg = encodeSvg(svgString);
        svgString = `\n.${iconId} { 
          display: inline-block;
          font-size: 16px;
          width: 1em; 
          height: 1em; 
          vertical-align: middle;
          background: url("${inlineSvg}") no-repeat center;
          background-size: 100%;
        }\n`;
        cssContent += svgString;
      }
    }
  }

  return cssContent;
};
