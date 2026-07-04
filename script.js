gsap.registerPlugin(ScrollTrigger);

/* iOS Safari: don't recalc positions when the URL bar collapses mid-scroll,
   and normalize touch scrolling so pinned scenes stay buttery */
ScrollTrigger.config({ ignoreMobileResize: true });
if (ScrollTrigger.isTouch === 1) {
  ScrollTrigger.normalizeScroll(true);
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- floating hearts background ---------- */
(function heartsBackground() {
  if (prefersReducedMotion) return;
  const container = document.querySelector(".hearts-bg");
  const emojis = ["💗", "💕", "🩷", "💖", "🐻", "🐼", "💘"];
  const count = window.innerWidth < 600 ? 14 : 22;
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "bg-heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 14 + Math.random() * 20 + "px";
    h.style.animationDuration = 9 + Math.random() * 10 + "s";
    h.style.animationDelay = -Math.random() * 18 + "s";
    container.appendChild(h);
  }
})();

/* ---------- hero: gentle bob + exit on scroll ---------- */
gsap.to(".hero-bears-img", { y: -10, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut" });

gsap.to(".hero-title, .hero-sub, .hero-bears", {
  opacity: 0,
  y: -60,
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom 60%",
    scrub: true,
  },
});

/* ---------- intro: word-by-word reveal ---------- */
document.querySelectorAll(".split-words").forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
  gsap.from(el.querySelectorAll(".word"), {
    opacity: 0,
    y: 40,
    rotationX: -70,
    stagger: 0.08,
    duration: 0.7,
    ease: "back.out(1.6)",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});

/* ---------- confession title + cards ---------- */
gsap.from(".confession-title", {
  opacity: 0,
  scale: 0.6,
  duration: 0.8,
  ease: "back.out(1.8)",
  scrollTrigger: { trigger: ".confession-title", start: "top 82%", toggleActions: "play none none reverse" },
});

gsap.from(".confession-ldr", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: { trigger: ".confession-ldr", start: "top 85%", toggleActions: "play none none reverse" },
});

gsap.utils.toArray(".annoy-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    x: i % 2 === 0 ? -90 : 90,
    rotation: i % 2 === 0 ? -6 : 6,
    duration: 0.7,
    ease: "power3.out",
    scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
  });
});

gsap.from(".confession-but", {
  opacity: 0,
  scale: 0.5,
  duration: 0.9,
  ease: "elastic.out(1, 0.5)",
  scrollTrigger: { trigger: ".confession-but", start: "top 88%", toggleActions: "play none none reverse" },
});

/* ---------- memories: polaroids swing in + parallax ---------- */
gsap.from(".memories-title", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  scrollTrigger: { trigger: ".memories-title", start: "top 85%", toggleActions: "play none none reverse" },
});

gsap.utils.toArray(".polaroid").forEach((card, i) => {
  const fromLeft = card.classList.contains("tilt-left");
  gsap.from(card, {
    opacity: 0,
    y: 110,
    rotation: fromLeft ? -18 : 18,
    scale: 0.85,
    duration: 1,
    ease: "back.out(1.4)",
    scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
  });
  // subtle parallax drift while scrolling past
  gsap.to(card, {
    y: -30,
    ease: "none",
    scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 },
  });
});

/* ---------- her face ---------- */
gsap.from(".her-photo-1", {
  opacity: 0, x: -120, rotation: -30, duration: 1, ease: "back.out(1.5)",
  scrollTrigger: { trigger: ".her-photos", start: "top 82%", toggleActions: "play none none reverse" },
});
gsap.from(".her-photo-2", {
  opacity: 0, x: 120, rotation: 30, duration: 1, ease: "back.out(1.5)",
  scrollTrigger: { trigger: ".her-photos", start: "top 82%", toggleActions: "play none none reverse" },
});
gsap.from(".her-caption", {
  opacity: 0, y: 40, duration: 0.8,
  scrollTrigger: { trigger: ".her-caption", start: "top 90%", toggleActions: "play none none reverse" },
});

