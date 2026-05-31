// LENZ NONTON - API Layer
// Sumber utama streaming: ScripAPI
// Sumber metadata tambahan: Jikan API

const API_BASE = "https://scripapi.web.id/gateway.php/anime";
const JIKAN = "https://api.jikan.moe/v4";

const _json = (r) => {
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json();
};

/* ============== ScripAPI ============== */
const API = {
  home: () => fetch(`${API_BASE}/home`).then(_json),

  search: (query) =>
    fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`).then(_json),

  detail: (slug) =>
    fetch(`${API_BASE}/detail?slug=${encodeURIComponent(slug)}`).then(_json),

  watch: (id) =>
    fetch(`${API_BASE}/watch?id=${encodeURIComponent(id)}`).then(_json),

  batch: (slug) =>
    fetch(`${API_BASE}/batch?slug=${encodeURIComponent(slug)}`).then(_json),
};

/* ============== Jikan (metadata pelengkap) ============== */
const Jikan = {
  top: (page = 1) => fetch(`${JIKAN}/top/anime?page=${page}`).then(_json),
  genres: () => fetch(`${JIKAN}/genres/anime`).then(_json),
  schedules: (day) =>
    fetch(`${JIKAN}/schedules${day ? `?filter=${day}` : ""}`).then(_json),
  seasonNow: () => fetch(`${JIKAN}/seasons/now`).then(_json),
  recommendations: () => fetch(`${JIKAN}/recommendations/anime`).then(_json),
  full: (id) => fetch(`${JIKAN}/anime/${id}/full`).then(_json),
  characters: (id) => fetch(`${JIKAN}/anime/${id}/characters`).then(_json),
  reviews: (id) => fetch(`${JIKAN}/anime/${id}/reviews`).then(_json),
  searchByTitle: (title) =>
    fetch(`${JIKAN}/anime?q=${encodeURIComponent(title)}&limit=1`).then(_json),
};

/* ============== Helpers ============== */
const Util = {
  qs: (k) => new URLSearchParams(location.search).get(k),
  pickImage: (obj) =>
    obj?.image ||
    obj?.thumbnail ||
    obj?.poster ||
    obj?.cover ||
    obj?.images?.jpg?.large_image_url ||
    obj?.images?.jpg?.image_url ||
    "https://via.placeholder.com/300x420/111/fff?text=No+Image",
  pickTitle: (o) => o?.title || o?.name || o?.judul || "Tanpa Judul",
  pickSlug: (o) => o?.slug || o?.endpoint || o?.id || "",
  skeleton: (n = 12) =>
    Array.from({ length: n })
      .map(() => `<div class="card skeleton"><div class="thumb"></div><div class="bar"></div><div class="bar short"></div></div>`)
      .join(""),
  errorBox: (msg) =>
    `<div class="error">⚠️ ${msg}. Coba refresh halaman.</div>`,
};

window.API = API;
window.Jikan = Jikan;
window.Util = Util;
