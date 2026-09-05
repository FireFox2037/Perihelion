/* =========================================================
   Rendering — turns content.js data into DOM
========================================================= */

function renderResearch() {
  const list = document.getElementById("research-list");
  list.innerHTML = RESEARCH.map(item => `
    <li class="research-item">
      <div class="research-status">${item.status}</div>
      <div>
        <h3 class="research-title">${item.title}</h3>
        <p class="research-desc">${item.description}</p>
      </div>
    </li>
  `).join("");
}

let activeFilter = "All";

function renderArticleFilters() {
  const tags = ["All", ...new Set(ARTICLES.map(a => a.tag))];
  const wrap = document.getElementById("article-filters");
  wrap.innerHTML = tags.map(tag => `
    <button class="filter-chip${tag === activeFilter ? " active" : ""}" data-tag="${tag}">${tag}</button>
  `).join("");

  wrap.querySelectorAll(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.tag;
      renderArticleFilters();
      renderArticles();
    });
  });
}

function renderArticles() {
  const list = document.getElementById("article-list");
  const items = activeFilter === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.tag === activeFilter);

  list.innerHTML = items.map(a => `
    <li class="article-item">
      <div class="article-main">
        <a href="${a.link}">
          <span class="article-tag">${a.tag}</span>
          <h3 class="article-title">${a.title}</h3>
          <p class="article-excerpt">${a.excerpt}</p>
        </a>
      </div>
      <div class="article-meta">${a.date}<br>${a.readTime}</div>
    </li>
  `).join("");
}

function renderAbout() {
  const wrap = document.getElementById("about-body");
  const paras = ABOUT.bio.map(p => `<p>${p}</p>`).join("");
  const facts = `
    <dl class="about-facts">
      ${ABOUT.facts.map(f => `
        <div class="about-fact">
          <dt>${f.label}</dt>
          <dd>${f.value}</dd>
        </div>
      `).join("")}
    </dl>
  `;
  wrap.innerHTML = paras + facts;
}

function renderContact() {
  const list = document.getElementById("contact-list");
  list.innerHTML = CONTACT.map(c => `
    <li><a href="${c.url}">${c.label} <span>${c.value}</span></a></li>
  `).join("");
}

function renderWordmark() {
  document.querySelectorAll(".editable[data-hint='Your name']").forEach(el => {
    el.textContent = SITE.name;
  });
}

/* =========================================================
   Navigation — SPA-style page switching with a fade/slide
   transition. Real anchors (#research etc) still work for
   direct links and the back button.
========================================================= */

const pages = Array.from(document.querySelectorAll(".page"));
const navLinks = Array.from(document.querySelectorAll("[data-link]"));

function showPage(name, { skipAnim = false } = {}) {
  const target = document.getElementById(`page-${name}`);
  if (!target) return;

  const current = pages.find(p => p.classList.contains("is-active"));

  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.page === name);
  });

  if (!current || current === target) {
    pages.forEach(p => p.classList.remove("is-active", "is-leaving"));
    target.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: skipAnim ? "auto" : "instant" });
    return;
  }

  if (skipAnim) {
    pages.forEach(p => p.classList.remove("is-active", "is-leaving"));
    target.classList.add("is-active");
    window.scrollTo(0, 0);
    return;
  }

  current.classList.add("is-leaving");
  current.classList.remove("is-active");

  const cleanup = () => {
    current.classList.remove("is-leaving");
    current.removeEventListener("animationend", cleanup);
  };
  current.addEventListener("animationend", cleanup);

  window.scrollTo({ top: 0, behavior: "auto" });
  target.classList.add("is-active");
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const name = link.dataset.page;
    if (location.hash !== `#${name}`) {
      history.pushState(null, "", `#${name}`);
    }
    showPage(name);
  });
});

window.addEventListener("popstate", () => {
  const name = (location.hash || "#home").slice(1);
  showPage(name);
});

function initialPage() {
  const name = (location.hash || "#home").slice(1);
  const valid = pages.some(p => p.dataset.page === name);
  showPage(valid ? name : "home", { skipAnim: true });
}

/* =========================================================
   Background — a quiet starfield with one slow orbit.
   This is the single deliberate motion moment on the page;
   everything else only moves in response to a click.
========================================================= */

function initSky() {
  const canvas = document.getElementById("sky");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, dpr;
  let stars = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.2,
      base: Math.random() * 0.5 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.15
    }));
  }

  const orbit = {
    cx: () => w * 0.82,
    cy: () => h * 0.28,
    a: () => Math.min(w, h) * 0.16,
    b: () => Math.min(w, h) * 0.07,
    angle: 0
  };

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    stars.forEach(s => {
      const twinkle = reduceMotion ? s.base : s.base + Math.sin(t * 0.001 * s.speed + s.phase) * 0.2;
      ctx.beginPath();
      ctx.fillStyle = `rgba(233, 231, 222, ${Math.max(0, twinkle)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // sun
    const cx = orbit.cx(), cy = orbit.cy();
    ctx.beginPath();
    ctx.fillStyle = "rgba(227, 178, 60, 0.9)";
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "rgba(227, 178, 60, 0.12)";
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();

    // orbit path
    ctx.beginPath();
    ctx.strokeStyle = "rgba(79, 184, 174, 0.18)";
    ctx.lineWidth = 1;
    ctx.ellipse(cx, cy, orbit.a(), orbit.b(), 0, 0, Math.PI * 2);
    ctx.stroke();

    // orbiting body
    if (!reduceMotion) orbit.angle += 0.0016;
    const px = cx + Math.cos(orbit.angle) * orbit.a();
    const py = cy + Math.sin(orbit.angle) * orbit.b();
    ctx.beginPath();
    ctx.fillStyle = "rgba(79, 184, 174, 0.95)";
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
}

/* =========================================================
   Boot
========================================================= */

renderWordmark();
renderResearch();
renderArticleFilters();
renderArticles();
renderAbout();
renderContact();
initialPage();
initSky();
