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
     foto       Foto del hero de la ficha. Sin valor, el hero muestra el
                motivo gráfico del eje en su lugar.
     detalle    Bloques de la ficha. Si un bloque falta o va vacío,
                la ficha muestra el estado "en preparación" en su lugar.
                  objetivo     Objetivo estratégico (texto).
                  prioridad    Prioridad (texto).
                  alcance      Alcance prioritario (lista de textos).
                  desafio      El desafío del Perú (texto).
                  declaracion  Declaración del Congreso (texto).
                  metas        [{ anio, texto }]  — horizontes 2035 y 2050.
                               Por ahora NO se muestran en la ficha: el
                               Comité las retiró. Se conservan aquí.
                  indicadores  [texto]            — tres por eje.
                  ficha        Ruta al PDF de la ficha. Sin valor, no se
                               muestra el botón de descarga.

   PROCEDENCIA DEL CONTENIDO
     · objetivo, prioridad, alcance, desafío y declaración salen textuales
       de la "Guía de contenido web" (secciones 7.1 a 7.12).
     · metas e indicadores son una PROPUESTA DE REDACCIÓN derivada de esos
       mismos textos: la guía no los trae. Están pendientes de aprobación
       del Comité Organizador y deben revisarse antes de publicar.
   ========================================================================== */

