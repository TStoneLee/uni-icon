import http from "http";

export const fetchResource = (url) => {
  if (!url) {
    throw new Error("URL 不存在！");
  }
  let _data = "";
  return new Promise((resolve) => {
    http.get(url, (res) => {
      res.on("data", function (chunk) {
        _data += chunk;
      });

      res.on("end", function () {
        resolve(_data);
      });
    });
  });
};
