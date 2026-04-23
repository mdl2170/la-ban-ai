// La Bàn AI — shared nav, footer, tweaks
(function () {
  const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "orange",
    "theme": "dark",
    "heroTitle": "La Bàn AI",
    "heroSub": "Ai đang thay đổi cách chúng ta học, làm việc và ra quyết định mỗi ngày. Giữa hàng trăm công cụ, đâu là lựa chọn phù hợp?",
    "fontPair": "space-grotesk-be-vietnam"
  }/*EDITMODE-END*/;

  const ACCENTS = {
    orange: { "--accent": "oklch(0.72 0.18 45)",  "--accent-2": "oklch(0.78 0.16 45)" },
    coral:  { "--accent": "oklch(0.72 0.17 25)",  "--accent-2": "oklch(0.78 0.15 25)" },
    lime:   { "--accent": "oklch(0.82 0.17 130)", "--accent-2": "oklch(0.86 0.15 130)" },
    violet: { "--accent": "oklch(0.68 0.17 300)", "--accent-2": "oklch(0.74 0.15 300)" },
    cyan:   { "--accent": "oklch(0.78 0.13 210)", "--accent-2": "oklch(0.82 0.11 210)" },
  };

  const FONT_PAIRS = {
    "space-grotesk-be-vietnam": {
      google: "Space+Grotesk:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@300;400;500;600;700",
      display: '"Space Grotesk", "Be Vietnam Pro", system-ui, sans-serif',
      body: '"Be Vietnam Pro", system-ui, sans-serif',
    },
    "bricolage-inter": {
      google: "Bricolage+Grotesque:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700",
      display: '"Bricolage Grotesque", system-ui, sans-serif',
      body: '"Inter", system-ui, sans-serif',
    },
    "fraunces-be-vietnam": {
      google: "Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Be+Vietnam+Pro:wght@300;400;500;600;700",
      display: '"Fraunces", serif',
      body: '"Be Vietnam Pro", system-ui, sans-serif',
    },
    "archivo-dm-sans": {
      google: "Archivo:wght@500;600;700;800&family=DM+Sans:wght@300;400;500;600",
      display: '"Archivo", system-ui, sans-serif',
      body: '"DM Sans", system-ui, sans-serif',
    },
  };

  function loadFonts(pair) {
    const f = FONT_PAIRS[pair] || FONT_PAIRS["space-grotesk-be-vietnam"];
    let link = document.getElementById("tweak-fonts");
    if (!link) {
      link = document.createElement("link");
      link.id = "tweak-fonts";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${f.google}&family=JetBrains+Mono:wght@400;500&display=swap`;
    document.documentElement.style.setProperty("--font-display", f.display);
    document.documentElement.style.setProperty("--font-body", f.body);
  }

  function applyAccent(name) {
    const a = ACCENTS[name] || ACCENTS.orange;
    Object.entries(a).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  const state = Object.assign({}, TWEAKS_DEFAULTS);

  function applyAll() {
    applyAccent(state.accent);
    applyTheme(state.theme);
    loadFonts(state.fontPair);
    // hero copy
    const ht = document.querySelector("[data-tweak='heroTitle']");
    const hs = document.querySelector("[data-tweak='heroSub']");
    if (ht) ht.textContent = state.heroTitle;
    if (hs) hs.textContent = state.heroSub;
  }

  function persist(key, val) {
    state[key] = val;
    applyAll();
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*");
    } catch (_) {}
  }

  // Public: init nav + footer
  window.LaBanAI = {
    init(activePage) {
      injectNav(activePage);
      injectFooter();
      applyAll();
      wireTweaks();
    }
  };

  function injectNav(activePage) {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    const links = [
      ["Trang chủ", "index.html", "home"],
      ["Giáo viên", "giao-vien.html", "teacher"],
      ["Phụ huynh", "phu-huynh.html", "parent"],
      ["Học sinh", "hoc-sinh.html", "student"],
    ];
    nav.innerHTML = `
      <div class="container nav-row">
        <a class="brand" href="index.html">
          <span class="logo-mark"><svg viewBox="0 0 48 48" fill="none" width="34" height="34"><circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><path d="M24 6 L28 24 L24 42 L20 24 Z" fill="var(--accent)"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/></svg></span>
          <span class="brand-text">
            <small>InnovatEd × AI</small>
            <span>La Bàn AI</span>
          </span>
        </a>
        <nav class="nav-links">
          ${links.map(([label, href, id]) => `<a href="${href}" class="${id === activePage ? 'active' : ''}">${label}</a>`).join("")}
        </nav>
      </div>`;
  }

  function injectFooter() {
    const f = document.querySelector("[data-footer]");
    if (!f) return;
    f.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand" style="margin-bottom:16px">
              <span class="logo-mark"><svg viewBox="0 0 48 48" fill="none" width="28" height="28"><circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><path d="M24 6 L28 24 L24 42 L20 24 Z" fill="var(--accent)"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/></svg></span>
              <span class="brand-text"><small>InnovatEd × AI</small><span>La Bàn AI</span></span>
            </div>
            <p style="color:var(--ink-dim);max-width:380px;font-size:14.5px;">
              Dự án của <a href="https://innovatedspace.org/" target="_blank" style="color:var(--accent);border-bottom:1px solid currentColor">InnovatEd Space</a> — giúp người Việt định hướng trong kỷ nguyên AI, với góc nhìn trung lập và dễ tiếp cận.
            </p>
          </div>
          <div>
            <h4>Khám phá</h4>
            <ul>
              <li><a href="giao-vien.html">Dành cho giáo viên</a></li>
              <li><a href="phu-huynh.html">Dành cho phụ huynh</a></li>
              <li><a href="hoc-sinh.html">Dành cho học sinh</a></li>
              <li><a href="chatgpt.html">Chi tiết công cụ</a></li>
            </ul>
          </div>
          <div>
            <h4>Liên hệ</h4>
            <ul>
              <li><a href="https://innovatedspace.org/" target="_blank">innovatedspace.org ↗</a></li>
              <li><a href="mailto:contact@innovatedspace.org">contact@innovatedspace.org</a></li>
              <li style="color:var(--ink-mute);font-size:13.5px">Workshops · Webinars · Tài liệu mở</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 InnovatEd Space. La Bàn AI là dự án giáo dục phi lợi nhuận.</span>
          <span style="font-family:var(--font-mono)">v1.0 · Cập nhật 04/2026</span>
        </div>
      </div>`;
  }

  function wireTweaks() {
    // Edit-mode protocol
    window.addEventListener("message", (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") openTweaks(true);
      if (e.data.type === "__deactivate_edit_mode") openTweaks(false);
    });
    // Build panel
    const panel = document.createElement("div");
    panel.className = "tweaks";
    panel.id = "tweaks-panel";
    panel.innerHTML = `
      <h4>Tweaks</h4>
      <div class="tweak-row">
        <label>Accent</label>
        <div class="swatches" data-tweak-accent>
          ${Object.keys(ACCENTS).map(k => `<div class="swatch ${k === state.accent ? 'active' : ''}" data-name="${k}" style="background:${ACCENTS[k]['--accent']}"></div>`).join("")}
        </div>
      </div>
      <div class="tweak-row">
        <label>Theme</label>
        <select data-tweak-theme>
          <option value="dark" ${state.theme==='dark'?'selected':''}>Dark</option>
          <option value="light" ${state.theme==='light'?'selected':''}>Light</option>
        </select>
      </div>
      <div class="tweak-row">
        <label>Font pair</label>
        <select data-tweak-font>
          <option value="space-grotesk-be-vietnam">Space Grotesk + Be Vietnam</option>
          <option value="bricolage-inter">Bricolage + Inter</option>
          <option value="fraunces-be-vietnam">Fraunces + Be Vietnam</option>
          <option value="archivo-dm-sans">Archivo + DM Sans</option>
        </select>
      </div>
      <div class="tweak-row" style="flex-direction:column;align-items:stretch;gap:6px">
        <label>Hero title</label>
        <input type="text" data-tweak-hero-title value="${state.heroTitle}" style="max-width:100%">
      </div>
      <div class="tweak-row" style="flex-direction:column;align-items:stretch;gap:6px">
        <label>Hero subtitle</label>
        <input type="text" data-tweak-hero-sub value="${state.heroSub}" style="max-width:100%">
      </div>`;
    document.body.appendChild(panel);

    // font select default
    const fs = panel.querySelector("[data-tweak-font]");
    if (fs) fs.value = state.fontPair;

    panel.querySelector("[data-tweak-accent]").addEventListener("click", (e) => {
      const el = e.target.closest(".swatch");
      if (!el) return;
      panel.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
      el.classList.add("active");
      persist("accent", el.dataset.name);
    });
    panel.querySelector("[data-tweak-theme]").addEventListener("change", (e) => persist("theme", e.target.value));
    panel.querySelector("[data-tweak-font]").addEventListener("change", (e) => persist("fontPair", e.target.value));
    panel.querySelector("[data-tweak-hero-title]").addEventListener("input", (e) => persist("heroTitle", e.target.value));
    panel.querySelector("[data-tweak-hero-sub]").addEventListener("input", (e) => persist("heroSub", e.target.value));

    try {
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    } catch (_) {}
  }

  function openTweaks(open) {
    const panel = document.getElementById("tweaks-panel");
    if (panel) panel.classList.toggle("open", open);
  }
})();
