#!/usr/bin/env node

'use strict';

const url = require('url');
const main = require('../main.js');
require('http');
require('path');
require('process');
require('constants');
require('stream');
require('assert');
require('fs');
require('util');

async function getConfigList() {
  const fileName = "unicon.config.js";
  try {
    const fileUrl = url.pathToFileURL(fileName);
    return (await import(fileUrl.href)).default;
  } catch (e) {
    throw new Error(e);
  }
}

const start = async () => {
  const config = await getConfigList();
  main(config);
};
start();
