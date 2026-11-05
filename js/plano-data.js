/* ==========================================================================
   PLANO DE EXHIBICIÓN — fuente única de datos
   --------------------------------------------------------------------------
   Alimenta el plano interactivo de exhibicion.html (lo dibuja js/plano.js).

   El estado de cada módulo (disponible / reservado / ocupado), la empresa
   y el rubro NO van aquí: se leen de data/modulos.json. Este archivo solo
   guarda los tipos y la planta (dónde va cada módulo y cada servicio).

   Inventario: 58 módulos (A 32 · B 12 · C 2 · E 2 · F 6 · M 4).
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

  /* ======================================================================
     PLANTA — dónde va cada cosa. Solo se toca si cambia el plano.
     Todo en metros: [ x, y, ancho, alto ], medidos desde la esquina
     superior izquierda del recinto (el ingreso queda abajo a la derecha).
     ====================================================================== */

  /* Contorno del recinto: 80.40 × 25.20 m, con la esquina del ingreso
     cortada en diagonal. */
  recinto: {
    ancho: 80.4,
    alto: 25.2,
    contorno: [[0, 0], [80.4, 0], [80.4, 13.2], [69.6, 25.2], [0, 25.2]]
  },

  ubicaciones: {
    /* Fila superior: A12 a A32 seguidos desde la esquina izquierda */
    A12: [0, 0, 3, 2], A13: [3, 0, 3, 2], A14: [6, 0, 3, 2], A15: [9, 0, 3, 2],
    A16: [12, 0, 3, 2], A17: [15, 0, 3, 2], A18: [18, 0, 3, 2], A19: [21, 0, 3, 2],
    A20: [24, 0, 3, 2], A21: [27, 0, 3, 2], A22: [30, 0, 3, 2], A23: [33, 0, 3, 2],
    A24: [36, 0, 3, 2], A25: [39, 0, 3, 2], A26: [42, 0, 3, 2], A27: [45, 0, 3, 2],
    A28: [48, 0, 3, 2], A29: [51, 0, 3, 2], A30: [54, 0, 3, 2], A31: [57, 0, 3, 2],
    A32: [60, 0, 3, 2],
    C04: [63, 0, 9, 2],

    /* Fila inferior */
    A11: [5, 23, 3, 2],  A10: [8, 23, 3, 2],  A09: [11, 23, 3, 2], A08: [14, 23, 3, 2],
    A07: [17, 23, 3, 2], A06: [20, 23, 3, 2], A05: [23, 23, 3, 2], A04: [26, 23, 3, 2],
    A03: [29, 23, 3, 2], A02: [32, 23, 3, 2], A01: [35, 23, 3, 2], C01: [38, 23, 9, 2],

    /* Fondo */
    F06: [0, 2, 2, 2],  F05: [0, 4, 2, 2],  F04: [0, 6, 2, 2],
    F03: [0, 17, 2, 2], F02: [0, 19, 2, 2], F01: [0, 21, 2, 2],

    /* Bloques B */
    B14: [6.7, 5, 4, 3],  B13: [10.7, 5, 4, 3], B15: [6.7, 8, 4, 3],  B12: [10.7, 8, 4, 3],
    B06: [34.6, 5, 4, 3], B03: [38.6, 5, 4, 3], B07: [34.6, 8, 4, 3], B04: [38.6, 8, 4, 3],
    B16: [6.7, 14, 4, 3], B11: [10.7, 14, 4, 3], B17: [6.7, 17, 4, 3], B10: [10.7, 17, 4, 3],

    /* Módulos del pasillo central */
    "04": [23.3, 6, 2, 4], "03": [25.3, 6, 2, 4],
    "02": [55.9, 6, 2, 4], "01": [57.9, 6, 2, 4],

    /* Islas */
    E02: [33.3, 14, 10, 6], E01: [51.9, 14, 10, 6]
  },

  /* Lo que no se alquila. forma "vertical" escribe el rótulo de canto. */
  servicios: [
    { nombre: "Receso de café",  clase: "zona-cafe",      forma: "vertical", sitio: [49.3, 5, 2, 6] },
    { nombre: "Receso de café",  clase: "zona-cafe",      sitio: [23.3, 14, 3, 6] },
    { nombre: "Árbol existente", clase: "zona-arbol",     sitio: [72, 0, 6, 2] },
    { nombre: "Monumento",       clase: "zona-monumento", sitio: [64.8, 4.9, 6, 6] }
  ]
};
