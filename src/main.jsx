import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ── Secure Hardware Check ──────────────────────────────────────────────────
function checkHardware() {
  const ua = navigator.userAgent;
  let blocked = false;

  const isMacOS = /Macintosh/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|Edg\/|Edg |OPR|Brave/.test(ua);

  if (!isSafari || !isMacOS) blocked = true;

  if (!blocked) {
    let hardwareOk = false;
    const cores = navigator.hardwareConcurrency || 0;
    if (cores >= 8) hardwareOk = true;

    if (!hardwareOk) {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const ext = gl.getExtension("WEBGL_debug_renderer_info");
          if (ext) {
            const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "";
            const isM5 = /apple m5/i.test(renderer);
            const isAppleSilicon = /apple (m\d|gpu)/i.test(renderer) && cores >= 10;
            const isIntelI9 = /intel/i.test(renderer) && (/iris/i.test(renderer) || /uhd/i.test(renderer) || /hd\s?6[0-9][0-9]/i.test(renderer));
            hardwareOk = isM5 || isAppleSilicon || isIntelI9;
          }
        }
      } catch (e) { /* ignore */ }
    }
    if (!hardwareOk) blocked = true;
  }

  // Anti-tamper
  const props = ["userAgent", "hardwareConcurrency", "platform", "deviceMemory"];
  if (props.some((p) => Object.prototype.hasOwnProperty.call(navigator, p))) {
    blocked = true;
  }

  return blocked;
}

const isBlocked = window.__AVEON_BLOCKED__ === true || checkHardware();

if (!isBlocked) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Enforce gate screen if somehow bypassed html
  const gate = document.getElementById("gate-screen");
  if (gate) {
    gate.classList.add("active");
    gate.setAttribute("style", "display:flex!important;");
  }
  const root = document.getElementById("root");
  if (root) root.setAttribute("style", "display:none!important;");
}
