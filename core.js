(function (root) {
  var AI = '٠١٢٣٤٥٦٧٨٩', EI = '۰۱۲۳۴۵۶۷۸۹';
  var OPS = {
    diacritics: function (s) { return s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, ''); },
    tatweel: function (s) { return s.replace(/\u0640/g, ''); },
    alef: function (s) { return s.replace(/[أإآٱ]/g, 'ا'); },
    yaa: function (s) { return s.replace(/ى/g, 'ي'); },
    taa: function (s) { return s.replace(/ة/g, 'ه'); },
    persian: function (s) { return s.replace(/ک/g, 'ك').replace(/ی/g, 'ي').replace(/ہ|ھ/g, 'ه'); },
    toWestern: function (s) { return s.replace(/[٠-٩]/g, function (d) { return AI.indexOf(d); }).replace(/[۰-۹]/g, function (d) { return EI.indexOf(d); }); },
    toArabicIndic: function (s) { return s.replace(/[0-9]/g, function (d) { return AI[+d]; }).replace(/[۰-۹]/g, function (d) { return AI[EI.indexOf(d)]; }); },
    bidi: function (s) { return s.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069\u061C]/g, ''); },
    punct: function (s) { return s.replace(/,/g, '،').replace(/;/g, '؛').replace(/\?/g, '؟'); },
    spaces: function (s) { return s.replace(/[ \t\u00A0]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim(); },
    dedupeLines: function (s) { var seen = {}; return s.split('\n').filter(function (l) { var k = l.trim(); if (!k) return true; if (seen[k]) return false; seen[k] = 1; return true; }).join('\n'); }
  };
  var ORDER = ['bidi', 'diacritics', 'tatweel', 'alef', 'yaa', 'taa', 'persian', 'toWestern', 'toArabicIndic', 'punct', 'spaces', 'dedupeLines'];
  function apply(text, on) { return ORDER.reduce(function (s, k) { return on[k] ? OPS[k](s) : s; }, text); }
  function stats(t) {
    var words = (t.match(/[\u0600-\u06FFA-Za-z0-9]+/g) || []);
    var ar = (t.match(/[\u0600-\u06FF]/g) || []).length;
    var dia = (t.match(/[\u064B-\u065F\u0670]/g) || []).length;
    return { chars: Array.from(t).length, words: words.length, lines: t ? t.split('\n').length : 0, arabic: ar, diacritics: dia };
  }
  var api = { OPS: OPS, ORDER: ORDER, apply: apply, stats: stats };
  if (typeof module !== 'undefined') module.exports = api; else root.ArabKit = api;
})(this);
