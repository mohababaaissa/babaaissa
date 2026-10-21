import { CourseCategory, Lesson, ExamQuestion, LessonType, BusinessSettings, User } from '@/lib/types';
import { BUSINESS_INFO } from '@/lib/constants';

export const initialCategories: CourseCategory[] = [
  {
    id: 'road-signs',
    titleFr: 'Panneaux et signalisation',
    titleAr: 'العلامات والتشوير الطرقي',
    descriptionFr: 'Panneaux de danger, d\'interdiction, d\'obligation et d\'indication selon le code marocain.',
    descriptionAr: 'علامات الخطر، المنع، الإجبار، والإرشاد وفق القانون المغربي.',
    icon: 'TriangleAlert',
    order: 1,
  },
  {
    id: 'traffic-lights',
    titleFr: 'Feux et signaux lumineux',
    titleAr: 'الأضواء والإشارات الضوئية',
    descriptionFr: 'Signaux tricolores, feux clignotants et signaux des agents de la circulation.',
    descriptionAr: 'الأضواء الثلاثية، الأضواء الرافّة وإشارات أعوان المرور.',
    icon: 'TrafficCone',
    order: 2,
  },
  {
    id: 'priority-rules',
    titleFr: 'Règles de priorité',
    titleAr: 'قواعد الأسبقية',
    descriptionFr: 'Priorité à droite, cédez le passage, stop et règles de passage aux intersections.',
    descriptionAr: 'الأسبقية لليمين، علامة ليس لكم حق الأسبقية، قف، وقواعد المرور.',
    icon: 'ShieldAlert',
    order: 3,
  },
  {
    id: 'intersections-roundabouts',
    titleFr: 'Intersections et ronds-points',
    titleAr: 'التقاطعات والمدارات',
    descriptionFr: 'Positionnement, clignotants et règles de circulation dans les carrefours à sens giratoire.',
    descriptionAr: 'التموضع، استعمال الوماضات وقواعد السير داخل المدارات الحضرية.',
    icon: 'CircleDot',
    order: 4,
  },
  {
    id: 'speed-limits',
    titleFr: 'Limitations de vitesse',
    titleAr: 'السرعات المحددة',
    descriptionFr: 'Vitesses maximales en agglomération (60 km/h), hors agglomération (100 km/h) et autoroute (120 km/h).',
    descriptionAr: 'السرعة داخل المدار الحضري (60 كم/س)، خارجه (100 كم/س) وعلى الطريق السيار (120 كم/س).',
    icon: 'Gauge',
    order: 5,
  },
  {
    id: 'overtaking',
    titleFr: 'Dépassement et croisement',
    titleAr: 'التجاوز والتقابل',
    descriptionFr: 'Conditions de sécurité, lignes continues, visibilité et interdictions de dépasser.',
    descriptionAr: 'شروط الأمان، الخط المتصل، الرؤية وموانع التجاوز الخطرة.',
    icon: 'ArrowRightLeft',
    order: 6,
  },
  {
    id: 'parking-stopping',
    titleFr: 'Stationnement et arrêt',
    titleAr: 'الوقوف والتوقف',
    descriptionFr: 'Différence entre arrêt et stationnement, trottoirs rouge/blanc, zones dangereuses.',
    descriptionAr: 'الفرق بين الوقوف والتوقف، الرصيف المصبوغ بالأحمر والأبيض، والمناطق الممنوعة.',
    icon: 'SquareParking',
    order: 7,
  },
  {
    id: 'safety-distances',
    titleFr: 'Distances de sécurité',
    titleAr: 'مسافات الأمان والتوقف',
    descriptionFr: 'Calcul de la distance de sécurité, temps de réaction et distance de freinage.',
    descriptionAr: 'حساب مسافة الأمان، وقت رد الفعل، ومسافة الكبح حسب السرعة وحالة الطريق.',
    icon: 'Ruler',
    order: 8,
  },
  {
    id: 'vulnerable-users',
    titleFr: 'Usagers vulnérables',
    titleAr: 'مستعملو الطريق المعرضون للخطر',
    descriptionFr: 'Piétons, cyclistes, enfants et motocyclistes : règles de cohabitation et distances latérales.',
    descriptionAr: 'الراجلون، سائقو الدراجات، الأطفال والمسنون: مسافات التجاوز الجانبية والحذر.',
    icon: 'Footprints',
    order: 9,
  },
  {
    id: 'defensive-driving',
    titleFr: 'Conduite défensive',
    titleAr: 'السياقة الوقائية الدفاعية',
    descriptionFr: 'Anticipation des erreurs d\'autrui, gestion de la fatigue, météo (pluie, vent de sable à l\'Oriental).',
    descriptionAr: 'توقع أخطاء الآخرين، تجنب التعب، وتأثير الطقس كالأمطار والرياح بالجهة الشرقية.',
    icon: 'Eye',
    order: 10,
  },
  {
    id: 'vehicle-safety',
    titleFr: 'Sécurité du véhicule',
    titleAr: 'السلامة الميكانيكية للمركبة',
    descriptionFr: 'Pneumatiques, feux, ceintures, contrôle technique réglementaire et voyants du tableau de bord.',
    descriptionAr: 'العجلات، الأضواء، أحزمة الأمان، الفحص التقني الدوري والمؤشرات الضوئية للوحة القيادة.',
    icon: 'Wrench',
    order: 11,
  },
  {
    id: 'general-traffic-rules',
    titleFr: 'Règles générales et sanctions',
    titleAr: 'القواعد العامة والعقوبات',
    descriptionFr: 'Système de permis à points marocain, alcool au volant, téléphone et documents obligatoires.',
    descriptionAr: 'نظام رخصة السياقة بالنقط، الهاتف أثناء القيادة والوثائق القانونية الواجب حملها.',
    icon: 'FileText',
    order: 12,
  },
];

