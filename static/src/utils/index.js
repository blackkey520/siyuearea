import config from "./config";
import menu from "./menu";
import request from "./request";
import classnames from "classnames";
import { color } from "./theme";
import moment from 'moment';

// 连字符转驼峰
String.prototype.hyphenToHump = function() {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function() {
  return this.replace(/([A-Z])/g, "-$1").toLowerCase();
};

// 日期格式化
Date.prototype.format = function(format) {
  const o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
};
const moneyarray=[
  {timestart:8,timeend:12,money:4},
  {timestart:12,timeend:16,money:10},
  {timestart:16,timeend:20,money:20},
  {timestart:20,timeend:23,money:10},
]
const GetMoney=(btime,etime)=>{
  // let momey=0;
  // let begintime = btime;
  // let baktime=btime;
  // while (begintime <= etime) {
  //   const hitma = moneyarray.find((item) => {
  //     return item.timestart <= begintime.hour() && item.timeend > begintime.hour()
  //   })
  //   //第一次
  //   if (begintime === btime) {
  //     if (moment(baktime.format(`YYYY-MM-DD ${begintime.hours()+1}:00:00`)).diff(begintime, 'minutes') >= 30) {
  //       momey += hitma.money;
  //     } else {
  //       //不足
  //     }
  //   }
  //   //最后一次
  //   else if (begintime.hours() === etime.hours()) {
  //     if (etime.diff(begintime, 'minutes') >= 30) {
  //       momey += hitma.money;
  //     } else {
  //       //不足
  //     }
  //   } else {
  //     momey += hitma.money;
  //   }
  //   begintime = moment(begintime.format('YYYY-MM-DD HH:00:00')).add(1, 'hours');
  // }
  

  // const tarr=moneyarray.filter((item)=>{
  //   return item.timeend > btime.hour()
  // }).filter((item)=>{
  //   return item.timestart < etime.hour()
  // });
  // if (tarr.length === 1) {
  //   const shours = etime.diff(btime, 'hours', true);
  //   if (shours > 0.5) {
  //     momey = momey + Math.round(shours) * tarr[0].money;
  //   }
  // } else {
  //   for (let i = 0; i < tarr.length; i++) {
  //     const t = tarr[i];
  //     let begin;
  //     let end;
  //     if (i === tarr.length - 1) {
  //       begin = moment(moment().format(`YYYY-MM-DD ${t.timestart}:00:00`));
  //       end = etime;
  //     } else if (i === 0) {
  //       begin = btime;
  //       end = moment(moment().format(`YYYY-MM-DD ${t.timeend}:00:00`));
  //     } else {
  //       begin = moment(moment().format(`YYYY-MM-DD ${t.timestart}:00:00`));
  //       end = moment(moment().format(`YYYY-MM-DD ${t.timeend}:00:00`));
  //     }
  //     const hours = end.diff(begin, 'hours', true);
  //     if (hours > 0.5) {
  //       momey = momey + Math.round(hours) * t.money;
  //     }
  //   }
  // }
  const minutes = moment(etime).diff(btime, 'minutes');
  return minutes * 0.2;
}
const GetMoneyDetail = (btime, etime) => {
  // let rtnval='';
  // let momey=0;
  // let begintime = btime;
  // let baktime=btime;
  // while (begintime <= etime) {
  //   const hitma = moneyarray.find((item) => {
  //     return item.timestart <= begintime.hour() && item.timeend > begintime.hour()
  //   })
  //   //第一次
  //   if (begintime === btime) {
  //     if (moment(baktime.format(`YYYY-MM-DD ${begintime.hours()+1}:00:00`)).diff(begintime, 'minutes') >= 30) {
  //       momey += hitma.money;
  //       rtnval += `${begintime.format('YYYY-MM-DD HH:mm:ss')}到${baktime.format(`YYYY-MM-DD ${begintime.hours()+1}:00:00`)}收费（${hitma.money}）；`;
  //     } else {
  //       //不足
  //       rtnval += `${begintime.format('YYYY-MM-DD HH:mm:ss')}到${baktime.format(`YYYY-MM-DD ${begintime.hours()+1}:00:00`)}-开始时间不满足收费条件不计费；`;
  //     }
  //   }
  //   //最后一次
  //   else if (begintime.hours() === etime.hours()) {
  //     if (etime.diff(begintime, 'minutes') >= 30) {
  //       momey += hitma.money;
  //       rtnval += `${begintime.format('YYYY-MM-DD HH:mm:ss')}到${etime.format('YYYY-MM-DD HH:mm:ss')}收费（${hitma.money}）；`;
  //     } else {
  //       //不足
  //       rtnval += `${begintime.format('YYYY-MM-DD HH:mm:ss')}到${etime.format('YYYY-MM-DD HH:mm:ss')}结束时间不满足收费条件不计费；`;
  //     }
  //   }else{
  //     momey += hitma.money;
  //     rtnval += `${begintime.format('YYYY-MM-DD HH:mm:ss')}到${baktime.format(`YYYY-MM-DD ${begintime.hours()+1}:00:00`)}收费（${hitma.money}）；`;
  //   }
  //   begintime = moment(begintime.format('YYYY-MM-DD HH:00:00')).add(1, 'hours');
  // }



  // // const tarr = moneyarray.filter((item) => {
  // //   return item.timeend >= btime.hour()
  // // }).filter((item) => {
  // //   return item.timestart < etime.hour()
  // // });
  // // if(tarr.length===1)
  // // {
  // //     const shours = etime.diff(btime, 'hours', true);
  // //     if (shours > 0.5) {
  // //       rtnval = `${btime.format('YYYY-MM-DD HH:mm:ss')}-${etime.format('YYYY-MM-DD HH:mm:ss')}[${Math.round(shours)}小时]（收费：${Math.round(shours) * tarr[0].money}）`;
  // //     }
  // // }else{
  // //   rtnval = '';
  // //   for (let i = 0; i < tarr.length; i++) {
  // //     const t = tarr[i];
  // //     let begin;
  // //     let end;
  // //     if (i === tarr.length - 1) {
  // //       begin = moment(moment().format(`YYYY-MM-DD ${t.timestart}:00:00`));
  // //       end = etime;
  // //     } else if (i === 0) {
  // //       begin = btime;
  // //       end = moment(moment().format(`YYYY-MM-DD ${t.timeend}:00:00`));
  // //     } else {
  // //       begin = moment(moment().format(`YYYY-MM-DD ${t.timestart}:00:00`));
  // //       end = moment(moment().format(`YYYY-MM-DD ${t.timeend}:00:00`));
  // //     }
  // //     const hours = end.diff(begin, 'hours', true);
  // //     if (hours > 0.5) {
  // //       rtnval += `${begin.format('YYYY-MM-DD HH:mm:ss')}到${end.format('YYYY-MM-DD HH:mm:ss')}[${hours}小时]（收费：${Math.round(hours) * t.money}）`;
  // //     }else{
  // //       rtnval += `${begin.format('YYYY-MM-DD HH:mm:ss')}到${end.format('YYYY-MM-DD HH:mm:ss')}[不足小时]（收费：0）`;
  // //     }
  // //   }
  // // }
  // return rtnval + "总金额" + momey;
  const minutes = moment(etime).diff(btime, 'minutes');
  const rtnval = `使用时间:${btime.format('YYYY-MM-DD HH:mm:ss')}到${etime.format('YYYY-MM-DD HH:mm:ss')},使用时长:${minutes/60}小时,消费：${minutes*0.2}元`;
  return rtnval;
}
const MD5 = s => {
  function L(k, d) {
    return (k << d) | (k >>> (32 - d));
  }
  function K(G, k) {
    var I, d, F, H, x;
    F = G & 2147483648;
    H = k & 2147483648;
    I = G & 1073741824;
    d = k & 1073741824;
    x = (G & 1073741823) + (k & 1073741823);
    if (I & d) {
      return x ^ 2147483648 ^ F ^ H;
    }
    if (I | d) {
      if (x & 1073741824) {
        return x ^ 3221225472 ^ F ^ H;
      } else {
        return x ^ 1073741824 ^ F ^ H;
      }
    } else {
      return x ^ F ^ H;
    }
  }
  function r(d, F, k) {
    return (d & F) | (~d & k);
  }
  function q(d, F, k) {
    return (d & k) | (F & ~k);
  }
  function p(d, F, k) {
    return d ^ F ^ k;
  }
  function n(d, F, k) {
    return F ^ (d | ~k);
  }
  function u(G, F, aa, Z, k, H, I) {
    G = K(G, K(K(r(F, aa, Z), k), I));
    return K(L(G, H), F);
  }
  function f(G, F, aa, Z, k, H, I) {
    G = K(G, K(K(q(F, aa, Z), k), I));
    return K(L(G, H), F);
  }
  function D(G, F, aa, Z, k, H, I) {
    G = K(G, K(K(p(F, aa, Z), k), I));
    return K(L(G, H), F);
  }
  function t(G, F, aa, Z, k, H, I) {
    G = K(G, K(K(n(F, aa, Z), k), I));
    return K(L(G, H), F);
  }
  function e(G) {
    var Z;
    var F = G.length;
    var x = F + 8;
    var k = (x - x % 64) / 64;
    var I = (k + 1) * 16;
    var aa = Array(I - 1);
    var d = 0;
    var H = 0;
    while (H < F) {
      Z = (H - H % 4) / 4;
      d = (H % 4) * 8;
      aa[Z] = aa[Z] | (G.charCodeAt(H) << d);
      H++;
    }
    Z = (H - H % 4) / 4;
    d = (H % 4) * 8;
    aa[Z] = aa[Z] | (128 << d);
    aa[I - 2] = F << 3;
    aa[I - 1] = F >>> 29;
    return aa;
  }
  function B(x) {
    var k = "",
      F = "",
      G,
      d;
    for (d = 0; d <= 3; d++) {
      G = (x >>> (d * 8)) & 255;
      F = "0" + G.toString(16);
      k = k + F.substr(F.length - 2, 2);
    }
    return k;
  }
  function J(k) {
    k = k.replace(/rn/g, "n");
    var d = "";
    for (var F = 0; F < k.length; F++) {
      var x = k.charCodeAt(F);
      if (x < 128) {
        d += String.fromCharCode(x);
      } else {
        if (x > 127 && x < 2048) {
          d += String.fromCharCode((x >> 6) | 192);
          d += String.fromCharCode((x & 63) | 128);
        } else {
          d += String.fromCharCode((x >> 12) | 224);
          d += String.fromCharCode(((x >> 6) & 63) | 128);
          d += String.fromCharCode((x & 63) | 128);
        }
      }
    }
    return d;
  }
  var C = Array();
  var P, h, E, v, g, Y, X, W, V;
  var S = 7,
    Q = 12,
    N = 17,
    M = 22;
  var A = 5,
    z = 9,
    y = 14,
    w = 20;
  var o = 4,
    m = 11,
    l = 16,
    j = 23;
  var U = 6,
    T = 10,
    R = 15,
    O = 21;
  s = J(s);
  C = e(s);
  Y = 1732584193;
  X = 4023233417;
  W = 2562383102;
  V = 271733878;
  for (P = 0; P < C.length; P += 16) {
    h = Y;
    E = X;
    v = W;
    g = V;
    Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
    V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
    W = u(W, V, Y, X, C[P + 2], N, 606105819);
    X = u(X, W, V, Y, C[P + 3], M, 3250441966);
    Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
    V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
    W = u(W, V, Y, X, C[P + 6], N, 2821735955);
    X = u(X, W, V, Y, C[P + 7], M, 4249261313);
    Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
    V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
    W = u(W, V, Y, X, C[P + 10], N, 4294925233);
    X = u(X, W, V, Y, C[P + 11], M, 2304563134);
    Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
    V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
    W = u(W, V, Y, X, C[P + 14], N, 2792965006);
    X = u(X, W, V, Y, C[P + 15], M, 1236535329);
    Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
    V = f(V, Y, X, W, C[P + 6], z, 3225465664);
    W = f(W, V, Y, X, C[P + 11], y, 643717713);
    X = f(X, W, V, Y, C[P + 0], w, 3921069994);
    Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
    V = f(V, Y, X, W, C[P + 10], z, 38016083);
    W = f(W, V, Y, X, C[P + 15], y, 3634488961);
    X = f(X, W, V, Y, C[P + 4], w, 3889429448);
    Y = f(Y, X, W, V, C[P + 9], A, 568446438);
    V = f(V, Y, X, W, C[P + 14], z, 3275163606);
    W = f(W, V, Y, X, C[P + 3], y, 4107603335);
    X = f(X, W, V, Y, C[P + 8], w, 1163531501);
    Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
    V = f(V, Y, X, W, C[P + 2], z, 4243563512);
    W = f(W, V, Y, X, C[P + 7], y, 1735328473);
    X = f(X, W, V, Y, C[P + 12], w, 2368359562);
    Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
    V = D(V, Y, X, W, C[P + 8], m, 2272392833);
    W = D(W, V, Y, X, C[P + 11], l, 1839030562);
    X = D(X, W, V, Y, C[P + 14], j, 4259657740);
    Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
    V = D(V, Y, X, W, C[P + 4], m, 1272893353);
    W = D(W, V, Y, X, C[P + 7], l, 4139469664);
    X = D(X, W, V, Y, C[P + 10], j, 3200236656);
    Y = D(Y, X, W, V, C[P + 13], o, 681279174);
    V = D(V, Y, X, W, C[P + 0], m, 3936430074);
    W = D(W, V, Y, X, C[P + 3], l, 3572445317);
    X = D(X, W, V, Y, C[P + 6], j, 76029189);
    Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
    V = D(V, Y, X, W, C[P + 12], m, 3873151461);
    W = D(W, V, Y, X, C[P + 15], l, 530742520);
    X = D(X, W, V, Y, C[P + 2], j, 3299628645);
    Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
    V = t(V, Y, X, W, C[P + 7], T, 1126891415);
    W = t(W, V, Y, X, C[P + 14], R, 2878612391);
    X = t(X, W, V, Y, C[P + 5], O, 4237533241);
    Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
    V = t(V, Y, X, W, C[P + 3], T, 2399980690);
    W = t(W, V, Y, X, C[P + 10], R, 4293915773);
    X = t(X, W, V, Y, C[P + 1], O, 2240044497);
    Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
    V = t(V, Y, X, W, C[P + 15], T, 4264355552);
    W = t(W, V, Y, X, C[P + 6], R, 2734768916);
    X = t(X, W, V, Y, C[P + 13], O, 1309151649);
    Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
    V = t(V, Y, X, W, C[P + 11], T, 3174756917);
    W = t(W, V, Y, X, C[P + 2], R, 718787259);
    X = t(X, W, V, Y, C[P + 9], O, 3951481745);
    Y = K(Y, h);
    X = K(X, E);
    W = K(W, v);
    V = K(V, g);
  }
  var i = B(Y) + B(X) + B(W) + B(V);
  return i.toLowerCase();
};

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const encode64 = input => {
  input = escape(input);
  var output = "";
  var chr1,
    chr2,
    chr3 = "";
  var enc1,
    enc2,
    enc3,
    enc4 = "";
  var i = 0;

  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output =
      output +
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
};

const decode64 = input => {
  var output = "";
  var chr1,
    chr2,
    chr3 = "";
  var enc1,
    enc2,
    enc3,
    enc4 = "";
  var i = 0;

  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  if (base64test.exec(input)) {
    alert(
      "There were invalid base64 characters in the input text.\n" +
        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
        "Expect errors in decoding."
    );
  }
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }

    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return unescape(output);
};
const createAction = type => payload => ({
  type,
  payload
});
module.exports = {
  config,
  menu,
  request,
  color,
  classnames,
  MD5,
  encode64,
  decode64,
  createAction,
  GetMoney,
  GetMoneyDetail
};
