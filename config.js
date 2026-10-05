/* ==========================================================================
   WEDDING INVITE — EDIT EVERYTHING HERE
   You only need to change the text between the quotes ("...").
   Don't delete commas or brackets.
   Personalised links: add ?guest=Name to your URL, e.g.
     https://your-site.vercel.app/?guest=Aunt%20Sara
   ========================================================================== */

window.WEDDING = {

  /* ---------- 1. PAGE TITLE (browser tab) ---------- */
  pageTitle: "Noushad Mohammed & Asma Thashreefa - Wedding Invitation",

  /* ---------- 2. THE COUPLE ---------- */
  headline: "We're getting married",

  groom: {
    name: "Noushad Mohammed",                         // <-- GROOM NAME
    parents: "Son of Mr. & Mrs. Malik",   // <-- GROOM'S PARENTS
    qualification: "B.E.",          // <-- leave "" to hide
    profession: "Mechanical Engineer"          // <-- leave "" to hide
  },

  bride: {
    name: "Asma Thashreefa",                         // <-- BRIDE NAME
    parents: "Daughter of Mr. & Mrs. Nasser", // <-- BRIDE'S PARENTS
    qualification: "MBBS, M.D",           // <-- leave "" to hide
    profession: "Pediatrician"            // <-- leave "" to hide
  },

  gateText: "Tap to open",                // text on the front cover

  /* ---------- 3. WELCOME MESSAGE ---------- */
  intro:
    "We are honored to welcome you to the wedding ceremony of Zayn & Nora as they begin their journey together in faith and love. We thank you for being part of this blessed occasion.",

  /* ---------- 4. DATE & TIME ----------
     Format: "YYYY-MM-DDTHH:MM:SS+HH:MM"  (the +05:30 is your timezone offset)
     timeZone: use an IANA name so every guest sees the same clock time,
               e.g. "Asia/Kolkata", "Asia/Dubai", "Europe/London", "America/New_York"   */
  weddingDate: "2026-11-30T10:30:00+05:30",
  timeZone: "Asia/Kolkata",
  durationHours: 4,                       // used for the "Save the date" calendar file

  scratchTitle: "Scratch to Reveal",      // title above the scratch heart
  scratchLabel: "You're invited",         // small text inside the heart
  saveDateButton: "Save the date",

  /* ---------- 5. COUPLE PHOTO (optional) ----------
     Put your photo in the /assets folder (e.g. assets/couple.jpg) and write
     "assets/couple.jpg" below. Leave "" to hide.                          */
  photo: "",

  /* ---------- 6. COUNTDOWN ---------- */
  countdownTitle: "Counting Down to Forever",

  /* ---------- 7. PROGRAM TIMELINE ----------
     Add / remove blocks { ... }, separated by commas.                     */
  timelineTitle: "Program Timeline",
  timeline: [
    { title: "Guest Arrival",     when: "Nov 30, 2026 · 11:00 AM", note: "We welcome you with open arms." },
    { title: "Nikah Ceremony",  when: "Nov 30, 2026 · 11:30 AM", note: "Your presence is our blessing." },
    { title: "Reception",         when: "Nov 30, 2026 · 12:00 PM",  note: "Dinner, music and celebration." }
  ],

  /* ---------- 8. VENUE ---------- */
  venueTitle: "Venue",
  venue: {
    name: "Unity Hall",            // <-- VENUE NAME
    address: "City Centre, London",       // <-- ADDRESS
    mapsUrl: "https://maps.google.com/?q=Grand+Palace+Hall", // <-- Google Maps link ("" to hide button)
    mapsButton: "View on Google Maps"
  },

  /* ---------- 9. DRESS CODE ---------- */
  dressTitle: "Dress Code",
  dress: {
    women: "Elegant formal attire in pastel or jewel tones.",
    men: "Suit or traditional formal wear."
  },

  /* ---------- 10. PRE-WEDDING EVENTS (set to [] to hide) ---------- */
  preWeddingTitle: "Pre-Wedding Events",
  preWedding: [
    { name: "Mehendi", when: "Nov 28, 2026 · 6:30 PM", place: "Bride's Home" },
    { name: "Sangeet", when: "Nov 29, 2026 · 7:00 PM", place: "Grand Palace Hall" }
  ],

  /* ---------- 11. EXTRA INFO (set text to "" to hide a block) ---------- */
  transportTitle: "Transportation",
  transport: "Shuttle service will be available from the city centre to the venue. Pickup point: Central Station at 9:30 PM.",

  stayTitle: "Accommodation",
  stay: "Special rates at The Grand Palace Hotel (5 min from venue). Use code WEDDING2026 when booking.",

  giftsTitle: "Gifts",
  gifts: "Your love, blessings, and presence are the greatest gifts we could ever ask for.",

  /* ---------- 12. RSVP ----------
     whatsapp: country code + number, digits only (e.g. "919876543210"). "" to hide.
     email:    "" to hide.                                                   */
  rsvpTitle: "RSVP",
  rsvp: {
    text: "Kindly let us know if you can join us.",
    deadline: "Please reply by November 15, 2026",
    whatsapp: "919999999999",             // <-- YOUR WHATSAPP NUMBER
    email: "",                            // <-- YOUR EMAIL
    whatsappButton: "RSVP on WhatsApp",
    emailButton: "RSVP by email",
    message: "Hi! I'd love to attend the wedding of Zayn & Nora."  // pre-filled message
  },

  /* ---------- 13. CLOSING ---------- */
  closing: "We can't wait to celebrate with you!",
  closingNames: "Zayn & Nora",
  messageButton: "Send message",
  messageText: "Congratulations Zayn & Nora! Wishing you a lifetime of love and happiness.",

  /* ---------- 14. MUSIC (optional) ----------
     Put an .mp3 in /assets (e.g. assets/music.mp3) and write the path below.
     Leave "" for no music (the speaker button will be hidden).              */
  music: "",

  /* ---------- 15. SHOW / HIDE WHOLE SECTIONS ---------- */
  show: {
    intro: true, scratch: true, photo: true, countdown: true, timeline: true,
    venue: true, dress: true, preWedding: true, transport: true, stay: true,
    gifts: true, rsvp: true, closing: true
  }
};
