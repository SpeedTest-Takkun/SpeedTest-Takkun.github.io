const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");
const html = document.documentElement;

const texts = {
  ja: {
    title: "インターネット速度テスト",
    d: "ダウンロード",
    u: "アップロード",
    p: "Ping",
    start: "START"
  },
  en: {
    title: "Internet Speed Test",
    d: "Download",
    u: "Upload",
    p: "Ping",
    start: "START"
  }
};

let lang = "ja";

themeBtn.onclick = () => {
  const t = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "🌙" : "☀️";
};

langBtn.onclick = () => {
  lang = lang === "ja" ? "en" : "ja";
  applyLang();
};

function applyLang() {
  document.getElementById("title").textContent = texts[lang].title;
  document.getElementById("dLabel").textContent = texts[lang].d;
  document.getElementById("uLabel").textContent = texts[lang].u;
  document.getElementById("pLabel").textContent = texts[lang].p;
  document.getElementById("start").textContent = texts[lang].start;
  langBtn.textContent = lang === "ja" ? "EN" : "JP";
}

/* 速度測定 */
const startBtn = document.getElementById("start");
const downEl = document.getElementById("down");
const upEl = document.getElementById("up");
const pingEl = document.getElementById("ping");

startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  downEl.textContent = upEl.textContent = pingEl.textContent = "...";

  const pingStart = performance.now();
  await fetch("https://www.google.com/images/phd/px.gif", { mode: "no-cors" });
  pingEl.textContent = Math.round(performance.now() - pingStart);

  const dStart = performance.now();
  await fetch("https://speed.cloudflare.com/__down?bytes=20000000");
  const dTime = (performance.now() - dStart) / 1000;
  downEl.textContent = ((20 * 8) / dTime).toFixed(1);

  const data = new Uint8Array(5000000);
  const uStart = performance.now();
  await fetch("https://speed.cloudflare.com/__up", { method: "POST", body: data });
  const uTime = (performance.now() - uStart) / 1000;
  upEl.textContent = ((5 * 8) / uTime).toFixed(1);

  startBtn.disabled = false;
});
