// I Congreso Nacional de Ingeniería — CIP-CN 2027

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initCountdown();
  initEjeCards();
  initPlaceholderForms();
  initGoogleForms();
  initFormChooser();
  initHeroCarousel();
  initSponsorMarquee();
  initVerCompleto();
  initScrollReveal();
});

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

function initCountdown() {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;

  const targetDate = new Date("2027-07-05T00:00:00-05:00").getTime();
  const dEl = el.querySelector("[data-days]");
  const hEl = el.querySelector("[data-hours]");
  const mEl = el.querySelector("[data-minutes]");
  const sEl = el.querySelector("[data-seconds]");

  function tick() {
    const diff = targetDate - Date.now();
    if (diff <= 0) {
      [dEl, hEl, mEl, sEl].forEach((n) => n && (n.textContent = "00"));
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (dEl) dEl.textContent = String(days);
    if (hEl) hEl.textContent = String(hours).padStart(2, "0");
    if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
    if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

function initEjeCards() {
  document.querySelectorAll(".eje-card:not(.compact)").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });
}

function initPlaceholderForms() {
  document.querySelectorAll("form[data-placeholder-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector(".form-success");
      if (success) success.classList.add("show");
      form.reset();
    });
  });
}

/* Inserta el formulario de Google dentro de la pagina.
   El iframe se crea desde JS para no pedir la URL hasta que haga falta y para
   poder mostrar un aviso claro mientras no se haya configurado. */
/* Inserta un formulario de Google dentro de la caja indicada.
   Lo usan tanto el formulario fijo como el selector de motivo. */
function montarGform(caja, src, titulo) {
  caja.classList.remove("is-ready");
  caja.innerHTML =
    '<div class="gform-skeleton"><span class="spinner" aria-hidden="true"></span>' +
    "<span>Cargando formulario…</span></div>";

  // Todavia con la URL de ejemplo: se avisa en lugar de cargar un 404.
  if (!src || src.indexOf("PEGAR_AQUI_EL_ID_DEL_FORMULARIO") !== -1) {
    caja.innerHTML =
      '<div class="gform-pending">' +
      "<strong>Formulario pendiente de conectar</strong>" +
      "<span>Pega la URL del formulario de Google en el atributo " +
      "<code>data-gform-src</code> de esta página.</span>" +
      "</div>";
    return;
  }

  caja.classList.add("tiene-form");

  var frame = document.createElement("iframe");
  frame.className = "gform-frame";
  frame.src = src;
  frame.title = (titulo ? titulo + " — " : "") +
    "I Congreso Nacional de Ingeniería";
  frame.loading = "lazy";
  frame.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  frame.addEventListener("load", function () { caja.classList.add("is-ready"); });
  caja.appendChild(frame);
}

/* Formulario que se carga solo, sin eleccion previa. */
function initGoogleForms() {
  document.querySelectorAll("[data-gform]").forEach(function (caja) {
    montarGform(caja, caja.dataset.gformSrc || "", "Formulario de contacto");
  });
}

/* Selector de motivo: tres botones y, al pulsar uno, se carga su formulario.
   Antes de elegir no se carga ningun iframe de Google. */
