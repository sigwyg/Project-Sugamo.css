import fs from 'fs';
import { globSync } from 'glob';
import { basename, dirname } from 'path';
import Util from '/src/config/Util';

function callScript(code) {
  let result = {};
  const NS = new Proxy({}, {
    get(target, prop, receiver) {
      if (prop === 'userInit') return (obj) => result = obj;
      return () => {};
    },
  });
  try { eval(code); } catch (e) {}
  return result;
}

function generateUserInfo(pathList, baseDir) {
  const result = [];
  pathList.forEach((path) => {
    const id = Number(basename(dirname(path)));
    const code = fs.readFileSync(path, { encoding: 'utf8' });
    const obj = callScript(code);
    obj.id = id;
    result.push(obj);
  });
  Util.Array.sort(result, false, 'id');
  const json = JSON.stringify(result, null, 2) + '\n';
  fs.writeFileSync(`${baseDir}/src/config/userInfo.json`, json);
}

export default function() {
  return {
    name: 'myExt:generateUserInfo',
    hooks: {
      'astro:build:generated': (options) => {
        const baseDir = dirname(options.dir.pathname);
        const pathList = globSync(`${baseDir}/public/assets/user/*/user.js`);
        generateUserInfo(pathList, baseDir);
      },
    },
  };
};