export const initialLessons: Lesson[] = [
  {
    id: 'lesson-road-signs-danger',
    categoryId: 'road-signs',
    titleFr: 'Les panneaux de danger',
    titleAr: 'علامات الخطر',
    descriptionFr: 'Reconnaître et anticiper les panneaux triangulaires annonçant un danger au Maroc.',
    descriptionAr: 'التعرف على العلامات المثلثة التي تعلن عن خطر قادم في الطرق المغربية.',
    contentFr: `Les panneaux de danger ont une forme triangulaire à fond blanc avec une bordure rouge (sauf pour les signaux temporaires de chantier qui ont un fond jaune).

Au Maroc, le danger est généralement situé à :
- 50 mètres du panneau en agglomération (en ville, comme à Bouarfa).
- 150 mètres du panneau hors agglomération (sur route nationale ou régionale).

Pourquoi cette distance ?
Elle permet au conducteur d'adapter sa vitesse, d'augmenter son attention et de rétrograder avant la zone critique (virage dangereux, rétrécissement de chaussée, passage piéton, dos d'âne ou passage d'animaux).`,
    contentAr: `تأخذ علامات الخطر شكلاً مثلثاً بخلفية بيضاء وحافة حمراء (باستثناء العلامات المؤقتة الخاصة بالأشغال التي تكون خلفيتها صفراء).

في المغرب، يقع الخطر عادة على مسافة:
- 50 متراً بعد العلامة داخل المدار الحضري (داخل المدينة مثل بوعرفة).
- 150 متراً بعد العلامة خارج المدار الحضري (على الطرق الوطنية والجهوية).

الهدف من هذه المسافة:
تمكين السائق من تخفيض سرعته، وزيادة انتباهه، وتغيير مستويات السرعة قبل الوصول إلى نقطة الخطر (منعرج خطير، ضيق الطريق، ممر الراجلين، مخفض السرعة أو مرور الحيوانات).`,
    keyPointsFr: [
      "Panneau triangulaire fond blanc + bordure rouge = Danger permanent.",
      "50 m avant le danger en ville, 150 m hors agglomération.",
      "Action immédiate : ralentir, maintenir la trajectoire et surveiller les rétroviseurs.",
      "Le panneau 'Double sens de circulation' est la seule exception : il prend effet immédiatement à sa hauteur !"
    ],
    keyPointsAr: [
      "مثلث بخلفية بيضاء وإطار أحمر = خطر دائم.",
      "يبدأ الخطر على بعد 50م بالمدينة و 150م خارج المدينة.",
      "السلوك المطلوب: خفض السرعة، الحفاظ على المسار ومراقبة المرايا.",
      "استثناء وحيد: علامة 'سير في الاتجاهين' تطبق فوراً من موضع العلامة !"
    ],
    diagramType: 'danger-triangle',
    diagramLabelFr: 'Panneau triangulaire de danger (Bordure rouge)',
    diagramLabelAr: 'علامة خطر مثلثة (إطار أحمر)',
    quiz: [
      {
        id: 'q-danger-dist',
        questionFr: 'En agglomération à Bouarfa, à quelle distance commence le danger après le panneau ?',
        questionAr: 'داخل المدار الحضري ببوعرفة، على أي مسافة يبدأ الخطر بعد العلامة ؟',
        optionsFr: ['Immédiatement au niveau du panneau', 'À 50 mètres', 'À 150 mètres', 'À 200 mètres'],
        optionsAr: ['فوراً عند العلامة', 'على بعد 50 متراً', 'على بعد 150 متراً', 'على بعد 200 متر'],
        correctIndex: 1,
        explanationFr: 'En agglomération, la vitesse étant plus réduite, les panneaux de danger sont implantés à 50 mètres avant le danger (contre 150 mètres hors agglomération).',
        explanationAr: 'داخل المدينة، نظراً لسرعة السير المحدودة، توضع علامات الخطر على بعد 50 متراً قبل موضع الخطر (مقابل 150 متراً خارج المدينة).'
      }
    ],
    isPublished: true,
    order: 1,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'lesson-priority-rules-right',
    categoryId: 'priority-rules',
    titleFr: 'La priorité à droite et les balises',
    titleAr: 'الأسبقية لليمين وعلامات التقاطع',
    descriptionFr: 'Comprendre la règle fondamentale de priorité en l\'absence de panneaux.',
    descriptionAr: 'فهم القاعدة الجوهرية للأسبقية عند غياب التشوير الطرقي.',
    contentFr: `En l'absence totale de signalisation ou de feu fonctionnel à une intersection, la règle d'or au Maroc est la priorité à droite.

Vous devez céder le passage à tout véhicule arrivant par votre droite, qu'il aille tout droit ou qu'il tourne.
Attention : la priorité ne dispense jamais de la prudence. Avant de vous engager même si vous êtes prioritaire, vérifiez que le véhicule de gauche a bien ralenti et vous a vu.

Situations où la priorité à droite ne s'applique PAS :
- Sortie d'un chemin de terre, garage ou station-service.
- Véhicules prioritaires en intervention urgente (ambulance, police, pompiers avec gyrophares et sirènes).
- Présence d'un panneau Stop ou Cédez-le-passage.`,
    contentAr: `في حال انعدام التشوير الطرقي أو تعطل الأضواء عند ملتقى الطرق، فإن القاعدة الذهبية بالمغرب هي الأسبقية لليمين.

يجب إعطاء حق الأسبقية لكل مركبة قادمة من جهة اليمين، سواء أرادت مواصلة السير للأمام أو الانعطاف.
تنبيه: التمتع بحق الأسبقية لا يعفي من الحذر؛ قبل الاندماج تأكد دائماً أن السائق القادم من اليسار خفض سرعته وانتبه لوجودك.

حالات لا تطبق فيها الأسبقية لليمين:
- الخروج من مسلك ترابي أو مرآب أو محطة وقود.
- سيارات الأولوية أثناء التدخل المستعجل (الإسعاف، الشرطة، الوقاية المدنية مع تشغيل المنبهات).
- وجود علامة قف أو ليس لكم حق الأسبقية.`,
    keyPointsFr: [
      "Intersection sans panneau = Priorité absolue à droite.",
      "Sortie d'un chemin de terre ou d'une propriété privée = Perte totale de priorité.",
      "Véhicules d'urgence en intervention = Priorité absolue dans tous les cas."
    ],
    keyPointsAr: [
      "ملتقى طرق بدون علامات = الأسبقية المطلقة لليمين.",
      "الخروج من طريق غير معبد أو مكان خاص = تفقد حق الأسبقية تماماً.",
      "مركبات الطوارئ أثناء التدخل = الأسبقية لها دائماً في جميع الحالات."
    ],
    diagramType: 'priority-cross',
    diagramLabelFr: 'Croisement sans panneau : Priorité à droite',
    diagramLabelAr: 'ملتقى بدون تشوير: الأسبقية لليمين',
    quiz: [
      {
        id: 'q-prio-dirt',
        questionFr: 'Un véhicule sort d\'un chemin de terre situé à votre droite. Devez-vous lui céder le passage ?',
        questionAr: 'مركبة تخرج من مسلك ترابي على يمينك. هل يجب عليك إعطاؤها حق الأسبقية ؟',
        optionsFr: ['Oui, car elle vient de la droite', 'Non, car elle sort d\'un chemin non carrossable', 'Oui, seulement si elle est plus rapide'],
        optionsAr: ['نعم، لأنها قادمة من اليمين', 'لا، لأنها تخرج من طريق ترابي غير معبد', 'نعم، فقط إذا كانت أسرع'],
        correctIndex: 1,
        explanationFr: 'Un véhicule qui débouche d\'un chemin de terre, d\'un parking ou d\'une propriété privée doit toujours céder le passage à tous les usagers de la voie principale.',
        explanationAr: 'المركبة التي تخرج من مسلك ترابي أو موقف سيارات أو عقار خاص يجب عليها دائماً إعطاء حق الأسبقية لمستعملي الطريق المعبد.'
      }
    ],
    isPublished: true,
    order: 2,
    createdAt: '2026-01-11T10:00:00Z',
  },
  {
    id: 'lesson-speed-limits-morocco',
    categoryId: 'speed-limits',
    titleFr: 'Les vitesses réglementaires au Maroc',
    titleAr: 'السرعات القانونية في المغرب',
    descriptionFr: 'Connaître les vitesses maximales autorisées par type de réseau routier.',
    descriptionAr: 'معرفة السرعات القصوى المسموح بها حسب نوع الشبكة الطرقية.',
    contentFr: `Le respect des limitations de vitesse est un pilier de la sécurité routière marocaine.

1. En agglomération (Villes et centres urbains) :
- Vitesse maximale générale : 60 km/h.
- Certaines zones spécifiques peuvent être limitées à 30 ou 40 km/h (près des écoles, passages piétons).

2. Hors agglomération (Routes nationales et régionales) :
- Vitesse maximale générale : 100 km/h.

3. Sur autoroute :
- Vitesse maximale générale : 120 km/h.
- Vitesse minimale sur la voie de gauche en conditions normales : 60 km/h.

Conducteurs novices (Permis probatoire de moins de 2 ans) :
Au Maroc, les conducteurs titulaires d'un permis probatoire sont limités à 90 km/h sur toutes les routes et autoroutes !`,
    contentAr: `يعد احترام حدود السرعة ركيزة أساسية للسلامة الطرقية بالمغرب.

1. داخل المدار الحضري (المدن والمراكز الحضرية):
- السرعة القصوى العامة: 60 كم/س.
- بعض المناطق قد تحدد بـ 30 أو 40 كم/س (قرب المدارس وممرات الراجلين).

2. خارج المدار الحضري (الطرق الوطنية والجهوية):
- السرعة القصوى العامة: 100 كم/س.

3. على الطريق السيار:
- السرعة القصوى العامة: 120 كم/س.
- السرعة الدنيا على المسلك الأيسر في الظروف العادية: 60 كم/س.

السائقون الجدد (الفترة الاختبارية لأقل من سنتين):
في المغرب، يحدد السائقون في الفترة الاختبارية بسرعة لا تتجاوز 90 كم/س على جميع الطرقات والطريق السيار !`,
    keyPointsFr: [
      "Agglomération : 60 km/h maximum.",
      "Hors agglomération : 100 km/h maximum.",
      "Autoroute : 120 km/h maximum.",
      "Période probatoire (2 premières années) : 90 km/h maximum partout."
    ],
    keyPointsAr: [
      "داخل المدينة: 60 كم/س كحد أقصى.",
      "خارج المدينة: 100 كم/س كحد أقصى.",
      "الطريق السيار: 120 كم/س كحد أقصى.",
      "الفترة الاختبارية (سنتان): 90 كم/س كحد أقصى على جميع الطرق."
    ],
    diagramType: 'speed-gauge',
    diagramLabelFr: 'Panneaux de limitation de vitesse',
    diagramLabelAr: 'علامات تحديد السرعة',
    quiz: [
      {
        id: 'q-novice-speed',
        questionFr: 'Sur autoroute, quelle est la vitesse maximale pour un conducteur en période probatoire (permis neuf) ?',
        questionAr: 'على الطريق السيار، ما هي السرعة القصوى المسموح بها لسائق في الفترة الاختبارية (رخصة جديدة) ؟',
        optionsFr: ['120 km/h', '100 km/h', '90 km/h', '80 km/h'],
        optionsAr: ['120 كم/س', '100 كم/س', '90 كم/س', '80 كم/س'],
        correctIndex: 2,
        explanationFr: 'Au Maroc, les nouveaux conducteurs sont soumis à une limitation stricte de 90 km/h pendant leurs 2 années de période probatoire, même sur autoroute.',
        explanationAr: 'بالمغرب، يخضع السائقون الجدد لسرعة لا تتجاوز 90 كم/س خلال سنتي الفترة الاختبارية، حتى على الطريق السيار.'
      }
    ],
    isPublished: true,
    order: 3,
    createdAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'lesson-safety-distances',
    categoryId: 'safety-distances',
    titleFr: 'Calcul de la distance de sécurité',
    titleAr: 'حساب مسافة الأمان الكافية',
    descriptionFr: 'Méthodes de calcul pour éviter les collisions en chaîne.',
    descriptionAr: 'طرق حساب المسافة الفاصلة لتفادي حوادث الاصطدام الخلفي.',
    contentFr: `La distance de sécurité est l'espace minimal à conserver avec le véhicule qui vous précède pour pouvoir s'arrêter sans heurt en cas de freinage brusque.

Règle pratique de calcul au Maroc :
Multipliez le chiffre des dizaines de votre vitesse par 6.
- À 60 km/h (en ville) : 6 x 6 = 36 mètres.
- À 100 km/h (sur route) : 10 x 6 = 60 mètres.
- À 120 km/h (sur autoroute) : 12 x 6 = 72 mètres.

En cas de pluie ou de chaussée mouillée :
La distance de freinage est multipliée par 2 ! Il faut donc doubler ou augmenter considérablement la distance de sécurité.`,
    contentAr: `مسافة الأمان هي الفراغ الأدنى الذي يجب الحفاظ عليه مع العربة التي تسير أمامك للتوقف بأمان في حالة الكبح المفاجئ.

القاعدة الحسابية المعتمدة بالمغرب:
نضرب رقم العشرات للسرعة في الرقم 6:
- عند السير بـ 60 كم/س (بالمدينة): 6 × 6 = 36 متراً.
- عند السير بـ 100 كم/س (بالطريق العادي): 10 × 6 = 60 متراً.
- عند السير بـ 120 كم/س (بالطريق السيار): 12 × 6 = 72 متراً.

في حالة المطر أو الطريق المبلل:
تتضاعف مسافة الكبح بمرتين ! لذلك يجب مضاعفة مسافة الأمان وزيادة الحذر.`,
    keyPointsFr: [
      "Règle de calcul : Chiffre des dizaines multiplié par 6.",
      "À 100 km/h, la distance minimale est de 60 mètres (environ 2 secondes).",
      "Par temps de pluie, la distance de freinage double."
    ],
    keyPointsAr: [
      "قاعدة الحساب: رقم العشرات مضروب في 6.",
      "عند 100 كم/س، المسافة الدنيا هي 60 متراً (حوالي ثانيتين).",
      "في الجو الممطر، تتضاعف مسافة الكبح."
    ],
    diagramType: 'safety-cars',
    diagramLabelFr: 'Schéma des distances de sécurité entre véhicules',
    diagramLabelAr: 'رسم توضيحي لمسافة الأمان بين مركبتين',
    quiz: [
      {
        id: 'q-calc-dist-100',
        questionFr: 'À 100 km/h sur route sèche, quelle est la distance de sécurité minimale réglementaire ?',
        questionAr: 'عند السير بسرعة 100 كم/س على طريق جافة، ما هي مسافة الأمان الدنيا المطلوبة ؟',
        optionsFr: ['30 mètres', '45 mètres', '60 mètres', '100 mètres'],
        optionsAr: ['30 متراً', '45 متراً', '60 متراً', '100 متر'],
        correctIndex: 2,
        explanationFr: 'Le calcul s\'effectue en multipliant le chiffre des dizaines par 6 : 10 x 6 = 60 mètres.',
        explanationAr: 'يتم الحساب بضرب رقم العشرات في 6: 10 × 6 = 60 متراً.'
      }
    ],
    isPublished: true,
    order: 4,
    createdAt: '2026-01-13T10:00:00Z',
  },
  {
    id: 'lesson-parking-stopping-rules',
    categoryId: 'parking-stopping',
    titleFr: 'Différence entre arrêt et stationnement',
    titleAr: 'الفرق الدقيق بين الوقوف والتوقف',
    descriptionFr: 'Maîtriser les définitions légales et les marquages de trottoir.',
    descriptionAr: 'إتقان التعريف القانوني للوقوف والتوقف وعلامات الأرصفة.',
    contentFr: `Dans le Code de la route marocain, ces deux notions sont très distinctes :

1. L'arrêt (الوقوف) :
Immobilisation très momentanée du véhicule, le temps de faire monter ou descendre un passager, ou de charger un colis léger.
Condition impérative : le moteur peut tourner et le conducteur DOIT rester à proximité immédiate du volant pour déplacer le véhicule si nécessaire.

2. Le stationnement (التوقف) :
Immobilisation prolongée du véhicule où le conducteur quitte son véhicule.

Couleurs des trottoirs au Maroc :
- Trottoir peint en Rouge et Blanc : Arrêt autorisé brièvement, Stationnement strictement interdit.
- Trottoir peint en Jaune continu ou Noir et Blanc continu : Arrêt ET stationnement strictement interdits.`,
    contentAr: `في قانون السير المغربي، يوجد فرق جوهري بين هذين المفهومين:

1. الوقوف (L'arrêt):
تثبيت العربة بشكل مؤقت جداً لصعود أو نزول راكب، أو شحن بضاعة خفيفة.
الشرط القانوني: يجب أن يبقى السائق قريباً من المقود لتحريك السيارة عند الاقتضاء.

2. التوقف (Le stationnement):
ركن العربة لمدة أطول ومغادرة السائق لها.

ألوان الأرصفة بالمغرب:
- رصيف مصبوغ بالأحمر والأبيض: الوقوف المؤقت مسموح به، لكن التوقف ممنوع كلياً.
- رصيف مصبوغ بالأصفر المتصل: الوقوف والتوقف ممنوعان معاً.`,
    keyPointsFr: [
      "Arrêt = Court, conducteur présent au volant.",
      "Stationnement = Long, conducteur quitte le véhicule.",
      "Trottoir Rouge et Blanc = Stationnement interdit, arrêt toléré si conducteur à bord.",
      "Trottoir Jaune continu = Ni arrêt, ni stationnement !"
    ],
    keyPointsAr: [
      "الوقوف: مؤقت والسائق بجانب المقود.",
      "التوقف: ركن ومغادرة السيارة.",
      "رصيف أحمر وأبيض: التوقف ممنوع، والوقوف مسموح.",
      "رصيف أصفر متصل: ممنوع الوقوف وممنوع التوقف معاً !"
    ],
    diagramType: 'curb-colors',
    diagramLabelFr: 'Signification des bordures de trottoir',
    diagramLabelAr: 'دلالات ألوان صباغة الأرصفة',
    quiz: [
      {
        id: 'q-curb-red-white',
        questionFr: 'Le trottoir est peint en bandes alternées Rouge et Blanc. Que pouvez-vous faire ?',
        questionAr: 'الرصيف مصبوغ بخطوط متناوبة حمراء وبيضاء. ماذا يحق لك فعله ؟',
        optionsFr: [
          'Stationner et quitter le véhicule',
          'Faire un arrêt court pour déposer un passager tout en restant au volant',
          'Ni arrêt ni stationnement'
        ],
        optionsAr: [
          'ركن السيارة ومغادرتها',
          'الوقوف المؤقت لإنزال راكب مع البقاء قرب المقود',
          'ممنوع الوقوف وممنوع التوقف'
        ],
        correctIndex: 1,
        explanationFr: 'Le trottoir rouge et blanc interdit le stationnement prolongé, mais autorise l\'arrêt momentané à condition de ne pas gêner et de rester au volant.',
        explanationAr: 'الرصيف المصبوغ بالأحمر والأبيض يمنع التوقف المطول، لكنه يسمح بالوقوف المؤقت شريطة البقاء بالمقود وعدم عرقلة السير.'
      }
    ],
    isPublished: true,
    order: 5,
    createdAt: '2026-01-14T10:00:00Z',
  }
];

