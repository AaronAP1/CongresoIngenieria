/* ==========================================================================
   EJES TEMÁTICOS — fuente única de datos
   --------------------------------------------------------------------------
   Este archivo alimenta las dos páginas:
     · ejes-tematicos.html  → la grilla de los 12 ejes
     · eje.html?eje=N       → la ficha de detalle de cada eje

   Para actualizar un eje, edita SOLO este archivo.

   Campos por eje:
     num        Número del eje (1-12). Define la URL: eje.html?eje=2
     titulo     Nombre del eje.
     resultado  Resultado estratégico. Sale en la tarjeta y en el hero.
     icono      Clave del ícono (ver ICONOS en js/ejes.js).
     detalle    Bloques de la ficha. Si un bloque falta o va vacío,
                la ficha muestra el estado "en preparación" en su lugar.
                  objetivo     Objetivo estratégico (texto).
                  prioridad    Prioridad (texto).
                  alcance      Alcance prioritario (lista de textos).
                  desafio      El desafío del Perú (texto).
                  declaracion  Declaración del Congreso (texto).
                  metas        [{ anio, texto }]  — pendientes de definir.
                  indicadores  [texto]            — pendientes de definir.
                  ficha        Ruta al PDF de la ficha. Sin valor, el botón
                               queda deshabilitado como "próximamente".
   ========================================================================== */

window.EJES = [
  {
    num: 1,
    titulo: "Infraestructura nacional y megaproyectos",
    resultado: "Conectividad, logística, infraestructura social y resiliencia.",
    icono: "puente",
    detalle: {}
  },
  {
    num: 2,
    titulo: "Recursos naturales sostenibles",
    resultado: "Geociencias, minería, hidrocarburos, recursos marinos y bioeconomía con valor agregado.",
    icono: "mineral",
    detalle: {
      objetivo: "Transformar la riqueza minera, energética, marina, forestal y biológica del Perú en desarrollo sostenible, conocimiento, tecnología, cadenas de valor y capacidades industriales.",
      prioridad: "Convertir geociencias, exploración, recursos naturales e ingeniería de procesos en una plataforma de industrialización, proveedores tecnológicos, exportación de servicios y desarrollo territorial sostenible.",
      alcance: [
        "Minería y metalurgia.",
        "Hidrocarburos y gas.",
        "Recursos marinos y pesqueros.",
        "Bosques, biodiversidad y bioeconomía.",
        "Geociencias, exploración y conocimiento del territorio.",
        "Trazabilidad, circularidad, eficiencia de recursos y gestión ambiental y social."
      ],
      desafio: "El Perú posee una base extraordinaria de recursos, pero debe capturar mayor valor mediante exploración, ingeniería, procesamiento, servicios tecnológicos, proveedores, investigación y transformación productiva. La sostenibilidad debe incorporarse desde la concepción del proyecto y durante todo el ciclo de vida.",
      declaracion: "Promover recursos naturales sostenibles como plataforma para industrialización, innovación, empleo calificado y desarrollo territorial.",
      /* Metas e indicadores pendientes de definir por el Comité.
         Cuando lleguen, se cargan así:
           metas: [
             { anio: "2035", texto: "Mayor participación de ingeniería, proveedores y tecnología nacional." },
             { anio: "2050", texto: "Cadenas de valor sofisticadas y exportación de servicios." }
           ],
           indicadores: [
             "Inversión en exploración e I+D.",
             "Proveedores nacionales.",
             "Productividad hídrica y energética."
           ]                                                                  */
      metas: [],
      indicadores: []
    }
  },
  {
    num: 3,
    titulo: "Agua y seguridad hídrica",
    resultado: "Cuencas, regulación, saneamiento, reúso, riego y resiliencia.",
    icono: "agua",
    detalle: {}
  },
  {
    num: 4,
    titulo: "Agricultura, zootecnia y forestales",
    resultado: "Productividad, tecnificación, cadena de frío, agroindustria y bioeconomía.",
    icono: "agro",
    detalle: {}
  },
  {
    num: 5,
    titulo: "Energía y transición energética",
    resultado: "Seguridad, competitividad, redes, diversificación y tecnologías avanzadas.",
    icono: "energia",
    detalle: {}
  },
  {
    num: 6,
    titulo: "Industrialización y manufactura",
    resultado: "Metalmecánica, procesos, proveedores, clusters y manufactura avanzada.",
    icono: "fabrica",
    detalle: {}
  },
  {
    num: 7,
    titulo: "IA, chips, software y ciencia de datos",
    resultado: "Capacidad digital nacional, automatización, software, datos y semiconductores.",
    icono: "chip",
    detalle: {}
  },
  {
    num: 8,
    titulo: "Ingeniería del futuro",
    resultado: "Robótica, automatización, materiales, aeroespacial, biotecnología y nuevas fronteras.",
    icono: "cohete",
    detalle: {}
  },
  {
    num: 9,
    titulo: "Talento, educación, ciencia e investigación",
    resultado: "Ingenieros, técnicos, investigadores, I+D y formación vinculada a sectores productivos.",
    icono: "birrete",
    detalle: {}
  },
  {
    num: 10,
    titulo: "Regionalización y descentralización",
    resultado: "Capacidades territoriales, polos productivos e infraestructura regional.",
    icono: "mapa",
    detalle: {}
  },
  {
    num: 11,
    titulo: "Inversión en ingeniería e infraestructura",
    resultado: "Financiamiento, maduración de proyectos, APP y continuidad de cartera.",
    icono: "inversion",
    detalle: {}
  },
  {
    num: 12,
    titulo: "Contratos, cumplimiento legal y gobernanza",
    resultado: "Asignación de riesgos, control integrado de proyectos, integridad y prevención de controversias.",
    icono: "balanza",
    detalle: {}
  }
];