/* ---------- bears run & hug: pinned scrub scene ---------- */
(function bearsScene() {
  gsap.set(".hug-group", { opacity: 0, scale: 0.55, xPercent: -50 });
  gsap.set(".scene-bubu", { opacity: 1, xPercent: -50, scaleX: 1 });
  gsap.set(".scene-dudu", { opacity: 1, xPercent: -50, scaleX: 1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".bears-scene",
      start: "top top",
      end: "+=280%",
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
    },
  });

  // phase 1: run toward each other from far apart
  tl.fromTo(".bears-text-1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
    .fromTo(".scene-bubu", { x: "calc(-50% - 52vw)" }, { x: "calc(-50% - 14vw)", duration: 3.8, ease: "none" }, 0)
    .fromTo(".scene-dudu", { x: "calc(-50% + 52vw)" }, { x: "calc(-50% + 14vw)", duration: 3.8, ease: "none" }, 0)
    // running bounce — alternating legs
    .to(".scene-bubu", { y: -22, repeat: 9, yoyo: true, duration: 0.32, ease: "sine.inOut" }, 0)
    .to(".scene-dudu", { y: -22, repeat: 9, yoyo: true, duration: 0.32, ease: "sine.inOut" }, 0.16)
    // slight lean-in while running
    .to(".scene-bubu", { rotation: 6, duration: 3.8, ease: "none" }, 0)
    .to(".scene-dudu", { rotation: -6, duration: 3.8, ease: "none" }, 0)

    // phase 2: they meet — swap to hug image
    .to(".bears-text-1", { opacity: 0, y: -30, duration: 0.6 }, 2.6)
    .to(".scene-bubu, .scene-dudu", {
      x: "-50%",
      y: 0,
      rotation: 0,
      scale: 0.85,
      opacity: 0,
      duration: 0.7,
      ease: "power2.in",
    }, 3.1)
    .fromTo(".bears-text-2", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 3.3)
    .to(".hug-group", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.6)",
    }, 3.35)
    .to(".hug-group", {
      y: -8,
      repeat: 3,
      yoyo: true,
      duration: 0.45,
      ease: "sine.inOut",
    }, 3.6)

    // hearts burst on hug
    .to(".hug-hearts span", {
      opacity: 1,
      scale: 1.5,
      x: (i) => (i - 3) * 44,
      y: (i) => -70 - Math.abs(i - 3) * 28 - Math.random() * 24,
      rotation: () => gsap.utils.random(-35, 35),
      stagger: 0.1,
      duration: 1.1,
      ease: "back.out(2)",
    }, 3.7)
    .to(".hug-hearts span", { opacity: 0, y: "-=40", duration: 0.7 }, 5.2);
})();

/* ---------- envelope: pinned scrub open ---------- */
(function envelopeScene() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".envelope-scene",
      start: "top top",
      end: "+=180%",
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
    },
  });

  gsap.set(".letter-peek", { opacity: 0 });

  tl.from(".envelope", { scale: 0.6, opacity: 0, y: 80, duration: 1.2, ease: "back.out(1.4)" })
    .to(".envelope-hint", { opacity: 0.3, duration: 0.6 }, 0.9)
    .to(".envelope-seal", { scale: 0, rotation: 180, opacity: 0, duration: 0.9, ease: "back.in(2)" }, 1.4)
    .to(".envelope-flap", { rotationX: 180, transformOrigin: "top center", duration: 1.4, ease: "power2.inOut" }, 2)
    .set(".envelope-flap", { zIndex: 0 }, 3.2)
    .to(".letter", { y: "-52%", scale: 1.06, duration: 1.6, ease: "power2.out" }, 3.3)
    .to(".letter-peek", { opacity: 1, duration: 0.8 }, 3.5)
    .to(".letter-peek", { scale: 1.12, duration: 1, ease: "sine.inOut" }, 3.8)
    .to(".envelope", { y: 30, duration: 1 }, 3.3);
})();

/* ---------- note lines reveal ---------- */
gsap.from(".note-paper", {
  opacity: 0,
  y: 90,
  scale: 0.94,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".note", start: "top 78%", toggleActions: "play none none reverse" },
});

gsap.utils.toArray(".note-line, .note-signature").forEach((line) => {
  gsap.from(line, {
    opacity: 0,
    y: 26,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: line, start: "top 90%", toggleActions: "play none none reverse" },
  });
});

/* ---------- infinity: draw the symbol on scroll ---------- */
(function infinityDraw() {
  const path = document.querySelector(".infinity-path");
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".infinity",
      start: "top 70%",
      end: "center center",
      scrub: 0.6,
    },
  });

  gsap.from(".infinity-answer", {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    ease: "elastic.out(1, 0.45)",
    scrollTrigger: { trigger: ".infinity-answer", start: "top 88%", toggleActions: "play none none reverse" },
  });
})();

/* ---------- finale: dodging "no" + heart burst on "yes" ---------- */
(function finale() {
  const btnNo = document.getElementById("btnNo");
  const btnYes = document.getElementById("btnYes");
  const note = document.getElementById("finaleNote");

  const dodge = () => {
    gsap.to(btnNo, {
      x: gsap.utils.random(-120, 120),
      y: gsap.utils.random(-80, 80),
      rotation: gsap.utils.random(-20, 20),
      duration: 0.3,
      ease: "power2.out",
    });
  };
  btnNo.addEventListener("pointerenter", dodge);
  btnNo.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, { passive: false });
  btnNo.addEventListener("click", dodge);

  btnYes.addEventListener("click", () => {
    note.hidden = false;
    gsap.from(note, { scale: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    gsap.to(btnNo, { opacity: 0, scale: 0, duration: 0.4 });

    const emojis = ["💗", "💕", "💖", "💘", "🩷", "❤️", "🐻", "🐼"];
    const burstCount = 40;
    for (let i = 0; i < burstCount; i++) {
      const h = document.createElement("span");
      h.className = "burst-heart";
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.left = "50%";
      h.style.top = "60%";
      document.body.appendChild(h);
      gsap.fromTo(h,
        { x: 0, y: 0, scale: 0.6, opacity: 1 },
        {
          x: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
          y: gsap.utils.random(-window.innerHeight * 0.8, -60),
          scale: gsap.utils.random(0.8, 2),
          rotation: gsap.utils.random(-180, 180),
          opacity: 0,
          duration: gsap.utils.random(1.2, 2.4),
          ease: "power2.out",
          onComplete: () => h.remove(),
        }
      );
    }
  });
})();

/* refresh triggers once images load, so positions stay accurate */
window.addEventListener("load", () => ScrollTrigger.refresh());
