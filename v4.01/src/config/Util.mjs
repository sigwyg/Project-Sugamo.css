const Util = {
  HTML: {
    escape(str) {
      const map = {
        '&': '&amp;',
        "'": '&#039;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      };
      return str.replace(/[&'"<>]/g, (m) => map[m]);
    },
  },
  RegExp: {
    escape(str) {
      return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
    },
  },
  Array: {
    combine(keys, values) {
      return Object.fromEntries(Util.Array.zip(keys, values));
    },
    zip(...args) {
      const result = [];
      const len = Math.max(...args.map((arg) => arg.length));
      for (let i = 0; i < len; ++i) {
        result.push([...args.map((arg) => arg[i])]);
      }
      return result;
    },
    sort(array, isDesc = false, prop = null) {
      const sign = isDesc ? 1 : -1;
      array.sort((a, b) => {
        if (prop != null) {
          a = a[prop];
          b = b[prop];
        }
        if (a < b) return sign;
        if (a > b) return -sign;
        return 0;
      });
      return array;
    },
  },
  Object: {
    each(obj, callback) {
      for (const [key, value] of Object.entries(obj)) {
        if (callback.call(obj, key, value) === false) break;
      }
    },
    map(obj, callback) {
      const ret = {};
      Util.Object.each(obj, (key, value) => ret[key] = callback(value, key));
      return ret;
    },
  },
  Date: {
    methodMap: { year: 'getFullYear', month: 'getMonth', day: 'getDate', hour: 'getHours', minute: 'getMinutes', second: 'getSeconds', weekday: 'getDay' },
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    dateObjToMap(dateObj) {
      const map = Util.Object.map(Util.Date.methodMap, (method) => dateObj[method]());
      ++map.month;
      map.weekday = Util.Date.weekdays[map.weekday];
      return map;
    },
    zeroPaddingMap(map) {
      return Util.Object.map(map, (value, key) => key === 'weekday' ? value : String(value).padStart(key === 'year' ? 4 : 2, '0'));
    },
    format(dateStr, format = 'Y-m-d H:i:s') {
      if (/^\d+-\d+-\d+$/.test(dateStr)) dateStr += ' 00:00:00';
      const map = Util.Date.zeroPaddingMap(Util.Date.dateObjToMap(new Date(dateStr)));
      const charMap = {
        Y: map.year,
        m: map.month,
        n: String(Number(map.month)),
        d: map.day,
        j: String(Number(map.day)),
        H: map.hour,
        i: map.minute,
        s: map.second,
        w: map.weekday,
      };
      return format.replace(/[YmndjHGisw]/g, (m) => charMap[m]);
    },
  },
  sprintf(format, ...args) {
    let p = 0;
    return format.replace(/%./g, function(m) {
      if (m === '%%') return '%';
      if (m === '%s') return args[p++];
      return m;
    });
  },
  ltrim(str, char = '/') {
    return str.replaceAll(new RegExp(Util.sprintf('^[%s]+', Util.RegExp.escape(char)), 'g'), '');
  },
  rtrim(str, char = '/') {
    return str.replaceAll(new RegExp(Util.sprintf('[%s]+$', Util.RegExp.escape(char)), 'g'), '');
  },
  toZippedList(obj) {
    const args = Object.values(obj);
    let first = args.shift();
    if (!Array.isArray(first)) first = [first];
    args.forEach((arg, idx) => {
      if (!Array.isArray(arg)) arg = [arg];
      for (let i = arg.length, k = 0; i < first.length; ++i, ++k) {
        arg[i] = arg[k];
      }
      args[idx] = arg;
    });
    args.unshift(first);
    const keys = Object.keys(obj);
    const zippedList = Util.Array.zip(...args).map((record) => Util.Array.combine(keys, record));
    return zippedList;
  },
};

export default Util;
