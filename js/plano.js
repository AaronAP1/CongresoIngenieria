/* ==========================================================================
   PLANO DE EXHIBICIÓN — dibujo e interacción
   --------------------------------------------------------------------------
   Lee js/plano-data.js y dibuja el plano de exhibicion.html:

     · traza el contorno del recinto y el pórtico de ingreso,
     · ubica cada módulo y cada servicio a escala, en metros,
     · pinta cada módulo según su estado (disponible / reservado / ocupado),
     · cuenta cuántos hay de cada estado para la leyenda,
     · filtra por estado y por tipo,
     · al pulsar un módulo muestra su ficha al costado.

   Las posiciones van en porcentaje del recinto: el plano se estira con el
   ancho disponible sin deformarse, porque el recinto guarda su proporción.
   ========================================================================== */

(function () {
  "use strict";

  var PLANO = window.PLANO;
  if (!PLANO) return;

  var R = PLANO.recinto;

  var ESTADOS = {
    disponible: "Disponible",
    reservado: "Reservado",
    ocupado: "Ocupado"
  };

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* Los módulos 01 a 04 no llevan letra en el plano: son del tipo M */
  function letraDe(codigo) {
    var l = codigo.charAt(0);
    return PLANO.tipos[l] ? l : "M";
  }

  /* [x, y, ancho, alto] en metros → posición en % del recinto. El hueco
     de 2 px a cada lado separa los módulos que van pegados. */
  function posicion(sitio, hueco) {
    var h = hueco || 0;
    return "left:calc(" + (sitio[0] / R.ancho * 100) + "% + " + h + "px);" +
      "top:calc(" + (sitio[1] / R.alto * 100) + "% + " + h + "px);" +
      "width:calc(" + (sitio[2] / R.ancho * 100) + "% - " + 2 * h + "px);" +
      "height:calc(" + (sitio[3] / R.alto * 100) + "% - " + 2 * h + "px);";
  }

  /* Convierte las filas compactas del archivo de datos en objetos */
  var TODOS = PLANO.modulos.map(function (m) {
    var codigo = m[0];
    var letra = letraDe(codigo);
    var tipo = PLANO.tipos[letra] || {};
    return {
      codigo: codigo,
      letra: letra,
      sitio: PLANO.ubicaciones[codigo],
      estado: m[1],
      empresa: m[2] || "",
      rubro: m[3] || "",
      tipo: tipo.nombre || "",
      medida: tipo.medida || "",
      zona: tipo.zona || ""
    };
  }).filter(function (m) {
    /* Un código sin ubicación no se puede dibujar: se avisa y se omite */
    if (!m.sitio && window.console) console.warn("plano: falta la ubicación de " + m.codigo);
    return !!m.sitio;
  });

  /* ------------------------------------------------------------- Dibujo -- */

  function etiquetaAria(m) {
    var partes = [m.tipo + " " + m.codigo, ESTADOS[m.estado] || m.estado];
    if (m.empresa) partes.push(m.empresa);
    return partes.join(", ") + ".";
  }

  function celda(m) {
    /* En los módulos chicos solo cabe el código; el nombre de quien lo
       ocupa sale al pasar el cursor y en la ficha del costado. */
    var chica = m.sitio[2] * m.sitio[3] < 12;
    var etiqueta = m.empresa && !chica
      ? '<span class="plano-celda-emp">' + esc(m.empresa) + "</span>"
      : "";

    return '<button type="button" class="plano-celda es-' + m.estado + '"' +
      ' style="' + posicion(m.sitio, 2) + '"' +
      ' data-codigo="' + esc(m.codigo) + '"' +
      ' title="' + esc(etiquetaAria(m)) + '"' +
      ' aria-label="' + esc(etiquetaAria(m)) + '">' +
      '<span class="plano-celda-cod">' + esc(m.codigo) + "</span>" +
      etiqueta +
      "</button>";
  }

  function servicio(s) {
    return '<div class="plano-servicio ' + esc(s.clase) +
      (s.forma === "vertical" ? " es-vertical" : "") + '"' +
      ' style="' + posicion(s.sitio, 2) + '">' + esc(s.nombre) + "</div>";
  }

  /* Contorno y pórtico van en un SVG con las mismas medidas del recinto */
  function trazado() {
    var c = R.contorno;
    var puntos = c.map(function (p) { return p.join(","); }).join(" ");

    /* El pórtico es el lado diagonal: del 3er al 4to vértice */
    var a = c[2], b = c[3];
    var angulo = Math.atan2(a[1] - b[1], a[0] - b[0]) * 180 / Math.PI;
    var mx = (a[0] + b[0]) / 2 - 0.9;
    var my = (a[1] + b[1]) / 2 - 0.8;

    return '<svg class="plano-trazado" viewBox="0 0 ' + R.ancho + " " + R.alto + '"' +
      ' preserveAspectRatio="none" aria-hidden="true">' +
      '<polygon class="plano-piso" points="' + puntos + '"/>' +
      '<line class="plano-portico" x1="' + a[0] + '" y1="' + a[1] +
        '" x2="' + b[0] + '" y2="' + b[1] + '"/>' +
      '<text class="plano-portico-rotulo" x="' + mx + '" y="' + my + '"' +
        ' transform="rotate(' + angulo + " " + mx + " " + my + ')">Pórtico · Ingreso</text>' +
      "</svg>";
  }

  function dibujar() {
    var recinto = document.getElementById("plano-recinto");
    if (!recinto) return;
    recinto.style.aspectRatio = R.ancho + " / " + R.alto;
    recinto.innerHTML = trazado() +
      PLANO.servicios.map(servicio).join("") +
      TODOS.map(celda).join("");
  }

  /* ------------------------------------------------------------ Leyenda -- */

  function contar(estado) {
    return TODOS.filter(function (m) { return m.estado === estado; }).length;
  }

  function pintarConteos() {
    Object.keys(ESTADOS).forEach(function (e) {
      var caja = document.querySelector('[data-conteo="' + e + '"]');
      if (caja) caja.textContent = contar(e);
    });
    var total = document.querySelector("[data-conteo-total]");
    if (total) total.textContent = TODOS.length;
  }

  /* ------------------------------------------------------------- Ficha --- */

  var fichaCaja = document.getElementById("plano-ficha");
  var seleccionado = null;

  function fichaVacia() {
    return '<p class="plano-ficha-vacia">Seleccione un módulo del plano para ver su ' +
      "situación, medidas y ubicación.</p>";
  }

  function fila(rotulo, valor) {
    return "<dt>" + esc(rotulo) + "</dt><dd>" + esc(valor) + "</dd>";
  }

  function pintarFicha(m) {
    if (!fichaCaja) return;

    if (!m) {
      fichaCaja.innerHTML = fichaVacia();
      return;
    }

    var datos = fila("Tipo", m.tipo) + fila("Medida", m.medida) + fila("Zona", m.zona);
    if (m.empresa) datos += fila("Asignado a", m.empresa);
    if (m.rubro) datos += fila("Rubro", m.rubro);

    /* Con número de WhatsApp configurado (js/main.js) la reserva va por
       ahí; si no, al formulario de contacto. */
    var whatsapp = window.enlaceWhatsApp && window.enlaceWhatsApp(
      "Hola, me interesa reservar el módulo " + m.codigo +
      " del área de exhibición del I Congreso Nacional de Ingeniería.");

    var pie = m.estado === "disponible"
      ? '<a class="btn btn-primary btn-block" href="' +
        esc(whatsapp || "contacto.html?stand=" + encodeURIComponent(m.codigo)) + '"' +
        (whatsapp ? ' target="_blank" rel="noopener"' : "") +
        ">Reservar el módulo " + esc(m.codigo) + "</a>"
      : '<p class="plano-ficha-nota">' +
        (m.estado === "reservado"
          ? "Reserva en trámite. Escríbanos si desea quedar en lista de espera."
          : "Módulo ya asignado. Consulte las alternativas disponibles cerca.") +
        "</p>";

    fichaCaja.innerHTML =
      '<span class="plano-ficha-estado es-' + m.estado + '">' +
        esc(ESTADOS[m.estado] || m.estado) + "</span>" +
      "<h3>" + esc(m.codigo) + "</h3>" +
      '<dl class="plano-ficha-datos">' + datos + "</dl>" +
      pie;
  }

  function seleccionar(codigo) {
    var m = TODOS.filter(function (x) { return x.codigo === codigo; })[0];
    if (!m) return;

    seleccionado = codigo;
    Array.prototype.forEach.call(
      document.querySelectorAll(".plano-celda"),
      function (b) {
        b.classList.toggle("is-sel", b.getAttribute("data-codigo") === codigo);
      }
    );
    pintarFicha(m);
  }

  /* ------------------------------------------------------------ Filtros -- */

  var filtroEstado = "todos";
  var filtroZona = "todas";

  function aplicarFiltros() {
    var visibles = 0;

    Array.prototype.forEach.call(
      document.querySelectorAll(".plano-celda"),
      function (b) {
        var m = TODOS.filter(function (x) {
          return x.codigo === b.getAttribute("data-codigo");
        })[0];
        if (!m) return;

        var pasa = (filtroEstado === "todos" || m.estado === filtroEstado) &&
                   (filtroZona === "todas" || m.letra === filtroZona);

        b.classList.toggle("is-apagado", !pasa);
        /* Un módulo apagado sigue visible, pero sale del recorrido del
           tabulador para no estorbar a quien navega con teclado. */
        b.tabIndex = pasa ? 0 : -1;
        if (pasa) visibles++;
      }
    );

    var marcador = document.querySelector("[data-visibles]");
    if (marcador) {
      marcador.textContent = (filtroEstado === "todos" && filtroZona === "todas")
        ? TODOS.length + " módulos en planta"
        : visibles + (visibles === 1 ? " módulo coincide" : " módulos coinciden");
    }
  }

  function montarFiltros() {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-filtro-estado]"),
      function (b) {
        b.addEventListener("click", function () {
          filtroEstado = b.getAttribute("data-filtro-estado");
          Array.prototype.forEach.call(
            document.querySelectorAll("[data-filtro-estado]"),
            function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); }
          );
          aplicarFiltros();
        });
      }
    );

    var zona = document.getElementById("plano-zona");
    if (zona) {
      zona.addEventListener("change", function () {
        filtroZona = zona.value;
        aplicarFiltros();
      });
    }
  }

  /* ----------------------------------------------------------- Desborde -- */

  /* El aviso de "desplace el plano" solo aparece si el plano de verdad no
     entra en pantalla, no a partir de un ancho fijo. */
  function revisarDesborde() {
    var lienzo = document.querySelector(".plano-lienzo");
    if (!lienzo) return;
    lienzo.classList.toggle("se-desplaza", lienzo.scrollWidth > lienzo.clientWidth + 1);
  }

  /* --------------------------------------------------------------- Init -- */

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("plano-mapa")) return;

    dibujar();
    pintarConteos();
    pintarFicha(null);
    montarFiltros();
    aplicarFiltros();

    /* Un solo escuchador para todas las celdas, en lugar de uno por celda */
    document.getElementById("plano-mapa").addEventListener("click", function (e) {
      var celda = e.target.closest ? e.target.closest(".plano-celda") : null;
      if (celda) seleccionar(celda.getAttribute("data-codigo"));
    });

    revisarDesborde();
    window.addEventListener("resize", revisarDesborde);

    if (window.revealScan) window.revealScan();
  });
})();
