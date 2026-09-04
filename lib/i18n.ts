export const IDIOMAS = ["es", "fr"] as const;
export type Lang = (typeof IDIOMAS)[number];

export const ES_IDIOMA = (v: string): v is Lang =>
  (IDIOMAS as readonly string[]).includes(v);

/** Cadena con sus dos versiones. Todo el contenido usa esta forma. */
export type Localized = Record<Lang, string>;

/** Devuelve la versión del idioma pedido; si faltara, cae al español. */
export const t = (valor: Localized | undefined, lang: Lang): string =>
  valor ? (valor[lang] ?? valor.es) : "";

export const DICCIONARIO = {
  es: {
    htmlLang: "es",
    tituloSitio: "Los Sebi — una historia familiar",
    descripcionSitio:
      "De Varna a Valencia, pasando por Guelma, Souk-Ahras y Toulouse. La historia de la familia Sebi, contada por Eric.",
    saltarAlContenido: "Saltar al contenido",
    archivoFamiliar: "Archivo familiar",
    cambiarIdioma: "Changer de langue",
    otroIdioma: "Français",
    deslizaParaEmpezar: "Desliza para empezar",
    nav: {
      origenes: "Orígenes",
      mapa: "Mapa",
      tiempo: "Línea del tiempo",
      arbol: "Árbol",
      galeria: "Galería",
      tradiciones: "Memoria",
      continuacion: "Hoy",
    },
    secciones: {
      origenes: {
        numero: "01 · Orígenes",
        titulo: "De Rusia a Guelma",
        entradilla:
          "El 13 de marzo de 1881 fue asesinado el zar Alejandro II. Entre los responsables había varios judíos, y a raíz del atentado comenzaron los pogromos en el Imperio Ruso.",
      },
      mapa: {
        numero: "02 · Desplazamientos",
        titulo: "Cinco países en cuatro generaciones",
        entradilla:
          "Pasa el ratón o pulsa sobre cada parada. La línea discontinua es el camino principal; los demás puntos son los sitios donde la historia se ramifica.",
      },
      tiempo: {
        numero: "03 · Línea del tiempo",
        titulo: "De 1852 a hoy",
        entradilla:
          "Lo marcado como «documentado» está respaldado por un acta, una carta o un registro que se conserva. El resto procede del relato de Eric.",
      },
      arbol: {
        numero: "04 · Árbol genealógico",
        titulo: "Quién es quién",
        entradilla:
          "Pulsa cualquier ficha para leer lo que se sabe de esa persona. De unas se conserva bastante información; de otras, solo las fechas.",
      },
      galeria: {
        numero: "05 · Galería",
        titulo: "Las fotografías que se conservan",
        entradilla:
          "Ordenadas por década. Pulsa cualquiera para verla entera y leer lo que sabemos de ella.",
      },
      tradiciones: {
        numero: "06 · Memoria",
        titulo: "Lo que se contaba en casa",
        entradilla:
          "Relatos, nombres y objetos que no constan en ningún documento y que se transmitieron de viva voz.",
      },
      continuacion: { numero: "07 · Hoy", titulo: "Hasta hoy" },
    },
    tiempo: { documentado: "documentado", hoy: "Hoy" },
    arbol: {
      nacioEn: "Nació en",
      generaciones: [
        { titulo: "El que llegó", pie: "Guelma, desde 1885" },
        { titulo: "Los de la rue Mogador", pie: "Ocho hijos, dieciséis embarazos" },
        { titulo: "La generación de en medio", pie: "Souk-Ahras, 1912 y 1914" },
        { titulo: "Los que salieron", pie: "Julio de 1962" },
        { titulo: "La generación de hoy", pie: "Valencia y Francia" },
        { titulo: "Los que vienen", pie: "Nacidos entre 2009 y 2018" },
      ],
      grafico: {
        titulo: "Árbol genealógico de la familia Sebi",
        aviso: "Pasa el ratón por cualquier caja y se ilumina su ascendencia hasta Achir y Zmirda. Pulsa un nombre para leer su ficha. En pantallas pequeñas el dibujo se desplaza a lo ancho.",
        pieVerde: "— matrimonio",
        pieRojo: "--- segundo matrimonio",
        pieSeparada: "// separados",
        pieGris: "▫ sin ficha propia",
      },
      ramas: {
        ucrania: {
          titulo: "La que se quedó",
          pie: "Ucrania, hasta 1942",
          nota: "La rama que nunca salió de Rusia. Achir dejó a su hija al cuidado de su cuñada en 1881 y no volvieron a verse. Ana no conoció a sus hermanos de Guelma ni pisó jamás la rue Mogador: de aquel lado solo llegaron cartas, y dejaron de llegar en 1942.",
        },
        guez: {
          titulo: "La rama Güez",
          pie: "La otra mitad de Lydia",
          nota: "Tampoco estos vienen de Guelma. Abraham Güez y Semha «Lucie» son los padres de Lydia, y entraron en la familia cuando ella se casó con Jacques en Bône, en 1922. De esta rama sabemos todavía muy poco: ni siquiera el apellido de soltera de Lucie.",
        },
        consortes: {
          titulo: "Los maridos",
          pie: "Quienes entraron por matrimonio",
          nota: "Georges Tibi, André, Max y Alain se casaron con Nono, Lulue, Mounette y Patricia. No son hijos de Joseph y Lydia: entraron en la familia casándose con sus hijas.",
        },
        valenciana: {
          titulo: "La rama valenciana",
          pie: "El capítulo que falta",
          nota: "Aquí esta historia deja de ser una sola. Quienes vienen a continuación no salieron de Argelia: llegan de otra familia, con su propio recorrido — Alicante, Argentina, Toulouse — que todavía está por escribir.",
        },
      },
    },
    galeria: {
      todo: "Todo",
      retocada: "Imagen retocada · ",
      tipos: { photo: "Fotografía", letter: "Carta", document: "Documento" },
    },
    tradicionesCat: { recipe: "Receta", anecdote: "Anécdota", object: "Objeto" },
    inicio: {
      titularA: "Cada familia guarda historias que merecen ser recordadas.",
      titularB: "Esta es la nuestra.",
      entradilla:
        "En 1885, un hombre que viajaba hacia Jerusalén enfermó durante la travesía y fue desembarcado en Argelia. Setenta y siete años después, sus nietos abandonaron ese mismo país. Esta web reúne lo que ocurrió entre una fecha y otra, a partir del relato de Eric Sebi y de los documentos que se conservan.",
      anticipo: [
        { t: "Orígenes", d: "Un barco que iba a Jerusalén y nunca llegó" },
        { t: "El mapa", d: "Varna, Guelma, Souk-Ahras, Toulouse, Valencia" },
        { t: "Línea del tiempo", d: "De 1852 a hoy, año por año" },
        { t: "El árbol", d: "Cinco generaciones, con nombre y con fecha" },
      ],
    },
    origenes: {
      p1: "Tsvi Reykin era viudo y tenía una hija pequeña, Ana. Decidió emigrar con un amigo y dejó a la niña al cuidado de su cuñada. El destino del viaje era Jerusalén.",
      p2a: "No llegó. Durante la travesía enfermó de disentería y, según la norma de entonces, el capitán debía desembarcar a los enfermos en el primer puerto disponible. Desembarcó en Argelia ",
      p2b: "sin dinero, enfermo, sin hablar francés y sin oficio",
      p2c: ": su oficio, corredor de granos, no tenía salida allí.",
      p3: "Se estableció en Guelma, cerca de la frontera con Túnez. Había allí una pequeña comunidad judía y se integró en ella: según Eric, su formación religiosa era más profunda que la de los sefardíes y tenía buena voz, de modo que le ofrecieron el puesto de rabino y lo aceptó. Las actas de nacimiento de sus hijos, desde 1888, lo designan «rabbin».",
      p4a: "Cuando la administración empezó a crear el estado civil de los europeos de Argelia, pensó que le convenía un nombre más fácil de retener en francés. ",
      p4b: "Tsvi Reykin pasó a ser Achir Sebi",
      p4c: ", y con él todos sus descendientes. La familia tardaría más de un siglo en enterarse.",
      p5: "En su acta de matrimonio, de 1886, declaró haber nacido en Jerusalén, hijo de padres fallecidos y enterrados allí. No lo acreditó con una partida de nacimiento, sino con un acta de notoriedad: el instrumento al que se recurre cuando esa partida no existe. En 1941, dos tribunales se apoyaron en ese dato para dictar que su hijo Joseph no era «judío indígena de Argelia» y quedaba fuera del estatuto de los judíos de Vichy.",
      anaTitulo: "Ana, la hija que se quedó",
      anaTexto:
        "Su padre la dejó en Ucrania en 1881 y no volvieron a verse. Durante sesenta años la familia que quedó allí escribió cartas a Argelia. Según Eric, los alemanes la asesinaron en 1942; las cartas dejan de llegar ese año.",
      anaAviso:
        "Imagen coloreada con IA. El original es en blanco y negro: el color del pelo y de los ojos lo ha decidido un algoritmo.",
      anaAlt: "Retrato de estudio de Ana, la hija que se quedó en Ucrania",
      heroAlt: "La familia Sebi en un camino, hacia 1950",
    },
    final: {
      cita: "«Voilà Pierrot, la historia termina aquí con la muerte de papá en 1991. Entre la llegada de mi abuelo de Rusia en 1885 y la salida en catástrofe de Argelia en 1962 transcurrieron setenta y siete años de trabajo, de esperanzas y de mucha pena».",
      firma: "Eric Sebi, noviembre de 2018",
      cierre:
        "La historia no termina ahí. Ocho años después de esa salida, Eric se casó en Valencia; sus dos hijos nacieron y han vivido siempre en esa provincia. Esta web recoge lo que se sabe hasta hoy, y está pensada para poder seguir añadiendo lo que aparezca.",
      faltaTitulo: "Lo que falta",
      faltaEntradilla:
        "Esta es una primera versión. Estas cuatro cosas están a medias, y algunas solo puede cerrarlas quien las vivió.",
      pendiente: [
        {
          t: "Cómo llegamos a Valencia",
          d: "Una familia alicantina que pasó por Argentina, una casa en Toulouse a dos calles de la nuestra, y un verano en Cullera. El capítulo existe; falta escribirlo.",
        },
        {
          t: "La carta de 1894",
          d: "Es la única que se salvó de las decenas que llegaron de Rusia. Gracias a ella sabemos que nos llamábamos Reykin. Habría que publicarla entera, con su traducción.",
        },
        {
          t: "Dónde nació Achir",
          d: "Los papeles dicen Jerusalén, pero eso lo declaró él mismo sin poder probarlo. La familia siempre dijo Varna. Sigue abierto.",
        },
        {
          t: "El padre de Lydia",
          d: "Abraham Güez vivió hasta 1963 y no aparece una sola vez en los relatos. De su rama sabemos todavía muy poco.",
        },
      ],
      invitacion:
        "Si tienes una foto, una carta, un nombre o una fecha que aquí falte, háznoslo llegar. Se añadirá.",
      pie: "Archivo familiar Sebi · Reykin — primera versión",
    },
  },

  fr: {
    htmlLang: "fr",
    tituloSitio: "Les Sebi — une histoire de famille",
    descripcionSitio:
      "De Varna à Valence, en passant par Guelma, Souk-Ahras et Toulouse. L'histoire de la famille Sebi, racontée par Eric.",
    saltarAlContenido: "Aller au contenu",
    archivoFamiliar: "Archives familiales",
    cambiarIdioma: "Cambiar de idioma",
    otroIdioma: "Español",
    deslizaParaEmpezar: "Faites défiler pour commencer",
    nav: {
      origenes: "Origines",
      mapa: "Carte",
      tiempo: "Chronologie",
      arbol: "Arbre",
      galeria: "Galerie",
      tradiciones: "Mémoire",
      continuacion: "Aujourd'hui",
    },
    secciones: {
      origenes: {
        numero: "01 · Origines",
        titulo: "De Russie à Guelma",
        entradilla:
          "Le 13 mars 1881, le tsar Alexandre II est assassiné. Il y avait parmi les responsables plusieurs juifs, et à la suite de l'attentat commencèrent les pogroms dans l'Empire russe.",
      },
      mapa: {
        numero: "02 · Déplacements",
        titulo: "Cinq pays en quatre générations",
        entradilla:
          "Survolez ou cliquez sur chaque étape. La ligne pointillée est le chemin principal ; les autres points sont les endroits où l'histoire se ramifie.",
      },
      tiempo: {
        numero: "03 · Chronologie",
        titulo: "De 1852 à aujourd'hui",
        entradilla:
          "Ce qui est marqué « documenté » s'appuie sur un acte, une lettre ou un registre conservé. Le reste vient du récit d'Eric.",
      },
      arbol: {
        numero: "04 · Arbre généalogique",
        titulo: "Qui est qui",
        entradilla:
          "Cliquez sur une fiche pour lire ce que l'on sait de cette personne. De certaines on conserve beaucoup ; d'autres, seulement les dates.",
      },
      galeria: {
        numero: "05 · Galerie",
        titulo: "Les photographies conservées",
        entradilla:
          "Classées par décennie. Cliquez sur l'une d'elles pour la voir en entier et lire ce que nous en savons.",
      },
      tradiciones: {
        numero: "06 · Mémoire",
        titulo: "Ce qu'on racontait à la maison",
        entradilla:
          "Récits, noms et objets qui ne figurent sur aucun document et qui se sont transmis de vive voix.",
      },
      continuacion: {
        numero: "07 · Aujourd'hui",
        titulo: "Jusqu'à aujourd'hui",
      },
    },
    tiempo: { documentado: "documenté", hoy: "Auj." },
    arbol: {
      nacioEn: "Né(e) à",
      generaciones: [
        { titulo: "Celui qui est arrivé", pie: "Guelma, à partir de 1885" },
        { titulo: "Ceux de la rue Mogador", pie: "Huit enfants, seize grossesses" },
        { titulo: "La génération du milieu", pie: "Souk-Ahras, 1912 et 1914" },
        { titulo: "Ceux qui sont partis", pie: "Juillet 1962" },
        { titulo: "La génération d'aujourd'hui", pie: "Valence et France" },
        { titulo: "Ceux qui arrivent", pie: "Nés entre 2009 et 2018" },
      ],
      grafico: {
        titulo: "Arbre généalogique de la famille Sebi",
        aviso: "Survolez une case et son ascendance s'allume jusqu'à Achir et Zmirda. Cliquez sur un nom pour lire sa fiche. Sur petit écran, le dessin défile latéralement.",
        pieVerde: "— mariage",
        pieRojo: "--- second mariage",
        pieSeparada: "// séparés",
        pieGris: "▫ sans fiche propre",
      },
      ramas: {
        ucrania: {
          titulo: "Celle qui est restée",
          pie: "Ukraine, jusqu'en 1942",
          nota: "La branche qui n'est jamais sortie de Russie. Achir laissa sa fille aux bons soins de sa belle-sœur en 1881 et ils ne se revirent jamais. Ana n'a pas connu ses frères et sœurs de Guelma et n'a jamais mis les pieds rue Mogador : de ce côté-là il n'arrivait que des lettres, et elles cessèrent d'arriver en 1942.",
        },
        guez: {
          titulo: "La branche Güez",
          pie: "L'autre moitié de Lydia",
          nota: "Eux non plus ne viennent pas de Guelma. Abraham Güez et Semha « Lucie » sont les parents de Lydia, et ils entrèrent dans la famille quand elle épousa Jacques à Bône, en 1922. De cette branche nous savons encore très peu : pas même le nom de jeune fille de Lucie.",
        },
        consortes: {
          titulo: "Les maris",
          pie: "Ceux qui sont entrés par mariage",
          nota: "Georges Tibi, André, Max et Alain ont épousé Nono, Lulue, Mounette et Patricia. Ils ne sont pas enfants de Joseph et Lydia : ils sont entrés dans la famille en épousant leurs filles.",
        },
        valenciana: {
          titulo: "La branche valencienne",
          pie: "Le chapitre qui manque",
          nota: "Ici cette histoire cesse d'être une seule. Ceux qui suivent ne sont pas partis d'Algérie : ils viennent d'une autre famille, avec son propre parcours — Alicante, l'Argentine, Toulouse — qui reste à écrire.",
        },
      },
    },
    galeria: {
      todo: "Tout",
      retocada: "Image retouchée · ",
      tipos: { photo: "Photographie", letter: "Lettre", document: "Document" },
    },
    tradicionesCat: { recipe: "Recette", anecdote: "Anecdote", object: "Objet" },
    inicio: {
      titularA: "Chaque famille garde des histoires qui méritent d'être racontées.",
      titularB: "Voici la nôtre.",
      entradilla:
        "En 1885, un homme qui voyageait vers Jérusalem tomba malade pendant la traversée et fut débarqué en Algérie. Soixante-dix-sept ans plus tard, ses petits-enfants quittaient ce même pays. Ce site rassemble ce qui s'est passé entre ces deux dates, à partir du récit d'Eric Sebi et des documents conservés.",
      anticipo: [
        { t: "Origines", d: "Un bateau qui allait à Jérusalem et n'y est jamais arrivé" },
        { t: "La carte", d: "Varna, Guelma, Souk-Ahras, Toulouse, Valence" },
        { t: "Chronologie", d: "De 1852 à aujourd'hui, année par année" },
        { t: "L'arbre", d: "Cinq générations, avec noms et avec dates" },
      ],
    },
    origenes: {
      p1: "Tsvi Reykin était veuf et avait une petite fille, Ana. Il décida de partir à l'étranger avec un ami et laissa l'enfant aux bons soins de sa belle-sœur. Le but du voyage était Jérusalem.",
      p2a: "Il n'y arriva pas. Pendant la traversée il tomba malade de dysenterie et, selon la règle de l'époque, le commandant devait débarquer les malades dans le premier port venu. Il fut débarqué en Algérie ",
      p2b: "sans argent, malade, sans parler français et sans métier",
      p2c: " : son métier, courtier en grains, n'avait pas de débouché là-bas.",
      p3: "Il s'établit à Guelma, près de la frontière tunisienne. Il y avait là une petite communauté juive et il s'y intégra : selon Eric, sa formation religieuse était plus profonde que celle des séfarades et il avait une belle voix, de sorte qu'on lui offrit le poste de rabbin, qu'il accepta. Les actes de naissance de ses enfants, dès 1888, le désignent « rabbin ».",
      p4a: "Quand l'administration commença à créer un état civil de tous les Européens vivant en Algérie, il pensa qu'il devait adopter un nom plus facile à retenir en français. ",
      p4b: "Tsvi Reykin devint Achir Sebi",
      p4c: ", et avec lui toute sa descendance. La famille mettrait plus d'un siècle à l'apprendre.",
      p5: "Dans son acte de mariage, en 1886, il déclara être né à Jérusalem, fils de parents décédés et enterrés là-bas. Il ne l'établit pas par un acte de naissance mais par un acte de notoriété : l'instrument auquel on recourt quand cet acte n'existe pas. En 1941, deux tribunaux s'appuyèrent sur cette donnée pour juger que son fils Joseph n'était pas « juif indigène d'Algérie » et échappait au statut des juifs de Vichy.",
      anaTitulo: "Ana, la fille restée là-bas",
      anaTexto:
        "Son père la laissa en Ukraine en 1881 et ils ne se revirent jamais. Pendant soixante ans la famille restée là-bas écrivit des lettres en Algérie. Selon Eric, les Allemands l'assassinèrent en 1942 ; les lettres cessent d'arriver cette année-là.",
      anaAviso:
        "Image colorisée par IA. L'original est en noir et blanc : la couleur des cheveux et des yeux a été décidée par un algorithme.",
      anaAlt: "Portrait de studio d'Ana, la fille restée en Ukraine",
      heroAlt: "La famille Sebi sur un chemin, vers 1950",
    },
    final: {
      cita: "« Voilà Pierrot, l'histoire se termine ici avec le décès de papa en 1991. Entre l'arrivée de mon grand-père de Russie en 1885 et la sortie en catastrophe d'Algérie en 1962 s'écoulèrent 77 années de travail, d'espoirs et beaucoup de chagrin. »",
      firma: "Eric Sebi, novembre 2018",
      cierre:
        "L'histoire ne s'arrête pas là. Huit ans après ce départ, Eric se maria à Valence ; ses deux enfants y sont nés et y ont toujours vécu. Ce site rassemble ce que l'on sait aujourd'hui, et il est fait pour continuer à y ajouter ce qui apparaîtra.",
      faltaTitulo: "Ce qui manque",
      faltaEntradilla:
        "Ceci est une première version. Ces quatre points restent à moitié ouverts, et certains ne peuvent être refermés que par ceux qui les ont vécus.",
      pendiente: [
        {
          t: "Comment nous sommes arrivés à Valence",
          d: "Une famille d'Alicante passée par l'Argentine, une maison à Toulouse à deux rues de la nôtre, et un été à Cullera. Le chapitre existe ; il reste à l'écrire.",
        },
        {
          t: "La lettre de 1894",
          d: "C'est la seule rescapée des dizaines venues de Russie. C'est grâce à elle que nous savons que nous nous appelions Reykin. Il faudrait la publier entière, avec sa traduction.",
        },
        {
          t: "Où est né Achir",
          d: "Les papiers disent Jérusalem, mais c'est lui-même qui l'a déclaré sans pouvoir le prouver. La famille a toujours dit Varna. La question reste ouverte.",
        },
        {
          t: "Le père de Lydia",
          d: "Abraham Güez a vécu jusqu'en 1963 et n'apparaît pas une seule fois dans les récits. De sa branche nous savons encore très peu.",
        },
      ],
      invitacion:
        "Si vous avez une photo, une lettre, un nom ou une date qui manque ici, faites-le nous savoir. Nous l'ajouterons.",
      pie: "Archives familiales Sebi · Reykin — première version",
    },
  },
} as const;

export const dic = (lang: Lang) => DICCIONARIO[lang];
