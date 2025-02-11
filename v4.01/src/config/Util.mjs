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
