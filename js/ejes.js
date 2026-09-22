/* ==========================================================================
   EJES TEMÁTICOS — render de la grilla y de la ficha de detalle
   Lee window.EJES desde js/ejes-data.js. Cargar siempre después de ese archivo.
   ========================================================================== */

(function () {
  "use strict";

  var EJES = window.EJES || [];

  /* Íconos de línea, uno por eje. La clave coincide con el campo "icono". */
  var ICONOS = {
    puente:    '<path d="M2 17h20"/><path d="M2 17c4 0 4-7 10-7s6 7 10 7"/><path d="M6 17v-3M12 17v-6M18 17v-3"/>',
    mineral:   '<path d="M12 2l7 5-2.5 13h-9L5 7z"/><path d="M5 7h14M12 2l-3.5 18M12 2l3.5 18"/>',
    agua:      '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
    agro:      '<path d="M12 21V9"/><path d="M12 12c0-3 2.5-5.5 6-6 0 3.5-2.5 6-6 6z"/><path d="M12 15c0-3-2.5-5.5-6-6 0 3.5 2.5 6 6 6z"/><path d="M6 21h12"/>',
    energia:   '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    fabrica:   '<path d="M3 21V10l5 3.5V10l5 3.5V10l5 3.5V21H3z"/><path d="M3 21h18"/><path d="M7 17h2M13 17h2"/>',
    chip:      '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    cohete:    '<path d="M12 2c3.5 2.5 5 6 5 10l-3 3h-4l-3-3c0-4 1.5-7.5 5-10z"/><circle cx="12" cy="9" r="1.6"/><path d="M9 18l-2 4 4-2M15 18l2 4-4-2"/>',
    birrete:   '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    mapa:      '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
    inversion: '<path d="M3 17l5-5 4 3 8-8"/><path d="M15 7h5v5"/><path d="M3 21h18"/>',
    balanza:   '<path d="M12 3v18M5 7h14M5 21h14"/><path d="M5 7l-3 6a3 3 0 0 0 6 0L5 7zM19 7l-3 6a3 3 0 0 0 6 0l-3-6z"/>'
  };


  /* Motivo grafico de fondo del hero, uno por eje. Es decorativo: dibuja en
     un lienzo de 240x240 con trazo del color del tema y opacidad baja.
     La clave es el numero de eje. */
  var MOTIVOS = {
    /* Puente atirantado: torre, tirantes y tablero */
    1: '<path d="M120 26v186"/><path d="M120 46 44 176M120 46l76 130"/>' +
       '<path d="M120 80 62 176M120 80l58 96"/><path d="M120 114 80 176M120 114l40 62"/>' +
       '<path d="M18 176h204"/>',
    /* Anillos concentricos: el boceto original del eje 2 */
    2: '<circle cx="120" cy="120" r="38"/><circle cx="120" cy="120" r="68"/>' +
       '<circle cx="120" cy="120" r="98"/>',
    /* Ondas de agua */
    3: '<path d="M0 84q30-24 60 0t60 0 60 0 60 0"/>' +
       '<path d="M0 124q30-24 60 0t60 0 60 0 60 0"/>' +
       '<path d="M0 164q30-24 60 0t60 0 60 0 60 0"/>',
    /* Surcos de cultivo y un brote */
    4: '<path d="M6 206q57-30 114 0t114 0"/><path d="M6 176q57-30 114 0t114 0"/>' +
       '<path d="M120 152V54"/>' +
       '<path d="M120 104c0-26 21-47 50-50 0 29-21 50-50 50z"/>' +
       '<path d="M120 132c0-26-21-47-50-50 0 29 21 50 50 50z"/>',
    /* Rayo entre dos arcos de energia */
    5: '<path d="M134 34 86 130h38l-12 74 62-100h-40z"/>' +
       '<path d="M58 62a84 84 0 0 0 0 116M182 62a84 84 0 0 1 0 116"/>',
    /* Engranaje */
    6: '<circle cx="120" cy="120" r="50"/><circle cx="120" cy="120" r="20"/>' +
       '<path d="M120 70V44M120 170v26M70 120H44M170 120h26"/>' +
       '<path d="m84 84-18-18M156 156l18 18M156 84l18-18M84 156l-18 18"/>',
    /* Circuito integrado con pistas y nodos */
    7: '<rect x="82" y="82" width="76" height="76" rx="10"/>' +
       '<path d="M102 82V38M138 82V38M102 158v44M138 158v44' +
       'M82 102H38M82 138H38M158 102h44M158 138h44"/>' +
       '<circle cx="102" cy="38" r="7"/><circle cx="138" cy="202" r="7"/>' +
       '<circle cx="38" cy="138" r="7"/><circle cx="202" cy="102" r="7"/>',
    /* Orbitas alrededor de un nucleo */
    8: '<circle cx="120" cy="120" r="22"/>' +
       '<ellipse cx="120" cy="120" rx="104" ry="40"/>' +
       '<ellipse cx="120" cy="120" rx="104" ry="40" transform="rotate(60 120 120)"/>' +
       '<ellipse cx="120" cy="120" rx="104" ry="40" transform="rotate(-60 120 120)"/>',
    /* Red de personas conectadas */
    9: '<path d="M56 58 120 112 184 58M56 58 68 176M184 58l-12 118M68 176 120 112l52 64M68 176h104"/>' +
       '<circle cx="56" cy="58" r="10"/><circle cx="184" cy="58" r="10"/>' +
       '<circle cx="120" cy="112" r="13"/><circle cx="68" cy="176" r="10"/>' +
       '<circle cx="172" cy="176" r="10"/>',
    /* Malla hexagonal: territorio */
    10: '<path d="M120 36 150 54v36l-30 18-30-18V54z"/>' +
        '<path d="M82 108l30 18v36l-30 18-30-18v-36z"/>' +
        '<path d="M158 108l30 18v36l-30 18-30-18v-36z"/>',
    /* Barras en alza con flecha */
    11: '<path d="M32 196h176"/>' +
        '<path d="M62 196v-44M104 196v-74M146 196v-104M188 196v-136"/>' +
        '<path d="M46 126 92 84l38 30 62-62"/><path d="M168 52h30v30"/>',
    /* Columnas institucionales */
    12: '<path d="M24 78 120 32l96 46"/>' +
        '<path d="M52 78v96M92 78v96M148 78v96M188 78v96"/>' +
        '<path d="M24 190h192M36 174h168"/>'
  };

  function motivo(num) {
    var d = MOTIVOS[num];
    if (!d) return "";
    return '<span class="eje-hero-motivo" aria-hidden="true">' +
      '<svg viewBox="0 0 240 240" fill="none" stroke="currentColor" ' +
      'stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
      d + "</svg></span>";
  }

  function svg(clave) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONOS[clave] || ICONOS.puente) + "</svg>";
  }

  /* Escapa texto antes de inyectarlo como HTML. */
  function esc(txt) {
    return String(txt == null ? "" : txt)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function dosDigitos(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function porEje(num) {
    for (var i = 0; i < EJES.length; i++) {
      if (EJES[i].num === num) return EJES[i];
    }
    return null;
  }

  /* ---------------------------------------------------------------- Grilla */

  function renderGrilla(cont) {
    cont.innerHTML = EJES.map(function (e) {
      return '<a class="eje-tile eje-t' + e.num + '" href="eje.html?eje=' + e.num + '">' +
        '<span class="eje-tile-icon">' + svg(e.icono) + "</span>" +
        '<span class="eje-tile-num">Eje ' + dosDigitos(e.num) + "</span>" +
        "<h3>" + esc(e.titulo) + "</h3>" +
        "<p>" + esc(e.resultado) + "</p>" +
        '<span class="eje-tile-cta">Conocer el eje' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M5 12h13M12 5l7 7-7 7"/></svg></span>' +
        "</a>";
    }).join("");
  }

  /* Version compacta para la portada: solo numero y titulo. */

  function renderMini(cont) {
    cont.innerHTML = EJES.map(function (e) {
      return '<a class="eje-mini" href="eje.html?eje=' + e.num + '">' +
        '<span class="eje-mini-num">' + dosDigitos(e.num) + "</span>" +
        "<span>" + esc(e.titulo) + "</span>" +
        "</a>";
    }).join("");
  }

  /* ----------------------------------------------------------------- Ficha */

  function bloquePendiente(texto) {
    return '<p class="eje-pendiente">' + esc(texto) + "</p>";
  }

  function renderFicha(eje) {
    var d = eje.detalle || {};
    var dd = dosDigitos(eje.num);

    document.title = "Eje " + dd + ": " + eje.titulo + " — I Congreso Nacional de Ingeniería 2027";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", eje.titulo + ". " + eje.resultado);

    /* La clase de tema tine toda la ficha con el color propio del eje */
    document.body.classList.add("eje-t" + eje.num);

    /* Hero */
    document.getElementById("eje-hero").innerHTML =
      '<div class="container">' +
        '<p class="crumb"><a href="index.html">Inicio</a> / ' +
        '<a href="ejes-tematicos.html">Ejes temáticos</a> / Eje ' + dd + "</p>" +
        '<span class="eje-marca">' +
          '<span class="eje-num">' + dd + "</span>" +
          '<span class="eje-pill">Eje temático</span>' +
        "</span>" +
        "<h1>" + esc(eje.titulo) + "</h1>" +
        '<p class="eje-hero-sub">' + esc(eje.resultado) + "</p>" +
      "</div>" +
      motivo(eje.num);

    /* Columna principal */
    var main = "";

    main += '<section class="eje-block eje-objetivo">' +
      "<h2>Objetivo estratégico</h2>" +
      (d.objetivo ? "<p>" + esc(d.objetivo) + "</p>"
                  : bloquePendiente("El objetivo estratégico de este eje está en preparación.")) +
      "</section>";

    if (d.prioridad) {
      main += '<section class="eje-prioridad">' +
        "<h2>Prioridad</h2><p>" + esc(d.prioridad) + "</p></section>";
    }

    main += '<section class="eje-block">' +
      "<h2>Alcance prioritario</h2>" +
      (d.alcance && d.alcance.length
        ? '<ul class="eje-alcance">' + d.alcance.map(function (a) {
            return "<li><span></span>" + esc(a) + "</li>";
          }).join("") + "</ul>"
        : bloquePendiente("El alcance prioritario de este eje está en preparación.")) +
      "</section>";

    main += '<section class="eje-block">' +
      "<h2>El desafío del Perú</h2>" +
      (d.desafio ? "<p>" + esc(d.desafio) + "</p>"
                 : bloquePendiente("El diagnóstico de este eje está en preparación.")) +
      "</section>";

    document.getElementById("eje-main").innerHTML = main;

    /* Columna lateral */
    var aside = "";

    aside += '<div class="eje-card-side">' +
      "<h3>Metas orientadoras</h3>" +
      (d.metas && d.metas.length
        ? '<ul class="eje-metas">' + d.metas.map(function (m) {
            return "<li><span>" + esc(m.anio) + "</span><p>" + esc(m.texto) + "</p></li>";
          }).join("") + "</ul>"
        : bloquePendiente("Por definir por el Comité Organizador.")) +
      "</div>";

    aside += '<div class="eje-card-side">' +
      "<h3>Indicadores clave</h3>" +
      (d.indicadores && d.indicadores.length
        ? '<ul class="eje-indicadores">' + d.indicadores.map(function (t, i) {
            return "<li><span>" + dosDigitos(i + 1) + "</span><p>" + esc(t) + "</p></li>";
          }).join("") + "</ul>"
        : bloquePendiente("Por definir por el Comité Organizador.")) +
      "</div>";

    if (d.declaracion) {
      aside += '<div class="eje-declaracion">' +
        "<h3>Declaración del Congreso</h3><p>" + esc(d.declaracion) + "</p></div>";
    }

    aside += d.ficha
      ? '<a class="btn btn-primary btn-block" href="' + esc(d.ficha) + '" download>Descargar ficha del eje</a>'
      : '<span class="btn btn-primary btn-block is-disabled" aria-disabled="true" ' +
        'title="La ficha de este eje estará disponible próximamente">Ficha del eje — próximamente</span>';

    document.getElementById("eje-aside").innerHTML = aside;

    /* Eje anterior / siguiente */
    var i = EJES.indexOf(eje);
    var prev = EJES[(i - 1 + EJES.length) % EJES.length];
    var next = EJES[(i + 1) % EJES.length];
    document.getElementById("eje-nav").innerHTML =
      '<a class="eje-nav-link" href="eje.html?eje=' + prev.num + '">' +
        '<span>← Eje ' + dosDigitos(prev.num) + "</span><strong>" + esc(prev.titulo) + "</strong></a>" +
      '<a class="eje-nav-all" href="ejes-tematicos.html">Ver los 12 ejes</a>' +
      '<a class="eje-nav-link align-end" href="eje.html?eje=' + next.num + '">' +
        '<span>Eje ' + dosDigitos(next.num) + " →</span><strong>" + esc(next.titulo) + "</strong></a>";
  }

  function noEncontrado() {
    document.getElementById("eje-hero").innerHTML =
      '<div class="container"><span class="eje-pill">Eje no encontrado</span>' +
      "<h1>No encontramos ese eje temático</h1>" +
      '<p class="eje-hero-sub">Revisa el enlace o vuelve al listado de los 12 ejes del Congreso.</p></div>';
    document.getElementById("eje-main").innerHTML =
      '<p><a class="btn btn-primary" href="ejes-tematicos.html">Ver los 12 ejes temáticos</a></p>';
  }

  /* ------------------------------------------------------------------ Init */

  document.addEventListener("DOMContentLoaded", function () {
    var grilla = document.getElementById("ejes-grid");
    if (grilla) renderGrilla(grilla);

    var mini = document.getElementById("ejes-mini");
    if (mini) renderMini(mini);

    if (document.getElementById("eje-hero")) {
      var num = parseInt(new URLSearchParams(window.location.search).get("eje"), 10);
      var eje = porEje(num);
      if (eje) renderFicha(eje);
      else noEncontrado();
    }

    /* Lo inyectado arriba no existia cuando se monto la aparicion al scroll */
    if (window.revealScan) window.revealScan();
  });
})();
