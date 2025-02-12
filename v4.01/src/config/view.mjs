import Util from '/src/config/Util';

export const args = {
  siteName: 'Sugamo.css - ver.4.01',
  titleSuffix: undefined,
  description: 'Sugamo.cssは、「フロントエンドについて話そう！」という懇親会めいた集いです。偉い人は言いました。「別に次何するとか決めないし約束しないし気が向いたらなんかするそれがSugamo.css」',
  keywords: ['Sugamo.css'],
  twitter: '@Sugamo_css',
};

export const pages = [
  { route: '/', label: 'About' },
  { route: '/place', label: '会場の説明' },
  { route: '/history', label: '開催履歴' },
  { route: '/member', label: '過去の参加者' },
  { route: '/community', label: 'コミュニティ' },
  { route: '/contact', label: '連絡先' },
];

export const app = {
  init(Astro, pageArgs) {
    app.Astro = Astro;
    app.args = pageArgs ?? {};
    app.url = Astro.url;
    args.domain = app.url.hostname;
    args.path = app.url.pathname.replace(/\.html$/, '');
    args.url = app.url.origin + args.path;
    args.siteRootUrl = app.url.origin;
    args.siteRootUrlWithoutProtocol = app.url.host;
    args.urlWithoutProtocol = app.url.host + args.path;
    args.cssList = app.args.cssList ?? [];
    args.jsList = app.args.jsList ?? [];
    args.titlePrefix = app.args.title;
    args.title = (args.titlePrefix != null ? args.titlePrefix + ' | ' : '') + args.siteName + (args.titleSuffix ? ' | ' + args.titleSuffix : '');
    args.lang = 'ja';
    args.locale = 'ja_JP';
    args.og_type = args.path === '/' ? 'website' : 'article';
    args.og_image = assetsUrl('img/global/og.png', true);
  },
};

export const assets = (path, cacheBuster = false) => {
  path = '/assets/' + Util.ltrim(path);
  if (cacheBuster) path += '?' + Date.now();
  return path;
};

export const assetsUrl = (path, cacheBuster = false) => {
  return Util.rtrim(app.url.origin) + assets(path, cacheBuster);
};

export const img = (path) => {
  return assets('img/' + Util.ltrim(path));
};

export const route = (path) => {
  return '/' + Util.ltrim(path);
};

export const setID = (id) => {
  app.latestID = id;
  return id;
};

export const getID = () => {
  return '#' + app.latestID;
};
