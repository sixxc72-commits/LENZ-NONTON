// LENZ NONTON - NEW API ENGINE ONLY (100% BASEKU API)
const BASE_URL = "https://api.baseku.my.id/api/tensei";
const JIKAN_BASE = "https://api.jikan.moe/v4";

// Proxy tangguh untuk menghindari CORS / Blokir IP di sisi client (Vercel)
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

const _json = async (r) => {
  if (!r.ok) throw new Error("HTTP " + r.status);
  return await r.json();
};

/* ============== API Utama (Full Baseku) ============== */
const API = {
  // Jalur Home
  home: () => fetch(`${CORS_PROXY}${encodeURIComponent(`${BASE_URL}/home`)}`).then(_json),
  
  // Jalur Pencarian (Search)
  search: (q) => fetch(`${CORS_PROXY}${encodeURIComponent(`${BASE_URL}/search?q=${encodeURIComponent(q)}`)}`).then(_json),
  
  // Jalur Detail Anime
  detail: (slug) => fetch(`${CORS_PROXY}${encodeURIComponent(`${BASE_URL}/series/${slug}`)}`).then(_json),
  
  // Jalur List / Batch Anime
  batch: (slug) => fetch(`${CORS_PROXY}${encodeURIComponent(`${BASE_URL}/series-list/${slug}`)}`).then(_json),
  
  // Jalur Streaming Video (Content)
  watch: (slug) => fetch(`${CORS_PROXY}${encodeURIComponent(`${BASE_URL}/content/${slug}`)}`).then(_json)
};

/* ============== Metadata Jikan ============== */
const Jikan = {
  searchByTitle: (title) => fetch(`${JIKAN_BASE}/anime?q=${encodeURIComponent(title)}&limit=1`).then(_json),
  top: (page = 1) => fetch(`${JIKAN_BASE}/top/anime?page=${page}`).then(_json),
  genres: () => fetch(`${JIKAN_BASE}/genres/anime`).then(_json),
  schedules: (day) => fetch(`${JIKAN_BASE}/schedules${day ? `?filter=${day}` : ""}`).then(_json),
  seasonNow: () => fetch(`${JIKAN_BASE}/seasons/now`).then(_json),
  recommendations: () => fetch(`${JIKAN_BASE}/recommendations/anime`).then(_json),
  full: (id) => fetch(`${JIKAN_BASE}/anime/${id}/full`).then(_json),
  characters: (id) => fetch(`${JIKAN_BASE}/anime/${id}/characters`).then(_json),
  reviews: (id) => fetch(`${JIKAN_BASE}/anime/${id}/reviews`).then(_json),
};

/* ============== Helper ============== */
const Util = {
  qs: (k) => new URLSearchParams(location.search).get(k),
  pickImage: (obj) =>
    obj?.image || obj?.thumbnail || obj?.poster || obj?.cover ||
    obj?.images?.jpg?.large_image_url || obj?.images?.jpg?.image_url ||
    "https://via.placeholder.com/300x420/111/fff?text=No+Image",
  pickTitle: (o) => o?.title || o?.name || o?.judul || "Tanpa Judul",
  pickSlug: (o) => o?.slug || o?.endpoint || o?.id || "",
  skeleton: (n = 12) =>
    Array.from({ length: n })
      .map(() => `<div class="card skeleton"><div class="thumb"></div><div class="bar"></div><div class="bar short"></div></div>`)
      .join(""),
  errorBox: (msg) => `<div style="padding:40px; text-align:center; color:#ff4757;">⚠️ ${msg}.</div>`
};

window.API = API;
window.Jikan = Jikan;
window.Util = Util;