export const initialExamQuestions: ExamQuestion[] = [
  {
    id: 'exam-q1',
    categoryId: 'road-signs',
    questionFr: 'Ce panneau triangulaire à bordure rouge annonce un danger. En agglomération à Bouarfa, à quelle distance commence ce danger ?',
    questionAr: 'هذه العلامة المثلثة ذات الإطار الأحمر تعلن عن خطر. داخل المدار الحضري ببوعرفة، على أي مسافة يبدأ هذا الخطر ؟',
    optionsFr: [
      'À 50 mètres',
      'À 150 mètres',
      'Immédiatement au niveau du panneau',
      'À 300 mètres'
    ],
    optionsAr: [
      'على بعد 50 متراً',
      'على بعد 150 متراً',
      'فوراً عند موضع العلامة',
      'على بعد 300 متر'
    ],
    correctIndex: 0,
    explanationFr: 'En agglomération, le danger annoncé par un panneau triangulaire est situé à 50 mètres. Hors agglomération, il se situe à 150 mètres.',
    explanationAr: 'داخل المدينة يقع الخطر المعلن عنه بعلامة الخطر على بعد 50 متراً، وخارج المدينة على بعد 150 متراً.',
    difficulty: 'easy',
    diagramType: 'danger-triangle',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'exam-q2',
    categoryId: 'priority-rules',
    questionFr: 'À une intersection sans aucun panneau ni feu, qui a la priorité de passage ?',
    questionAr: 'عند ملتقى طرق بدون أي علامة تشوير أو أضواء، لمن تكون أسبقية المرور ؟',
    optionsFr: [
      'Au véhicule qui roule le plus vite',
      'Au véhicule qui vient de la gauche',
      'Au véhicule qui se présente sur ma droite',
      'Au plus gros véhicule'
    ],
    optionsAr: [
      'للمركبة الأسرع',
      'للمركبة القادمة من اليسار',
      'للمركبة القادمة من اليمين',
      'للمركبة الأكبر حجماً'
    ],
    correctIndex: 2,
    explanationFr: 'En l\'absence de toute signalisation routière, la règle de la priorité à droite s\'applique obligatoirement.',
    explanationAr: 'في غياب التشوير الطرقي، تطبق قاعدة الأسبقية لليمين بشكل إجباري.',
    difficulty: 'easy',
    diagramType: 'priority-cross',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'exam-q3',
    categoryId: 'speed-limits',
    questionFr: 'Sur route nationale dégagée hors agglomération, quelle est la vitesse maximale autorisée pour un conducteur titulaire du permis définitif ?',
    questionAr: 'على طريق وطنية مفتوحة خارج المدار الحضري، ما هي السرعة القصوى المسموح بها لسائق يحمل رخصة سياقة نهائية ؟',
    optionsFr: [
      '80 km/h',
      '90 km/h',
      '100 km/h',
      '120 km/h'
    ],
    optionsAr: [
      '80 كم/س',
      '90 كم/س',
      '100 كم/س',
      '120 كم/س'
    ],
    correctIndex: 2,
    explanationFr: 'Hors agglomération sur route standard, la vitesse maximale autorisée par le Code de la route marocain est de 100 km/h.',
    explanationAr: 'خارج المدار الحضري على الطرق العادية، السرعة القصوى المحددة بقانون السير المغربي هي 100 كم/س.',
    difficulty: 'easy',
    diagramType: 'speed-gauge',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'exam-q4',
    categoryId: 'safety-distances',
    questionFr: 'Vous roulez à 100 km/h sur une chaussée sèche. Quelle est la distance minimale de sécurité à conserver avec la voiture de devant ?',
    questionAr: 'تسير بسرعة 100 كم/س على طريق جافة. ما هي مسافة الأمان الدنيا التي يجب تركها مع السيارة أمامك ؟',
    optionsFr: [
      '30 mètres',
      '40 mètres',
      '60 mètres',
      '90 mètres'
    ],
    optionsAr: [
      '30 متراً',
      '40 متراً',
      '60 متراً',
      '90 متراً'
    ],
    correctIndex: 2,
    explanationFr: 'La formule de calcul rapide consiste à multiplier le chiffre des dizaines de la vitesse par 6 : 10 x 6 = 60 mètres.',
    explanationAr: 'الصيغة المعتمدة لحساب مسافة الأمان هي ضرب رقم العشرات في 6: 10 × 6 = 60 متراً.',
    difficulty: 'medium',
    diagramType: 'safety-cars',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'exam-q5',
    categoryId: 'parking-stopping',
    questionFr: 'Le long d\'un trottoir peint en jaune continu, pouvez-vous vous arrêter pour laisser descendre un passager ?',
    questionAr: 'بمحاذاة رصيف مصبوغ باللون الأصفر المتصل، هل يمكنك التوقف مؤقتاً لإنزال راكب ؟',
    optionsFr: [
      'Oui, si je garde le moteur allumé',
      'Oui, pendant moins d\'une minute',
      'Non, l\'arrêt et le stationnement sont tous deux strictement interdits',
      'Oui, en allumant les feux de détresse'
    ],
    optionsAr: [
      'نعم، إذا تركت المحرك مشتغلاً',
      'نعم، لأقل من دقيقة واحدة',
      'لا، فالوقوف والتوقف كلاهما ممنوعان منعاً باتاً',
      'نعم، مع تشغيل أضواء النجدة'
    ],
    correctIndex: 2,
    explanationFr: 'Une ligne jaune continue peinte sur le trottoir interdit formellement à la fois l\'arrêt et le stationnement.',
    explanationAr: 'الخط الأصفر المتصل على الرصيف يمنع كلياً كلاً من الوقوف والتوقف معاً.',
    difficulty: 'medium',
    diagramType: 'curb-colors',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'exam-q6',
    categoryId: 'overtaking',
    questionFr: 'Une ligne blanche continue est peinte au milieu de la chaussée. Avez-vous le droit de la chevaucher pour dépasser un cycliste ?',
    questionAr: 'خط أبيض متصل مرسوم في وسط الطريق. هل يحق لك عبوره أو لمسه لتجاوز دراجة هوائية ؟',
    optionsFr: [
      'Oui, si aucun véhicule n\'arrive en face',
      'Non, une ligne continue est infranchissable et ne peut pas être chevauchée',
      'Oui, uniquement de jour'
    ],
    optionsAr: [
      'نعم، إذا لم تكن هناك مركبة قادمة',
      'لا، الخط المتصل بمثابة جدار ولا يجوز قطعه أو لمسه بأي حال',
      'نعم، نهاراً فقط'
    ],
    correctIndex: 1,
    explanationFr: 'La ligne continue est infranchissable en toutes circonstances, même pour dépasser un véhicule lent ou un vélo.',
    explanationAr: 'الخط المتصل لا يمكن قطعه ولا لمسه تحت أي ظرف حتى لتجاوز مستعمل طريق بطيء.',
    difficulty: 'medium',
    diagramType: 'solid-line',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'exam-q7',
    categoryId: 'general-traffic-rules',
    questionFr: 'Quel est le solde initial de points attribué sur le permis de conduire probatoire au Maroc ?',
    questionAr: 'ما هو الرصيد المبدئي للنقط الممنوح في رخصة السياقة الاختبارية بالمغرب ؟',
    optionsFr: [
      '10 points',
      '20 points',
      '30 points',
      '40 points'
    ],
    optionsAr: [
      '10 نقط',
      '20 نقطة',
      '30 نقطة',
      '40 نقطة'
    ],
    correctIndex: 1,
    explanationFr: 'Le permis probatoire marocain (valable 2 ans) débute avec un capital de 20 points. À l\'issue des deux ans sans infraction grave, le capital passe à 30 points.',
    explanationAr: 'تبدأ الفترة الاختبارية لرخصة السياقة برصيد 20 نقطة لمدة سنتين، وتنتقل إلى 30 نقطة بعد انقضاء السنتين دون ارتكاب مخالفات كبرى.',
    difficulty: 'easy',
    diagramType: 'points-license',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'exam-q8',
    categoryId: 'vulnerable-users',
    questionFr: 'Pour dépasser un piéton qui marche sur le bas-côté hors agglomération, quelle distance latérale minimale devez-vous laisser ?',
    questionAr: 'لتجاوز راجل يسير على حاشية الطريق خارج المدار الحضري، ما هي المسافة الجانبية الدنيا التي يجب تركها ؟',
    optionsFr: [
      '0,5 mètre',
      '1 mètre',
      '1,5 mètre',
      '2 mètres'
    ],
    optionsAr: [
      '0.5 متر',
      '1 متر',
      '1.5 متر',
      '2 أمتار'
    ],
    correctIndex: 2,
    explanationFr: 'Au Maroc, la distance latérale de sécurité minimale pour dépasser un piéton, cycliste ou animal est de 1 mètre en agglomération et de 1,5 mètre hors agglomération.',
    explanationAr: 'المسافة الجانبية الكافية للتجاوز هي متر واحد (1م) داخل المدينة، ومتر ونصف (1.5م) خارج المدينة.',
    difficulty: 'hard',
    diagramType: 'passing-pedestrian',
    isPublished: true,
    createdAt: '2026-01-10T10:00:00Z',
  }
];

