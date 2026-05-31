// LENZ NONTON - LATEST API LAYER ONLY
const JIKAN_BASE = "https://api.jikan.moe/v4";
const STREAM_API = "https://api.baseku.my.id/api/tensei/content";

// Proxy tangguh untuk menembus proteksi Cloudflare/CORS server target
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

const _json = async (r) => {
  if (!r.ok) throw new Error("HTTP " + r.status);
  return await r.json();
};

/* ============== API Utama (Sumber Terbaru) ============== */
const API = {
  // Hanya menggunakan API baru menggunakan parameter slug
  watch: (slug) => {
    const targetUrl = `${STREAM_API}/${slug}`;
    return fetch(`${CORS_PROXY}${encodeURIComponent(targetUrl)}`).then(_json);
  },
};

/* ============== Metadata Jikan (Pelengkap) ============== */
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
