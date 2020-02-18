// 守护港城小程序加密算法
function b(t) {
  return y(_(t))
}
function _(t) {
  return v(m(t))
}
function y(t) {
  var e,
    n,
    r = '0123456789abcdef',
    o = ''
  for (n = 0; n < t.length; n += 1)
    (e = t.charCodeAt(n)), (o += r.charAt((e >>> 4) & 15) + r.charAt(15 & e))
  return o
}
function m(t) {
  return unescape(encodeURIComponent(t))
}
function v(t) {
  return d(p(h(t), 8 * t.length))
}
function h(t) {
  var e,
    n = []
  for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0
  var r = 8 * t.length
  for (e = 0; e < r; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32
  return n
}
function p(t, e) {
  var n, r, o, a, s
  ;(t[e >> 5] |= 128 << e % 32), (t[14 + (((e + 64) >>> 9) << 4)] = e)
  var p = 1732584193,
    d = -271733879,
    h = -1732584194,
    v = 271733878
  for (n = 0; n < t.length; n += 16)
    (r = p),
      (o = d),
      (a = h),
      (s = v),
      (d = l(
        (d = l(
          (d = l(
            (d = l(
              (d = f(
                (d = f(
                  (d = f(
                    (d = f(
                      (d = c(
                        (d = c(
                          (d = c(
                            (d = c(
                              (d = u(
                                (d = u(
                                  (d = u(
                                    (d = u(
                                      d,
                                      (h = u(
                                        h,
                                        (v = u(
                                          v,
                                          (p = u(
                                            p,
                                            d,
                                            h,
                                            v,
                                            t[n],
                                            7,
                                            -680876936
                                          )),
                                          d,
                                          h,
                                          t[n + 1],
                                          12,
                                          -389564586
                                        )),
                                        p,
                                        d,
                                        t[n + 2],
                                        17,
                                        606105819
                                      )),
                                      v,
                                      p,
                                      t[n + 3],
                                      22,
                                      -1044525330
                                    )),
                                    (h = u(
                                      h,
                                      (v = u(
                                        v,
                                        (p = u(
                                          p,
                                          d,
                                          h,
                                          v,
                                          t[n + 4],
                                          7,
                                          -176418897
                                        )),
                                        d,
                                        h,
                                        t[n + 5],
                                        12,
                                        1200080426
                                      )),
                                      p,
                                      d,
                                      t[n + 6],
                                      17,
                                      -1473231341
                                    )),
                                    v,
                                    p,
                                    t[n + 7],
                                    22,
                                    -45705983
                                  )),
                                  (h = u(
                                    h,
                                    (v = u(
                                      v,
                                      (p = u(
                                        p,
                                        d,
                                        h,
                                        v,
                                        t[n + 8],
                                        7,
                                        1770035416
                                      )),
                                      d,
                                      h,
                                      t[n + 9],
                                      12,
                                      -1958414417
                                    )),
                                    p,
                                    d,
                                    t[n + 10],
                                    17,
                                    -42063
                                  )),
                                  v,
                                  p,
                                  t[n + 11],
                                  22,
                                  -1990404162
                                )),
                                (h = u(
                                  h,
                                  (v = u(
                                    v,
                                    (p = u(
                                      p,
                                      d,
                                      h,
                                      v,
                                      t[n + 12],
                                      7,
                                      1804603682
                                    )),
                                    d,
                                    h,
                                    t[n + 13],
                                    12,
                                    -40341101
                                  )),
                                  p,
                                  d,
                                  t[n + 14],
                                  17,
                                  -1502002290
                                )),
                                v,
                                p,
                                t[n + 15],
                                22,
                                1236535329
                              )),
                              (h = c(
                                h,
                                (v = c(
                                  v,
                                  (p = c(p, d, h, v, t[n + 1], 5, -165796510)),
                                  d,
                                  h,
                                  t[n + 6],
                                  9,
                                  -1069501632
                                )),
                                p,
                                d,
                                t[n + 11],
                                14,
                                643717713
                              )),
                              v,
                              p,
                              t[n],
                              20,
                              -373897302
                            )),
                            (h = c(
                              h,
                              (v = c(
                                v,
                                (p = c(p, d, h, v, t[n + 5], 5, -701558691)),
                                d,
                                h,
                                t[n + 10],
                                9,
                                38016083
                              )),
                              p,
                              d,
                              t[n + 15],
                              14,
                              -660478335
                            )),
                            v,
                            p,
                            t[n + 4],
                            20,
                            -405537848
                          )),
                          (h = c(
                            h,
                            (v = c(
                              v,
                              (p = c(p, d, h, v, t[n + 9], 5, 568446438)),
                              d,
                              h,
                              t[n + 14],
                              9,
                              -1019803690
                            )),
                            p,
                            d,
                            t[n + 3],
                            14,
                            -187363961
                          )),
                          v,
                          p,
                          t[n + 8],
                          20,
                          1163531501
                        )),
                        (h = c(
                          h,
                          (v = c(
                            v,
                            (p = c(p, d, h, v, t[n + 13], 5, -1444681467)),
                            d,
                            h,
                            t[n + 2],
                            9,
                            -51403784
                          )),
                          p,
                          d,
                          t[n + 7],
                          14,
                          1735328473
                        )),
                        v,
                        p,
                        t[n + 12],
                        20,
                        -1926607734
                      )),
                      (h = f(
                        h,
                        (v = f(
                          v,
                          (p = f(p, d, h, v, t[n + 5], 4, -378558)),
                          d,
                          h,
                          t[n + 8],
                          11,
                          -2022574463
                        )),
                        p,
                        d,
                        t[n + 11],
                        16,
                        1839030562
                      )),
                      v,
                      p,
                      t[n + 14],
                      23,
                      -35309556
                    )),
                    (h = f(
                      h,
                      (v = f(
                        v,
                        (p = f(p, d, h, v, t[n + 1], 4, -1530992060)),
                        d,
                        h,
                        t[n + 4],
                        11,
                        1272893353
                      )),
                      p,
                      d,
                      t[n + 7],
                      16,
                      -155497632
                    )),
                    v,
                    p,
                    t[n + 10],
                    23,
                    -1094730640
                  )),
                  (h = f(
                    h,
                    (v = f(
                      v,
                      (p = f(p, d, h, v, t[n + 13], 4, 681279174)),
                      d,
                      h,
                      t[n],
                      11,
                      -358537222
                    )),
                    p,
                    d,
                    t[n + 3],
                    16,
                    -722521979
                  )),
                  v,
                  p,
                  t[n + 6],
                  23,
                  76029189
                )),
                (h = f(
                  h,
                  (v = f(
                    v,
                    (p = f(p, d, h, v, t[n + 9], 4, -640364487)),
                    d,
                    h,
                    t[n + 12],
                    11,
                    -421815835
                  )),
                  p,
                  d,
                  t[n + 15],
                  16,
                  530742520
                )),
                v,
                p,
                t[n + 2],
                23,
                -995338651
              )),
              (h = l(
                h,
                (v = l(
                  v,
                  (p = l(p, d, h, v, t[n], 6, -198630844)),
                  d,
                  h,
                  t[n + 7],
                  10,
                  1126891415
                )),
                p,
                d,
                t[n + 14],
                15,
                -1416354905
              )),
              v,
              p,
              t[n + 5],
              21,
              -57434055
            )),
            (h = l(
              h,
              (v = l(
                v,
                (p = l(p, d, h, v, t[n + 12], 6, 1700485571)),
                d,
                h,
                t[n + 3],
                10,
                -1894986606
              )),
              p,
              d,
              t[n + 10],
              15,
              -1051523
            )),
            v,
            p,
            t[n + 1],
            21,
            -2054922799
          )),
          (h = l(
            h,
            (v = l(
              v,
              (p = l(p, d, h, v, t[n + 8], 6, 1873313359)),
              d,
              h,
              t[n + 15],
              10,
              -30611744
            )),
            p,
            d,
            t[n + 6],
            15,
            -1560198380
          )),
          v,
          p,
          t[n + 13],
          21,
          1309151649
        )),
        (h = l(
          h,
          (v = l(
            v,
            (p = l(p, d, h, v, t[n + 4], 6, -145523070)),
            d,
            h,
            t[n + 11],
            10,
            -1120210379
          )),
          p,
          d,
          t[n + 2],
          15,
          718787259
        )),
        v,
        p,
        t[n + 9],
        21,
        -343485551
      )),
      (p = i(p, r)),
      (d = i(d, o)),
      (h = i(h, a)),
      (v = i(v, s))
  return [p, d, h, v]
}
function d(t) {
  var e,
    n = '',
    r = 32 * t.length
  for (e = 0; e < r; e += 8)
    n += String.fromCharCode((t[e >> 5] >>> e % 32) & 255)
  return n
}
function i(t, e) {
  var n = (65535 & t) + (65535 & e)
  return (((t >> 16) + (e >> 16) + (n >> 16)) << 16) | (65535 & n)
}
function a(t, e) {
  return (t << e) | (t >>> (32 - e))
}
function s(t, e, n, r, o, s) {
  return i(a(i(i(e, t), i(r, s)), o), n)
}
function u(t, e, n, r, o, i, a) {
  return s((e & n) | (~e & r), t, e, o, i, a)
}
function c(t, e, n, r, o, i, a) {
  return s((e & r) | (n & ~r), t, e, o, i, a)
}
function f(t, e, n, r, o, i, a) {
  return s(e ^ n ^ r, t, e, o, i, a)
}
function l(t, e, n, r, o, i, a) {
  return s(n ^ (e | ~r), t, e, o, i, a)
}

module.exports = b
