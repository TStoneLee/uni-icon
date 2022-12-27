import fs from "fs";
import path from "path";
import MagicString from "magic-string";

const fsPromises = fs.promises;
const CLI_CHUNK = "bin/uni-icon.js";

export default function addCliEntry() {
  return {
    buildStart() {
      this.emitFile({
        fileName: CLI_CHUNK,
        id: "cli/cli.js",
        preserveSignature: false,
        type: "chunk",
      });
    },
    name: "add-cli-entry",
    renderChunk(code, chunkInfo) {
      if (chunkInfo.fileName === CLI_CHUNK) {
        const magicString = new MagicString(code);
        magicString.prepend("#!/usr/bin/env node\n\n");
        return {
          code: magicString.toString(),
          map: magicString.generateMap({ hires: true }),
        };
      }
      return null;
    },
    writeBundle({ dir }) {
      return fsPromises.chmod(path.resolve(dir, CLI_CHUNK), "755");
    },
  };
}
