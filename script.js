/* ==========================================================================
   You shouldn't need to edit this file — all text lives in config.js
   ========================================================================== */
(function () {
  "use strict";
  var C = window.WEDDING;
  if (!C) { console.error("config.js failed to load"); return; }

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  };
  var on = function (k) { return !C.show || C.show[k] !== false; };
  var guest = new URLSearchParams(location.search).get("guest");

  var HEART = "M130 222C130 222 10 150 10 70C10 30 45 10 80 10C105 10 125 25 130 45C135 25 155 10 180 10C215 10 250 30 250 70C250 150 130 222 130 222Z";

  var ICON = {
    clock:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin:      '<svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    shirt:    '<svg viewBox="0 0 24 24"><path d="M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3c-.5 1.6-2 2.5-4 2.5S8.5 4.6 8 3z"/></svg>',
    sparkle:  '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>',
    bus:      '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M7 20v-3M17 20v-3"/></svg>',
    hotel:    '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/></svg>',
    gift:     '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8S9 8 8 6.5 9 4 10.5 4 12 8 12 8zm0 0s3 0 4-1.5S15 4 13.5 4 12 8 12 8z"/></svg>',
    mail:     '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
    chat:     '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>'
  };

  /* ---------- date helpers ---------- */
  var D = new Date(C.weddingDate);
  var tz = C.timeZone || undefined;
  function fmt(o) {
    try { return new Intl.DateTimeFormat("en-US", Object.assign({ timeZone: tz }, o)).format(D); }
    catch (e) { return new Intl.DateTimeFormat("en-US", o).format(D); }
  }
  var dateLong = fmt({ month: "long", day: "numeric", year: "numeric" });
  var weekday  = fmt({ weekday: "long" });
  var timeStr  = fmt({ hour: "numeric", minute: "2-digit" });

  /* ---------- fill the hero ---------- */
  document.title = C.pageTitle || (C.groom.name + " & " + C.bride.name);
  $("#headline").textContent = C.headline;
  $("#groomName").textContent = C.groom.name;
  $("#brideName").textContent = C.bride.name;
  function info(p) { return [p.parents, p.qualification, p.profession].filter(Boolean).join("\n"); }
  $("#groomInfo").textContent = info(C.groom);
  $("#brideInfo").textContent = info(C.bride);
  $("#gateText").textContent = C.gateText;
  $("#sealMono").textContent = C.groom.name.charAt(0) + "&" + C.bride.name.charAt(0);

  /* ---------- section builders ---------- */
  function head(icon, title) {
    return '<header class="sec-head">' + (icon ? '<span class="ico">' + ICON[icon] + "</span>" : "") +
      "<h2>" + esc(title) + '</h2><div class="divider"><i></i><b>&hearts;</b><i></i></div></header>';
  }
  function textSec(key, icon, title, text) {
    if (!on(key) || !text) return "";
    return '<section class="sec">' + head(icon, title) + "<p>" + esc(text) + "</p></section>";
  }

  var h = "";

  if (on("intro") && C.intro) {
    h += '<section class="sec"><p class="lede">' +
      (guest ? '<span class="guest">Dear ' + esc(guest) + ",</span>" : "") + esc(C.intro) + "</p></section>";
  }

  if (on("scratch")) {
    h += '<section class="sec">' + head(null, C.scratchTitle) +
      '<div class="heart-wrap" id="heartWrap">' +
        '<svg class="heart-bg" viewBox="0 0 260 240"><path d="' + HEART + '"/></svg>' +
        '<div class="heart-text"><small>' + esc(C.scratchLabel) + "</small><strong>" + esc(dateLong) +
        "</strong><span>" + esc(weekday) + "</span><span>" + esc(timeStr) + "</span></div>" +
        '<canvas id="scratch" aria-label="Scratch to reveal the date"></canvas><div class="confetti"></div>' +
      "</div>" +
      '<button class="btn" id="saveDate" type="button">' + ICON.calendar + esc(C.saveDateButton) + "</button></section>";
  }

  if (on("photo") && C.photo) {
    h += '<section class="sec"><img class="photo" src="' + esc(C.photo) + '" alt="' +
      esc(C.groom.name + " and " + C.bride.name) + '" loading="lazy"></section>';
  }

  if (on("countdown")) {
    h += '<section class="sec">' + head(null, C.countdownTitle) + '<div class="cd-row">' +
      '<div class="cd"><b id="cdD">0</b><span>Days</span></div>' +
      '<div class="cd"><b id="cdH">0</b><span>Hours</span></div>' +
      '<div class="cd"><b id="cdM">0</b><span>Minutes</span></div>' +
      '<div class="cd"><b id="cdS">0</b><span>Seconds</span></div></div></section>';
  }

  if (on("timeline") && C.timeline && C.timeline.length) {
    h += '<section class="sec">' + head("clock", C.timelineTitle) + '<ol class="tl">' +
      C.timeline.map(function (t) {
        return "<li><b>" + esc(t.title) + "</b><time>" + esc(t.when) + "</time>" + (t.note ? "<p>" + esc(t.note) + "</p>" : "") + "</li>";
      }).join("") + "</ol></section>";
  }

  if (on("venue") && C.venue) {
    h += '<section class="sec">' + head("pin", C.venueTitle) +
      '<p class="sub">' + esc(C.venue.name) + '</p><p class="small">' + esc(C.venue.address) + "</p>" +
      (C.venue.mapsUrl ? '<a class="btn" style="margin-top:14px" target="_blank" rel="noopener" href="' + esc(C.venue.mapsUrl) + '">' + esc(C.venue.mapsButton || "Open map") + "</a>" : "") +
      "</section>";
  }

  if (on("dress") && C.dress) {
    h += '<section class="sec">' + head("shirt", C.dressTitle) +
      (C.dress.women ? '<p class="sub">Women</p><p class="small">' + esc(C.dress.women) + "</p>" : "") +
      (C.dress.men ? '<p class="sub" style="margin-top:14px">Men</p><p class="small">' + esc(C.dress.men) + "</p>" : "") +
      "</section>";
  }

  if (on("preWedding") && C.preWedding && C.preWedding.length) {
    h += '<section class="sec">' + head("sparkle", C.preWeddingTitle) +
      C.preWedding.map(function (e) {
        return '<div class="evt"><b>' + esc(e.name) + '</b><p class="small">' + esc(e.when) + "<br>" + esc(e.place) + "</p></div>";
      }).join("") + "</section>";
  }

  h += textSec("transport", "bus", C.transportTitle, C.transport);
  h += textSec("stay", "hotel", C.stayTitle, C.stay);
  h += textSec("gifts", "gift", C.giftsTitle, C.gifts);

  if (on("rsvp") && C.rsvp) {
    var r = C.rsvp, wa = "", em = "";
    var msg = (guest ? "(" + guest + ") " : "") + r.message;
    if (r.whatsapp) wa = '<a class="btn" target="_blank" rel="noopener" href="https://wa.me/' + encodeURIComponent(r.whatsapp) + "?text=" + encodeURIComponent(msg) + '">' + ICON.chat + esc(r.whatsappButton || "RSVP") + "</a>";
    if (r.email) em = '<a class="btn light" href="mailto:' + esc(r.email) + "?subject=" + encodeURIComponent("RSVP - " + C.groom.name + " & " + C.bride.name) + "&body=" + encodeURIComponent(msg) + '">' + ICON.mail + esc(r.emailButton || "Email") + "</a>";
    h += '<section class="sec">' + head("mail", C.rsvpTitle) +
      (r.text ? "<p>" + esc(r.text) + "</p>" : "") +
      (r.deadline ? '<p class="small" style="margin:4px 0 12px">' + esc(r.deadline) + "</p>" : "") + wa + em + "</section>";
  }

  if (on("closing")) {
    var wish = C.rsvp && C.rsvp.whatsapp
      ? '<a class="btn" target="_blank" rel="noopener" href="https://wa.me/' + encodeURIComponent(C.rsvp.whatsapp) + "?text=" + encodeURIComponent(C.messageText) + '">' + ICON.chat + esc(C.messageButton) + "</a>" : "";
    h += '<section class="sec closing"><p class="big">' + esc(C.closing) + '</p><p class="names">' + esc(C.closingNames) + "</p>" + wish + "</section>";
  }

  $("#content").innerHTML = h;

  /* ---------- gate / music ---------- */
  var bgm = $("#bgm"), musicBtn = $("#music");
  if (C.music) { bgm.src = C.music; musicBtn.hidden = false; }
  function setMuted(m) { musicBtn.classList.toggle("muted", m); }
  musicBtn.addEventListener("click", function () {
    if (bgm.paused) { bgm.play().then(function () { setMuted(false); }); }
    else { bgm.pause(); setMuted(true); }
  });

  var opened = false;
  $("#seal").addEventListener("click", function () {
    if (opened) return; opened = true;
    document.body.classList.add("opening");
    if (C.music) {
      bgm.volume = 0.6;
      bgm.play().then(function () { setMuted(false); }).catch(function () { setMuted(true); });
    }
    setTimeout(function () { document.body.classList.add("opened"); }, 1400);
    setTimeout(function () {
      var g = $("#gate"); if (g) g.remove();
      document.body.classList.remove("locked");
    }, 1700);
  });
  setMuted(true);

  /* ---------- countdown ---------- */
  var cd = { d: $("#cdD"), h: $("#cdH"), m: $("#cdM"), s: $("#cdS") };
  function tick() {
    if (!cd.d) return;
    var ms = Math.max(0, D.getTime() - Date.now()), s = Math.floor(ms / 1000);
    cd.d.textContent = Math.floor(s / 86400);
    cd.h.textContent = Math.floor(s % 86400 / 3600);
    cd.m.textContent = Math.floor(s % 3600 / 60);
    cd.s.textContent = s % 60;
  }
  tick(); setInterval(tick, 1000);

  /* ---------- save the date (.ics) ---------- */
  var save = $("#saveDate");
  if (save) save.addEventListener("click", function () {
    var E = new Date(D.getTime() + (C.durationHours || 4) * 3600e3);
    var f = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
    var t = function (s) { return String(s).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n"); };
    var ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invite//EN", "BEGIN:VEVENT",
      "UID:" + Date.now() + "@wedding-invite", "DTSTAMP:" + f(new Date()),
      "DTSTART:" + f(D), "DTEND:" + f(E),
      "SUMMARY:" + t(C.groom.name + " & " + C.bride.name + " - Wedding"),
      "LOCATION:" + t((C.venue ? C.venue.name + ", " + C.venue.address : "")),
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "wedding-save-the-date.ics";
    document.body.appendChild(a); a.click(); a.remove();
  });

  /* ---------- scratch-to-reveal heart ---------- */
  (function initScratch() {
    var cv = $("#scratch"); if (!cv) return;
    var W = 260, H = 240, dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    var ctx = cv.getContext("2d", { willReadFrequently: true });
    ctx.scale(dpr, dpr);
    var heart = new Path2D(HEART);

    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#8f9066"); g.addColorStop(.5, "#cac9a2"); g.addColorStop(1, "#7c7d52");
    ctx.fillStyle = g; ctx.fill(heart);
    ctx.save(); ctx.clip(heart);
    for (var i = 0; i < 520; i++) {
      ctx.fillStyle = Math.random() > .5 ? "rgba(255,255,255,.55)" : "rgba(60,60,30,.4)";
      ctx.fillRect(Math.random() * W, Math.random() * H, 1 + Math.random() * 1.6, 1 + Math.random() * 1.6);
    }
    ctx.restore();

    var step = Math.max(4, Math.round(6 * dpr));
    function opaque() {
      var d = ctx.getImageData(0, 0, cv.width, cv.height).data, n = 0;
      for (var y = 0; y < cv.height; y += step)
        for (var x = 0; x < cv.width; x += step)
          if (d[(y * cv.width + x) * 4 + 3] > 40) n++;
      return n;
    }
    var total = opaque(), drawing = false, last = null, moves = 0, done = false;

    function pos(e) {
      var r = cv.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
    }
    function scratch(p) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 36; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      last = p;
      if (++moves % 8 === 0 && !done && opaque() / total < 0.5) reveal();
    }
    function reveal() {
      done = true; cv.classList.add("done");
      var box = $(".confetti"), cols = ["#d79f2f", "#e5a9a4", "#7a7b4e", "#f6dcc2", "#3f4a2b"], s = "";
      for (var i = 0; i < 34; i++)
        s += '<span style="left:' + (Math.random() * 100) + "%;--c:" + cols[i % cols.length] + ";--d:" + (1.6 + Math.random() * 1.8) + 's;animation-delay:' + (Math.random() * .5) + 's"></span>';
      box.innerHTML = s;
      setTimeout(function () { box.innerHTML = ""; }, 4200);
    }
    cv.addEventListener("pointerdown", function (e) { drawing = true; cv.setPointerCapture(e.pointerId); last = pos(e); scratch(last); });
    cv.addEventListener("pointermove", function (e) { if (drawing) scratch(pos(e)); });
    ["pointerup", "pointercancel"].forEach(function (ev) { cv.addEventListener(ev, function () { drawing = false; }); });
  })();
})();
