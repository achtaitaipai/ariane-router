const W = /* @__PURE__ */ new Map(), I = async (e) => {
  try {
    const t = W.get(e);
    if (t)
      return await t;
    const n = le(e);
    return W.set(e, n), await n;
  } catch (t) {
    throw t instanceof TypeError ? new TypeError(
      `Network error fetching HTML from ${e}: ${t.message}`
    ) : t;
  }
}, le = async (e) => {
  try {
    const t = await fetch(e);
    if (t.status !== 200)
      throw new Error(
        `Error fetching HTML from ${e}: status code ${t.status}`
      );
    return await t.text();
  } catch (t) {
    throw t;
  }
}, ee = /* @__PURE__ */ new Map(), ue = (e) => {
  for (const t in e)
    ee.set(t, e[t]);
}, G = (e) => {
  const t = ee.get(e);
  if (t === void 0)
    throw new Error(`the action : ${e} does not exists`);
  return t();
}, oe = (e) => {
  if (de(e))
    return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}, de = (e) => typeof e == "object" && e !== null && "message" in e && typeof e.message == "string";
var q = 11;
function ve(e, t) {
  var n = t.attributes, r, a, l, u, m;
  if (!(t.nodeType === q || e.nodeType === q)) {
    for (var y = n.length - 1; y >= 0; y--)
      r = n[y], a = r.name, l = r.namespaceURI, u = r.value, l ? (a = r.localName || a, m = e.getAttributeNS(l, a), m !== u && (r.prefix === "xmlns" && (a = r.name), e.setAttributeNS(l, a, u))) : (m = e.getAttribute(a), m !== u && e.setAttribute(a, u));
    for (var N = e.attributes, b = N.length - 1; b >= 0; b--)
      r = N[b], a = r.name, l = r.namespaceURI, l ? (a = r.localName || a, t.hasAttributeNS(l, a) || e.removeAttributeNS(l, a)) : t.hasAttribute(a) || e.removeAttribute(a);
  }
}
var C, he = "http://www.w3.org/1999/xhtml", d = typeof document > "u" ? void 0 : document, pe = !!d && "content" in d.createElement("template"), ge = !!d && d.createRange && "createContextualFragment" in d.createRange();
function Ae(e) {
  var t = d.createElement("template");
  return t.innerHTML = e, t.content.childNodes[0];
}
function me(e) {
  C || (C = d.createRange(), C.selectNode(d.body));
  var t = C.createContextualFragment(e);
  return t.childNodes[0];
}
function Te(e) {
  var t = d.createElement("body");
  return t.innerHTML = e, t.childNodes[0];
}
function we(e) {
  return e = e.trim(), pe ? Ae(e) : ge ? me(e) : Te(e);
}
function R(e, t) {
  var n = e.nodeName, r = t.nodeName, a, l;
  return n === r ? !0 : (a = n.charCodeAt(0), l = r.charCodeAt(0), a <= 90 && l >= 97 ? n === r.toUpperCase() : l <= 90 && a >= 97 ? r === n.toUpperCase() : !1);
}
function ye(e, t) {
  return !t || t === he ? d.createElement(e) : d.createElementNS(t, e);
}
function be(e, t) {
  for (var n = e.firstChild; n; ) {
    var r = n.nextSibling;
    t.appendChild(n), n = r;
  }
  return t;
}
function F(e, t, n) {
  e[n] !== t[n] && (e[n] = t[n], e[n] ? e.setAttribute(n, "") : e.removeAttribute(n));
}
var j = {
  OPTION: function(e, t) {
    var n = e.parentNode;
    if (n) {
      var r = n.nodeName.toUpperCase();
      r === "OPTGROUP" && (n = n.parentNode, r = n && n.nodeName.toUpperCase()), r === "SELECT" && !n.hasAttribute("multiple") && (e.hasAttribute("selected") && !t.selected && (e.setAttribute("selected", "selected"), e.removeAttribute("selected")), n.selectedIndex = -1);
    }
    F(e, t, "selected");
  },
  INPUT: function(e, t) {
    F(e, t, "checked"), F(e, t, "disabled"), e.value !== t.value && (e.value = t.value), t.hasAttribute("value") || e.removeAttribute("value");
  },
  TEXTAREA: function(e, t) {
    var n = t.value;
    e.value !== n && (e.value = n);
    var r = e.firstChild;
    if (r) {
      var a = r.nodeValue;
      if (a == n || !n && a == e.placeholder)
        return;
      r.nodeValue = n;
    }
  },
  SELECT: function(e, t) {
    if (!t.hasAttribute("multiple")) {
      for (var n = -1, r = 0, a = e.firstChild, l, u; a; )
        if (u = a.nodeName && a.nodeName.toUpperCase(), u === "OPTGROUP")
          l = a, a = l.firstChild;
        else {
          if (u === "OPTION") {
            if (a.hasAttribute("selected")) {
              n = r;
              break;
            }
            r++;
          }
          a = a.nextSibling, !a && l && (a = l.nextSibling, l = null);
        }
      e.selectedIndex = n;
    }
  }
}, S = 1, Se = 11, J = 3, Y = 8;
function A() {
}
function Ne(e) {
  if (e)
    return e.getAttribute && e.getAttribute("id") || e.id;
}
function Oe(e) {
  return function(n, r, a) {
    if (a || (a = {}), typeof r == "string")
      if (n.nodeName === "#document" || n.nodeName === "HTML" || n.nodeName === "BODY") {
        var l = r;
        r = d.createElement("html"), r.innerHTML = l;
      } else
        r = we(r);
    var u = a.getNodeKey || Ne, m = a.onBeforeNodeAdded || A, y = a.onNodeAdded || A, N = a.onBeforeElUpdated || A, b = a.onElUpdated || A, ae = a.onBeforeNodeDiscarded || A, O = a.onNodeDiscarded || A, ie = a.onBeforeElChildrenUpdated || A, H = a.childrenOnly === !0, T = /* @__PURE__ */ Object.create(null), x = [];
    function M(c) {
      x.push(c);
    }
    function $(c, s) {
      if (c.nodeType === S)
        for (var i = c.firstChild; i; ) {
          var f = void 0;
          s && (f = u(i)) ? M(f) : (O(i), i.firstChild && $(i, s)), i = i.nextSibling;
        }
    }
    function L(c, s, i) {
      ae(c) !== !1 && (s && s.removeChild(c), O(c), $(c, i));
    }
    function X(c) {
      if (c.nodeType === S || c.nodeType === Se)
        for (var s = c.firstChild; s; ) {
          var i = u(s);
          i && (T[i] = s), X(s), s = s.nextSibling;
        }
    }
    X(n);
    function V(c) {
      y(c);
      for (var s = c.firstChild; s; ) {
        var i = s.nextSibling, f = u(s);
        if (f) {
          var v = T[f];
          v && R(s, v) ? (s.parentNode.replaceChild(v, s), U(v, s)) : V(s);
        } else
          V(s);
        s = i;
      }
    }
    function se(c, s, i) {
      for (; s; ) {
        var f = s.nextSibling;
        (i = u(s)) ? M(i) : L(s, c, !0), s = f;
      }
    }
    function U(c, s, i) {
      var f = u(s);
      f && delete T[f], !(!i && (N(c, s) === !1 || (e(c, s), b(c), ie(c, s) === !1))) && (c.nodeName !== "TEXTAREA" ? ce(c, s) : j.TEXTAREA(c, s));
    }
    function ce(c, s) {
      var i = s.firstChild, f = c.firstChild, v, h, w, D, p;
      e:
        for (; i; ) {
          for (D = i.nextSibling, v = u(i); f; ) {
            if (w = f.nextSibling, i.isSameNode && i.isSameNode(f)) {
              i = D, f = w;
              continue e;
            }
            h = u(f);
            var E = f.nodeType, g = void 0;
            if (E === i.nodeType && (E === S ? (v ? v !== h && ((p = T[v]) ? w === p ? g = !1 : (c.insertBefore(p, f), h ? M(h) : L(f, c, !0), f = p) : g = !1) : h && (g = !1), g = g !== !1 && R(f, i), g && U(f, i)) : (E === J || E == Y) && (g = !0, f.nodeValue !== i.nodeValue && (f.nodeValue = i.nodeValue))), g) {
              i = D, f = w;
              continue e;
            }
            h ? M(h) : L(f, c, !0), f = w;
          }
          if (v && (p = T[v]) && R(p, i))
            c.appendChild(p), U(p, i);
          else {
            var B = m(i);
            B !== !1 && (B && (i = B), i.actualize && (i = i.actualize(c.ownerDocument || d)), c.appendChild(i), V(i));
          }
          i = D, f = w;
        }
      se(c, f, h);
      var K = j[c.nodeName];
      K && K(c, s);
    }
    var o = n, P = o.nodeType, z = r.nodeType;
    if (!H) {
      if (P === S)
        z === S ? R(n, r) || (O(n), o = be(n, ye(r.nodeName, r.namespaceURI))) : o = r;
      else if (P === J || P === Y) {
        if (z === P)
          return o.nodeValue !== r.nodeValue && (o.nodeValue = r.nodeValue), o;
        o = r;
      }
    }
    if (o === r)
      O(n);
    else {
      if (r.isSameNode && r.isSameNode(o))
        return;
      if (U(o, r, H), x)
        for (var _ = 0, fe = x.length; _ < fe; _++) {
          var k = T[x[_]];
          k && L(k, k.parentNode, !1);
        }
    }
    return !H && o !== n && n.parentNode && (o.actualize && (o = o.actualize(n.ownerDocument || d)), n.parentNode.replaceChild(o, n)), o;
  };
}
var xe = Oe(ve);
const Me = async (e) => {
  const n = new DOMParser().parseFromString(e, "text/html");
  document.title = n.title, xe(document.body, n.body);
}, Le = async (e, t) => {
  if (t) {
    const [n] = await Promise.all([
      I(e),
      G(t)
    ]);
    return n;
  }
  return I(e);
}, Ue = async (e, t) => {
  const { before: n, between: r, after: a } = t ?? {};
  try {
    const l = await Le(e, n);
    r && G(r), Me(l), history.pushState({}, document.title, e), scrollTo(0, 0), a && G(a), ne();
  } catch (l) {
    const { message: u } = oe(l);
    console.error(u), window.location.href = e;
  }
}, Pe = ["before", "between", "after"];
let te = {};
const De = (e) => {
  te = e;
}, Ee = (e) => ({
  ...te,
  ...Ce(e)
}), Ce = (e) => Pe.reduce((t, n) => {
  const r = e.getAttribute("ariane-" + n);
  return r == null ? t : { ...t, [n]: r };
}, {}), ne = () => {
  Re().forEach((t) => {
    t.removeEventListener("mouseenter", Z), t.addEventListener("mouseenter", Z), t.removeEventListener("click", Q), t.addEventListener("click", Q);
  });
}, Q = async (e) => {
  const t = re(e);
  t && (e.preventDefault(), Ue(t.href, Ee(t)));
}, Z = (e) => {
  const t = re(e);
  t && I(t.href);
}, Re = () => Array.from(document.querySelectorAll("a")).filter(
  (e) => Array.from(e.attributes).some(({ name: t }) => t.startsWith("ariane-"))
), re = (e) => {
  const t = e.target;
  if (!t)
    return;
  const n = t.closest("a");
  if (n)
    return n;
}, He = ({
  selector: e,
  anim: t
}) => {
  const n = document.querySelector(e);
  return new Promise((r, a) => {
    if (!n) {
      a(new Error("No Element for " + e));
      return;
    }
    if (!(n != null && n.animate)) {
      a("Element.animate is not supported in this environment");
      return;
    }
    (n == null ? void 0 : n.animate(...t)).addEventListener("finish", (u) => {
      r(u);
    });
  });
}, Ve = (e, ...t) => () => He({ selector: e, anim: t }), _e = {
  start: ne,
  defineConfig: De,
  addActions: ue,
  makeAnim: Ve
};
export {
  _e as default
};
