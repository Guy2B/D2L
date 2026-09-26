(() => {
  "use strict";

  const STORAGE_KEY = "die2lap:language:v34";
  const SUPPORTED = ["fr", "en", "de"];
  const LOCALES = { fr: "fr-FR", en: "en-GB", de: "de-DE" };

  const STRINGS = {
    fr: {
      "lang.label": "Langue du site",
      "common.skip": "Aller au contenu",
      "common.home": "Accueil de Chroniques d’ailleurs",
      "common.nav": "Navigation principale",
      "common.mobileNav": "Navigation mobile",
      "common.footerNav": "Liens de pied de page",
      "common.themeDark": "Activer le mode sombre",
      "common.themeLight": "Activer le mode clair",
      "common.themeTitle": "Changer de thème",
      "common.menuOpen": "Ouvrir le menu",
      "common.menuClose": "Fermer le menu",
      "meta.homeDescription": "Chroniques d’ailleurs, le site littéraire de Die 2 Lap : chroniques, nouvelles, poèmes, récits de voyage et romans.",
      "meta.disclaimerDescription": "Cadre d’utilisation et informations relatives au site littéraire Chroniques d’ailleurs.",
      "meta.impressumDescription": "Informations éditoriales et légales du site Chroniques d’ailleurs.",

      "nav.texts": "Textes",
      "nav.novels": "Romans",
      "nav.author": "Auteur",
      "nav.journey": "Parcours",
      "nav.archives": "Archives",
      "nav.disclaimer": "Disclaimer",
      "nav.impressum": "Impressum",
      "nav.studio": "Atelier auteur",

      "hero.eyebrow": "Auteur · Chroniques · Fiction · Poésie",
      "hero.copy": "Un espace d’écriture où la mémoire, le déplacement et l’intime rencontrent le monde. Des archives du blog aux manuscrits en cours de publication.",
      "hero.enter": "Entrer dans les textes",
      "hero.surprise": "Me surprendre",
      "hero.statsAria": "Repères du site",
      "hero.statsPublished": "textes publiés",
      "hero.statsTypes": "récits · nouvelles · poèmes",
      "hero.statsBooks": "romans achevés",
      "hero.statsBirth": "naissance de Chroniques d’ailleurs",
      "hero.quote": "« Ici je suis d’ailleurs… ailleurs je suis d’ici. »",

      "resume.aria": "Reprendre la lecture",
      "resume.last": "Votre dernière lecture",
      "resume.action": "Reprendre",

      "doors.kicker": "Choisir son chemin",
      "doors.title": "Trois portes d’entrée",
      "doors.lede": "Une nouvelle pour entrer par le récit. Un poème pour entrer par le rythme. Un roman pour entrer dans la fiction longue.",

      "library.kicker": "Bibliothèque",
      "library.title": "Les textes",
      "library.filtersAria": "Filtrer les publications",
      "library.all": "Tous",
      "library.chronicles": "Chroniques",
      "library.poems": "Poèmes",
      "library.travel": "Voyages",
      "library.stories": "Nouvelles",
      "library.searchAria": "Rechercher dans les publications",
      "library.searchPlaceholder": "Titre, mot, lieu…",
      "library.yearAria": "Explorer par année",
      "library.timeline": "Chronologie",
      "library.visible": "texte(s) affiché(s)",
      "library.reset": "Réinitialiser",
      "library.empty": "Aucun texte ne correspond à cette recherche.",
      "library.originalNote": "Les œuvres publiées restent en français, dans leur langue d’origine.",
      "library.noscript": "La bibliothèque reste accessible sans JavaScript. Les filtres, la recherche, les likes et les commentaires nécessitent JavaScript.",

      "works.kicker": "Fiction longue",
      "works.title": "Manuscrits achevés",
      "works.click": "Cliquez sur un titre pour lire son synopsis.",

      "about.kicker": "Auteur",
      "about.p1": "Ingénieur et manager de formation, Die 2 Lap a vécu au Cameroun, en France, aux États-Unis et en Chine avant de s’installer en Allemagne. Depuis 2014, il publie sur <em>Chroniques d’ailleurs</em> des chroniques, nouvelles, poèmes et récits de voyage.",
      "about.p2": "Son travail de fiction explore la mémoire, les récits construits à partir de faits incomplets et la manière dont l’intime rencontre des systèmes plus vastes : famille, science, histoire et politique.",
      "about.novels": "Voir les romans",

      "journey.kicker": "Parcours",
      "journey.title": "Entre technique et littérature.",
      "journey.aside": "Une trajectoire professionnelle et géographique qui nourrit une écriture attentive aux déplacements, aux systèmes, aux mémoires et aux points de rupture.",
      "journey.training": "Formation",
      "journey.trainingTitle": "Ingénierie & management",
      "journey.trainingCopy": "Une formation technique et managériale qui irrigue les thèmes scientifiques et systémiques de la fiction.",
      "journey.trajectory": "Trajectoire",
      "journey.countries": "Cinq pays",
      "journey.countriesList": "Cameroun · France · États-Unis · Chine · Allemagne.",
      "journey.writing": "Écriture",
      "journey.since": "Depuis 2014",
      "journey.writingCopy": "Chroniques, nouvelles, poèmes, récits de voyage et romans.",

      "archives.kicker": "Mémoire du web",
      "archives.title": "Les blogs d’origine",
      "archives.lede": "Le nouveau site restaure les textes, leurs dates et leurs filiations sans effacer leur première vie en ligne.",
      "dialog.close": "Fermer le synopsis",

      "footer.rights": "Tous droits réservés.",
      "footer.note": "Site littéraire personnel. Les textes demeurent la propriété de leur auteur. Les liens externes sont proposés à titre documentaire.",

      "article.back": "← Tous les textes",
      "article.toolsAria": "Options de lecture",
      "article.fontDown": "Réduire la taille du texte",
      "article.fontUp": "Agrandir la taille du texte",
      "article.focus": "Mode lecture",
      "article.focusExit": "Quitter le mode lecture",
      "article.originalNote": "Le texte littéraire ci-dessous reste dans sa langue originale, le français.",
      "article.railAria": "Repères de lecture",
      "article.published": "Publié",
      "article.category": "Catégorie",
      "article.reading": "Lecture",
      "article.publicationHistory": "Historique de publication",
      "article.archiveOn": "sur le blog d’origine",
      "article.archiveView": "Voir l’archive ↗",
      "article.like": "J’aime",
      "article.liked": "Aimé",
      "article.savedDevice": "enregistré sur cet appareil",
      "article.sharedReaders": "partagé avec les lecteurs",
      "article.sharedCounter": "compteur partagé",
      "article.syncing": "synchronisation…",
      "article.share": "Partager",
      "article.sharePhone": "Partager avec mon téléphone",
      "article.copyLink": "Copier le lien",
      "article.copy": "Copier",
      "article.copied": "Copié ✓",
      "article.afterLikeTitle": "Ce texte reste avec vous.",
      "article.afterLikeCopy": "Vous souhaitez le partager ?",
      "article.commentsAria": "Commentaires sur ce site",
      "article.comments": "Commentaires sur ce site",
      "article.name": "Nom",
      "article.yourName": "Votre nom",
      "article.comment": "Commentaire",
      "article.commentPlaceholder": "Écrire quelques mots…",
      "article.publishLocal": "Publier localement",
      "article.commentHelp": "Ces commentaires restent uniquement dans ce navigateur et sont distincts des commentaires historiques du blog d’origine.",
      "article.continue": "Continuer",
      "article.related": "À lire également",
      "article.paginationAria": "Navigation entre les textes",
      "article.notFoundKicker": "Lecture",
      "article.notFoundTitle": "Texte introuvable",
      "article.notFoundCopy": "Cette publication n’existe pas ou son identifiant est incorrect.",
      "article.notFoundBack": "Retour aux textes",

      "legal.info": "Informations",
      "legal.disclaimerTitle": "Disclaimer",
      "legal.disclaimerLede": "Cette page précise le cadre d’utilisation du site <em>Chroniques d’ailleurs</em>.",
      "legal.natureTitle": "Nature du site",
      "legal.natureCopy": "<em>Chroniques d’ailleurs</em> est un site littéraire personnel. Il présente des textes de fiction, des poèmes, des chroniques, des récits de voyage et des informations sur des manuscrits en cours de diffusion.",
      "legal.editorialTitle": "Responsabilité éditoriale",
      "legal.editorialCopy": "Les contenus publiés sur ce site reflètent une démarche d’auteur. Malgré le soin apporté à leur mise en ligne, aucune garantie n’est donnée quant à l’exhaustivité, l’absence d’erreur ou l’actualité permanente de toutes les informations hors des textes littéraires eux-mêmes.",
      "legal.externalTitle": "Liens externes",
      "legal.externalCopy": "Le site peut renvoyer vers des blogs d’origine, des plateformes de publication ou d’autres ressources externes. L’auteur n’exerce aucun contrôle continu sur ces sites tiers et ne saurait être tenu responsable de leur contenu au moment de votre consultation.",
      "legal.copyrightTitle": "Droits d’auteur",
      "legal.copyrightCopy": "Sauf mention contraire, les textes, images, choix éditoriaux et éléments de composition présents sur ce site sont protégés et demeurent la propriété de leur auteur ou de leurs ayants droit. Toute reproduction, diffusion ou adaptation, même partielle, nécessite une autorisation préalable.",
      "legal.localTitle": "Commentaires, appréciations et usages locaux",
      "legal.localCopy1": "Les commentaires locaux, l’état du bouton « J’aime » et l’atelier auteur utilisent le stockage du navigateur pour certaines préférences et données locales.",
      "legal.localCopy2": "Lorsque le compteur global de « J’aime » est activé, une requête technique est envoyée à Google Apps Script pour lire ou mettre à jour le compteur. La feuille Google Sheets associée au site conserve l’identifiant du texte, son titre, le nombre de « J’aime » et la date de dernière mise à jour.",
      "legal.analyticsTitle": "Mesure d’audience",
      "legal.analyticsCopy": "Le site utilise Google Analytics 4 pour mesurer l’audience et mieux comprendre la consultation des pages. Des événements techniques peuvent notamment mesurer l’ouverture d’un article, la progression de lecture, l’utilisation des filtres et de la recherche, l’ouverture d’un synopsis, ainsi que les actions « J’aime » et « Partager ». L’identifiant de mesure utilisé par le site est <code>G-T3SVPB7Y3P</code>.",
      "legal.scopeTitle": "Portée du présent texte",
      "legal.scopeCopy": "Ce disclaimer a une valeur informative et ne remplace pas un avis juridique adapté à votre situation ou aux obligations précises de votre pays d’hébergement.",

      "impressum.kicker": "Informations légales",
      "impressum.lede": "Informations éditoriales et d’hébergement du site <em>Chroniques d’ailleurs</em>.",
      "impressum.alertTitle": "Hébergement en cours de finalisation",
      "impressum.alertCopy": "Les informations relatives à l’hébergeur seront complétées dès que le choix d’hébergement définitif sera arrêté.",
      "impressum.editorTitle": "Éditeur du site",
      "impressum.editorCopy": "<strong>Nom éditorial :</strong> Die 2 Lap<br><strong>Responsable éditorial :</strong> Die2Lap<br><strong>Adresse :</strong> Lampertheim<br><strong>E-mail :</strong> <a href=\"mailto:die2lap@gmail.com\">die2lap@gmail.com</a>",
      "impressum.hostTitle": "Hébergement",
      "impressum.hostCopy": "<strong>Hébergeur :</strong> in progress<br><strong>Adresse :</strong> in progress<br><strong>Site web :</strong> in progress",
      "impressum.purposeTitle": "Objet du site",
      "impressum.purposeCopy": "Site littéraire personnel consacré à la publication de textes, à la présentation de manuscrits et à la mise en valeur des archives éditoriales de l’auteur.",
      "impressum.contentTitle": "Responsabilité pour les contenus",
      "impressum.contentCopy": "Les contenus de ce site sont élaborés avec soin. Toutefois, aucune garantie ne peut être donnée quant à leur exactitude permanente, hors de leur valeur littéraire ou documentaire telle qu’assumée par l’auteur.",
      "impressum.linksTitle": "Responsabilité pour les liens",
      "impressum.linksCopy": "Les liens vers des sites externes sont fournis pour contextualiser des publications ou renvoyer vers des sources d’origine. La responsabilité pour le contenu de ces sites incombe exclusivement à leurs exploitants respectifs.",
      "impressum.copyrightTitle": "Droit d’auteur",
      "impressum.copyrightCopy": "Les textes et éléments visuels du site sont soumis au droit d’auteur. Toute exploitation au-delà des limites prévues par la loi nécessite l’accord préalable du titulaire des droits.",
      "impressum.footerNote": "Modèle informatif. Pensez à compléter les mentions légales avec vos informations réelles avant publication publique.",

      "error.kicker": "404",
      "error.title": "Cette page s’est égarée.",
      "error.copy": "Le lien demandé n’existe plus ou n’a jamais existé. Les textes, eux, sont toujours à leur place.",
      "error.back": "Revenir aux textes",

      "dynamic.read": "Lire",
      "dynamic.novel": "Roman",
      "dynamic.story": "Nouvelle",
      "dynamic.poem": "Poème",
      "dynamic.readStory": "Lire la nouvelle →",
      "dynamic.readPoem": "Lire le poème →",
      "dynamic.readSynopsis": "Lire le synopsis →",
      "dynamic.seriesSynopsis": "Série + synopsis ↗",
      "dynamic.allYears": "Toutes",
      "dynamic.publishedOn": "Publié sur ",
      "dynamic.alsoOn": "Aussi sur ",
      "dynamic.originBlog": "le blog d’origine",
      "dynamic.otherMedia": "un autre média",
      "dynamic.archive": "Archive",
      "dynamic.imageCredit": "Crédit image : {credit}",
      "dynamic.publishedInitially": "Publié initialement sur ",
      "dynamic.alsoPublished": "Aussi publié sur ",
      "dynamic.archiveComments": "{count} com. archive",
      "dynamic.archiveCommentsLong": "{count} commentaire{plural} sur le blog d’origine",
      "dynamic.archiveCommentsBox": "{count} commentaire{plural} d’archive",
      "dynamic.readingMinutes": "{count} min de lecture",
      "dynamic.minutes": "{count} min",
      "dynamic.noLocalComments": "Aucun commentaire local pour le moment.",
      "dynamic.prev": "← Précédent",
      "dynamic.next": "Suivant →",
      "dynamic.shareText": "« {title} » sur Chroniques d’ailleurs",
      "dynamic.copyPrompt": "Copiez ce lien :",
      "dynamic.metaDescription": "{title}, {category}. Un texte de Die 2 Lap sur Chroniques d’ailleurs.",
      "dynamic.archiveTitle": "titre d’archive",
      "dynamic.dieBlog": "le blog de Die 2 Lap",
      "dynamic.seriesTitle": "Série Edmond Silla · E.S.",
      "dynamic.seriesHeading": "Science, risque, énergie, mémoire.",
      "dynamic.seriesBanner": "{count} thrillers autonomes reliés par un même personnage et une même question : jusqu’où peut-on faire confiance à ce que l’on mesure lorsque les conséquences restent profondément humaines ?",
      "dynamic.completedNovel": "Roman inédit · achevé",
      "dynamic.esCompleted": "E.S. · achevé",
      "dynamic.underSubmission": "En soumission",
      "dynamic.completedFallback": "Roman achevé",
      "dynamic.inProgress": "En cours d’écriture",
      "dynamic.otherManuscripts": "Autres manuscrits",
      "dynamic.otherManuscriptsCopy": "D’autres manuscrits sont actuellement en cours d’écriture.",
      "dynamic.workInProgress": "Travaux en cours",
      "dynamic.seriesSection": "La série E.S.",
      "dynamic.thisVolume": "Ce volume : {title}",
      "dynamic.libraryLede": "{count} publications replacées dans leur chronologie et reliées à leurs sources d’origine.",
      "dynamic.worksAside": "{books} romans terminés. {submissions} {verb} actuellement en soumission. Cliquez sur un titre pour lire son synopsis.",
      "dynamic.worksVerbOne": "est",
      "dynamic.worksVerbMany": "sont"
    },

    en: {
      "lang.label": "Site language",
      "common.skip": "Skip to content",
      "common.home": "Chroniques d’ailleurs home",
      "common.nav": "Main navigation",
      "common.mobileNav": "Mobile navigation",
      "common.footerNav": "Footer links",
      "common.themeDark": "Switch to dark mode",
      "common.themeLight": "Switch to light mode",
      "common.themeTitle": "Change theme",
      "common.menuOpen": "Open menu",
      "common.menuClose": "Close menu",
      "meta.homeDescription": "Chroniques d’ailleurs, Die 2 Lap’s literary website: chronicles, short fiction, poetry, travel writing and novels.",
      "meta.disclaimerDescription": "Terms of use and information relating to the literary website Chroniques d’ailleurs.",
      "meta.impressumDescription": "Editorial and legal information for Chroniques d’ailleurs.",

      "nav.texts": "Texts",
      "nav.novels": "Novels",
      "nav.author": "Author",
      "nav.journey": "Journey",
      "nav.archives": "Archives",
      "nav.disclaimer": "Disclaimer",
      "nav.impressum": "Legal notice",
      "nav.studio": "Author studio",

      "hero.eyebrow": "Author · Chronicles · Fiction · Poetry",
      "hero.copy": "A place for writing where memory, movement and the intimate meet the wider world. From the blog’s archives to manuscripts making their way towards publication.",
      "hero.enter": "Enter the texts",
      "hero.surprise": "Surprise me",
      "hero.statsAria": "Site landmarks",
      "hero.statsPublished": "published texts",
      "hero.statsTypes": "stories · short fiction · poems",
      "hero.statsBooks": "completed novels",
      "hero.statsBirth": "birth of Chroniques d’ailleurs",
      "hero.quote": "“Here I am from elsewhere… elsewhere I am from here.”",

      "resume.aria": "Resume reading",
      "resume.last": "Your last reading",
      "resume.action": "Resume",

      "doors.kicker": "Choose your way in",
      "doors.title": "Three doors into the work",
      "doors.lede": "A short story to enter through narrative. A poem through rhythm. A novel through the long breath of fiction.",

      "library.kicker": "Library",
      "library.title": "The texts",
      "library.filtersAria": "Filter publications",
      "library.all": "All",
      "library.chronicles": "Chronicles",
      "library.poems": "Poems",
      "library.travel": "Travel",
      "library.stories": "Short stories",
      "library.searchAria": "Search the publications",
      "library.searchPlaceholder": "Title, word, place…",
      "library.yearAria": "Browse by year",
      "library.timeline": "Timeline",
      "library.visible": "text(s) shown",
      "library.reset": "Reset",
      "library.empty": "No text matches this search.",
      "library.originalNote": "The published works remain in French, their original language.",
      "library.noscript": "The library remains available without JavaScript. Filters, search, likes and comments require JavaScript.",

      "works.kicker": "Long-form fiction",
      "works.title": "Completed manuscripts",
      "works.click": "Select a title to read its synopsis.",

      "about.kicker": "Author",
      "about.p1": "Trained as an engineer and manager, Die 2 Lap has lived in Cameroon, France, the United States and China before settling in Germany. Since 2014, he has published chronicles, short fiction, poems and travel writing on <em>Chroniques d’ailleurs</em>.",
      "about.p2": "His fiction explores memory, the stories we build from incomplete facts, and the moment when private lives meet larger systems: family, science, history and politics.",
      "about.novels": "View the novels",

      "journey.kicker": "Journey",
      "journey.title": "Between engineering and literature.",
      "journey.aside": "A professional and geographical path that feeds a body of writing attentive to movement, systems, memory and points of rupture.",
      "journey.training": "Training",
      "journey.trainingTitle": "Engineering & management",
      "journey.trainingCopy": "A technical and managerial background that runs beneath the scientific and systemic concerns of the fiction.",
      "journey.trajectory": "Trajectory",
      "journey.countries": "Five countries",
      "journey.countriesList": "Cameroon · France · United States · China · Germany.",
      "journey.writing": "Writing",
      "journey.since": "Since 2014",
      "journey.writingCopy": "Chronicles, short fiction, poems, travel writing and novels.",

      "archives.kicker": "Web memory",
      "archives.title": "The original blogs",
      "archives.lede": "This new site restores the texts, their dates and their lineage without erasing their first life online.",
      "dialog.close": "Close synopsis",

      "footer.rights": "All rights reserved.",
      "footer.note": "Personal literary website. The texts remain the property of their author. External links are provided for documentary context.",

      "article.back": "← All texts",
      "article.toolsAria": "Reading options",
      "article.fontDown": "Decrease text size",
      "article.fontUp": "Increase text size",
      "article.focus": "Reading mode",
      "article.focusExit": "Exit reading mode",
      "article.originalNote": "The literary text below remains in its original language, French.",
      "article.railAria": "Reading details",
      "article.published": "Published",
      "article.category": "Category",
      "article.reading": "Reading",
      "article.publicationHistory": "Publication history",
      "article.archiveOn": "on the original blog",
      "article.archiveView": "View archive ↗",
      "article.like": "Like",
      "article.liked": "Liked",
      "article.savedDevice": "saved on this device",
      "article.sharedReaders": "shared with readers",
      "article.sharedCounter": "shared counter",
      "article.syncing": "syncing…",
      "article.share": "Share",
      "article.sharePhone": "Share from my phone",
      "article.copyLink": "Copy link",
      "article.copy": "Copy",
      "article.copied": "Copied ✓",
      "article.afterLikeTitle": "This text stays with you.",
      "article.afterLikeCopy": "Would you like to share it?",
      "article.commentsAria": "Comments on this site",
      "article.comments": "Comments on this site",
      "article.name": "Name",
      "article.yourName": "Your name",
      "article.comment": "Comment",
      "article.commentPlaceholder": "Write a few words…",
      "article.publishLocal": "Publish locally",
      "article.commentHelp": "These comments remain in this browser only and are separate from the historical comments on the original blog.",
      "article.continue": "Continue",
      "article.related": "You may also like",
      "article.paginationAria": "Navigation between texts",
      "article.notFoundKicker": "Reading",
      "article.notFoundTitle": "Text not found",
      "article.notFoundCopy": "This publication does not exist, or its identifier is incorrect.",
      "article.notFoundBack": "Back to the texts",

      "legal.info": "Information",
      "legal.disclaimerTitle": "Disclaimer",
      "legal.disclaimerLede": "This page sets out the terms under which <em>Chroniques d’ailleurs</em> is made available.",
      "legal.natureTitle": "Nature of the site",
      "legal.natureCopy": "<em>Chroniques d’ailleurs</em> is a personal literary website. It presents fiction, poems, chronicles, travel writing and information about manuscripts currently being circulated.",
      "legal.editorialTitle": "Editorial responsibility",
      "legal.editorialCopy": "The material published here reflects an authorial practice. Every care is taken in presenting it online, but no guarantee is given as to completeness, freedom from error or the permanent currency of information outside the literary texts themselves.",
      "legal.externalTitle": "External links",
      "legal.externalCopy": "The site may link to the original blogs, publishing platforms or other external resources. The author does not exercise continuous control over third-party sites and cannot be held responsible for their content at the time of consultation.",
      "legal.copyrightTitle": "Copyright",
      "legal.copyrightCopy": "Unless otherwise stated, the texts, images, editorial choices and compositional elements on this site are protected and remain the property of their author or respective rights holders. Any reproduction, distribution or adaptation, even in part, requires prior permission.",
      "legal.localTitle": "Comments, likes and local features",
      "legal.localCopy1": "Local comments, the state of the Like button and the author studio use browser storage for certain preferences and local data.",
      "legal.localCopy2": "When the shared Like counter is enabled, a technical request is sent to Google Apps Script to read or update that counter. The Google Sheet associated with the site stores the text identifier, its title, the number of Likes and the date of the latest update.",
      "legal.analyticsTitle": "Audience measurement",
      "legal.analyticsCopy": "The site uses Google Analytics 4 to measure its audience and better understand how pages are read. Technical events may record the opening of an article, reading progress, the use of filters and search, the opening of a synopsis, and actions such as Like and Share. The measurement ID used by the site is <code>G-T3SVPB7Y3P</code>.",
      "legal.scopeTitle": "Scope of this notice",
      "legal.scopeCopy": "This disclaimer is provided for information only and does not replace legal advice tailored to your circumstances or to the specific obligations of your hosting jurisdiction.",

      "impressum.kicker": "Legal information",
      "impressum.lede": "Editorial and hosting information for <em>Chroniques d’ailleurs</em>.",
      "impressum.alertTitle": "Hosting details being finalised",
      "impressum.alertCopy": "Hosting information will be completed once the final hosting arrangement has been confirmed.",
      "impressum.editorTitle": "Site publisher",
      "impressum.editorCopy": "<strong>Editorial name:</strong> Die 2 Lap<br><strong>Editorially responsible:</strong> Die2Lap<br><strong>Address:</strong> Lampertheim<br><strong>Email:</strong> <a href=\"mailto:die2lap@gmail.com\">die2lap@gmail.com</a>",
      "impressum.hostTitle": "Hosting",
      "impressum.hostCopy": "<strong>Host:</strong> in progress<br><strong>Address:</strong> in progress<br><strong>Website:</strong> in progress",
      "impressum.purposeTitle": "Purpose of the site",
      "impressum.purposeCopy": "A personal literary website devoted to publishing texts, presenting manuscripts and preserving the author’s editorial archives.",
      "impressum.contentTitle": "Responsibility for content",
      "impressum.contentCopy": "The content of this site is prepared with care. Nevertheless, no guarantee can be given as to its permanent accuracy beyond the literary or documentary value assumed by the author.",
      "impressum.linksTitle": "Responsibility for links",
      "impressum.linksCopy": "Links to external sites are provided to contextualise publications or lead back to original sources. Responsibility for the content of those sites rests solely with their respective operators.",
      "impressum.copyrightTitle": "Copyright",
      "impressum.copyrightCopy": "The texts and visual elements of this site are protected by copyright. Any use beyond the limits permitted by law requires the prior consent of the rights holder.",
      "impressum.footerNote": "Informational template. Complete the legal notice with your final hosting details before public publication.",

      "error.kicker": "404",
      "error.title": "This page has wandered off.",
      "error.copy": "The requested link no longer exists, or perhaps never did. The texts, however, are still where they belong.",
      "error.back": "Back to the texts",

      "dynamic.read": "Read",
      "dynamic.novel": "Novel",
      "dynamic.story": "Short story",
      "dynamic.poem": "Poem",
      "dynamic.readStory": "Read the story →",
      "dynamic.readPoem": "Read the poem →",
      "dynamic.readSynopsis": "Read the synopsis →",
      "dynamic.seriesSynopsis": "Series + synopsis ↗",
      "dynamic.allYears": "All",
      "dynamic.publishedOn": "Published on ",
      "dynamic.alsoOn": "Also on ",
      "dynamic.originBlog": "the original blog",
      "dynamic.otherMedia": "another publication",
      "dynamic.archive": "Archive",
      "dynamic.imageCredit": "Image credit: {credit}",
      "dynamic.publishedInitially": "First published on ",
      "dynamic.alsoPublished": "Also published on ",
      "dynamic.archiveComments": "{count} archive comm.",
      "dynamic.archiveCommentsLong": "{count} comment{plural} on the original blog",
      "dynamic.archiveCommentsBox": "{count} archived comment{plural}",
      "dynamic.readingMinutes": "{count} min read",
      "dynamic.minutes": "{count} min",
      "dynamic.noLocalComments": "No local comments yet.",
      "dynamic.prev": "← Previous",
      "dynamic.next": "Next →",
      "dynamic.shareText": "“{title}” on Chroniques d’ailleurs",
      "dynamic.copyPrompt": "Copy this link:",
      "dynamic.metaDescription": "{title}, {category}. A text by Die 2 Lap on Chroniques d’ailleurs.",
      "dynamic.archiveTitle": "archive title",
      "dynamic.dieBlog": "Die 2 Lap’s blog",
      "dynamic.seriesTitle": "Edmond Silla series · E.S.",
      "dynamic.seriesHeading": "Science, risk, energy, memory.",
      "dynamic.seriesBanner": "{count} standalone thrillers linked by one character and one persistent question: how far can we trust what we measure when the consequences remain profoundly human?",
      "dynamic.completedNovel": "Unpublished novel · complete",
      "dynamic.esCompleted": "E.S. · complete",
      "dynamic.underSubmission": "Under submission",
      "dynamic.completedFallback": "Completed novel",
      "dynamic.inProgress": "In progress",
      "dynamic.otherManuscripts": "Other manuscripts",
      "dynamic.otherManuscriptsCopy": "Other manuscripts are currently in progress.",
      "dynamic.workInProgress": "Work in progress",
      "dynamic.seriesSection": "The E.S. series",
      "dynamic.thisVolume": "This volume: {title}",
      "dynamic.libraryLede": "{count} publications restored to their chronology and linked to their original sources.",
      "dynamic.worksAside": "{books} completed novels. {submissions} currently under submission. Select a title to read its synopsis.",
      "dynamic.worksVerbOne": "is",
      "dynamic.worksVerbMany": "are"
    },

    de: {
      "lang.label": "Sprache der Website",
      "common.skip": "Zum Inhalt springen",
      "common.home": "Startseite von Chroniques d’ailleurs",
      "common.nav": "Hauptnavigation",
      "common.mobileNav": "Mobile Navigation",
      "common.footerNav": "Links im Seitenfuß",
      "common.themeDark": "Dunkelmodus aktivieren",
      "common.themeLight": "Hellmodus aktivieren",
      "common.themeTitle": "Darstellung wechseln",
      "common.menuOpen": "Menü öffnen",
      "common.menuClose": "Menü schließen",
      "meta.homeDescription": "Chroniques d’ailleurs, die Literaturwebsite von Die 2 Lap: Chroniken, Kurzprosa, Gedichte, Reiseberichte und Romane.",
      "meta.disclaimerDescription": "Nutzungshinweise und Informationen zur Literaturwebsite Chroniques d’ailleurs.",
      "meta.impressumDescription": "Redaktionelle und rechtliche Angaben zu Chroniques d’ailleurs.",

      "nav.texts": "Texte",
      "nav.novels": "Romane",
      "nav.author": "Autor",
      "nav.journey": "Werdegang",
      "nav.archives": "Archiv",
      "nav.disclaimer": "Hinweise",
      "nav.impressum": "Impressum",
      "nav.studio": "Autorenatelier",

      "hero.eyebrow": "Autor · Chroniken · Prosa · Lyrik",
      "hero.copy": "Ein Ort des Schreibens, an dem Erinnerung, Bewegung und das Intime auf die Welt treffen. Von den Archiven des Blogs bis zu Manuskripten auf dem Weg zur Veröffentlichung.",
      "hero.enter": "Zu den Texten",
      "hero.surprise": "Überrasche mich",
      "hero.statsAria": "Eckdaten der Website",
      "hero.statsPublished": "veröffentlichte Texte",
      "hero.statsTypes": "Erzählungen · Kurzprosa · Gedichte",
      "hero.statsBooks": "abgeschlossene Romane",
      "hero.statsBirth": "Geburtsjahr von Chroniques d’ailleurs",
      "hero.quote": "„Hier bin ich von anderswo… anderswo bin ich von hier.“",

      "resume.aria": "Lektüre fortsetzen",
      "resume.last": "Zuletzt gelesen",
      "resume.action": "Weiterlesen",

      "doors.kicker": "Den eigenen Zugang wählen",
      "doors.title": "Drei Türen ins Werk",
      "doors.lede": "Eine Erzählung führt über die Geschichte hinein. Ein Gedicht über den Rhythmus. Ein Roman über den langen Atem der Fiktion.",

      "library.kicker": "Bibliothek",
      "library.title": "Die Texte",
      "library.filtersAria": "Veröffentlichungen filtern",
      "library.all": "Alle",
      "library.chronicles": "Chroniken",
      "library.poems": "Gedichte",
      "library.travel": "Reisen",
      "library.stories": "Erzählungen",
      "library.searchAria": "In den Veröffentlichungen suchen",
      "library.searchPlaceholder": "Titel, Wort, Ort…",
      "library.yearAria": "Nach Jahr stöbern",
      "library.timeline": "Chronologie",
      "library.visible": "Text(e) angezeigt",
      "library.reset": "Zurücksetzen",
      "library.empty": "Kein Text entspricht dieser Suche.",
      "library.originalNote": "Die veröffentlichten Werke bleiben auf Französisch, ihrer Originalsprache.",
      "library.noscript": "Die Bibliothek bleibt auch ohne JavaScript zugänglich. Filter, Suche, Gefällt-mir-Angaben und Kommentare benötigen JavaScript.",

      "works.kicker": "Lange Prosa",
      "works.title": "Abgeschlossene Manuskripte",
      "works.click": "Wählen Sie einen Titel, um die Synopsis zu lesen.",

      "about.kicker": "Autor",
      "about.p1": "Die 2 Lap ist ausgebildeter Ingenieur und Manager. Er lebte in Kamerun, Frankreich, den Vereinigten Staaten und China, bevor er sich in Deutschland niederließ. Seit 2014 veröffentlicht er auf <em>Chroniques d’ailleurs</em> Chroniken, Kurzprosa, Gedichte und Reiseberichte.",
      "about.p2": "Seine Prosa erkundet Erinnerung, Erzählungen aus unvollständigen Fakten und jene Augenblicke, in denen das Private auf größere Systeme trifft: Familie, Wissenschaft, Geschichte und Politik.",
      "about.novels": "Zu den Romanen",

      "journey.kicker": "Werdegang",
      "journey.title": "Zwischen Technik und Literatur.",
      "journey.aside": "Ein beruflicher und geografischer Weg, der ein Schreiben nährt, das Bewegungen, Systeme, Erinnerungen und Bruchstellen aufmerksam verfolgt.",
      "journey.training": "Ausbildung",
      "journey.trainingTitle": "Ingenieurwesen & Management",
      "journey.trainingCopy": "Ein technischer und betriebswirtschaftlicher Hintergrund, der die wissenschaftlichen und systemischen Themen der Prosa durchzieht.",
      "journey.trajectory": "Lebensweg",
      "journey.countries": "Fünf Länder",
      "journey.countriesList": "Kamerun · Frankreich · Vereinigte Staaten · China · Deutschland.",
      "journey.writing": "Schreiben",
      "journey.since": "Seit 2014",
      "journey.writingCopy": "Chroniken, Kurzprosa, Gedichte, Reiseberichte und Romane.",

      "archives.kicker": "Gedächtnis des Netzes",
      "archives.title": "Die ursprünglichen Blogs",
      "archives.lede": "Die neue Website stellt Texte, Daten und Herkunftszusammenhänge wieder her, ohne ihr erstes Leben im Netz auszulöschen.",
      "dialog.close": "Synopsis schließen",

      "footer.rights": "Alle Rechte vorbehalten.",
      "footer.note": "Persönliche Literaturwebsite. Die Texte bleiben Eigentum ihres Autors. Externe Links dienen der dokumentarischen Einordnung.",

      "article.back": "← Alle Texte",
      "article.toolsAria": "Leseoptionen",
      "article.fontDown": "Text verkleinern",
      "article.fontUp": "Text vergrößern",
      "article.focus": "Lesemodus",
      "article.focusExit": "Lesemodus verlassen",
      "article.originalNote": "Der literarische Text unten bleibt in seiner Originalsprache Französisch.",
      "article.railAria": "Leseangaben",
      "article.published": "Veröffentlicht",
      "article.category": "Kategorie",
      "article.reading": "Lesezeit",
      "article.publicationHistory": "Publikationsgeschichte",
      "article.archiveOn": "im ursprünglichen Blog",
      "article.archiveView": "Archiv ansehen ↗",
      "article.like": "Gefällt mir",
      "article.liked": "Gefällt mir",
      "article.savedDevice": "auf diesem Gerät gespeichert",
      "article.sharedReaders": "mit den Lesenden geteilt",
      "article.sharedCounter": "gemeinsamer Zähler",
      "article.syncing": "wird synchronisiert…",
      "article.share": "Teilen",
      "article.sharePhone": "Über mein Smartphone teilen",
      "article.copyLink": "Link kopieren",
      "article.copy": "Kopieren",
      "article.copied": "Kopiert ✓",
      "article.afterLikeTitle": "Dieser Text bleibt bei Ihnen.",
      "article.afterLikeCopy": "Möchten Sie ihn teilen?",
      "article.commentsAria": "Kommentare auf dieser Website",
      "article.comments": "Kommentare auf dieser Website",
      "article.name": "Name",
      "article.yourName": "Ihr Name",
      "article.comment": "Kommentar",
      "article.commentPlaceholder": "Ein paar Worte schreiben…",
      "article.publishLocal": "Lokal veröffentlichen",
      "article.commentHelp": "Diese Kommentare bleiben ausschließlich in diesem Browser und sind von den historischen Kommentaren des ursprünglichen Blogs getrennt.",
      "article.continue": "Weiterlesen",
      "article.related": "Auch lesenswert",
      "article.paginationAria": "Navigation zwischen den Texten",
      "article.notFoundKicker": "Lektüre",
      "article.notFoundTitle": "Text nicht gefunden",
      "article.notFoundCopy": "Diese Veröffentlichung existiert nicht oder ihre Kennung ist fehlerhaft.",
      "article.notFoundBack": "Zurück zu den Texten",

      "legal.info": "Informationen",
      "legal.disclaimerTitle": "Hinweise",
      "legal.disclaimerLede": "Diese Seite erläutert die Rahmenbedingungen für die Nutzung von <em>Chroniques d’ailleurs</em>.",
      "legal.natureTitle": "Art der Website",
      "legal.natureCopy": "<em>Chroniques d’ailleurs</em> ist eine persönliche Literaturwebsite. Sie präsentiert Prosa, Gedichte, Chroniken, Reiseberichte sowie Informationen zu Manuskripten, die sich derzeit im Veröffentlichungsprozess befinden.",
      "legal.editorialTitle": "Redaktionelle Verantwortung",
      "legal.editorialCopy": "Die auf dieser Website veröffentlichten Inhalte sind Teil einer eigenständigen Autorentätigkeit. Trotz sorgfältiger Aufbereitung kann für Vollständigkeit, Fehlerfreiheit oder dauerhafte Aktualität der Informationen außerhalb der literarischen Texte selbst keine Gewähr übernommen werden.",
      "legal.externalTitle": "Externe Links",
      "legal.externalCopy": "Die Website kann auf ursprüngliche Blogs, Publikationsplattformen oder andere externe Ressourcen verweisen. Der Autor übt keine fortlaufende Kontrolle über diese Drittseiten aus und übernimmt keine Verantwortung für deren Inhalte zum Zeitpunkt des Aufrufs.",
      "legal.copyrightTitle": "Urheberrecht",
      "legal.copyrightCopy": "Soweit nicht anders angegeben, sind Texte, Bilder, redaktionelle Entscheidungen und Gestaltungselemente dieser Website geschützt und bleiben Eigentum ihres Autors oder der jeweiligen Rechteinhaber. Jede Vervielfältigung, Verbreitung oder Bearbeitung, auch auszugsweise, bedarf der vorherigen Genehmigung.",
      "legal.localTitle": "Kommentare, Gefällt-mir-Angaben und lokale Funktionen",
      "legal.localCopy1": "Lokale Kommentare, der Status der Gefällt-mir-Schaltfläche und das Autorenatelier verwenden den Browserspeicher für bestimmte Einstellungen und lokale Daten.",
      "legal.localCopy2": "Ist der gemeinsame Gefällt-mir-Zähler aktiviert, wird eine technische Anfrage an Google Apps Script gesendet, um den Zähler zu lesen oder zu aktualisieren. Das mit der Website verknüpfte Google Sheet speichert die Kennung des Textes, seinen Titel, die Anzahl der Gefällt-mir-Angaben und das Datum der letzten Aktualisierung.",
      "legal.analyticsTitle": "Reichweitenmessung",
      "legal.analyticsCopy": "Die Website verwendet Google Analytics 4, um ihre Nutzung zu messen und besser zu verstehen, wie Seiten gelesen werden. Technische Ereignisse können unter anderem das Öffnen eines Artikels, den Lesefortschritt, die Nutzung von Filtern und Suche, das Öffnen einer Synopsis sowie Aktionen wie Gefällt mir und Teilen erfassen. Die verwendete Mess-ID lautet <code>G-T3SVPB7Y3P</code>.",
      "legal.scopeTitle": "Geltungsbereich dieses Hinweises",
      "legal.scopeCopy": "Diese Hinweise dienen ausschließlich der Information und ersetzen keine Rechtsberatung, die auf Ihre Situation oder die konkreten Pflichten am jeweiligen Hostingstandort zugeschnitten ist.",

      "impressum.kicker": "Rechtliche Informationen",
      "impressum.lede": "Redaktionelle Angaben und Informationen zum Hosting von <em>Chroniques d’ailleurs</em>.",
      "impressum.alertTitle": "Hostingangaben werden noch ergänzt",
      "impressum.alertCopy": "Die Angaben zum Hosting werden vervollständigt, sobald die endgültige Hostinglösung feststeht.",
      "impressum.editorTitle": "Herausgeber der Website",
      "impressum.editorCopy": "<strong>Redaktioneller Name:</strong> Die 2 Lap<br><strong>Redaktionell verantwortlich:</strong> Die2Lap<br><strong>Adresse:</strong> Lampertheim<br><strong>E-Mail:</strong> <a href=\"mailto:die2lap@gmail.com\">die2lap@gmail.com</a>",
      "impressum.hostTitle": "Hosting",
      "impressum.hostCopy": "<strong>Hoster:</strong> in progress<br><strong>Adresse:</strong> in progress<br><strong>Website:</strong> in progress",
      "impressum.purposeTitle": "Zweck der Website",
      "impressum.purposeCopy": "Persönliche Literaturwebsite zur Veröffentlichung von Texten, zur Vorstellung von Manuskripten und zur Bewahrung der redaktionellen Archive des Autors.",
      "impressum.contentTitle": "Verantwortung für Inhalte",
      "impressum.contentCopy": "Die Inhalte dieser Website werden mit Sorgfalt erstellt. Eine Gewähr für ihre dauerhafte Richtigkeit kann jedoch nicht übernommen werden, unbeschadet des literarischen oder dokumentarischen Werts, für den der Autor einsteht.",
      "impressum.linksTitle": "Verantwortung für Links",
      "impressum.linksCopy": "Links zu externen Websites dienen der Einordnung von Veröffentlichungen oder führen zu ursprünglichen Quellen. Für die Inhalte dieser Websites sind ausschließlich deren jeweilige Betreiber verantwortlich.",
      "impressum.copyrightTitle": "Urheberrecht",
      "impressum.copyrightCopy": "Die Texte und visuellen Elemente dieser Website unterliegen dem Urheberrecht. Jede Nutzung über die gesetzlich zulässigen Grenzen hinaus bedarf der vorherigen Zustimmung des Rechteinhabers.",
      "impressum.footerNote": "Hinweisvorlage. Ergänzen Sie die rechtlichen Angaben vor der öffentlichen Veröffentlichung um die endgültigen Hostinginformationen.",

      "error.kicker": "404",
      "error.title": "Diese Seite hat sich verirrt.",
      "error.copy": "Der angeforderte Link existiert nicht mehr oder hat vielleicht nie existiert. Die Texte hingegen sind noch an ihrem Platz.",
      "error.back": "Zurück zu den Texten",

      "dynamic.read": "Lesen",
      "dynamic.novel": "Roman",
      "dynamic.story": "Erzählung",
      "dynamic.poem": "Gedicht",
      "dynamic.readStory": "Erzählung lesen →",
      "dynamic.readPoem": "Gedicht lesen →",
      "dynamic.readSynopsis": "Synopsis lesen →",
      "dynamic.seriesSynopsis": "Reihe + Synopsis ↗",
      "dynamic.allYears": "Alle",
      "dynamic.publishedOn": "Veröffentlicht auf ",
      "dynamic.alsoOn": "Auch auf ",
      "dynamic.originBlog": "dem ursprünglichen Blog",
      "dynamic.otherMedia": "einer weiteren Publikation",
      "dynamic.archive": "Archiv",
      "dynamic.imageCredit": "Bildnachweis: {credit}",
      "dynamic.publishedInitially": "Zuerst veröffentlicht auf ",
      "dynamic.alsoPublished": "Auch veröffentlicht auf ",
      "dynamic.archiveComments": "{count} Archivkomm.",
      "dynamic.archiveCommentsLong": "{count} Kommentar{plural} im ursprünglichen Blog",
      "dynamic.archiveCommentsBox": "{count} Archivkommentar{plural}",
      "dynamic.readingMinutes": "{count} Min. Lesezeit",
      "dynamic.minutes": "{count} Min.",
      "dynamic.noLocalComments": "Noch keine lokalen Kommentare.",
      "dynamic.prev": "← Vorheriger Text",
      "dynamic.next": "Nächster Text →",
      "dynamic.shareText": "„{title}“ auf Chroniques d’ailleurs",
      "dynamic.copyPrompt": "Diesen Link kopieren:",
      "dynamic.metaDescription": "{title}, {category}. Ein Text von Die 2 Lap auf Chroniques d’ailleurs.",
      "dynamic.archiveTitle": "Archivtitel",
      "dynamic.dieBlog": "der Blog von Die 2 Lap",
      "dynamic.seriesTitle": "Edmond-Silla-Reihe · E.S.",
      "dynamic.seriesHeading": "Wissenschaft, Risiko, Energie, Erinnerung.",
      "dynamic.seriesBanner": "{count} eigenständige Thriller, verbunden durch dieselbe Figur und dieselbe Frage: Wie weit können wir dem vertrauen, was wir messen, wenn die Folgen zutiefst menschlich bleiben?",
      "dynamic.completedNovel": "Unveröffentlichter Roman · abgeschlossen",
      "dynamic.esCompleted": "E.S. · abgeschlossen",
      "dynamic.underSubmission": "In Einreichung",
      "dynamic.completedFallback": "Abgeschlossener Roman",
      "dynamic.inProgress": "In Arbeit",
      "dynamic.otherManuscripts": "Weitere Manuskripte",
      "dynamic.otherManuscriptsCopy": "Weitere Manuskripte befinden sich derzeit in Arbeit.",
      "dynamic.workInProgress": "In Arbeit",
      "dynamic.seriesSection": "Die E.S.-Reihe",
      "dynamic.thisVolume": "Dieser Band: {title}",
      "dynamic.libraryLede": "{count} Veröffentlichungen, chronologisch wieder eingeordnet und mit ihren ursprünglichen Quellen verknüpft.",
      "dynamic.worksAside": "{books} abgeschlossene Romane. {submissions} derzeit in Einreichung. Wählen Sie einen Titel, um die Synopsis zu lesen.",
      "dynamic.worksVerbOne": "ist",
      "dynamic.worksVerbMany": "sind"
    }
  };


  const ALIASES = {
    "common.theme_dark": "common.themeDark",
    "common.theme_light": "common.themeLight",
    "common.theme_title": "common.themeTitle",
    "common.menu_open": "common.menuOpen",
    "common.menu_close": "common.menuClose",
    "common.mobile_nav": "common.mobileNav",
    "common.footer_nav": "common.footerNav",

    "home.hero.eyebrow": "hero.eyebrow",
    "home.hero.copy": "hero.copy",
    "home.hero.enter": "hero.enter",
    "home.hero.surprise": "hero.surprise",
    "home.hero.stats_aria": "hero.statsAria",
    "home.hero.posts": "hero.statsPublished",
    "home.hero.posts_sub": "hero.statsTypes",
    "home.hero.books": "hero.statsBooks",
    "home.hero.birth": "hero.statsBirth",
    "home.hero.quote": "hero.quote",
    "home.resume.aria": "resume.aria",
    "home.resume.label": "resume.last",
    "home.resume.action": "resume.action",
    "home.featured.kicker": "doors.kicker",
    "home.featured.title": "doors.title",
    "home.featured.lede": "doors.lede",
    "home.library.kicker": "library.kicker",
    "home.library.title": "library.title",
    "home.library.filters_aria": "library.filtersAria",
    "home.library.all": "library.all",
    "home.library.chronicles": "library.chronicles",
    "home.library.poems": "library.poems",
    "home.library.travel": "library.travel",
    "home.library.stories": "library.stories",
    "home.library.search_sr": "library.searchAria",
    "home.library.search_placeholder": "library.searchPlaceholder",
    "home.library.years_aria": "library.yearAria",
    "home.library.timeline": "library.timeline",
    "home.library.visible": "library.visible",
    "home.library.reset": "library.reset",
    "home.library.empty": "library.empty",
    "home.library.noscript": "library.noscript",
    "home.works.kicker": "works.kicker",
    "home.works.title": "works.title",
    "home.works.click": "works.click",
    "home.author.kicker": "about.kicker",
    "home.author.bio1": "about.p1",
    "home.author.bio2": "about.p2",
    "home.author.link": "about.novels",
    "home.journey.kicker": "journey.kicker",
    "home.journey.title": "journey.title",
    "home.journey.aside": "journey.aside",
    "home.journey.training_label": "journey.training",
    "home.journey.training_title": "journey.trainingTitle",
    "home.journey.training_copy": "journey.trainingCopy",
    "home.journey.path_label": "journey.trajectory",
    "home.journey.path_title": "journey.countries",
    "home.journey.path_copy": "journey.countriesList",
    "home.journey.writing_label": "journey.writing",
    "home.journey.writing_title": "journey.since",
    "home.journey.writing_copy": "journey.writingCopy",
    "home.archives.kicker": "archives.kicker",
    "home.archives.title": "archives.title",
    "home.archives.lede": "archives.lede",
    "home.synopsis.close": "dialog.close",

    "article.tools_aria": "article.toolsAria",
    "article.font_minus": "article.fontDown",
    "article.font_plus": "article.fontUp",
    "article.rail_aria": "article.railAria",
    "article.history": "article.publicationHistory",
    "article.archive_origin": "article.archiveOn",
    "article.archive_view": "article.archiveView",
    "article.like_local": "article.savedDevice",
    "article.share_phone": "article.sharePhone",
    "article.copy_link": "article.copyLink",
    "article.after_like_title": "article.afterLikeTitle",
    "article.after_like_copy": "article.afterLikeCopy",
    "article.comments_aria": "article.commentsAria",
    "article.name_placeholder": "article.yourName",
    "article.comment_placeholder": "article.commentPlaceholder",
    "article.publish_local": "article.publishLocal",
    "article.comments_help": "article.commentHelp",
    "article.pagination_aria": "article.paginationAria",
    "article.notfound_kicker": "article.notFoundKicker",
    "article.notfound_title": "article.notFoundTitle",
    "article.notfound_copy": "article.notFoundCopy",
    "article.notfound_back": "article.notFoundBack",

    "legal.disclaimer.kicker": "legal.info",
    "legal.disclaimer.title": "legal.disclaimerTitle",
    "legal.disclaimer.lede": "legal.disclaimerLede",
    "legal.disclaimer.nature_title": "legal.natureTitle",
    "legal.disclaimer.nature": "legal.natureCopy",
    "legal.disclaimer.editorial_title": "legal.editorialTitle",
    "legal.disclaimer.editorial": "legal.editorialCopy",
    "legal.disclaimer.links_title": "legal.externalTitle",
    "legal.disclaimer.links": "legal.externalCopy",
    "legal.disclaimer.copyright_title": "legal.copyrightTitle",
    "legal.disclaimer.copyright": "legal.copyrightCopy",
    "legal.disclaimer.local_title": "legal.localTitle",
    "legal.disclaimer.local1": "legal.localCopy1",
    "legal.disclaimer.local2": "legal.localCopy2",
    "legal.disclaimer.analytics_title": "legal.analyticsTitle",
    "legal.disclaimer.analytics": "legal.analyticsCopy",
    "legal.disclaimer.scope_title": "legal.scopeTitle",
    "legal.disclaimer.scope": "legal.scopeCopy",

    "legal.impressum.kicker": "impressum.kicker",
    "legal.impressum.title": "nav.impressum",
    "legal.impressum.lede": "impressum.lede",
    "legal.impressum.alert_title": "impressum.alertTitle",
    "legal.impressum.alert_copy": "impressum.alertCopy",
    "legal.impressum.publisher_title": "impressum.editorTitle",
    "legal.impressum.publisher": "impressum.editorCopy",
    "legal.impressum.hosting_title": "impressum.hostTitle",
    "legal.impressum.hosting": "impressum.hostCopy",
    "legal.impressum.purpose_title": "impressum.purposeTitle",
    "legal.impressum.purpose": "impressum.purposeCopy",
    "legal.impressum.content_title": "impressum.contentTitle",
    "legal.impressum.content": "impressum.contentCopy",
    "legal.impressum.links_title": "impressum.linksTitle",
    "legal.impressum.links": "impressum.linksCopy",
    "legal.impressum.copyright_title": "impressum.copyrightTitle",
    "legal.impressum.copyright": "impressum.copyrightCopy",
    "legal.impressum.footer_note": "impressum.footerNote",

    "page404.title": "error.title",
    "page404.lede": "error.copy",
    "page404.back": "error.back"
  };

  const BOOKS = {
    en: {
      demeure: {
        cardLabel: "Unpublished novel · complete",
        status: "Under submission",
        kicker: "Unpublished novel · Under submission",
        meta: "Literary novel with psychological suspense · approx. 89,000 words",
        paragraphs: [
          "The novel unfolds in five parts titled ÉLIAS, ÉLISA, ASILE, SALIE and AILES, five words built from the same letters.",
          "Élias Keller has five days to empty his mother Mara’s house in Seltz, Alsace, before handing over the keys. He has given himself a simple method: GARDER, DONNER, JETER.",
          "Yet in a box bearing his name he finds a photograph taken on 17 August 2008, his nineteenth birthday. Mara, Élias and Gabriel, his father, are standing in front of the house. Gabriel’s hand is bandaged. To Élias, the image is impossible: he is certain his father died in 2006."
        ]
      },
      jamais: {
        cardLabel: "Unpublished novel · complete",
        kicker: "Unpublished novel · Complete",
        meta: "Contemporary psychological drama · approx. 82,000 words · ready for publication",
        paragraphs: [
          "Jérôme believes he chose everything: to leave his wife, begin again with another woman, and save his company at the end of a decisive business trip to New York.",
          "What he does not know, as he steps into his mistress’s apartment that evening, is that she was about to leave him first. Nor does he know that his wife has known everything for months and has finally stopped waiting for a truth he will never give her.",
          "The stroke that strikes him at the exact moment of this discovery deprives him, forever, of the real version of his own story."
        ]
      },
      eau: {
        cardLabel: "E.S. · complete",
        status: "Under submission",
        kicker: "Edmond Silla · E.S. · Under submission",
        meta: "Unpublished novel · 83,194 words · complete and standalone",
        paragraphs: [
          "The story moves between Cameroon, Germany, Rwanda and the Democratic Republic of the Congo.",
          "Beneath Lake Kivu lie immense volumes of gas. When a clandestine group decides to exploit that threat during a peace summit on Idjwi Island, Edmond Silla, a Cameroonian lecturer and researcher based in Karlsruhe, becomes the only man capable of reading the plans stolen from his friend who died in Goma.",
          "At his side, Kímyá Lukéni, a respected senior official, seems guided by Maï, a childhood friend whose presence grows increasingly difficult to grasp. The danger buried in the lake begins to echo the danger Kímyá’s memory has held since childhood."
        ]
      },
      java: {
        cardLabel: "E.S. · complete",
        kicker: "Edmond Silla · E.S. · Complete",
        meta: "Unpublished novel · complete and standalone",
        paragraphs: [
          "The story unfolds between Karlsruhe and eastern Java, around the Ijen volcanic massif.",
          "When a geothermal project begins to register unexplained variations in springs, wells and underground flows, Edmond Silla is called in to examine data that no one can interpret in quite the same way anymore.",
          "Alongside Ratih Pranowo and her brother Bima, he discovers a landscape where natural hydrothermal activity, old industrial contamination, economic interests and long-concealed decisions overlap.",
          "As the most obvious explanations begin to fracture, one question becomes urgent: what happens when the installation suspected of worsening the danger may also be helping to contain it?"
        ]
      },
      "47secondes": {
        cardLabel: "E.S. · complete",
        kicker: "Edmond Silla · E.S. · Complete",
        meta: "Unpublished novel · complete and standalone",
        paragraphs: [
          "The story moves between Karlsruhe, San Salvador, Lake Ilopango and the Río Jiboa valley.",
          "For forty-seven seconds, an oscillation runs through Central America’s regional electricity grid. At the same moment, pumps stop, sensors register unusual variations and, on Lake Ilopango, a fisherman watches the water withdraw before returning.",
          "Edmond Silla, brought in to audit the network’s measurement architecture, finds himself at the centre of an investigation in which every system tells a different chronology. With Valeria Cañas, Ximena Alfaro and Camila Sosa, he must separate coincidence from actual cause.",
          "But when the rains turn the lake’s outlet into a threat to the Jiboa, measurement is no longer enough: someone must decide where risk can be accepted, and by whom."
        ]
      }
    },
    de: {
      demeure: {
        cardLabel: "Unveröffentlichter Roman · abgeschlossen",
        status: "In Einreichung",
        kicker: "Unveröffentlichter Roman · In Einreichung",
        meta: "Literarischer Roman mit psychologischer Spannung · ca. 89.000 Wörter",
        paragraphs: [
          "Der Roman gliedert sich in fünf Teile mit den Titeln ÉLIAS, ÉLISA, ASILE, SALIE und AILES, fünf Wörter aus denselben Buchstaben.",
          "Élias Keller hat fünf Tage Zeit, das Haus seiner Mutter Mara in Seltz im Elsass zu räumen, bevor er die Schlüssel übergeben muss. Er hat sich eine einfache Methode auferlegt: GARDER, DONNER, JETER.",
          "Doch in einem Karton mit seinem Namen findet er ein Foto vom 17. August 2008, seinem neunzehnten Geburtstag. Mara, Élias und Gabriel, sein Vater, stehen vor dem Haus. Gabriels Hand ist bandagiert. Für Élias kann dieses Bild nicht existieren: Er ist sicher, dass sein Vater 2006 gestorben ist."
        ]
      },
      jamais: {
        cardLabel: "Unveröffentlichter Roman · abgeschlossen",
        kicker: "Unveröffentlichter Roman · Abgeschlossen",
        meta: "Zeitgenössisches Psychodrama · ca. 82.000 Wörter · publikationsreif",
        paragraphs: [
          "Jérôme glaubt, alles selbst gewählt zu haben: seine Frau zu verlassen, mit einer anderen Frau neu anzufangen und sein Unternehmen nach einer entscheidenden Geschäftsreise nach New York zu retten.",
          "Was er nicht weiß, als er an jenem Abend die Wohnung seiner Geliebten betritt: Sie war im Begriff, ihn zuerst zu verlassen. Ebenso wenig weiß er, dass seine Frau seit Monaten alles weiß und irgendwann aufgehört hat, auf eine Wahrheit zu warten, die er ihr niemals geben wird.",
          "Der Schlaganfall, der ihn im Augenblick dieser Entdeckung trifft, nimmt ihm für immer die wirkliche Version seiner eigenen Geschichte."
        ]
      },
      eau: {
        cardLabel: "E.S. · abgeschlossen",
        status: "In Einreichung",
        kicker: "Edmond Silla · E.S. · In Einreichung",
        meta: "Unveröffentlichter Roman · 83.194 Wörter · abgeschlossen und eigenständig",
        paragraphs: [
          "Die Handlung führt durch Kamerun, Deutschland, Ruanda und die Demokratische Republik Kongo.",
          "Unter der Oberfläche des Kivusees lagern gewaltige Gasmengen. Als eine geheime Gruppe beschließt, diese Gefahr während eines Friedensgipfels auf der Insel Idjwi auszunutzen, wird Edmond Silla, ein kamerunischer Hochschullehrer und Forscher in Karlsruhe, zum einzigen Mann, der die Pläne lesen kann, die seinem in Goma verstorbenen Freund gestohlen wurden.",
          "An seiner Seite steht Kímyá Lukéni, eine angesehene hohe Beamtin, die von Maï geleitet zu werden scheint, einer Kindheitsfreundin, deren Gegenwart immer schwerer zu fassen ist. Die im See verborgene Gefahr antwortet auf jene, die Kímyás Erinnerung seit ihrer Kindheit festhält."
        ]
      },
      java: {
        cardLabel: "E.S. · abgeschlossen",
        kicker: "Edmond Silla · E.S. · Abgeschlossen",
        meta: "Unveröffentlichter Roman · abgeschlossen und eigenständig",
        paragraphs: [
          "Die Handlung spielt zwischen Karlsruhe und dem Osten Javas rund um das Vulkanmassiv Ijen.",
          "Als bei einem Geothermieprojekt unerklärliche Schwankungen in Quellen, Brunnen und unterirdischen Strömungen auftreten, wird Edmond Silla hinzugezogen, um Daten zu prüfen, die niemand mehr auf dieselbe Weise zu deuten vermag.",
          "Gemeinsam mit Ratih Pranowo und ihrem Bruder Bima stößt er auf eine Landschaft, in der natürliche Hydrothermalprozesse, alte industrielle Verunreinigungen, wirtschaftliche Interessen und lange verborgene Entscheidungen übereinanderliegen.",
          "Während die naheliegendsten Erklärungen Risse bekommen, drängt sich eine Frage auf: Was geschieht, wenn jene Anlage, die den Verdacht weckt, die Gefahr zu verschärfen, vielleicht zugleich dazu beiträgt, sie einzudämmen?"
        ]
      },
      "47secondes": {
        cardLabel: "E.S. · abgeschlossen",
        kicker: "Edmond Silla · E.S. · Abgeschlossen",
        meta: "Unveröffentlichter Roman · abgeschlossen und eigenständig",
        paragraphs: [
          "Die Handlung führt von Karlsruhe nach San Salvador, an den Ilopangosee und in das Tal des Río Jiboa.",
          "Siebenundvierzig Sekunden lang läuft eine Schwingung durch das regionale Stromnetz Mittelamerikas. Im selben Augenblick fallen Pumpen aus, Sensoren registrieren ungewöhnliche Abweichungen und ein Fischer auf dem Ilopangosee sieht, wie sich das Wasser zurückzieht, bevor es wiederkehrt.",
          "Edmond Silla, der die Messarchitektur des Netzes prüfen soll, gerät in eine Untersuchung, in der jedes System eine andere Chronologie erzählt. Gemeinsam mit Valeria Cañas, Ximena Alfaro und Camila Sosa muss er Zufälle von tatsächlichen Ursachen unterscheiden.",
          "Doch als der Regen den Abfluss des Sees zu einer Bedrohung für den Jiboa macht, reicht Messen nicht mehr aus: Es muss entschieden werden, wo Risiko akzeptiert werden darf und von wem."
        ]
      }
    }
  };

  const SERIES = {
    en: [
      "The E.S. series follows Edmond Silla, a Cameroonian lecturer and researcher based in Karlsruhe, whose work lies at the intersection of energy, measurement systems and the interpretation of complex data. From an African volcanic lake to Java’s hydrothermal terrain and the shores of Ilopango in Central America, each novel draws him into a crisis in which science never yields a simple truth.",
      "Across the series, Edmond faces natural hazards, energy infrastructures, human error, economic interests and political decisions whose consequences always exceed the models meant to contain them. He is not an all-knowing hero, but a man trained to notice what a measurement leaves out, what fails to align in a chronology, and what no dataset can decide in place of human beings.",
      "E.S. is a series of scientific and geopolitical thrillers in which water, energy, memory and risk echo across continents. Each volume stands alone, yet all return to the same question: how far can we trust what we measure when the consequences remain irreducibly human?"
    ],
    de: [
      "Die E.S.-Reihe folgt Edmond Silla, einem kamerunischen Hochschullehrer und Forscher in Karlsruhe, dessen Arbeit an der Schnittstelle von Energie, Messsystemen und der Deutung komplexer Daten liegt. Von einem afrikanischen Vulkansee über die hydrothermalen Landschaften Javas bis an die Ufer des Ilopango in Mittelamerika führt ihn jeder Roman in eine Krise, in der die Wissenschaft niemals eine einfache Wahrheit liefert.",
      "Im Verlauf der Reihe begegnet Edmond Naturgefahren, Energieinfrastrukturen, menschlichen Fehlern, wirtschaftlichen Interessen und politischen Entscheidungen, deren Folgen stets über die Modelle hinausreichen, die sie erfassen sollen. Er ist kein allwissender Held, sondern ein Mann, der erkennt, was in einer Messung fehlt, was in einer Chronologie nicht zusammenpasst und was keine Datensammlung anstelle von Menschen entscheiden kann.",
      "E.S. ist eine Reihe wissenschaftlicher und geopolitischer Thriller, in denen Wasser, Energie, Erinnerung und Risiko von Kontinent zu Kontinent aufeinander antworten. Jeder Band steht für sich, doch alle kreisen um dieselbe Frage: Wie weit können wir dem vertrauen, was wir messen, wenn die Folgen zutiefst menschlich bleiben?"
    ]
  };

  const CATEGORY = {
    fr: { "Chroniques": "Chroniques", "Poèmes": "Poèmes", "Histoires de voyage": "Histoires de voyage", "Nouvelles": "Nouvelles" },
    en: { "Chroniques": "Chronicles", "Poèmes": "Poems", "Histoires de voyage": "Travel writing", "Nouvelles": "Short stories" },
    de: { "Chroniques": "Chroniken", "Poèmes": "Gedichte", "Histoires de voyage": "Reiseberichte", "Nouvelles": "Erzählungen" }
  };

  let current = (() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(saved) ? saved : "fr";
    } catch {
      return "fr";
    }
  })();

  function raw(key, lang = current) {
    const resolved = ALIASES[key] || key;
    return STRINGS[lang]?.[resolved] ?? STRINGS.fr[resolved] ?? resolved;
  }

  function t(key, vars = {}, lang = current) {
    let value = String(raw(key, lang));
    Object.entries(vars).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, String(replacement));
    });
    return value;
  }

  function category(value, lang = current) {
    return CATEGORY[lang]?.[value] ?? value;
  }

  function formatDate(isoDate, options = { day: "numeric", month: "long", year: "numeric" }, lang = current) {
    if (!isoDate) return "";
    return new Intl.DateTimeFormat(LOCALES[lang] || LOCALES.fr, options).format(new Date(`${isoDate}T12:00:00`));
  }

  function localizeBook(key, baseBook) {
    if (current === "fr") return { ...baseBook };
    return { ...baseBook, ...(BOOKS[current]?.[key] || {}) };
  }

  function seriesIntro(frenchIntro) {
    return current === "fr" ? frenchIntro : (SERIES[current] || frenchIntro);
  }

  function applyPageMeta() {
    const page = document.body?.dataset.i18nPage;
    const meta = document.querySelector('meta[name="description"]');
    let description = "";
    if (page === "home") {
      document.title = "Chroniques d’ailleurs | Die 2 Lap";
      description = t("meta.homeDescription");
    } else if (page === "disclaimer") {
      document.title = `${t("nav.disclaimer")} | Chroniques d’ailleurs`;
      description = t("meta.disclaimerDescription");
    } else if (page === "impressum") {
      document.title = `${t("nav.impressum")} | Chroniques d’ailleurs`;
      description = t("meta.impressumDescription");
    } else if (page === "404") {
      document.title = `${t("error.title")} | Chroniques d’ailleurs`;
    }
    if (description && meta) meta.setAttribute("content", description);
    if (description) {
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
    }
  }

  function apply(root = document) {
    document.documentElement.lang = current;

    root.querySelectorAll("[data-i18n]").forEach(node => {
      node.textContent = t(node.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-html]").forEach(node => {
      node.innerHTML = t(node.dataset.i18nHtml);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    });
    root.querySelectorAll("[data-i18n-aria-label]").forEach(node => {
      node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
    });
    root.querySelectorAll("[data-i18n-aria]").forEach(node => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    root.querySelectorAll("[data-i18n-title]").forEach(node => {
      node.setAttribute("title", t(node.dataset.i18nTitle));
    });

    root.querySelectorAll(".language-switcher [data-lang]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === current));
      button.classList.toggle("is-active", button.dataset.lang === current);
    });
    root.querySelectorAll(".language-select").forEach(select => {
      select.value = current;
      select.setAttribute("aria-label", t("lang.label"));
    });
    root.querySelectorAll(".language-picker .sr-only").forEach(label => {
      label.textContent = t("lang.label");
    });

    const originalNote = root.querySelector("#original-language-note");
    if (originalNote) originalNote.hidden = current === "fr";

    const libraryOriginalNote = root.querySelector("#library-original-note");
    if (libraryOriginalNote) libraryOriginalNote.hidden = current === "fr";

    applyPageMeta();
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang) || lang === current) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    apply();
    window.dispatchEvent(new CustomEvent("d2l:languagechange", { detail: { lang } }));
    document.dispatchEvent(new CustomEvent("d2l:languagechange", { detail: { lang } }));
    window.d2lTrack?.("language_change", { language: lang });
  }

  function initSwitchers() {
    document.querySelectorAll(".language-switcher [data-lang]").forEach(button => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });
    document.querySelectorAll(".language-select").forEach(select => {
      select.value = current;
      select.addEventListener("change", () => setLanguage(select.value));
    });
  }

  window.D2LI18N = {
    t,
    raw,
    apply,
    setLanguage,
    get language() { return current; },
    get locale() { return LOCALES[current] || LOCALES.fr; },
    category,
    formatDate,
    localizeBook,
    seriesIntro
  };

  apply();
  initSwitchers();
})();
