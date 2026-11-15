(() => {
  const video = document.getElementById("waiting-video");
  const waiting = document.getElementById("waiting");
  if (!video || !waiting) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "countdown-play";
  button.textContent = "Video play cheyyaam ▶";
  button.style.cssText = "margin-top:20px;color:#804a60;background:#fff;border:1px solid #b990a1;padding:12px 18px;border-radius:999px;cursor:pointer";
  const style = document.createElement("style");
  style.textContent = "@media (prefers-reduced-motion: reduce) { .waiting-video.user-play { display: block !important; } body.waiting-video-playing:has(#waiting:not([hidden])):has(.waiting-video.user-play)::before { background-image: none !important; } }";
  document.head.append(style);
  button.hidden = true;
  waiting.querySelector(".cover-copy").append(button);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const showButton = () => {
    if (!waiting.hidden && video.paused) button.hidden = false;
  };
  const tryPlayback = () => {
    if (waiting.hidden || !video.src) return;
    if (reducedMotion.matches && !video.classList.contains("user-play")) {
      video.pause();
      showButton();
      return;
    }
    video.play().then(() => { button.hidden = true; }).catch(showButton);
  };

  button.addEventListener("click", () => {
    video.classList.add("user-play");
    tryPlayback();
  });
  video.addEventListener("playing", () => {
    if (reducedMotion.matches && !video.classList.contains("user-play")) {
      video.pause();
      showButton();
      return;
    }
    button.hidden = true;
  });
  video.addEventListener("pause", showButton);
  video.addEventListener("error", () => {
    if (!waiting.hidden) {
      button.hidden = true;
      const note = document.createElement("p");
      note.textContent = "Video play cheyyaan pattiyilla.";
      waiting.querySelector(".cover-copy").append(note);
    }
  }, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlayback();
  });
  window.addEventListener("pageshow", tryPlayback);
  tryPlayback();
})();
