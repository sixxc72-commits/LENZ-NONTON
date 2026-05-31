// LENZ NONTON - Shared UI helpers

function renderNav(active = "home") {
  const links = [
    ["home", "Beranda", "index.html"],
    ["jadwal", "Jadwal", "jadwal.html"],
    ["top", "Top Anime", "top.html"],
    ["genre", "Genre", "genre.html"],
    ["season", "Musim Ini", "season.html"],
  ];
  return `
  <nav class="nav">
    <div class="nav-inner">
      <a href="index.html" class="brand">⚡ LENZ NONTON</a>
      <button class="menu-btn" onclick="document.getElementById('navlinks').classList.toggle('show')">☰</button>
      <ul id="navlinks">
        ${links.map(([k, t, h]) => `<li><a href="${h}" class="${k === active ? "active" : ""}">${t}</a></li>`).join("")}
      </ul>
      <form class="search-box" onsubmit="event.preventDefault();const q=this.q.value.trim();if(q)location.href='search.html?q='+encodeURIComponent(q)">
        <input name="q" placeholder="Cari anime..." />
        <button type="submit">🔍</button>
      </form>
    </div>
  </nav>`;
}

function renderFooter() {
  return `<footer>© ${new Date().getFullYear()} <b>LENZ NONTON</b> · Powered by ScripAPI + Jikan</footer>`;
}

function animeCard(item) {
  const slug = Util.pickSlug(item);
  const img = Util.pickImage(item);
  const title = Util.pickTitle(item);
  const ep = item.episode || item.current_episode || item.latest_episode;
  const type = item.type || item.status || "";
  return `
  <a class="card" href="detail.html?slug=${encodeURIComponent(slug)}">
    <div class="thumb">
      <img src="${img}" alt="${title}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x420/111/fff?text=No+Image'">
      ${ep ? `<span class="ep">Eps ${ep}</span>` : ""}
      ${type ? `<span class="badge">${type}</span>` : ""}
    </div>
    <div class="meta">
      <div class="title">${title}</div>
      ${item.rating || item.score ? `<div class="sub">⭐ ${item.rating || item.score}</div>` : ""}
    </div>
  </a>`;
}

function jikanCard(item) {
  const title = item.title || item.title_english || "—";
  const img = item.images?.jpg?.large_image_url || item.images?.jpg?.image_url;
  return `
  <a class="card" href="search.html?q=${encodeURIComponent(title)}">
    <div class="thumb">
      <img src="${img}" alt="${title}" loading="lazy">
      ${item.score ? `<span class="badge">⭐ ${item.score}</span>` : ""}
      ${item.episodes ? `<span class="ep">${item.episodes} eps</span>` : ""}
    </div>
    <div class="meta">
      <div class="title">${title}</div>
      <div class="sub">${item.type || ""} ${item.year ? "· " + item.year : ""}</div>
    </div>
  </a>`;
}

function mountShell(active) {
  document.body.insertAdjacentHTML("afterbegin", renderNav(active));
  document.body.insertAdjacentHTML("beforeend", renderFooter());
}

// Extract list from various possible ScripAPI shapes
function extractList(data) {
  if (Array.isArray(data)) return data;
  if (!data) return [];
  return (
    data.data ||
    data.result ||
    data.results ||
    data.anime ||
    data.list ||
    data.ongoing ||
    data.completed ||
    []
  );
}

window.mountShell = mountShell;
window.animeCard = animeCard;
window.jikanCard = jikanCard;
window.extractList = extractList;
