(function() {
  'use strict';

  const NS = {
    user: {},
    userScriptId: null,
    URL: new URL(document.URL),
    doProcess(obj) {
      Object.values(obj).forEach((process) => process());
    },
    userInit(obj) {
      NS.user = obj;

      if (NS.user.noLoadCSS) {
        Sub.dom.show();
      }
      if (NS.user.resetCSS === false) {
        Sub.removeResetCSS();
      }
    },
    loadCSS(urlList) {
      if (!Array.isArray(urlList)) urlList = [urlList];
      const promiseList = [];
      for (const url of urlList) {
        promiseList.push(new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = Sub.getResourceUrl(url);
          link.onload = () => {
            Sub.dom.show();
            resolve();
          };
          link.onerror = () => {
            reject();
          };
          Sub.dom.load(link);
        }));
      }
      return Promise.allSettled(promiseList);
    },
  };
  window.NS = NS;

  const ScriptMain = {
    beforeLoadCSS() {
      Sub.dom.hide();
    },
    loadUserScript() {
      const id = Sub.getUserScriptId();
      Sub.loadUserScript(id);
    },
    afterLoadCSS() {
      setTimeout(() => Sub.dom.show(), 1000);
    },
  };

  const DOMMain = {
  };

  const Sub = {
    MASTER_STORAGE_KEY: 'sugamo-css',
    ID_STORAGE_KEY: 'userScriptId',
    DEFAULT_ID: 1,
    dom: {
      hide() {
        document.documentElement.style.display = 'none';
      },
      show() {
        document.documentElement.removeAttribute('style');
      },
      load(elem) {
        document.head.append(elem);
      },
    },
    getQuery(key) {
      const params = NS.URL.searchParams;
      return params.get(key);
    },
    getNumberQuery(key) {
      const value = Sub.getQuery(key);
      if (value == null) return null;
      return Number(value);
    },
    getLocalStorage(key = null) {
      const json = localStorage.getItem(Sub.MASTER_STORAGE_KEY);
      const obj = JSON.parse(json) ?? {};
      return key == null ? obj : obj[key];
    },
    setLocalStorage(key, value) {
      const obj = Sub.getLocalStorage();
      obj[key] = value;
      const json = JSON.stringify(obj);
      localStorage.setItem(Sub.MASTER_STORAGE_KEY, json);
    },
    getUserScriptId() {
      return Sub.getNumberQuery('id') ?? Sub.getLocalStorage(Sub.ID_STORAGE_KEY) ?? Sub.DEFAULT_ID;
    },
    setUserScriptId(id) {
      Sub.setLocalStorage(Sub.ID_STORAGE_KEY, id);
    },
    loadUserScript(id, noFallback = false) {
      const scriptPath = Sub.getUserPath('user.js', id);
      const script = document.createElement('script');
      script.src = scriptPath;
      if (!noFallback) {
        script.onerror = () => Sub.loadUserScript(Sub.DEFAULT_ID, true);
      }
      Sub.dom.load(script);
      Sub.loadUserScriptPostProcessAsync(id);
    },
    loadUserScriptPostProcessAsync(id) {
      NS.userScriptId = id;
      Sub.setUserScriptId(id);
    },
    getUserPath(path, id = null) {
      id ??= NS.userScriptId;
      return `./assets/user/${id}/${path}`;
    },
    getResourceUrl(url) {
      const isAbs = /^https:\/\//.test(url);
      if (!isAbs) url = Sub.getUserPath(url);
      return url;
    },
    removeResetCSS() {
      const link = document.getElementById('resetCSS');
      link.remove();
    },
  };

  NS.doProcess(ScriptMain);
  document.addEventListener('DOMContentLoaded', () => NS.doProcess(DOMMain));
})();
