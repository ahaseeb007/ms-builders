const BUSINESS_EMAIL = "ms-builders@hotmail.com";
// TODO: replace with your own Trustpilot business page once it is set up
const TRUSTPILOT_URL = "https://uk.trustpilot.com/review/ms-builders";

const IMG = "https://media.base44.com/images/public/6a9a84ec029d33ee2e61888c/";

const SERVICES = [
  ["Kitchen Fitter", "Full kitchen installation — cabinetry, worktops, sinks and fit-out."],
  ["Bathroom Remodeling", "Wet rooms, suites, tiling and sanitaryware fitted to spec."],
  ["Painting & Decorating", "Interior and exterior finishes with crisp, clean lines."],
  ["Flooring", "Engineered wood, laminate and vinyl laid with precision."],
  ["Plastering", "Skimming, patching and smooth wall and ceiling finishes."],
  ["Carpentry", "Doors, skirting, shelving, frames and bespoke joinery."],
  ["Tiling", "Wall and floor tiling for kitchens, bathrooms and more."],
  ["Plumbing", "Leaks, taps, toilets, pipework and bathroom plumbing."],
  ["Electric", "Sockets, lighting, fittings and general electrical work."],
  ["Appliance Installation", "Washing machines, dishwashers, ovens and hobs connected and tested."],
  ["IKEA Furniture Assembler", "Fast, careful assembly of IKEA and flat-pack furniture."],
  ["Fences Installation", "New fencing, panel replacements, posts and gates."],
  ["UPVC & Aluminium Window Installation", "Energy-efficient UPVC and aluminium windows supplied and fitted."],
  ["UPVC & Aluminium Door Installation", "Secure front, back, patio and bi-fold doors installed."],
];

