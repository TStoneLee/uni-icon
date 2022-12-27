import { fetchResource } from "./utils/fetch";
import { writeFileSync } from "./utils/fs";
import { parseXml, transformXML2CSS } from "./utils/parse";

const run = async ({ url, singleColorSvg, output }) => {
  const resource = await loadResource(url);
  if (!resource.iconfontCSS || !resource.iconfontJS) {
    return;
  }

  singleColorSvg = Array.isArray(singleColorSvg) ? singleColorSvg : [];
  const result = getCSS(
    resource.iconfontCSS,
    resource.iconfontJS,
    singleColorSvg
  );
  writeFileSync(output, result);
};

const getCSS = (CSSText, jsText, svgList) => {
  const parseXmlContent = parseXml(jsText);
  return transformXML2CSS(CSSText, parseXmlContent, svgList);
};

const loadResource = async (url) => {
  if (!/^\/\/at.alicdn.com.*\.js$/.test(url)) {
    throw new Error("URL格式错误，请确认后重试");
  }

  const originalUrl = url.replace(/.*\/\//, "http://");
  const cssUrl = originalUrl.replace(".js", ".css");

  let iconfontCSS = null;
  let iconfontJS = null;
  try {
    iconfontCSS = await fetchResource(cssUrl);
  } catch (e) {
    throw new Error(`请求css资源出错：${JSON.stringify(e)}`);
  }
  try {
    iconfontJS = await fetchResource(originalUrl);
  } catch (e) {
    throw new Error(`请求js资源出错：${JSON.stringify(e)}`);
  }
  return {
    iconfontCSS,
    iconfontJS,
  };
};

export default run;
