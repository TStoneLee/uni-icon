import { getConfigList } from "../src/loadConfig";
import run from "../src/main";
const start = async () => {
  const config = await getConfigList();
  run(config);
};
start();