export const initialLessonTypes: LessonType[] = [
  {
    id: 'beginner',
    titleFr: 'Conduite Débutant',
    titleAr: 'سياقة للمبتدئين',
    descriptionFr: 'Prise en main des commandes, embrayage, démarrage en côte et trajectoires sécurisées.',
    descriptionAr: 'التحكم في أجهزة السيارة، الواصل (لومبرياج)، الانطلاق في العقبة والمسارات الآمنة.',
    durationMinutes: 60,
    priceMAD: undefined, // Configurable placeholder
    isAvailable: true,
  },
  {
    id: 'city',
    titleFr: 'Conduite Urbaine',
    titleAr: 'السياقة في المدينة',
    descriptionFr: 'Circulation dans Bouarfa, carrefours, ronds-points, franchissement des priorités et piétons.',
    descriptionAr: 'التجول بشوارع بوعرفة، التقاطعات، المدارات، مراعاة الأسبقيات والراجلين.',
    durationMinutes: 60,
    priceMAD: undefined,
    isAvailable: true,
  },
  {
    id: 'parking',
    titleFr: 'Stationnement et Manœuvres',
    titleAr: 'الركن والمناورات',
    descriptionFr: 'Créneau, rangement en bataille et en épi, marche arrière rectiligne et demi-tour.',
    descriptionAr: 'الركن بمختلف أنواعه (طولي، عمودي ومائل)، الرجوع للخلف والدوران.',
    durationMinutes: 60,
    priceMAD: undefined,
    isAvailable: true,
  },
  {
    id: 'practice',
    titleFr: 'Perfectionnement & Autonomie',
    titleAr: 'تطوير المهارات والاستقلالية',
    descriptionFr: 'Anticipation des risques, vitesse adaptée et fluidité de conduite.',
    descriptionAr: 'توقع الأخطار، ضبط السرعة ومرونة السياقة في ظروف متنوعة.',
    durationMinutes: 60,
    priceMAD: undefined,
    isAvailable: true,
  },
  {
    id: 'exam-prep',
    titleFr: 'Préparation à l\'Examen Pratique',
    titleAr: 'التحضير للامتحان التطبيقي',
    descriptionFr: 'Mise en situation d\'examen NARSA, vérifications du véhicule et gestion du stress.',
    descriptionAr: 'محاكاة اختبار نارسا الميداني، معاينة تجهيزات السيارة والتحكم في التوتر.',
    durationMinutes: 60,
    priceMAD: undefined,
    isAvailable: true,
  },
];