function initFormChooser() {
  document.querySelectorAll("[data-form-chooser]").forEach(function (grupo) {
    var caja = document.getElementById(grupo.dataset.formChooser);
    if (!caja) return;

    var botones = Array.prototype.slice.call(
      grupo.querySelectorAll("[data-gform-src]")
    );

    botones.forEach(function (boton) {
      boton.addEventListener("click", function () {
        botones.forEach(function (otro) {
          otro.setAttribute("aria-pressed", otro === boton ? "true" : "false");
        });
        montarGform(caja, boton.dataset.gformSrc, boton.dataset.titulo);

        /* En movil el formulario queda fuera de pantalla: se acerca solo. */
        if (window.matchMedia("(max-width: 980px)").matches) {
          caja.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  });
}

/* Carrusel del hero: alterna las imágenes con fundido y puntos de navegación.
   Los puntos se generan según cuántas <img> haya, así que agregar o quitar
   imágenes en el HTML no obliga a tocar este archivo. */
function initHeroCarousel() {
  var INTERVALO = 5000;

  document.querySelectorAll("[data-carousel]").forEach(function (caja) {
    var fotos = Array.prototype.slice.call(caja.querySelectorAll("img"));
    if (fotos.length < 2) return; // con una sola imagen no hay nada que rotar

    var lenta = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var actual = 0;
    var timer = null;

    /* Puntos de navegación */
    var puntos = document.createElement("div");
    puntos.className = "carousel-dots";
    puntos.setAttribute("role", "tablist");
    puntos.setAttribute("aria-label", "Seleccionar imagen");

    var botones = fotos.map(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Imagen " + (i + 1) + " de " + fotos.length);
      b.addEventListener("click", function () {
        mostrar(i);
        reiniciar();
      });
      puntos.appendChild(b);
      return b;
    });

    /* Barra inferior: Anterior | puntos | Siguiente */
    function flecha(clase, texto, signo) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "carousel-arrow " + clase;
      b.innerHTML = signo < 0
        ? '<span class="chev" aria-hidden="true">&lsaquo;</span><span class="txt">' + texto + "</span>"
        : '<span class="txt">' + texto + '</span><span class="chev" aria-hidden="true">&rsaquo;</span>';
      b.setAttribute("aria-label", texto + " imagen");
      b.addEventListener("click", function () {
        mostrar(actual + signo);
        reiniciar();
      });
      return b;
    }

    var barra = document.createElement("div");
    barra.className = "carousel-nav";
    barra.appendChild(flecha("is-prev", "Anterior", -1));
    barra.appendChild(puntos);
    barra.appendChild(flecha("is-next", "Siguiente", 1));
    caja.appendChild(barra);

    /* Flechas del teclado cuando el carrusel tiene el foco */
    caja.tabIndex = caja.tabIndex < 0 ? 0 : caja.tabIndex;
    caja.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      mostrar(actual + (e.key === "ArrowLeft" ? -1 : 1));
      reiniciar();
    });

    function mostrar(i) {
      actual = (i + fotos.length) % fotos.length;
      fotos.forEach(function (img, n) {
        img.classList.toggle("is-active", n === actual);
      });
      botones.forEach(function (b, n) {
        b.setAttribute("aria-selected", n === actual ? "true" : "false");
      });
    }

    function avanzar() { mostrar(actual + 1); }

    function arrancar() {
      /* Sin autoplay si el usuario pidió menos animación: los puntos siguen
         funcionando para pasar las imágenes a mano. */
      if (lenta || timer) return;
      timer = setInterval(avanzar, INTERVALO);
    }

    function detener() {
      clearInterval(timer);
      timer = null;
    }

    function reiniciar() {
      detener();
      arrancar();
    }

    /* Se pausa al pasar el cursor o al enfocar con teclado, y cuando la
       pestaña deja de estar visible. */
    caja.addEventListener("mouseenter", detener);
    caja.addEventListener("mouseleave", arrancar);
    caja.addEventListener("focusin", detener);
    caja.addEventListener("focusout", arrancar);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) detener();
      else arrancar();
    });

    mostrar(0);
    arrancar();
  });
}

/* Aparición al hacer scroll.
   Los bloques que la CSS deja ocultos reciben la clase "rv-in" cuando asoman
   en pantalla. Los hermanos de una misma rejilla entran escalonados.

   Dos motores:
     1. IntersectionObserver, que es lo eficiente y lo normal.
     2. Un respaldo por scroll, que se activa si el observador no responde
        (hay entornos donde queda suspendido). Sin esto el contenido podría
        quedarse invisible, que es peor que no tener animación.

   window.revealScan() vuelve a revisar la página: lo llaman las vistas que se
   arman desde JavaScript (los ejes temáticos) después de inyectar su HTML. */
