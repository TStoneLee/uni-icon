import path from "path";
import process from "process";
import fs from "fs-extra";

export const writeFileSync = (outputPath, data, format = "utf-8") => {
  fs.outputFileSync(path.posix.join(process.cwd(), outputPath), data, format);
};
