/* ==========================================================================
   PLANO DE EXHIBICIÓN — dibujo e interacción
   --------------------------------------------------------------------------
   Lee js/plano-data.js y rellena el plano de exhibicion.html:

     · reparte los 105 stands en sus bandas (A, B, C, D, E),
     · pinta cada uno según su estado (disponible / reservado / ocupado),
     · cuenta cuántos hay de cada estado para la leyenda,
     · filtra por estado y por zona,
     · al pulsar un módulo muestra su ficha al costado.

   El plano no se toca desde aquí: la planta (escenario, salas, pórticos,
   servicios) está escrita en el HTML. Este archivo solo llena las bandas
   que llevan data-banda.
   ========================================================================== */

(function () {
  "use strict";

  var PLANO = window.PLANO;
  if (!PLANO) return;

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

  /* El número del código decide la banda: la fila B tiene 28 módulos
     repartidos en dos bandas de 14, la D tiene tres de 7, etc. */
  function banda(letra, n) {
    if (letra === "A") return "A";
    if (letra === "B" || letra === "C") return letra + (n <= 14 ? "2" : "1");
    if (letra === "D") return "D" + (n <= 7 ? "1" : n <= 14 ? "2" : "3");
    if (letra === "E") return "E" + (n <= 7 ? "1" : "2");
    return letra;
  }

  /* Convierte las filas compactas del archivo de datos en objetos */
  var MODULOS = PLANO.modulos.map(function (m) {
    var codigo = m[0];
    var letra = codigo.charAt(0);
    var n = parseInt(codigo.split("-")[1], 10);
    var tipo = PLANO.tipos[letra] || {};
    return {
      codigo: codigo,
      letra: letra,
      banda: banda(letra, n),
      estado: m[1],
      empresa: m[2] || "",
      rubro: m[3] || "",
      tipo: tipo.nombre || "",
      medida: tipo.medida || "",
      zona: tipo.zona || ""
    };
  });

  var SALAS = PLANO.salas.map(function (s) {
    var tipo = PLANO.tipos.S;
    return {
      codigo: s.codigo,
      letra: "S",
      banda: "S",
      estado: s.estado,
      empresa: s.empresa || "",
      rubro: s.nombre,
      tipo: tipo.nombre,
      medida: tipo.medida,
      zona: tipo.zona,
      nombre: s.nombre
    };
  });

  var TODOS = MODULOS.concat(SALAS);

  /* ------------------------------------------------------------- Dibujo -- */

  function etiquetaAria(m) {
    var partes = [m.tipo + " " + m.codigo, ESTADOS[m.estado] || m.estado];
    if (m.empresa) partes.push(m.empresa);
    else if (m.nombre) partes.push(m.nombre);
    return partes.join(", ") + ".";
  }

  function celda(m) {
    var etiqueta = m.nombre
      ? '<span class="plano-celda-nombre">' + esc(m.nombre) + "</span>"
      : (m.empresa ? '<span class="plano-celda-emp">' + esc(m.empresa) + "</span>" : "");

    /* El title sirve de globo al pasar el cursor: en las bandas angostas
       la celda solo muestra el código. */
    return '<button type="button" class="plano-celda es-' + m.estado + '"' +
      ' data-codigo="' + esc(m.codigo) + '"' +
      ' title="' + esc(etiquetaAria(m)) + '"' +
      ' aria-label="' + esc(etiquetaAria(m)) + '">' +
      '<span class="plano-celda-cod">' + esc(m.codigo) + "</span>" +
      etiqueta +
      "</button>";
  }

  function dibujar() {
    /* Cada contenedor con data-banda recibe los módulos de esa banda */
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-banda]"),
      function (caja) {
        var cual = caja.getAttribute("data-banda");
        caja.innerHTML = TODOS.filter(function (m) {
          return m.banda === cual;
        }).map(celda).join("");
      }
    );
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
    if (m.nombre) datos += fila("Capítulo", m.nombre);
    if (m.empresa) datos += fila("Asignado a", m.empresa);
    if (m.rubro && !m.nombre) datos += fila("Rubro", m.rubro);

    var pie = m.estado === "disponible"
      ? '<a class="btn btn-primary btn-block" href="contacto.html?stand=' +
        encodeURIComponent(m.codigo) + '">Reservar el módulo ' + esc(m.codigo) + "</a>"
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

    /* Un solo escuchador para las 112 celdas, en lugar de uno por celda */
    document.getElementById("plano-mapa").addEventListener("click", function (e) {
      var celda = e.target.closest ? e.target.closest(".plano-celda") : null;
      if (celda) seleccionar(celda.getAttribute("data-codigo"));
    });

    revisarDesborde();
    window.addEventListener("resize", revisarDesborde);

    if (window.revealScan) window.revealScan();
  });
})();
