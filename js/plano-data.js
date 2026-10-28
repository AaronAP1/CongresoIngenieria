/* ==========================================================================
   PLANO DE EXHIBICIÓN — fuente única de datos
   --------------------------------------------------------------------------
   Alimenta el plano interactivo de exhibicion.html (lo dibuja js/plano.js).

   ¡OJO! TODO ESTE CONTENIDO ES FICTICIO. Los nombres de empresa y los
   estados son de muestra, para ver el plano funcionando. Antes de publicar
   hay que reemplazarlos por la asignación real del Comité.

   Cómo actualizar un módulo:
     · Cambia su estado: "disponible" | "reservado" | "ocupado".
     · Si pasa a "ocupado" o "reservado", pon empresa y rubro.
     · Para dejarlo libre, basta con "disponible" y empresa vacía.

   Cada fila de MODULOS es:
     [ código, estado, empresa, rubro ]

   El código manda: su letra decide el tipo, la medida y la zona (ver TIPOS),
   y su número decide en qué banda del plano se dibuja (ver js/plano.js).

   Inventario: 105 stands (A 14 · B 28 · C 28 · D 21 · E 14)
               + 7 salas de exposición por capítulo.
   ========================================================================== */

window.PLANO = {

  /* Qué es cada letra. El texto sale tal cual en la ficha del módulo. */
  tipos: {
    A: { nombre: "Preferencial",       medida: "3 × 2 m", zona: "Frente al escenario" },
    B: { nombre: "Esquinero",          medida: "3 × 2 m", zona: "Pasillo central" },
    C: { nombre: "Interno",            medida: "3 × 2 m", zona: "Pasillo central" },
    D: { nombre: "Innovación",         medida: "3 × 2 m", zona: "Zona de innovación y startups" },
    E: { nombre: "Isla corporativa",   medida: "4 × 4 m", zona: "Pabellón corporativo" },
    S: { nombre: "Sala de exposición", medida: "120 m²",  zona: "Salas por capítulo" }
  },

  /* Los 105 stands modulares ------------------------------------------- */
  modulos: [
    /* Fila A — preferenciales, primera línea frente al escenario */
    ["A-1",  "ocupado",    "Andes Geotecnia",        "Geotecnia y mecánica de suelos"],
    ["A-2",  "ocupado",    "HidroPerú Ingeniería",   "Obras hidráulicas"],
    ["A-3",  "ocupado",    "Metalmec Sur",           "Metalmecánica"],
    ["A-4",  "reservado",  "",                       ""],
    ["A-5",  "ocupado",    "Pacífico Energía",       "Generación y redes eléctricas"],
    ["A-6",  "ocupado",    "Altiplano Minería",      "Equipos mineros"],
    ["A-7",  "disponible", "",                       ""],
    ["A-8",  "ocupado",    "Geodata Andina",         "Topografía y geomática"],
    ["A-9",  "ocupado",    "Vía Nova Infraestructura", "Carreteras y puentes"],
    ["A-10", "reservado",  "",                       ""],
    ["A-11", "ocupado",    "Cimentia Perú",          "Cimentaciones profundas"],
    ["A-12", "disponible", "",                       ""],
    ["A-13", "ocupado",    "Sismotec",               "Instrumentación sísmica"],
    ["A-14", "ocupado",    "Electro Cordillera",     "Equipamiento eléctrico"],

    /* Fila B — esquineros. B-1 a B-14 abajo, B-15 a B-28 arriba */
    ["B-1",  "ocupado",    "Nodo Digital",           "Gemelos digitales y BIM"],
    ["B-2",  "disponible", "",                       ""],
    ["B-3",  "ocupado",    "Cíclope Automatización", "Automatización industrial"],
    ["B-4",  "disponible", "",                       ""],
    ["B-5",  "disponible", "",                       ""],
    ["B-6",  "ocupado",    "BioAndes Procesos",      "Bioprocesos"],
    ["B-7",  "reservado",  "",                       ""],
    ["B-8",  "disponible", "",                       ""],
    ["B-9",  "ocupado",    "Talara Procesos",        "Ingeniería de procesos"],
    ["B-10", "disponible", "",                       ""],
    ["B-11", "disponible", "",                       ""],
    ["B-12", "ocupado",    "Moquegua Ingeniería",    "Consultoría de proyectos"],
    ["B-13", "disponible", "",                       ""],
    ["B-14", "reservado",  "",                       ""],
    ["B-15", "ocupado",    "Hidrovía Ingenieros",    "Saneamiento"],
    ["B-16", "disponible", "",                       ""],
    ["B-17", "ocupado",    "Marañón Ingeniería",     "Supervisión de obras"],
    ["B-18", "disponible", "",                       ""],
    ["B-19", "reservado",  "",                       ""],
    ["B-20", "ocupado",    "Cobre Verde Tecnología", "Procesamiento de minerales"],
    ["B-21", "disponible", "",                       ""],
    ["B-22", "ocupado",    "AguaSur Soluciones",     "Tratamiento de agua"],
    ["B-23", "disponible", "",                       ""],
    ["B-24", "ocupado",    "Perfil Metálica",        "Estructuras metálicas"],
    ["B-25", "disponible", "",                       ""],
    ["B-26", "reservado",  "",                       ""],
    ["B-27", "ocupado",    "Domo Estructuras",       "Cubiertas y naves industriales"],
    ["B-28", "disponible", "",                       ""],

    /* Fila C — internos. C-1 a C-14 abajo, C-15 a C-28 arriba */
    ["C-1",  "ocupado",    "Termika Industrial",     "Climatización y térmica"],
    ["C-2",  "disponible", "",                       ""],
    ["C-3",  "disponible", "",                       ""],
    ["C-4",  "ocupado",    "Concretec Andina",       "Concreto y aditivos"],
    ["C-5",  "disponible", "",                       ""],
    ["C-6",  "reservado",  "",                       ""],
    ["C-7",  "disponible", "",                       ""],
    ["C-8",  "ocupado",    "Topo Láser",             "Escaneo 3D"],
    ["C-9",  "disponible", "",                       ""],
    ["C-10", "disponible", "",                       ""],
    ["C-11", "ocupado",    "Kallpa Instrumentación", "Instrumentación y control"],
    ["C-12", "disponible", "",                       ""],
    ["C-13", "disponible", "",                       ""],
    ["C-14", "disponible", "",                       ""],
    ["C-15", "disponible", "",                       ""],
    ["C-16", "ocupado",    "Ferrovía Andina",        "Infraestructura ferroviaria"],
    ["C-17", "disponible", "",                       ""],
    ["C-18", "disponible", "",                       ""],
    ["C-19", "ocupado",    "Puerto Norte Logística", "Infraestructura portuaria"],
    ["C-20", "disponible", "",                       ""],
    ["C-21", "reservado",  "",                       ""],
    ["C-22", "disponible", "",                       ""],
    ["C-23", "ocupado",    "Solaris Altiplano",      "Energía solar"],
    ["C-24", "disponible", "",                       ""],
    ["C-25", "ocupado",    "Eolo Pacífico",          "Energía eólica"],
    ["C-26", "disponible", "",                       ""],
    ["C-27", "disponible", "",                       ""],
    ["C-28", "reservado",  "",                       ""],

    /* Fila D — zona de innovación y startups, en tres bandas de siete */
    ["D-1",  "ocupado",    "Amauta Software",        "Software de ingeniería"],
    ["D-2",  "disponible", "",                       ""],
    ["D-3",  "ocupado",    "Quilla Robótica",        "Robótica y mecatrónica"],
    ["D-4",  "disponible", "",                       ""],
    ["D-5",  "reservado",  "",                       ""],
    ["D-6",  "disponible", "",                       ""],
    ["D-7",  "ocupado",    "DronTopo",               "Drones y fotogrametría"],
    ["D-8",  "disponible", "",                       ""],
    ["D-9",  "ocupado",    "Wayra Ventilación",      "Ventilación de minas"],
    ["D-10", "disponible", "",                       ""],
    ["D-11", "disponible", "",                       ""],
    ["D-12", "reservado",  "",                       ""],
    ["D-13", "disponible", "",                       ""],
    ["D-14", "ocupado",    "Inti Materiales",        "Nuevos materiales"],
    ["D-15", "disponible", "",                       ""],
    ["D-16", "disponible", "",                       ""],
    ["D-17", "ocupado",    "Rumi Laboratorios",      "Ensayo de materiales"],
    ["D-18", "disponible", "",                       ""],
    ["D-19", "disponible", "",                       ""],
    ["D-20", "reservado",  "",                       ""],
    ["D-21", "disponible", "",                       ""],

    /* Fila E — islas corporativas, en dos bandas de siete */
    ["E-1",  "ocupado",    "Yaku Tratamiento",       "Agua industrial"],
    ["E-2",  "disponible", "",                       ""],
    ["E-3",  "ocupado",    "Chavín Estructuras",     "Prefabricados de concreto"],
    ["E-4",  "reservado",  "",                       ""],
    ["E-5",  "ocupado",    "Paracas Naval",          "Ingeniería naval"],
    ["E-6",  "disponible", "",                       ""],
    ["E-7",  "ocupado",    "Nazca Aeroespacial",     "Satelital y observación"],
    ["E-8",  "disponible", "",                       ""],
    ["E-9",  "ocupado",    "Titicaca Hidráulica",    "Presas y reservorios"],
    ["E-10", "disponible", "",                       ""],
    ["E-11", "reservado",  "",                       ""],
    ["E-12", "ocupado",    "Chasqui Logística",      "Logística de proyectos"],
    ["E-13", "disponible", "",                       ""],
    ["E-14", "disponible", "",                       ""]
  ],

  /* Las 7 salas de exposición. El nombre es el capítulo que las ocupa. */
  salas: [
    { codigo: "S-1", nombre: "Ingeniería Pesquera",                        estado: "disponible", empresa: "" },
    { codigo: "S-2", nombre: "Ingeniería Eléctrica y Electrónica",         estado: "ocupado",    empresa: "Electro Cordillera" },
    { codigo: "S-3", nombre: "Ingeniería Civil",                           estado: "ocupado",    empresa: "Vía Nova Infraestructura" },
    { codigo: "S-4", nombre: "Ingeniería Minera, Mecánica y Metalúrgica",  estado: "ocupado",    empresa: "Altiplano Minería" },
    { codigo: "S-5", nombre: "Ingeniería Ambiental y Agroindustrial",      estado: "reservado",  empresa: "" },
    { codigo: "S-6", nombre: "Ingeniería Industrial, Química y Petróleo",  estado: "ocupado",    empresa: "Talara Procesos" },
    { codigo: "S-7", nombre: "Ingeniería de Sistemas y Transporte",        estado: "disponible", empresa: "" }
  ]
};