function initScrollReveal() {
  var raiz = document.documentElement;
  if (!raiz.classList.contains("reveal-on")) return;

  var SELECTOR = [
    ".section-head", ".eje-tile", ".eje-mini", ".tier-card", ".modality-card",
    ".gain-item", ".contact-card", ".cta-banner", ".note-box", ".pending-box",
    ".quote-block", ".closing-quote", ".eje-block", ".eje-prioridad",
    ".eje-card-side", ".eje-declaracion", ".eje-nav", ".two-col > *",
    ".services-grid > *", ".checklist > li", "[data-reveal]"
  ].join(",");

  var PASO = 70;    // ms entre hermanos
  var TOPE = 420;   // retraso máximo, para que una rejilla larga no se eternice

  var pendientes = [];   // lo que aún no ha entrado
  var observador = null;
  var respondio = false; // ¿el observador dio señales de vida?

  function entrar(el) {
    if (el.classList.contains("rv-in")) return;

    /* El escalonado se calcula al entrar, no al cargar: así depende de la
       posición real del elemento dentro de su grupo. */
    var hermanos = Array.prototype.filter.call(
      el.parentNode ? el.parentNode.children : [],
      function (h) { return h.matches && h.matches(SELECTOR); }
    );
    var i = hermanos.indexOf(el);
    el.style.setProperty("--rv-d", Math.min(i < 0 ? 0 : i * PASO, TOPE) + "ms");
    el.classList.add("rv-in");

    var n = pendientes.indexOf(el);
    if (n > -1) pendientes.splice(n, 1);
    if (observador) observador.unobserve(el); // una sola vez
  }

  /* Respaldo: revela lo que ya asoma por el borde inferior.
     Se limita por tiempo en vez de requestAnimationFrame, porque rAF queda
     suspendido mientras la pestana no esta visible y entonces el respaldo no
     serviria justo cuando hace falta. Son pocos elementos: medirlos es barato. */
  var ultimo = 0;
  function revisarPorScroll() {
    var ahora = Date.now();
    if (ahora - ultimo < 80) return;
    ultimo = ahora;
    var limite = (window.innerHeight || 0) * 0.92;
    pendientes.slice().forEach(function (el) {
      if (el.getBoundingClientRect().top < limite) entrar(el);
    });
    if (!pendientes.length) apagarRespaldo();
  }

  var respaldoActivo = false;
  function encenderRespaldo() {
    if (respaldoActivo) return;
    respaldoActivo = true;
    if (observador) { observador.disconnect(); observador = null; }
    window.addEventListener("scroll", revisarPorScroll, { passive: true });
    window.addEventListener("resize", revisarPorScroll, { passive: true });
    /* Si la pagina cargo en segundo plano, al volver hay que revisar aunque
       el visitante no haya movido el scroll. */
    document.addEventListener("visibilitychange", revisarPorScroll);
    revisarPorScroll();
  }
  function apagarRespaldo() {
    if (!respaldoActivo) return;
    window.removeEventListener("scroll", revisarPorScroll);
    window.removeEventListener("resize", revisarPorScroll);
    document.removeEventListener("visibilitychange", revisarPorScroll);
    respaldoActivo = false;
  }

  if ("IntersectionObserver" in window) {
    observador = new IntersectionObserver(function (entradas) {
      respondio = true;
      entradas.forEach(function (e) {
        if (e.isIntersecting) entrar(e.target);
      });
    }, {
      /* Se dispara un poco antes de que el bloque toque el borde inferior */
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    });
  }

  function revisar(ambito) {
    var nodos = (ambito || document).querySelectorAll(SELECTOR);
    Array.prototype.forEach.call(nodos, function (el) {
      if (el.dataset.rvSeen) return;
      el.dataset.rvSeen = "1";
      pendientes.push(el);
      if (observador) observador.observe(el);
    });
    if (respaldoActivo) revisarPorScroll();
  }

  /* La cabecera del hero ya está a la vista al abrir: se muestra de una vez
     para no retrasar lo primero que lee el visitante. */
  var primera = document.querySelector(".page-header .section-head, .eje-hero");
  if (primera) primera.classList.add("rv-in");

  window.revealScan = revisar;
  revisar();
  raiz.classList.add("reveal-ready");

  /* Si el observador no dio señales, se pasa al respaldo por scroll. */
  if (!observador) encenderRespaldo();
  else setTimeout(function () { if (!respondio) encenderRespaldo(); }, 1200);
}

