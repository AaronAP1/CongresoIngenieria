/* ==========================================================================
   PLANO DE EXHIBICIÓN — fuente única de datos
   --------------------------------------------------------------------------
   Alimenta el plano interactivo de exhibicion.html (lo dibuja js/plano.js).

   Todos los módulos arrancan "disponible": el Comité aún no asigna ninguno.

   Cómo actualizar un módulo (solo se toca MODULOS):
     · Cambia su estado: "disponible" | "reservado" | "ocupado".
     · Si pasa a "ocupado" o "reservado", pon empresa y rubro.
     · Para dejarlo libre, basta con "disponible" y empresa vacía.

   Cada fila de MODULOS es:
     [ código, estado, empresa, rubro ]

   El código es el del plano de planta. Su letra decide el tipo, la medida y
   la zona (ver TIPOS); los módulos sin letra (01 a 04) son del tipo M.

   Inventario: 52 módulos (A 26 · B 12 · C 2 · E 2 · F 6 · M 4),
               unos 520 m² de stands.
   ========================================================================== */

window.PLANO = {

  /* Qué es cada letra. El texto sale tal cual en la ficha del módulo. */
  tipos: {
    A: { nombre: "Stand",          medida: "3 × 2 m",  zona: "Perímetro" },
    B: { nombre: "Stand",          medida: "4 × 3 m",  zona: "Bloques centrales" },
    C: { nombre: "Stand ampliado", medida: "9 × 2 m",  zona: "Perímetro" },
    E: { nombre: "Isla",           medida: "10 × 6 m", zona: "Centro del recinto" },
    F: { nombre: "Stand",          medida: "2 × 2 m",  zona: "Fondo del recinto" },
    M: { nombre: "Módulo",         medida: "4 × 2 m",  zona: "Pasillo central" }
  },

  /* Situación de los 52 módulos ----------------------------------------- */
  modulos: [
    /* A — stands de 3 × 2 en el perímetro */
    ["A01", "disponible", "", ""],
    ["A02", "disponible", "", ""],
    ["A03", "disponible", "", ""],
    ["A04", "disponible", "", ""],
    ["A05", "disponible", "", ""],
    ["A06", "disponible", "", ""],
    ["A07", "disponible", "", ""],
    ["A08", "disponible", "", ""],
    ["A09", "disponible", "", ""],
    ["A10", "disponible", "", ""],
    ["A11", "disponible", "", ""],
    ["A12", "disponible", "", ""],
    ["A13", "disponible", "", ""],
    ["A14", "disponible", "", ""],
    ["A15", "disponible", "", ""],
    ["A16", "disponible", "", ""],
    ["A17", "disponible", "", ""],
    ["A18", "disponible", "", ""],
    ["A19", "disponible", "", ""],
    ["A20", "disponible", "", ""],
    ["A21", "disponible", "", ""],
    ["A22", "disponible", "", ""],
    ["A23", "disponible", "", ""],
    ["A30", "disponible", "", ""],
    ["A31", "disponible", "", ""],
    ["A32", "disponible", "", ""],

    /* B — stands de 4 × 3 en los tres bloques centrales */
    ["B03", "disponible", "", ""],
    ["B04", "disponible", "", ""],
    ["B06", "disponible", "", ""],
    ["B07", "disponible", "", ""],
    ["B10", "disponible", "", ""],
    ["B11", "disponible", "", ""],
    ["B12", "disponible", "", ""],
    ["B13", "disponible", "", ""],
    ["B14", "disponible", "", ""],
    ["B15", "disponible", "", ""],
    ["B16", "disponible", "", ""],
    ["B17", "disponible", "", ""],

    /* C — stands ampliados de 9 × 2 */
    ["C01", "disponible", "", ""],
    ["C04", "disponible", "", ""],

    /* E — islas de 10 × 6 */
    ["E01", "disponible", "", ""],
    ["E02", "disponible", "", ""],

    /* F — stands de 2 × 2 al fondo */
    ["F01", "disponible", "", ""],
    ["F02", "disponible", "", ""],
    ["F03", "disponible", "", ""],
    ["F04", "disponible", "", ""],
    ["F05", "disponible", "", ""],
    ["F06", "disponible", "", ""],

    /* M — módulos de 4 × 2 en el pasillo central */
    ["01", "disponible", "", ""],
    ["02", "disponible", "", ""],
    ["03", "disponible", "", ""],
    ["04", "disponible", "", ""]
  ],

  /* ======================================================================
     PLANTA — dónde va cada cosa. Solo se toca si cambia el plano.
     Todo en metros: [ x, y, ancho, alto ], medidos desde la esquina
     superior izquierda del recinto (el ingreso queda abajo a la derecha).
     ====================================================================== */

  /* Contorno del recinto: 60.40 × 25.20 m, con la esquina del ingreso
     cortada en diagonal. */
  recinto: {
    ancho: 60.4,
    alto: 25.2,
    contorno: [[0, 0], [60.4, 0], [60.4, 13.2], [49.6, 25.2], [0, 25.2]]
  },

  ubicaciones: {
    /* Fila superior */
    A12: [7, 0, 3, 2],  A13: [10, 0, 3, 2], A14: [13, 0, 3, 2], A15: [16, 0, 3, 2],
    A16: [19, 0, 3, 2], A17: [22, 0, 3, 2], A18: [25, 0, 3, 2], A30: [28, 0, 3, 2],
    A31: [31, 0, 3, 2], A32: [34, 0, 3, 2], C04: [37, 0, 9, 2],
    A19: [52, 0, 3, 2], A20: [55, 0, 3, 2],

    /* Columna derecha */
    A21: [58, 2, 2, 3], A22: [58, 5, 2, 3], A23: [58, 8, 2, 3],

    /* Fila inferior */
    A11: [5, 23, 3, 2],  A10: [8, 23, 3, 2],  A09: [11, 23, 3, 2], A08: [14, 23, 3, 2],
    A07: [17, 23, 3, 2], A06: [20, 23, 3, 2], A05: [23, 23, 3, 2], A04: [26, 23, 3, 2],
    A03: [29, 23, 3, 2], A02: [32, 23, 3, 2], A01: [35, 23, 3, 2], C01: [38, 23, 9, 2],

    /* Fondo */
    F06: [0, 2, 2, 2],  F05: [0, 4, 2, 2],  F04: [0, 6, 2, 2],
    F03: [0, 17, 2, 2], F02: [0, 19, 2, 2], F01: [0, 21, 2, 2],

    /* Bloques B */
    B14: [5, 5, 4, 3],   B13: [9, 5, 4, 3],   B15: [5, 8, 4, 3],   B12: [9, 8, 4, 3],
    B06: [26, 5, 4, 3],  B03: [30, 5, 4, 3],  B07: [26, 8, 4, 3],  B04: [30, 8, 4, 3],
    B16: [5, 14, 4, 3],  B11: [9, 14, 4, 3],  B17: [5, 17, 4, 3],  B10: [9, 17, 4, 3],

    /* Módulos del pasillo central */
    "04": [17.5, 6, 2, 4], "03": [19.5, 6, 2, 4],
    "02": [42, 6, 2, 4],   "01": [44, 6, 2, 4],

    /* Islas */
    E02: [25, 14, 10, 6], E01: [39, 14, 10, 6]
  },

  /* Lo que no se alquila. forma "vertical" escribe el rótulo de canto. */
  servicios: [
    { nombre: "Receso de café",  clase: "zona-cafe",      forma: "vertical", sitio: [37, 5, 2, 6] },
    { nombre: "Receso de café",  clase: "zona-cafe",      sitio: [17.5, 14, 3, 6] },
    { nombre: "Árbol existente", clase: "zona-arbol",     sitio: [46, 0, 6, 2] },
    { nombre: "Monumento",       clase: "zona-monumento", sitio: [48.7, 4.9, 6, 6] }
  ]
};
