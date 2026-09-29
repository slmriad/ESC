(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const state = {
    currentBusiness: "restaurant",
    menuOpen: false,
    mouse: { x: innerWidth / 2, y: innerHeight / 2 },
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  const businessData = {
    restaurant: {
      number: "01",
      title: "A website people want to visit.",
      description: "Show the food. Tell the story. Make booking a table feel effortless.",
      features: ["Menu", "Reservations", "Gallery", "Location"],
      brand: "YOUR RESTAURANT",
      url: "yourrestaurant.com",
      kicker: "GOOD FOOD. GOOD PEOPLE.",
      headline: "YOUR\\nRESTAURANT",
      small: "Modern dining · Hurghada",
      image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=85"
    },
    hotel: {
      number: "02",
      title: "Make the stay start before arrival.",
      description: "A calm, premium digital experience for hotels, resorts, apartments and holiday stays.",
      features: ["Rooms", "Booking", "Gallery", "Location"],
      brand: "YOUR HOTEL",
      url: "yourhotel.com",
      kicker: "STAY SOMEWHERE SPECIAL.",
      headline: "YOUR\\nHOTEL",
      small: "Rooms · Experiences · Egypt",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85"
    },
    clothing: {
      number: "03",
      title: "Turn a collection into a brand.",
      description: "Editorial layouts, product storytelling and a storefront that makes people want to explore.",
      features: ["Collections", "Products", "Story", "Shop"],
      brand: "YOUR BRAND",
      url: "yourbrand.com",
      kicker: "MADE TO BE SEEN.",
      headline: "YOUR\\nBRAND",
      small: "New collection · 2026",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=85"
    },
    gym: {
      number: "04",
      title: "Make joining feel like progress.",
      description: "A high-energy site that communicates the atmosphere, programs, trainers and membership options.",
      features: ["Programs", "Trainers", "Memberships", "Contact"],
      brand: "YOUR GYM",
      url: "yourgym.com",
      kicker: "TRAIN WITH PURPOSE.",
      headline: "YOUR\\nGYM",
      small: "Performance · Community · Results",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85"
    },
    barber: {
      number: "05",
      title: "Make the appointment obvious.",
      description: "A sharp, confident site that puts your work, prices, location and booking flow front and center.",
      features: ["Services", "Gallery", "Booking", "Location"],
      brand: "YOUR BARBERSHOP",
      url: "yourbarber.com",
      kicker: "CUT. STYLE. REPEAT.",
      headline: "YOUR\\nBARBER",
      small: "Cuts · Grooming · Appointments",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=85"
    },
    cafe: {
      number: "06",
      title: "Give people a reason to stop by.",
      description: "A warm, visual experience built around the menu, mood, location and personality of the café.",
      features: ["Menu", "Gallery", "Story", "Location"],
      brand: "YOUR CAFÉ",
      url: "yourcafe.com",
      kicker: "COFFEE. FOOD. VIBES.",
      headline: "YOUR\\nCAFÉ",
      small: "Coffee · Breakfast · Good energy",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=85"
    },
    store: {
      number: "07",
      title: "Build a storefront that sells the idea.",
      description: "Product discovery, collections, strong calls to action and a clean shopping experience.",
      features: ["Products", "Collections", "Cart", "Checkout"],
      brand: "YOUR STORE",
      url: "yourstore.com",
      kicker: "SHOP THE NEW DROP.",
      headline: "YOUR\\nSTORE",
      small: "Featured collection · Online",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
    },
    realestate: {
      number: "08",
      title: "Make the property feel real.",
      description: "Large imagery, clear property information and simple paths from discovery to enquiry.",
      features: ["Listings", "Properties", "Search", "Enquiry"],
      brand: "YOUR REAL ESTATE",
      url: "yourproperty.com",
      kicker: "FIND YOUR NEXT PLACE.",
      headline: "YOUR\\nPROPERTY",
      small: "Properties · Egypt · Enquiries",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85"
    },
    business: {
      number: "09",
      title: "Make a serious business look serious online.",
      description: "A structured corporate experience that explains what you do and makes contacting you easy.",
      features: ["About", "Services", "Projects", "Contact"],
      brand: "YOUR BUSINESS",
      url: "yourbusiness.com",
      kicker: "BUILT FOR WHAT'S NEXT.",
      headline: "YOUR\\nBUSINESS",
      small: "Strategy · Service · Growth",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85"
    },
    portfolio: {
      number: "10",
      title: "Make your name the brand.",
      description: "A portfolio that gives your work the space, hierarchy and confidence it deserves.",
      features: ["Work", "About", "Press", "Contact"],
      brand: "YOUR NAME",
      url: "yourname.com",
      kicker: "WORK WORTH REMEMBERING.",
      headline: "YOUR\\nNAME",
      small: "Selected work · 2026",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
    }
  };

  const loader = $("#loader");
  const navWrap = $(".nav-wrap");
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");
  const cursorDot = $(".cursor-dot");
  const cursorRing = $(".cursor-ring");

  function initLoader() {
    const track = $(".loader-track span");
    if (!track) return;

    if (window.gsap && !state.reducedMotion) {
      gsap.to(track, { width: "100%", duration: 1.25, ease: "power2.inOut" });
      gsap.to(loader, {
        opacity: 0,
        duration: .7,
        delay: 1.35,
        ease: "power2.inOut",
        onComplete: () => {
          loader.remove();
          revealHero();
        }
      });
    } else {
      track.style.width = "100%";
      setTimeout(() => {
        loader.remove();
        revealHero();
      }, 500);
    }
  }

  function revealHero() {
    $$(".hero .reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 90);
    });
  }

  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -30px 0px" });
    items.forEach(el => observer.observe(el));
  }

  function initNavigation() {
    const onScroll = () => navWrap.classList.toggle("scrolled", scrollY > 30);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    menuToggle?.addEventListener("click", () => {
      state.menuOpen = !state.menuOpen;
      menuToggle.classList.toggle("open", state.menuOpen);
      navLinks.classList.toggle("open", state.menuOpen);
      document.body.classList.toggle("menu-open", state.menuOpen);
      menuToggle.setAttribute("aria-expanded", String(state.menuOpen));
    });

    $$("#navLinks a").forEach(link => {
      link.addEventListener("click", () => {
        state.menuOpen = false;
        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", e => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: state.reducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  function updateBusiness(type) {
    const data = businessData[type];
    if (!data) return;

    state.currentBusiness = type;

    $$(".category").forEach(button => {
      button.classList.toggle("active", button.dataset.type === type);
    });

    const number = $(".demo-number");
    const title = $("#demoTitle");
    const description = $("#demoDescription");
    const features = $("#demoFeatures");
    const brand = $("#mockBrand");
    const url = $("#browserUrl");
    const kicker = $("#mockKicker");
    const headline = $("#mockHeadline");
    const small = $("#mockSmall");
    const hero = $("#mockHero");
    const demoOpen = $("#demoOpen");

    [number, title, description, brand, url, kicker, headline, small].forEach(el => {
      if (el) el.style.opacity = "0";
    });

    setTimeout(() => {
      number.textContent = data.number;
      title.textContent = data.title;
      description.textContent = data.description;
      brand.textContent = data.brand;
      url.textContent = data.url;
      kicker.textContent = data.kicker;
      headline.textContent = data.headline.replace(/\\n/g, "\n");
      small.textContent = data.small;
      if (demoOpen) demoOpen.href = `demos/${type}.html`;
      features.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join("");
      hero.style.backgroundImage = `url("${data.image}")`;

      [number, title, description, brand, url, kicker, headline, small].forEach(el => {
        if (el) {
          el.animate(
            [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
          );
        }
      });
    }, 140);
  }

  function initShowcase() {
    $$(".category").forEach(button => {
      button.addEventListener("click", () => updateBusiness(button.dataset.type));
    });
    updateBusiness("restaurant");
  }

  function initCursor() {
    if (!cursorDot || !cursorRing || innerWidth < 800 || state.reducedMotion) return;

    let ringX = state.mouse.x;
    let ringY = state.mouse.y;

    addEventListener("mousemove", e => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    }, { passive: true });

    const loop = () => {
      ringX += (state.mouse.x - ringX) * .12;
      ringY += (state.mouse.y - ringY) * .12;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(loop);
    };
    loop();

    const interactive = "a, button, summary, .category, .browser-shell";
    $$(interactive).forEach(el => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("hover"));
    });
  }

  function initMagnetic() {
    if (state.reducedMotion || innerWidth < 900) return;

    $$(".magnetic").forEach(el => {
      el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * .13}px, ${y * .13}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  function initGSAP() {
    if (!window.gsap || state.reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-glow-a", {
      yPercent: 30,
      xPercent: -15,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    gsap.to(".hero-glow-b", {
      yPercent: -40,
      xPercent: 15,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    gsap.to(".statement-image", {
      yPercent: 10,
      scrollTrigger: { trigger: ".statement", start: "top bottom", end: "bottom top", scrub: true }
    });

    gsap.utils.toArray(".service-card").forEach((card, i) => {
      gsap.fromTo(card, { y: 30 }, {
        y: 0,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%" },
        delay: i % 3 * .06
      });
    });

    gsap.utils.toArray(".process-item").forEach(item => {
      gsap.fromTo(item, { x: -20 }, {
        x: 0,
        duration: .7,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 90%" }
      });
    });
  }

  function initParallaxCards() {
    if (state.reducedMotion || innerWidth < 900) return;
    const shell = $("#browserShell");
    if (!shell) return;

    shell.addEventListener("mousemove", e => {
      const rect = shell.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - .5;
      const py = (e.clientY - rect.top) / rect.height - .5;
      shell.style.transform = `perspective(1100px) rotateY(${px * 4}deg) rotateX(${py * -3}deg) translateY(-5px)`;
    });
    shell.addEventListener("mouseleave", () => {
      shell.style.transform = "";
    });
  }

  function initKeyboard() {
    addEventListener("keydown", e => {
      if (e.key === "Escape" && state.menuOpen) {
        menuToggle?.click();
      }
    });
  }

  function initYear() {
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function initPage() {
    initLoader();
    initReveal();
    initNavigation();
    initSmoothAnchors();
    initShowcase();
    initCursor();
    initMagnetic();
    initGSAP();
    initParallaxCards();
    initKeyboard();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();