// Before & after projects. To use your own photos, put them in /images and change these paths.
const PROJECTS = [
  { title: "Kitchen Refit — Marble & Brass", location: "Domestic — Reading", duration: "3 weeks",
    services: "Kitchen Fitting, Flooring & Tiling, Plumbing & Electric",
    before: IMG + "64f193cf8_generated_b222d009.jpg", after: IMG + "f726e209c_generated_c6ae84ba.jpg" },
  { title: "Bathroom Remodel — Wet Room Conversion", location: "Domestic — Reading", duration: "10 days",
    services: "Bathroom Remodeling, Plastering, Plumbing & Electric",
    before: IMG + "861b9c471_generated_a978663c.jpg", after: IMG + "cb907d997_generated_f31b011a.jpg" },
  { title: "Living Room Restoration", location: "Commercial — Office Suite", duration: "5 days",
    services: "Painting & Decorating, Plastering & Carpentry, Flooring",
    before: IMG + "2ca048d4e_generated_d766f74c.jpg", after: IMG + "7bb6d08c4_generated_3090e514.jpg" },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const pad = n => String(n).padStart(2, "0");
const page = document.body.dataset.page;

/* ---------- Shared header / footer / contact bar ---------- */
const links = [["index.html", "Home", "home"], ["services.html", "Services", "services"], ["work.html", "Work", "work"], ["reviews.html", "Reviews", "reviews"], ["contact.html", "Contact", "contact"]];

document.body.insertAdjacentHTML("afterbegin", `
<header class="header">
  <div class="container header-inner">
    <a href="index.html" class="logo"><b>MS Builders</b><span>Est. 2018</span></a>
    <nav class="nav" id="nav">
      ${links.map(([h, t, k]) => `<a href="${h}"${k === page ? ' class="active"' : ""}>${t}</a>`).join("")}
      <a href="contact.html" class="btn btn-dark">Get a Quote</a>
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>`);

document.body.insertAdjacentHTML("beforeend", `
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <a href="index.html" class="logo"><b>MS Builders</b></a>
      <div class="mono" style="margin-top:.5rem">Building excellence since 2018</div>
      <p>Professional maintenance services for commercial and domestic properties. Precise craftsmanship, transparent pricing.</p>
    </div>
    <div>
      <h4>SERVICES</h4>
      <ul>${["Kitchen Fitter", "Bathroom Remodeling", "Painting & Decorating", "Plumbing & Electric", "Plastering & Carpentry", "Windows & Doors"].map(s => `<li><a href="services.html">${s}</a></li>`).join("")}</ul>
    </div>
    <div>
      <h4>CONTACT</h4>
      <ul>
        <li><a href="tel:+447466254999">07466 254999</a> <span class="mono">(MAK Durrani)</span></li>
        <li><a href="tel:+447518510999">07518 510999</a> <span class="mono">(Samina Z Ali)</span></li>
        <li><a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a></li>
        <li>Reading, Berkshire, UK</li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© ${new Date().getFullYear()} MS Builders. All rights reserved.</span>
    <span class="mono">Est. January 2018 · Commercial &amp; Domestic</span>
  </div>
</footer>
<div class="contact-bar">
  <div class="container">
    <div class="bar-loc mono">⌖ Reading, Berkshire, UK</div>
    <div class="bar-people">
      <a href="tel:+447466254999"><span class="mono">MAK Durrani</span><b>07466 254999</b></a>
      <a href="tel:+447518510999"><span class="mono">Samina Z Ali</span><b>07518 510999</b></a>
    </div>
    <a href="contact.html" class="btn btn-dark">Free Quote</a>
  </div>
</div>
<div class="toast" id="toast" role="status"></div>`);

const navToggle = $("#navToggle"), nav = $("#nav");
navToggle.addEventListener("click", () => navToggle.setAttribute("aria-expanded", nav.classList.toggle("open")));

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------- Services ---------- */
const svcCard = ([name, desc], i) => `
  <article class="svc reveal"><span class="mono">SVC_${pad(i + 1)}</span><h3>${name}</h3><p>${desc}</p></article>`;
$$("[data-services]").forEach(el => {
  const limit = +el.dataset.services || SERVICES.length;
  el.innerHTML = SERVICES.slice(0, limit).map(svcCard).join("");
});
$$("select[name=service]").forEach(sel =>
  sel.insertAdjacentHTML("beforeend", SERVICES.map(([n]) => `<option>${n}</option>`).join("") + "<option>Other</option>"));

/* ---------- Before / after ---------- */
const slider = p => `
  <div class="ba">
    <img src="${p.after}" alt="${p.title} — after" loading="lazy" />
    <img class="ba-before" src="${p.before}" alt="${p.title} — before" loading="lazy" />
    <div class="ba-line"></div>
    <span class="ba-tag after">AFTER</span><span class="ba-tag before">BEFORE</span>
  </div>`;

$$("[data-projects]").forEach(el => {
  const full = el.dataset.projects === "full";
  const list = full ? PROJECTS : PROJECTS.slice(0, 1);
  el.innerHTML = list.map((p, i) => full ? `
    <article class="project reveal">
      ${slider(p)}
      <div class="project-meta">
        <div><span class="mono">REF: PRJ_${pad(i + 1)}</span><h3>${p.title}</h3></div>
        <div><span class="mono">Location</span><p>${p.location}</p></div>
        <div><span class="mono">Duration</span><p>${p.duration}</p></div>
        <div><span class="mono">Services</span><p>${p.services}</p></div>
      </div>
    </article>` : `
    <article class="reveal">
      ${slider(p)}
      <div class="project-simple">
        <span class="mono">REF: PRJ_${pad(i + 1)}</span>
        <h3>${p.title}</h3>
        <p class="dim">${p.services}</p>
        <span class="mono">${p.location}</span>
      </div>
    </article>`).join("");
});

$$(".ba").forEach(ba => {
  const before = $(".ba-before", ba), line = $(".ba-line", ba);
  const set = x => {
    const r = ba.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
    before.style.clipPath = `inset(0 0 0 ${pct}%)`;
    line.style.left = pct + "%";
  };
  let drag = false;
  ba.addEventListener("pointerdown", e => { drag = true; ba.setPointerCapture(e.pointerId); set(e.clientX); });
  ba.addEventListener("pointermove", e => drag && set(e.clientX));
  ["pointerup", "pointercancel"].forEach(ev => ba.addEventListener(ev, () => (drag = false)));
});

/* ---------- Trustpilot links ---------- */
$$("[data-trustpilot]").forEach(a => { a.href = TRUSTPILOT_URL; a.target = "_blank"; a.rel = "noopener"; });

/* ---------- Quote form → email ---------- */
$$("[data-quote-form]").forEach(form => form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const body = [`Name: ${d.name}`, `Phone: ${d.phone}`, d.email && `Email: ${d.email}`, `Service: ${d.service}`, d.message && `\nProject details:\n${d.message}`]
    .filter(Boolean).join("\n");
  location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent("Quotation request — " + d.service)}&body=${encodeURIComponent(body)}`;
  toast("Opening your email app…");
}));

/* ---------- Review form → email ---------- */
const reviewForm = $("#reviewForm");
if (reviewForm) {
  let rating = 0;
  const stars = $$("#starInput button");
  const paint = n => stars.forEach(b => b.classList.toggle("on", +b.dataset.v <= n));
  stars.forEach(b => {
    b.addEventListener("click", () => { rating = +b.dataset.v; paint(rating); });
    b.addEventListener("mouseenter", () => paint(+b.dataset.v));
  });
  $("#starInput").addEventListener("mouseleave", () => paint(rating));
  reviewForm.addEventListener("submit", e => {
    e.preventDefault();
    const note = $("#reviewNote");
    if (!rating) { note.textContent = "Please choose a star rating."; return; }
    const d = Object.fromEntries(new FormData(reviewForm));
    const body = `Rating: ${rating}/5\nName: ${d.name}\nService: ${d.service || "-"}\n\n${d.review}`;
    location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(`Customer review — ${rating} stars`)}&body=${encodeURIComponent(body)}`;
    note.textContent = "Thank you! Please also share your review on Trustpilot.";
    reviewForm.reset(); rating = 0; paint(0);
  });
}

/* ---------- Copy bank details ---------- */
$$(".copy").forEach(b => b.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(b.dataset.copy); toast("Copied " + b.dataset.copy); }
  catch { toast(b.dataset.copy); }
}));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
}), { threshold: 0.1 });
$$(".reveal").forEach(el => io.observe(el));
