/* haku — V0 behaviour.
   Two jobs: a theme the visitor can override, and collapsible project detail.
   Nothing here is required to read the page. */

(function () {
  "use strict";

  var root = document.documentElement;
  var KEY = "haku-theme";
  var btn = document.getElementById("theme-btn");
  var label = document.getElementById("theme-label");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (err) {
      return null;
    }
  }

  function systemTheme() {
    return mq.matches ? "dark" : "light";
  }

  function apply(theme) {
    var dark = theme === "dark";
    root.setAttribute("data-theme", theme);
    label.textContent = dark ? "Light" : "Dark";
    btn.setAttribute("aria-pressed", String(dark));
    btn.setAttribute("aria-label", "Theme is " + theme + ". Switch to " + (dark ? "light" : "dark") + " theme.");
  }

  apply(stored() || systemTheme());

  mq.addEventListener("change", function (e) {
    if (!stored()) apply(e.matches ? "dark" : "light");
  });

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(KEY, next);
    } catch (err) {
      /* storage blocked: the theme still switches, it just is not remembered */
    }
    apply(next);
  });

  Array.prototype.forEach.call(document.querySelectorAll(".disclose"), function (b) {
    var target = document.getElementById(b.getAttribute("aria-controls"));
    if (!target) return;
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!open));
      target.hidden = open;
      b.querySelector(".disclose-sign").textContent = open ? "+" : "\u2212";
    });
  });
})();
