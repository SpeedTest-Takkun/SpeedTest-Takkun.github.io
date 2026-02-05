const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");
const html = document.documentElement;

const progress = document.getElementById("progress");
const phaseText = document.getElementById("phase");
const status = document.getElementById("status");

const startBtn = document.getElementById("start");
const downEl = document.getElementById("down");
const upEl = document.getElementById("up");
const pingEl = document.getElementById("ping");

const texts = {
  ja: {
    title: "インターネット速度テスト",
    d: "ダウンロード",
    u: "アップロード",
    p: "Ping",
    start: "START",
    ready: "Ready",
    testing: "測定中",
    done: "完了"
  },
  en: {
    title: "Internet Speed Test",
    d: "Download",
    u: "Upload",
    p: "Ping",
    start: "START",
    ready: "Ready",
    testing: "Testing",
    done: "Complete"
  }
};

let lang = "ja";

function applyLang() {
  document.getElementById("title").textContent = texts[lang].title;
  document.getElementById("dLabel").textContent = texts[lang].d;
  document.getElementById("uLabel").textContent = texts[lang].u;
  document.getElementById("pLabel").textContent = texts[lang].p;
  startBtn.textContent = texts[lang].start;
  status.textContent = texts[lang].ready;
  langBtn.textContent = lang === "ja" ? "EN" : "JP";
}
applyLang();

themeBtn.onclick = () => {
  const t = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "🌙" : "☀️";
};

langBtn.onclick = () => {
  lang = lang === "ja" ? "en" : "ja";
  applyLang();
};

function setProgress(p) {
  progress.style.strokeDashoffset = 440 - (440 * p);
}

startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  setProgress(0);
  status.textContent = texts[lang].testing;
  phaseText.textContent = "PING";

  downEl.textContent = upEl.textContent = pingEl.textContent = "...";

  setProgress(0.2);
  const pingStart = performance.now();
  await fetch("https://www.google.com/images/phd/px.gif", { mode: "no-cors" });
  pingEl.textContent = Math.round(performance.now() - pingStart);

  phaseText.textContent = "DOWNLOAD";
  setProgress(0.5);
  const dStart = performance.now();
  await fetch("https://speed.cloudflare.com/__down?bytes=20000000");
  const dTime = (performance.now() - dStart) / 1000;
  downEl.textContent = ((20 * 8) / dTime).toFixed(1);

  phaseText.textContent = "UPLOAD";
  setProgress(0.8);
  const data = new Uint8Array(5000000);
  const uStart = performance.now();
  await fetch("https://speed.cloudflare.com/__up", { method: "POST", body: data });
  const uTime = (performance.now() - uStart) / 1000;
  upEl.textContent = ((5 * 8) / uTime).toFixed(1);

  setProgress(1);
  phaseText.textContent = "DONE";
  status.textContent = texts[lang].done;

  startBtn.disabled = false;
});
