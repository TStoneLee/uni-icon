import { pathToFileURL } from "url";

export async function getConfigList() {
  const fileName = "unicon.config.js";
  try {
    const fileUrl = pathToFileURL(fileName);
    return (await import(fileUrl.href)).default;
  } catch (e) {
    throw new Error(e);
  }
}