/* Boton "Ver junta directiva completa".
   El panel viene abierto en el HTML: si este script no llega a correr, la
   informacion igual se ve. Aqui se cierra y se le da el comportamiento. */
function initVerCompleto() {
  document.querySelectorAll("[data-ver-completo]").forEach(function (boton) {
    var panel = document.getElementById(boton.getAttribute("aria-controls"));
    if (!panel) return;

    var etiqueta = boton.querySelector("span");
    var ABIERTO = "Ver menos";
    var CERRADO = etiqueta ? etiqueta.textContent : "Ver completo";

    function pintar(abierto) {
      panel.hidden = !abierto;
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
      if (etiqueta) etiqueta.textContent = abierto ? ABIERTO : CERRADO;
    }

    pintar(false); // estado inicial una vez que sabemos que el JS corre

    boton.addEventListener("click", function () {
      var abrir = boton.getAttribute("aria-expanded") !== "true";
      pintar(abrir);
      /* Lo que se acaba de mostrar no existia para la aparicion al scroll */
      if (abrir && window.revealScan) window.revealScan(panel);
    });
  });
}

/* Cinta giratoria de auspiciadores.
   Para que el giro no tenga cortes, el carril debe repetir los logos las
   veces necesarias para cubrir el ancho visible mas de una vez. Aqui se
   clonan y se calcula la duracion segun el ancho real, de modo que la cinta
   siempre avance a la misma velocidad, con 6 logos o con 20.

   El montaje se dispara con un ResizeObserver y no al cargar: al inicio el
   contenedor puede medir 0 (tipografias sin cargar, pestana en segundo
   plano) y entonces no habria con que calcular. Asi se arma en cuanto tiene
   un ancho real, y se rehace solo si la ventana cambia de tamano. */
function initSponsorMarquee() {
  var VELOCIDAD = 55; // pixeles por segundo

  document.querySelectorAll("[data-marquee]").forEach(function (caja) {
    var carril = caja.querySelector(".sponsor-slots");
    if (!carril) return;

    var originales = Array.prototype.slice.call(carril.children);
    if (!originales.length) return;

    var ultimoAncho = 0;

    function montar() {
      var visible = caja.clientWidth;
      if (!visible) return;                       // aun sin medidas utiles
      if (Math.abs(visible - ultimoAncho) < 2) return; // nada que rehacer
      ultimoAncho = visible;

      /* Se vuelve al estado original antes de recalcular, para que un cambio
         de tamano no acumule clones. */
      caja.classList.remove("is-looping");
      carril.style.removeProperty("--sp-dur");
      carril.style.removeProperty("--sp-shift");
      while (carril.children.length > originales.length) {
        carril.removeChild(carril.lastChild);
      }

      var anchoSet = carril.scrollWidth;
      if (!anchoSet) return;

      /* El salto de una vuelta es el juego de logos MAS el espacio que lo
         separa del siguiente. Si se usara un porcentaje del carril no
         cuadraria: flex no pone separacion despues del ultimo elemento, y la
         cinta daria un tironcito en cada vuelta. */
      var hueco = parseFloat(getComputedStyle(carril).columnGap) || 0;
      var paso = anchoSet + hueco;

      /* Copias necesarias para que siempre haya logos entrando por la derecha */
      var copias = Math.max(2, Math.ceil(visible / paso) + 1);

      for (var c = 1; c < copias; c++) {
        originales.forEach(function (el) {
          var clon = el.cloneNode(true);
          clon.setAttribute("aria-hidden", "true");
          carril.appendChild(clon);
        });
      }

      /* Cada vuelta recorre exactamente un juego: al terminar, el carril
         vuelve al inicio y la imagen es identica. */
      carril.style.setProperty("--sp-shift", (-paso) + "px");
      carril.style.setProperty("--sp-dur", (paso / VELOCIDAD).toFixed(2) + "s");
      caja.classList.add("is-looping");
    }

    if ("ResizeObserver" in window) {
      var espera;
      new ResizeObserver(function () {
        clearTimeout(espera);
        espera = setTimeout(montar, 150);
      }).observe(caja);
    } else {
      window.addEventListener("resize", montar);
      window.addEventListener("load", montar);
    }
    montar(); // por si ya tiene medidas
  });
}