window.EJES = [
  {
    num: 1,
    titulo: "Infraestructura nacional y megaproyectos",
    resultado: "Conectividad, logística, infraestructura social y resiliencia.",
    icono: "puente",
    foto: "assets/img/eje-01-infraestructura.jpg",
    detalle: {
      objetivo: "Construir una red de infraestructura moderna, integrada, resiliente y competitiva que reduzca brechas, conecte territorios y soporte el crecimiento económico y social del Perú.",
      prioridad: "Institucionalizar una cartera multigobierno de infraestructura y megaproyectos con ingeniería madura antes de licitar, gestión digital de activos y disciplina de costo, plazo, calidad y mantenimiento.",
      alcance: [
        "Carreteras, corredores logísticos y puentes.",
        "Ferrocarriles de carga y pasajeros, metros y transporte masivo.",
        "Puertos, aeropuertos, hidrovías y plataformas logísticas.",
        "Hospitales, escuelas, universidades e infraestructura social.",
        "Ciudades, vivienda, saneamiento, conectividad digital y centros de datos.",
        "Infraestructura resiliente frente a sismos, inundaciones, huaicos, sequías y cambio climático."
      ],
      desafio: "El desafío no es únicamente construir más, sino elevar la calidad de la formulación, diseño, contratación, ejecución, operación y mantenimiento. La cartera nacional debe priorizar proyectos con impacto territorial y productivo, reducir la fragmentación institucional y asegurar continuidad técnica entre gobiernos.",
      /* La guía no trae declaración del Congreso para este eje: queda
         pendiente hasta que el Comité la apruebe. */
      metas: [
        { anio: "2035", texto: "Cartera multigobierno priorizada, con ingeniería madura antes de licitar y gestión digital de activos en los megaproyectos." },
        { anio: "2050", texto: "Red nacional integrada y resiliente, con brechas de conectividad e infraestructura social cerradas." }
      ],
      indicadores: [
        "Proyectos licitados con estudios definitivos completos.",
        "Desviación de costo y plazo en megaproyectos.",
        "Cobertura y estado de conservación de la red nacional."
      ]
    }
  },
  {
    num: 2,
    titulo: "Recursos naturales sostenibles",
    resultado: "Geociencias, minería, hidrocarburos, recursos marinos y bioeconomía con valor agregado.",
    icono: "mineral",
    foto: "assets/img/eje-02-recursos.jpg",
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
      /* Estas metas e indicadores son los únicos que aparecen en la guía:
         vienen de la maqueta de la página 20. */
      metas: [
        { anio: "2035", texto: "Mayor participación de ingeniería, proveedores y tecnología nacional." },
        { anio: "2050", texto: "Cadenas de valor sofisticadas y exportación de servicios." }
      ],
      indicadores: [
        "Inversión en exploración e I+D.",
        "Proveedores nacionales.",
        "Productividad hídrica y energética."
      ]
    }
  },
  {
    num: 3,
    titulo: "Agua y seguridad hídrica",
    resultado: "Cuencas, regulación, saneamiento, reúso, riego y resiliencia.",
    icono: "agua",
    detalle: {
      objetivo: "Garantizar seguridad hídrica para población, agricultura, industria, minería, energía y ecosistemas mediante ingeniería integral de cuencas y soluciones resilientes.",
      prioridad: "Pasar de proyectos hídricos aislados a una política nacional de seguridad hídrica por cuencas, con infraestructura multipropósito, monitoreo digital, reúso y gestión de presas.",
      alcance: [
        "Represas, reservorios y regulación hídrica.",
        "Siembra y cosecha de agua y soluciones basadas en naturaleza.",
        "Trasvases e infraestructura multipropósito.",
        "Agua potable, saneamiento y tratamiento/reúso.",
        "Riego tecnificado y eficiencia hídrica.",
        "Monitoreo, modelamiento, información y gestión integral de cuencas."
      ],
      desafio: "La variabilidad climática, la concentración poblacional y productiva y las brechas de saneamiento exigen pasar de proyectos aislados a sistemas integrados de seguridad hídrica. La ingeniería debe combinar infraestructura gris, soluciones naturales, información, mantenimiento y gobernanza.",
      declaracion: "Reconocer el agua como infraestructura estratégica nacional y establecer una política de seguridad hídrica basada en cuencas, ciencia, ingeniería y prevención.",
      metas: [
        { anio: "2035", texto: "Planes de seguridad hídrica por cuenca en operación, con infraestructura multipropósito y monitoreo digital." },
        { anio: "2050", texto: "Cobertura universal de agua y saneamiento, con reúso extendido y resiliencia ante sequías e inundaciones." }
      ],
      indicadores: [
        "Capacidad de regulación y almacenamiento por cuenca.",
        "Cobertura de agua potable, saneamiento y tratamiento de aguas residuales.",
        "Eficiencia y reúso del agua en riego e industria."
      ]
    }
  },
  {
    num: 4,
    titulo: "Agricultura, zootecnia y forestales",
    resultado: "Productividad, tecnificación, cadena de frío, agroindustria y bioeconomía.",
    icono: "agro",
    foto: "assets/img/eje-04-agro.jpg",
    detalle: {
      objetivo: "Elevar productividad, resiliencia y valor agregado del agro, la ganadería y los recursos forestales mediante ingeniería, tecnificación, biotecnología, logística e industrialización.",
      prioridad: "Articular agua, mecanización, agricultura de precisión, cadena de frío, agroindustria, genética y bioeconomía para elevar productividad y valor agregado regional.",
      alcance: [
        "Riego y drenaje tecnificado.",
        "Mecanización y agricultura de precisión.",
        "Cadena de frío, almacenamiento y logística.",
        "Agroindustria y transformación de alimentos.",
        "Zootecnia, genética, sanidad e infraestructura pecuaria.",
        "Manejo forestal sostenible, bioeconomía y transformación de madera."
      ],
      desafio: "La diversidad geográfica del Perú ofrece oportunidades diferenciadas, pero persisten brechas de productividad, agua, infraestructura, tecnología, asistencia técnica y acceso a mercados. La ingeniería debe conectar producción primaria con industria, logística, calidad y exportación.",
      declaracion: "Convertir la ingeniería agraria, zootécnica, forestal e industrial en instrumentos centrales del desarrollo rural y territorial.",
      metas: [
        { anio: "2035", texto: "Riego tecnificado, mecanización y cadena de frío extendidos a las principales zonas productivas del país." },
        { anio: "2050", texto: "Agro, ganadería y forestales integrados a la agroindustria y a mercados de exportación de alto valor." }
      ],
      indicadores: [
        "Superficie bajo riego tecnificado y agricultura de precisión.",
        "Productividad por hectárea y por cabeza de ganado.",
        "Valor agregado y exportación agroindustrial y forestal."
      ]
    }
  },
  {
    num: 5,
    titulo: "Energía y transición energética",
    resultado: "Seguridad, competitividad, redes, diversificación y tecnologías avanzadas.",
    icono: "energia",
    foto: "assets/img/eje-05-energia.jpg",
    detalle: {
      objetivo: "Garantizar energía segura, competitiva, diversificada y sostenible para hogares, industria, minería, transporte y transformación digital.",
      prioridad: "Planificar seguridad energética e industrialización conjuntamente, reforzando redes, capacidad firme, almacenamiento, eficiencia, diversificación tecnológica y formación especializada.",
      alcance: [
        "Hidroeléctrica, solar y eólica.",
        "Gas natural y seguridad energética.",
        "Almacenamiento y redes inteligentes.",
        "Electrificación y eficiencia energética.",
        "Hidrógeno y combustibles de bajas emisiones.",
        "Evaluación técnica de opciones nucleares dentro de una planificación energética de largo plazo."
      ],
      desafio: "El crecimiento industrial y digital requerirá más energía firme, redes robustas, flexibilidad y planificación. La transición debe preservar seguridad de suministro y competitividad, evitando decisiones tecnológicas aisladas del sistema.",
      declaracion: "Establecer una política energética de Estado basada en seguridad, competitividad, innovación, diversificación tecnológica y planificación de largo plazo.",
      metas: [
        { anio: "2035", texto: "Sistema con capacidad firme, almacenamiento y redes reforzadas para la demanda industrial y digital." },
        { anio: "2050", texto: "Matriz diversificada, competitiva y de bajas emisiones, con acceso universal a la electricidad." }
      ],
      indicadores: [
        "Reserva y capacidad firme del sistema eléctrico.",
        "Confiabilidad del suministro y pérdidas de la red.",
        "Intensidad energética y emisiones por unidad de producto."
      ]
    }
  },
  {
    num: 6,
    titulo: "Industrialización y manufactura",
    resultado: "Metalmecánica, procesos, proveedores, clusters y manufactura avanzada.",
    icono: "fabrica",
    foto: "assets/img/eje-06-industria.jpg",
    detalle: {
      objetivo: "Transformar recursos y capacidades nacionales en productos, equipos, materiales y servicios de mayor valor agregado, creando empleo técnico y empresas competitivas.",
      prioridad: "Seleccionar cadenas con ventajas nacionales y construir clusters, proveedores, metrología, certificación, automatización y capacidad exportadora de ingeniería y manufactura.",
      alcance: [
        "Química y petroquímica.",
        "Plantas concentradoras, fundiciones, refinerías y metalurgia.",
        "Metalmecánica, maquinaria y componentes.",
        "Fertilizantes y agroindustria.",
        "Astilleros e industria naval.",
        "Proveedores mineros e industriales.",
        "Ensamblaje, electromovilidad y manufactura avanzada."
      ],
      desafio: "El reto peruano es ampliar el contenido tecnológico y productivo de su economía. La industrialización moderna no significa producir todo localmente, sino seleccionar cadenas donde el país tenga recursos, demanda, talento o ventajas logísticas y desarrollar capacidades competitivas.",
      declaracion: "Impulsar una política industrial moderna que vincule recursos naturales, ingeniería, proveedores, innovación y mercados globales.",
      metas: [
        { anio: "2035", texto: "Clusters, proveedores y capacidad de metrología y certificación consolidados en las cadenas priorizadas." },
        { anio: "2050", texto: "Manufactura avanzada exportadora, con contenido tecnológico propio y empresas nacionales de escala." }
      ],
      indicadores: [
        "Participación de la manufactura en el producto nacional.",
        "Contenido nacional en las compras de grandes proyectos.",
        "Exportación de manufactura y de servicios de ingeniería."
      ]
    }
  },
  {
    num: 7,
    titulo: "IA, chips, software y ciencia de datos",
    resultado: "Capacidad digital nacional, automatización, software, datos y semiconductores.",
    icono: "chip",
    foto: "assets/img/eje-07-ia.jpg",
    detalle: {
      objetivo: "Desarrollar capacidades digitales soberanas y competitivas que eleven productividad, seguridad y capacidad de innovación del Estado y del sector productivo.",
      prioridad: "Desarrollar soberanía de capacidades digitales —software, datos, IA, automatización y conocimiento de semiconductores— aplicada a Estado, industria, infraestructura y recursos naturales.",
      alcance: [
        "Inteligencia artificial aplicada.",
        "Software e ingeniería de software.",
        "Ciencia de datos y computación de alto rendimiento.",
        "Centros de datos e infraestructura digital.",
        "Automatización, IoT y gemelos digitales.",
        "Ciberseguridad y protección de infraestructura crítica.",
        "Formación y participación en cadenas de semiconductores y electrónica."
      ],
      desafio: "El Perú debe pasar de ser consumidor de soluciones digitales a desarrollar capacidades propias en software, datos, automatización e integración tecnológica. En semiconductores, la prioridad debe ser construir talento, investigación, diseño, prueba, empaquetado y nichos viables antes de aspirar a segmentos intensivos en capital.",
      declaracion: "Declarar la ingeniería digital, la IA, el software, los datos y la ciberseguridad como capacidades estratégicas para la competitividad y soberanía tecnológica del Perú.",
      metas: [
        { anio: "2035", texto: "Capacidades propias de software, datos, IA y ciberseguridad aplicadas al Estado y a los sectores productivos." },
        { anio: "2050", texto: "Industria digital nacional con talento, propiedad intelectual y nichos en electrónica y semiconductores." }
      ],
      indicadores: [
        "Talento formado en IA, datos y ciberseguridad.",
        "Procesos productivos y públicos automatizados o digitalizados.",
        "Capacidad instalada de centros de datos e infraestructura digital."
      ]
    }
  },
  {
    num: 8,
    titulo: "Ingeniería del futuro",
    resultado: "Robótica, automatización, materiales, aeroespacial, biotecnología y nuevas fronteras.",
    icono: "cohete",
    foto: "assets/img/eje-08-futuro.jpg",
    detalle: {
      objetivo: "Preparar al Perú para tecnologías y sectores que definirán la competitividad, seguridad y productividad de las próximas décadas.",
      prioridad: "Crear programas nacionales de ingeniería avanzada que conecten universidades, centros de investigación, empresas y grandes proyectos con nuevas tecnologías y mercados.",
      alcance: [
        "Robótica y mecatrónica.",
        "Electrónica y sistemas embebidos.",
        "Ingeniería naval y oceánica.",
        "Aeroespacial y tecnologías satelitales.",
        "Ingeniería para defensa y tecnologías duales.",
        "Biotecnología y bioingeniería.",
        "Ingeniería biomédica.",
        "Meteorología avanzada y sistemas de observación.",
        "Manufactura inteligente y nuevos materiales."
      ],
      desafio: "La ingeniería del futuro requiere capacidades acumulativas: laboratorios, investigadores, empresas, compras sofisticadas, regulación, propiedad intelectual y cooperación internacional. El país debe seleccionar áreas donde existan necesidades nacionales y oportunidades reales de especialización.",
      declaracion: "Construir capacidades de ingeniería avanzada como inversión estratégica de largo plazo, con prioridades claras y evaluación de resultados.",
      metas: [
        { anio: "2035", texto: "Programas nacionales de ingeniería avanzada en marcha, con laboratorios y equipos de investigación activos." },
        { anio: "2050", texto: "Especialización peruana reconocida internacionalmente en las áreas de ingeniería avanzada seleccionadas." }
      ],
      indicadores: [
        "Proyectos de investigación y desarrollo en ingeniería avanzada.",
        "Patentes y propiedad intelectual de origen nacional.",
        "Empresas de base tecnológica creadas y sostenidas."
      ]
    }
  },
  {
    num: 9,
    titulo: "Talento, educación, ciencia e investigación",
    resultado: "Ingenieros, técnicos, investigadores, I+D y formación vinculada a sectores productivos.",
    icono: "birrete",
    foto: "assets/img/eje-09-talento.jpg",
    detalle: {
      objetivo: "Formar ingenieros, técnicos, científicos, investigadores y empresarios capaces de liderar proyectos complejos, innovación y transformación productiva al 2050.",
      prioridad: "Alinear formación técnica y universitaria, investigación aplicada y aprendizaje permanente con las capacidades que demandarán los 12 ejes de la Agenda 2027–2050.",
      alcance: [
        "Reforma y actualización curricular.",
        "Universidades de investigación y centros de excelencia.",
        "Formación técnica y modelo dual.",
        "I+D+i y transferencia tecnológica.",
        "Emprendimiento tecnológico.",
        "Educación continua, microcredenciales y certificaciones.",
        "Internacionalización, ética, liderazgo y participación de la mujer en ingeniería."
      ],
      desafio: "El documento base ya identifica este eje como uno de los pilares del Congreso. La formación debe responder a las necesidades reales de infraestructura, industria, minería, energía, agua, agricultura y transformación digital, integrando ciencia, tecnología, gestión, ética y sostenibilidad.",
      declaracion: "Crear un Pacto Nacional por el Talento en Ingeniería con metas verificables al 2050 y continuidad institucional.",
      metas: [
        { anio: "2035", texto: "Formación universitaria y técnica alineada con las capacidades que demandan los doce ejes de la Agenda." },
        { anio: "2050", texto: "Masa crítica de ingenieros, técnicos e investigadores capaz de liderar proyectos complejos dentro y fuera del país." }
      ],
      indicadores: [
        "Ingenieros y técnicos titulados por año.",
        "Investigadores activos e inversión en I+D+i.",
        "Participación de la mujer en la ingeniería peruana."
      ]
    }
  },
  {
    num: 10,
    titulo: "Regionalización y descentralización",
    resultado: "Capacidades territoriales, polos productivos e infraestructura regional.",
    icono: "mapa",
    foto: "assets/img/eje-10-regiones.jpg",
    detalle: {
      objetivo: "Usar la ingeniería para cerrar brechas territoriales y desarrollar capacidades productivas, tecnológicas e institucionales en todas las regiones del Perú.",
      prioridad: "Convertir la descentralización en capacidades de ejecución regional, con ingeniería, cartera de proyectos, polos productivos, infraestructura y talento en territorio.",
      alcance: [
        "Planificación territorial y urbana.",
        "Infraestructura regional y conectividad.",
        "Especialización productiva regional.",
        "Universidades y centros tecnológicos regionales.",
        "Capacidades de formulación y gestión de proyectos.",
        "Gestión de riesgos y resiliencia territorial."
      ],
      desafio: "La descentralización requiere capacidades técnicas, no solo transferencia de recursos. Las regiones necesitan equipos de ingeniería, bancos de proyectos, información territorial, estándares, asistencia técnica y mecanismos de continuidad para convertir presupuesto en infraestructura útil y desarrollo productivo.",
      declaracion: "Hacer de la ingeniería un instrumento efectivo de descentralización, especialización regional y cohesión territorial.",
      metas: [
        { anio: "2035", texto: "Equipos regionales de ingeniería y bancos de proyectos operando en todas las regiones del país." },
        { anio: "2050", texto: "Polos productivos regionales con infraestructura, talento y especialización propia." }
      ],
      indicadores: [
        "Capacidad regional de formulación y gestión de proyectos.",
        "Ejecución de la inversión regional y local.",
        "Brechas de infraestructura y servicios por región."
      ]
    }
  },
  {
    num: 11,
    titulo: "Inversión en ingeniería e infraestructura",
    resultado: "Financiamiento, maduración de proyectos, APP y continuidad de cartera.",
    icono: "inversion",
    foto: "assets/img/eje-11-inversion.jpg",
    detalle: {
      objetivo: "Mejorar la calidad, oportunidad y eficiencia de la inversión pública y privada, asegurando que los proyectos se sustenten en ingeniería suficiente antes de comprometer grandes recursos.",
      prioridad: "Asegurar que la inversión llegue a proyectos maduros, priorizados y financiables, con mecanismos diversos y continuidad de cartera más allá de cada periodo de gobierno.",
      alcance: [
        "Planeamiento multianual y priorización.",
        "Maduración de proyectos y estudios.",
        "APP y mecanismos de inversión privada.",
        "Obras por Impuestos y otras modalidades permitidas.",
        "Financiamiento multilateral y sostenible.",
        "Gestión de activos y costo de ciclo de vida."
      ],
      desafio: "Una infraestructura robusta requiere invertir no solo en construcción, sino también en estudios, ingeniería, gestión de riesgos, supervisión, puesta en marcha, operación y mantenimiento. Ahorrar en ingeniería temprana puede trasladar costos mucho mayores a la construcción y operación.",
      declaracion: "Reconocer la inversión en ingeniería como condición para proteger la inversión en infraestructura y maximizar su valor económico y social.",
      metas: [
        { anio: "2035", texto: "Cartera multianual de proyectos maduros y financiables, con continuidad entre periodos de gobierno." },
        { anio: "2050", texto: "Inversión sostenida en ingeniería, operación y mantenimiento a lo largo de todo el ciclo de vida de los activos." }
      ],
      indicadores: [
        "Inversión en estudios e ingeniería respecto del costo del proyecto.",
        "Proyectos con expediente técnico aprobado antes de licitar.",
        "Ejecución de la inversión pública y privada en infraestructura."
      ]
    }
  },
  {
    num: 12,
    titulo: "Contratos, cumplimiento legal y gobernanza",
    resultado: "Asignación de riesgos, control integrado de proyectos, integridad y prevención de controversias.",
    icono: "balanza",
    foto: "assets/img/eje-12-gobernanza.jpg",
    detalle: {
      objetivo: "Fortalecer el marco contractual, regulatorio y de gobernanza para ejecutar proyectos con seguridad jurídica, transparencia, adecuada asignación de riesgos y solución oportuna de controversias.",
      prioridad: "Profesionalizar la estrategia contractual, asignación de riesgos, control integrado de proyectos, trazabilidad de cambios, cumplimiento e integridad para reducir controversias y elevar predictibilidad.",
      alcance: [
        "Estrategias de contratación según complejidad del proyecto.",
        "Asignación equilibrada y explícita de riesgos.",
        "Gestión de cambios, reclamos y controversias.",
        "Cumplimiento normativo, integridad y trazabilidad.",
        "Seguridad, calidad, ambiente y sostenibilidad contractual.",
        "Gestión documental y evidencia técnica.",
        "Mecanismos de prevención y resolución temprana de disputas."
      ],
      desafio: "Los contratos de infraestructura deben reflejar la realidad técnica del proyecto. Una mala definición de alcance, riesgos, interfaces, estudios o responsabilidades genera modificaciones, controversias y retrasos. El cumplimiento legal debe acompañar, no sustituir, una ingeniería sólida y una gestión profesional.",
      declaracion: "Impulsar contratos y marcos de cumplimiento que protejan el interés público, asignen riesgos con criterio técnico y permitan construir infraestructura durable, segura y de calidad.",
      metas: [
        { anio: "2035", texto: "Estrategias contractuales y asignación de riesgos estandarizadas en los proyectos estratégicos del Estado." },
        { anio: "2050", texto: "Proyectos con baja conflictividad, trazabilidad completa y alta predictibilidad de costo y plazo." }
      ],
      indicadores: [
        "Controversias y arbitrajes por proyecto.",
        "Adicionales y modificaciones contractuales.",
        "Plazo de resolución temprana de disputas."
      ]
    }
  }
];