export const initialBusinessSettings: BusinessSettings = {
  name: BUSINESS_INFO.name,
  nameAr: BUSINESS_INFO.nameAr,
  city: BUSINESS_INFO.city,
  cityAr: BUSINESS_INFO.cityAr,
  address: BUSINESS_INFO.address,
  addressAr: BUSINESS_INFO.addressAr,
  phone: BUSINESS_INFO.phone,
  openingHoursFr: BUSINESS_INFO.defaultSettings.openingHoursPlaceholderFr,
  openingHoursAr: BUSINESS_INFO.defaultSettings.openingHoursPlaceholderAr,
  examPassingScore: BUSINESS_INFO.defaultSettings.examPassingScore,
  totalExamQuestions: BUSINESS_INFO.defaultSettings.totalExamQuestions,
  examTimeLimitMinutes: BUSINESS_INFO.defaultSettings.examTimeLimitMinutes,
  officialLinks: {
    narsaPortal: BUSINESS_INFO.officialLinks.narsaPortal,
    narsaServices: BUSINESS_INFO.officialLinks.narsaServices,
    khadamatNarsa: BUSINESS_INFO.officialLinks.khadamatNarsa,
  },
  instructors: ['Moniteur Babaaissa', 'Instructeur Agréé'],
  vehicles: ['Dacia Sandero Stepway (Double commande)', 'Renault Clio (Double commande)'],
};

// Seed users: password for both is hashed with our crypto helper
// admin@babaaissa.ma -> "AdminBabaaissa2026!"
// eleve@babaaissa.ma -> "EleveBabaaissa2026!"
export const initialUsers: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Directeur Babaaissa',
    email: 'admin@babaaissa.ma',
    phone: '0626783160',
    role: 'ADMIN',
    passwordHash: '98bf035871a3ecd7546b8226ecafeca869a7a180632b16ce6040902bdcf6c783', // Hash of AdminBabaaissa2026!
    createdAt: '2026-01-01T08:00:00Z',
  },
  {
    id: 'usr-student-01',
    name: 'Mohamed El Alami',
    email: 'eleve@babaaissa.ma',
    phone: '0612345678',
    role: 'STUDENT',
    licenseCategory: 'B',
    passwordHash: '1016b41ee820758550b585783cbcf21e219b9bad900f6b1b92cc4b06f4e0f92d', // Hash of EleveBabaaissa2026!
    createdAt: '2026-01-15T10:00:00Z',
  }
];
