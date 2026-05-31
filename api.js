// LENZ NONTON - INTEGRATED API LAYER
const API_BASE = "https://scripapi.web.id/gateway.php/anime";
const JIKAN_BASE = "https://api.jikan.moe/v4";

// Header agar request dianggap berasal dari web yang diizinkan
const fetchOptions = {
  headers: {
    "Referer": "https://scripapi.web.id/",
    "Origin": "https://scripapi.web.id/"
  }
};

const _json = (r) => {
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json();
};

/* ============== ScripAPI (Main API) ============== */
const API = {
  home: () => fetch(`${API_BASE}/home`, fetchOptions).then(_json),
  search: (q) => fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`, fetchOptions).then(_json),
  detail: (slug) => fetch(`${API_BASE}/detail?slug=${encodeURIComponent(slug)}`, fetchOptions).then(_json),
  watch: (id) => fetch(`${API_BASE}/watch?id=${encodeURIComponent(id)}`, fetchOptions).then(_json),
  batch: (slug) => fetch(`${API_BASE}/batch?slug=${encodeURIComponent(slug)}`, fetchOptions).then(_json),
};

/* ============== Jikan (Metadata) ============== */
const Jikan = {
  searchByTitle: (title) => fetch(`${JIKAN_BASE}/anime?q=${encodeURIComponent(title)}&limit=1`).then(_json),
};

/* ============== Helpers ============== */
const Util = {
  qs: (k) => new URLSearchParams(location.search).get(k),
  pickImage: (obj) =>
    obj?.image || obj?.thumbnail || obj?.poster || obj?.cover ||
    obj?.images?.jpg?.large_image_url || obj?.images?.jpg?.image_url ||
    "https://via.placeholder.com/300x420/111/fff?text=No+Image",
  pickTitle: (o) => o?.title || o?.name || o?.judul || "Tanpa Judul",
  pickSlug: (o) => o?.slug || o?.endpoint || o?.id || "",
  errorBox: (msg) => `<div style="padding:40px; text-align:center; color:#ff4757;">⚠️ ${msg}</div>`
};

window.API = API;
window.Jikan = Jikan;
window.Util = Util;
