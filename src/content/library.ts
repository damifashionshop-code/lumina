// ─────────────────────────────────────────────────────────────
// Lumina content library. All texts are intentionally positive,
// soft and non-categorical: this is an entertainment project.
// L = localized string pair.
// ─────────────────────────────────────────────────────────────
export type L = { ru: string; en: string };

export interface Archetype { name: L; desc: L; strength: L }

// 22 kind archetypes (values 1–22 of the playful "matrix")
export const archetypes: Record<number, Archetype> = {
  1:  { name: { ru: 'Искра', en: 'The Spark' }, desc: { ru: 'Вы умеете начинать. Там, где другие сомневаются, вы делаете первый шаг — и это заражает.', en: 'You know how to begin. Where others hesitate, you take the first step — and it inspires.' }, strength: { ru: 'смелость первого шага', en: 'the courage of the first step' } },
  2:  { name: { ru: 'Хранитель гармонии', en: 'Keeper of Harmony' }, desc: { ru: 'Вы чувствуете людей и умеете соединять. Рядом с вами спорам становится тесно, а теплу — просторно.', en: 'You sense people and know how to connect them. Around you, arguments shrink and warmth grows.' }, strength: { ru: 'дипломатичность и чуткость', en: 'diplomacy and sensitivity' } },
  3:  { name: { ru: 'Творец', en: 'The Creator' }, desc: { ru: 'Идеи приходят к вам сами. Ваша суперсила — превращать обычное в интересное.', en: 'Ideas come to you naturally. Your superpower is turning the ordinary into the interesting.' }, strength: { ru: 'живое воображение', en: 'vivid imagination' } },
  4:  { name: { ru: 'Архитектор', en: 'The Architect' }, desc: { ru: 'Вы умеете строить: планы, отношения, системы. На вас можно опереться.', en: 'You know how to build: plans, relationships, systems. People can lean on you.' }, strength: { ru: 'надёжность и структура', en: 'reliability and structure' } },
  5:  { name: { ru: 'Наставник', en: 'The Mentor' }, desc: { ru: 'Вы умеете учиться и передавать знания. Рядом с вами люди чувствуют опору традиции и мудрого совета.', en: 'You know how to learn and to pass knowledge on. Around you people feel the support of tradition and wise advice.' }, strength: { ru: 'мудрость наставника', en: 'a mentor’s wisdom' } },
  6:  { name: { ru: 'Сердце', en: 'The Heart' }, desc: { ru: 'Забота — ваш родной язык. Вы делаете места и людей вокруг себя уютнее.', en: 'Care is your native language. You make places and people around you feel like home.' }, strength: { ru: 'тепло и щедрость', en: 'warmth and generosity' } },
  7:  { name: { ru: 'Победитель', en: 'The Charioteer' }, desc: { ru: 'Ваша энергия — движение к цели. Вы умеете собирать волю и обстоятельства в одну колесницу и добираться туда, куда решили.', en: 'Yours is the energy of motion toward a goal. You gather will and circumstance into one chariot and arrive where you decided to.' }, strength: { ru: 'воля и целеустремлённость', en: 'will and determination' } },
  8:  { name: { ru: 'Хранитель равновесия', en: 'Keeper of Justice' }, desc: { ru: 'Ваше чувство справедливости и меры — редкий дар. Вы видите причину и следствие и умеете честно выравнивать любую ситуацию.', en: 'Your sense of fairness and measure is a rare gift. You see cause and effect and can honestly balance any situation.' }, strength: { ru: 'честность и баланс', en: 'honesty and balance' } },
  9:  { name: { ru: 'Мудрец', en: 'The Sage' }, desc: { ru: 'Вы умеете уходить вглубь и возвращаться с ответами. Ваша тишина — не одиночество, а источник силы и смысла.', en: 'You know how to go deep and come back with answers. Your silence is not loneliness but a source of strength and meaning.' }, strength: { ru: 'глубина и самодостаточность', en: 'depth and self-sufficiency' } },
  10: { name: { ru: 'Поток удачи', en: 'Flow of Fortune' }, desc: { ru: 'Вы умеете ловить момент. Жизнь любит предлагать вам неожиданные хорошие повороты.', en: 'You know how to catch the moment. Life loves offering you happy plot twists.' }, strength: { ru: 'чувство момента', en: 'sense of timing' } },
  11: { name: { ru: 'Внутренняя сила', en: 'Inner Strength' }, desc: { ru: 'Ваша мягкость — не слабость, а форма силы. Вы умеете быть спокойной опорой.', en: 'Your softness is not weakness but a form of strength. You can be a calm anchor.' }, strength: { ru: 'спокойная устойчивость', en: 'quiet resilience' } },
  12: { name: { ru: 'Новый взгляд', en: 'Fresh Perspective' }, desc: { ru: 'Вы умеете видеть привычное под другим углом — и находить там ответы.', en: 'You can see the familiar from a new angle — and find answers there.' }, strength: { ru: 'нестандартное мышление', en: 'unconventional thinking' } },
  13: { name: { ru: 'Обновление', en: 'Renewal' }, desc: { ru: 'Вы легко отпускаете то, что отслужило, и освобождаете место новому. Это редкий дар.', en: 'You gracefully let go of what has served its time, making room for the new. A rare gift.' }, strength: { ru: 'способность обновляться', en: 'the ability to renew' } },
  14: { name: { ru: 'Алхимик меры', en: 'Alchemist of Balance' }, desc: { ru: 'Вы интуитивно чувствуете правильные пропорции — в делах, эмоциях и отдыхе.', en: 'You intuitively feel the right proportions — in work, emotions and rest.' }, strength: { ru: 'чувство меры', en: 'a sense of measure' } },
  15: { name: { ru: 'Магнетизм', en: 'Magnetism' }, desc: { ru: 'В вас есть притяжение. Люди и возможности сами находят к вам дорогу.', en: 'There is a pull about you. People and opportunities find their way to you.' }, strength: { ru: 'харизма', en: 'charisma' } },
  16: { name: { ru: 'Освобождение', en: 'Liberation' }, desc: { ru: 'Вы умеете выходить из тесных рамок. Каждая перемена делает вас свободнее и легче.', en: 'You know how to step out of tight frames. Every change makes you freer and lighter.' }, strength: { ru: 'смелость перемен', en: 'the courage to change' } },
  17: { name: { ru: 'Звезда', en: 'The Star' }, desc: { ru: 'Вы умеете надеяться и зажигать надежду в других. Ваш свет заметен издалека.', en: 'You know how to hope and how to light hope in others. Your light is visible from afar.' }, strength: { ru: 'вдохновение и вера', en: 'inspiration and faith' } },
  18: { name: { ru: 'Интуиция', en: 'Intuition' }, desc: { ru: 'Вы слышите тихие подсказки, которые другие пропускают. Доверяйте своему внутреннему компасу.', en: 'You hear quiet hints that others miss. Trust your inner compass.' }, strength: { ru: 'тонкое чутьё', en: 'fine instinct' } },
  19: { name: { ru: 'Солнце', en: 'The Sun' }, desc: { ru: 'Вы умеете радоваться и делиться радостью. С вами день становится ярче.', en: 'You know how to enjoy life and share that joy. Days get brighter around you.' }, strength: { ru: 'светлая энергия', en: 'radiant energy' } },
  20: { name: { ru: 'Пробуждение', en: 'Awakening' }, desc: { ru: 'Вы растёте через осознание. Каждый ваш вывод — ступенька к более свободной версии себя.', en: 'You grow through awareness. Every insight is a step toward a freer version of yourself.' }, strength: { ru: 'осознанность', en: 'mindfulness' } },
  21: { name: { ru: 'Целостность', en: 'Wholeness' }, desc: { ru: 'Вы умеете собирать жизнь в цельную картину, где всему есть место.', en: 'You know how to gather life into a whole picture where everything has its place.' }, strength: { ru: 'внутренняя целостность', en: 'inner wholeness' } },
  22: { name: { ru: 'Безграничность', en: 'Boundlessness' }, desc: { ru: 'Ваши мечты крупнее среднего — и это прекрасно. Вы умеете мечтать так, что хочется действовать.', en: 'Your dreams are larger than average — and that is beautiful. You dream in a way that makes people act.' }, strength: { ru: 'масштаб мечты', en: 'the scale of your dreams' } },
};

export interface LifePathInfo { title: L; desc: L; strengths: L[]; tip: L }

export const lifePath: Record<number, LifePathInfo> = {
  1: { title: { ru: 'Первопроходец', en: 'The Pioneer' }, desc: { ru: 'Ваша энергия — энергия начала. Вам приятно вести, пробовать первым и открывать дороги.', en: 'Yours is the energy of beginnings. You enjoy leading, trying first and opening roads.' }, strengths: [{ ru: 'инициативность', en: 'initiative' }, { ru: 'самостоятельность', en: 'independence' }, { ru: 'решительность', en: 'decisiveness' }], tip: { ru: 'Иногда позволяйте другим позаботиться о вас — это тоже сила.', en: 'Sometimes let others take care of you — that is strength too.' } },
  2: { title: { ru: 'Дипломат', en: 'The Diplomat' }, desc: { ru: 'Ваша сила — в мягкости и умении слышать. Вы создаёте союзы и тёплые пространства.', en: 'Your power lies in softness and listening. You create alliances and warm spaces.' }, strengths: [{ ru: 'эмпатия', en: 'empathy' }, { ru: 'тактичность', en: 'tact' }, { ru: 'умение сотрудничать', en: 'cooperation' }], tip: { ru: 'Ваше «нет» тоже имеет право звучать — бережно, но уверенно.', en: 'Your “no” also deserves to be heard — gently but confidently.' } },
  3: { title: { ru: 'Вдохновитель', en: 'The Inspirer' }, desc: { ru: 'Слова, образы и идеи — ваша стихия. Вы умеете делать жизнь выразительнее.', en: 'Words, images and ideas are your element. You make life more expressive.' }, strengths: [{ ru: 'творчество', en: 'creativity' }, { ru: 'общительность', en: 'sociability' }, { ru: 'оптимизм', en: 'optimism' }], tip: { ru: 'Доводите любимые идеи до финала — им это очень идёт.', en: 'Carry your favourite ideas to the finish line — it suits them well.' } },
  4: { title: { ru: 'Строитель', en: 'The Builder' }, desc: { ru: 'Вы превращаете мечты в планы, а планы — в реальность. Ваш фундамент прочен.', en: 'You turn dreams into plans and plans into reality. Your foundation is solid.' }, strengths: [{ ru: 'дисциплина', en: 'discipline' }, { ru: 'основательность', en: 'thoroughness' }, { ru: 'верность слову', en: 'keeping your word' }], tip: { ru: 'Оставляйте в расписании место для приятной спонтанности.', en: 'Leave room in your schedule for pleasant spontaneity.' } },
  5: { title: { ru: 'Искатель свободы', en: 'The Freedom Seeker' }, desc: { ru: 'Вам нужны движение, впечатления и выбор. Вы легко адаптируетесь и вдохновляете на перемены.', en: 'You need motion, impressions and choice. You adapt easily and inspire change.' }, strengths: [{ ru: 'адаптивность', en: 'adaptability' }, { ru: 'смелость', en: 'boldness' }, { ru: 'широта интересов', en: 'breadth of interests' }], tip: { ru: 'Небольшие ритуалы стабильности сделают вашу свободу ещё вкуснее.', en: 'Small rituals of stability will make your freedom even sweeter.' } },
  6: { title: { ru: 'Хранитель', en: 'The Guardian' }, desc: { ru: 'Забота, красота и гармония — ваши таланты. Вы делаете мир вокруг добрее.', en: 'Care, beauty and harmony are your talents. You make the world around you kinder.' }, strengths: [{ ru: 'ответственность', en: 'responsibility' }, { ru: 'чувство прекрасного', en: 'sense of beauty' }, { ru: 'верность', en: 'loyalty' }], tip: { ru: 'Заботясь о других, не забывайте вносить себя в список любимых людей.', en: 'While caring for others, keep yourself on the list of loved ones.' } },
  7: { title: { ru: 'Мыслитель', en: 'The Thinker' }, desc: { ru: 'Вы любите тишину, глубину и смыслы. Ваши инсайты — ваша валюта.', en: 'You love silence, depth and meaning. Your insights are your currency.' }, strengths: [{ ru: 'аналитичность', en: 'analytical mind' }, { ru: 'наблюдательность', en: 'observation' }, { ru: 'внутренняя независимость', en: 'inner independence' }], tip: { ru: 'Делитесь своими находками — миру они нужны.', en: 'Share your findings — the world needs them.' } },
  8: { title: { ru: 'Организатор изобилия', en: 'The Abundance Organizer' }, desc: { ru: 'Вы умеете управлять ресурсами и видеть возможности там, где другие видят цифры.', en: 'You know how to manage resources and see opportunities where others see numbers.' }, strengths: [{ ru: 'целеустремлённость', en: 'determination' }, { ru: 'практичность', en: 'practicality' }, { ru: 'лидерство', en: 'leadership' }], tip: { ru: 'Успех приятнее, когда в нём есть место отдыху и близким.', en: 'Success tastes better with room for rest and loved ones.' } },
  9: { title: { ru: 'Гуманист', en: 'The Humanist' }, desc: { ru: 'Ваше сердце вмещает больше, чем кажется. Вы умеете завершать циклы и вдохновлять на добро.', en: 'Your heart holds more than it seems. You complete cycles and inspire kindness.' }, strengths: [{ ru: 'мудрость', en: 'wisdom' }, { ru: 'сострадание', en: 'compassion' }, { ru: 'широкий взгляд', en: 'a broad view' }], tip: { ru: 'Позволяйте себе получать столько же тепла, сколько отдаёте.', en: 'Allow yourself to receive as much warmth as you give.' } },
  11: { title: { ru: 'Проводник света', en: 'The Light Conductor' }, desc: { ru: 'Мастер-число. Ваша чувствительность — тонкий инструмент: вы улавливаете то, что другим незаметно.', en: 'A master number. Your sensitivity is a fine instrument: you catch what others miss.' }, strengths: [{ ru: 'интуиция', en: 'intuition' }, { ru: 'вдохновение', en: 'inspiration' }, { ru: 'тонкое восприятие', en: 'subtle perception' }], tip: { ru: 'Берегите свой ресурс: тишина и природа — ваши союзники.', en: 'Protect your energy: silence and nature are your allies.' } },
  22: { title: { ru: 'Великий строитель', en: 'The Master Builder' }, desc: { ru: 'Мастер-число. Вы способны соединять мечту и практику в проекты, которые переживают время.', en: 'A master number. You can join dream and practice into projects that outlive time.' }, strengths: [{ ru: 'масштабное видение', en: 'grand vision' }, { ru: 'реализм', en: 'realism' }, { ru: 'выдержка', en: 'endurance' }], tip: { ru: 'Большие цели любят маленькие ежедневные шаги.', en: 'Big goals love small daily steps.' } },
  33: { title: { ru: 'Учитель сердца', en: 'The Heart Teacher' }, desc: { ru: 'Мастер-число. Ваш дар — учить теплом и примером, поддерживать и исцелять словом.', en: 'A master number. Your gift is teaching by warmth and example, supporting and healing with words.' }, strengths: [{ ru: 'щедрость души', en: 'generosity of soul' }, { ru: 'наставничество', en: 'mentorship' }, { ru: 'безусловное тепло', en: 'unconditional warmth' }], tip: { ru: 'Ваше тепло бесценно — распределяйте его бережно.', en: 'Your warmth is priceless — share it wisely.' } },
};

// Pools for varied, always-positive generation
export const strengthsPool: L[] = [
  { ru: 'Умение видеть хорошее в людях', en: 'Seeing the good in people' },
  { ru: 'Способность учиться новому', en: 'The ability to learn new things' },
  { ru: 'Чувство юмора, которое спасает день', en: 'A sense of humour that saves the day' },
  { ru: 'Внимательность к деталям', en: 'Attention to detail' },
  { ru: 'Умение слушать по-настоящему', en: 'Truly listening to others' },
  { ru: 'Смелость пробовать', en: 'The courage to try' },
  { ru: 'Верность своим ценностям', en: 'Loyalty to your values' },
  { ru: 'Способность доводить важное до конца', en: 'Finishing what matters' },
  { ru: 'Тёплая забота о близких', en: 'Warm care for loved ones' },
  { ru: 'Умение находить красоту в простом', en: 'Finding beauty in simple things' },
  { ru: 'Честность с собой', en: 'Honesty with yourself' },
  { ru: 'Способность вдохновлять окружающих', en: 'Inspiring the people around you' },
  { ru: 'Гибкость в переменах', en: 'Flexibility in change' },
  { ru: 'Умение создавать уют', en: 'Creating coziness' },
  { ru: 'Настойчивость в важных делах', en: 'Persistence in what matters' },
  { ru: 'Открытость новым идеям', en: 'Openness to new ideas' },
];

export const growthPool: L[] = [
  { ru: 'Разрешать себе отдыхать без чувства вины — это точка раскрытия вашей энергии.', en: 'Allowing yourself to rest without guilt — a point where your energy unfolds.' },
  { ru: 'Чаще озвучивать свои желания вслух — зона мягкого роста доверия к себе.', en: 'Saying your wishes out loud more often — a gentle growth zone of self-trust.' },
  { ru: 'Хвалить себя за маленькие шаги — направление для усиления внутренней опоры.', en: 'Praising yourself for small steps — a direction to strengthen your inner ground.' },
  { ru: 'Просить о помощи, когда она нужна — навык, который сделает вас ещё сильнее.', en: 'Asking for help when needed — a skill that will make you even stronger.' },
  { ru: 'Оставлять в календаре пустые окна для себя — бережная привычка, которую стоит развить.', en: 'Leaving empty windows in your calendar just for you — a kind habit worth growing.' },
  { ru: 'Позволять планам меняться — точка, где рождается лёгкость.', en: 'Letting plans change — the point where lightness is born.' },
  { ru: 'Говорить «нет» без длинных объяснений — зона мягкого роста ваших границ.', en: 'Saying “no” without long explanations — a gentle growth zone of your boundaries.' },
  { ru: 'Замечать свои достижения, а не только планы — направление для усиления радости.', en: 'Noticing achievements, not only plans — a direction to amplify joy.' },
  { ru: 'Доверять первому впечатлению чуть больше — точка раскрытия интуиции.', en: 'Trusting your first impression a little more — a point where intuition unfolds.' },
];

export const weeklyPool: L[] = [
  { ru: 'Выделите 15 минут на дело, которое приносит вам чистую радость.', en: 'Set aside 15 minutes for something that brings you pure joy.' },
  { ru: 'Напишите короткое тёплое сообщение человеку, о котором давно думаете.', en: 'Send a short warm message to someone you have been thinking about.' },
  { ru: 'Прогуляйтесь без телефона и посчитайте красивые мелочи по пути.', en: 'Take a walk without your phone and count the beautiful little things.' },
  { ru: 'Запишите три вещи, за которые вы благодарны этой неделе.', en: 'Write down three things you are grateful for this week.' },
  { ru: 'Попробуйте один маленький новый опыт: вкус, маршрут, песню.', en: 'Try one small new experience: a taste, a route, a song.' },
  { ru: 'Разберите одну маленькую полку — пусть порядок начнётся с малого.', en: 'Tidy one small shelf — let order start small.' },
  { ru: 'Ложитесь спать на 30 минут раньше хотя бы дважды.', en: 'Go to bed 30 minutes earlier at least twice.' },
  { ru: 'Сделайте комплимент незнакомому человеку (или себе в зеркале).', en: 'Give a compliment to a stranger (or to yourself in the mirror).' },
  { ru: 'Позвольте себе час без планов — просто посмотрите, куда потянет.', en: 'Allow yourself one unplanned hour — just see where it takes you.' },
];

export const affirmationsPool: L[] = [
  { ru: 'Я двигаюсь в своём темпе, и этот темп — правильный.', en: 'I move at my own pace, and that pace is right.' },
  { ru: 'Мне не нужно быть идеальной версией — достаточно быть настоящей.', en: 'I do not need to be a perfect version — being real is enough.' },
  { ru: 'Каждый мой маленький шаг имеет значение.', en: 'Every small step I take matters.' },
  { ru: 'Я умею замечать хорошее — и его становится больше.', en: 'I notice the good — and it grows.' },
  { ru: 'Моя мягкость — это моя сила.', en: 'My softness is my strength.' },
  { ru: 'Я разрешаю себе радоваться без причины.', en: 'I allow myself to feel joy for no reason.' },
  { ru: 'Сегодня я выбираю бережность к себе.', en: 'Today I choose kindness toward myself.' },
  { ru: 'Во мне уже есть всё, чтобы начать.', en: 'I already have everything I need to begin.' },
  { ru: 'Я притягиваю людей и события, которые мне подходят.', en: 'I attract people and events that suit me.' },
];

export const mottosPool: L[] = [
  { ru: 'Свет внутри — маршрут снаружи.', en: 'Light within, path ahead.' },
  { ru: 'Мягко к себе, смело к мечте.', en: 'Gentle with myself, bold with my dream.' },
  { ru: 'Я не спешу — я иду вовремя.', en: 'I am not rushing — I am right on time.' },
  { ru: 'Маленькие шаги, большое сияние.', en: 'Small steps, great shine.' },
  { ru: 'Моё любопытство — мой компас.', en: 'My curiosity is my compass.' },
  { ru: 'Там, где я — там уже хорошо.', en: 'Where I am, good things already are.' },
  { ru: 'Расту, как умею. А умею я красиво.', en: 'I grow the way I can. And I can do it beautifully.' },
  { ru: 'Сначала вдох, потом чудеса.', en: 'First a breath, then the miracles.' },
];

export interface ResourceRow { name: L; shows: L; feed: L }
export const resourcesPool: ResourceRow[] = [
  { name: { ru: 'Любопытство', en: 'Curiosity' }, shows: { ru: 'желание узнавать и пробовать новое', en: 'the urge to learn and try new things' }, feed: { ru: 'книги, подкасты, новые маршруты', en: 'books, podcasts, new routes' } },
  { name: { ru: 'Тепло', en: 'Warmth' }, shows: { ru: 'забота о людях и пространствах', en: 'care for people and spaces' }, feed: { ru: 'время с близкими, уютные ритуалы', en: 'time with loved ones, cozy rituals' } },
  { name: { ru: 'Воображение', en: 'Imagination' }, shows: { ru: 'идеи, образы, нестандартные решения', en: 'ideas, images, unconventional solutions' }, feed: { ru: 'искусство, музыка, дневник идей', en: 'art, music, an idea journal' } },
  { name: { ru: 'Стойкость', en: 'Resilience' }, shows: { ru: 'умение проходить непростые периоды', en: 'moving through difficult periods' }, feed: { ru: 'сон, движение, поддержка друзей', en: 'sleep, movement, friends’ support' } },
  { name: { ru: 'Интуиция', en: 'Intuition' }, shows: { ru: 'тихие точные подсказки изнутри', en: 'quiet, precise hints from within' }, feed: { ru: 'тишина, прогулки, паузы перед решением', en: 'silence, walks, pauses before decisions' } },
  { name: { ru: 'Юмор', en: 'Humour' }, shows: { ru: 'способность разрядить любую ситуацию', en: 'defusing any situation' }, feed: { ru: 'любимые комедии, лёгкие люди рядом', en: 'favourite comedies, easygoing people' } },
  { name: { ru: 'Фокус', en: 'Focus' }, shows: { ru: 'умение погружаться в важное', en: 'diving deep into what matters' }, feed: { ru: 'ясные приоритеты, режим без уведомлений', en: 'clear priorities, notification-free time' } },
];

// Playful "energy of the period" 1–9, always encouraging
export const energytexts: Record<number, L> = {
  1: { ru: 'период новых начинаний: хорошее время мягко стартовать то, о чём давно думалось', en: 'a period of new beginnings: a good time to gently start what you have long considered' },
  2: { ru: 'период союзов и тепла: время укреплять связи и просить поддержку', en: 'a period of alliances and warmth: time to strengthen bonds and ask for support' },
  3: { ru: 'период творчества и лёгкости: пробуйте, играйте, выражайте себя', en: 'a period of creativity and lightness: try, play, express yourself' },
  4: { ru: 'период уютного порядка: маленькие системы сейчас дают большие плоды', en: 'a period of cozy order: small systems bring big fruit now' },
  5: { ru: 'период приятных перемен: время новых впечатлений и гибких планов', en: 'a period of pleasant change: time for new impressions and flexible plans' },
  6: { ru: 'период заботы и красоты: наводите гармонию дома и в отношениях', en: 'a period of care and beauty: bring harmony to your home and relationships' },
  7: { ru: 'период тишины и смыслов: время слушать себя и копить инсайты', en: 'a period of silence and meaning: time to listen inward and gather insights' },
  8: { ru: 'период уверенных шагов: ваши усилия любят становиться результатами', en: 'a period of confident steps: your efforts love turning into results' },
  9: { ru: 'период красивых завершений: время благодарить, отпускать и освобождать место новому', en: 'a period of beautiful completions: time to thank, release and make room for the new' },
};

// Ikigai direction templates. {love} {good} {grow} are replaced with user words.
export const ikigaiTemplates: L[] = [
  { ru: 'Соединить «{love}» и «{good}» в маленьком личном проекте — просто для радости.', en: 'Combine “{love}” and “{good}” in a small personal project — just for joy.' },
  { ru: 'Делиться тем, что вы умеете («{good}»), с теми, кому это нужно — например, в формате мини-советов или уроков.', en: 'Share what you are good at (“{good}”) with those who need it — say, as mini-tips or lessons.' },
  { ru: 'Выделить регулярное время на «{love}» — как на важную встречу с собой.', en: 'Schedule regular time for “{love}” — like an important meeting with yourself.' },
  { ru: 'Сделать первый маленький шаг в сторону «{grow}» уже на этой неделе.', en: 'Take the first tiny step toward “{grow}” this very week.' },
  { ru: 'Найти сообщество людей, которых тоже вдохновляет «{inspire}», — вместе идти веселее.', en: 'Find a community inspired by “{inspire}” too — the road is merrier together.' },
  { ru: 'Попробовать рассказать о «{love}» публично: пост, история, разговор — миру интересен ваш взгляд.', en: 'Try talking about “{love}” publicly: a post, a story, a chat — the world is curious about your view.' },
];

export const focusBoost: Record<string, L> = {
  confidence: { ru: 'Ваш запрос на уверенность уже услышан вами самим — а это первый и главный шаг.', en: 'Your wish for confidence has already been heard by you — and that is the first, main step.' },
  calm: { ru: 'Спокойствие любит ритуалы: дыхание, прогулки, тёплый свет вечером.', en: 'Calm loves rituals: breathing, walks, warm light in the evening.' },
  creativity: { ru: 'Творчество приходит на подготовленное место: держите под рукой блокнот для идей.', en: 'Creativity arrives where a place is ready: keep an idea notebook nearby.' },
  money: { ru: 'Изобилие дружит с ясностью: бережный учёт и добрые цели делают путь приятнее.', en: 'Abundance befriends clarity: gentle tracking and kind goals make the path sweeter.' },
  love: { ru: 'Отношения расцветают от внимания к мелочам — начните с одного тёплого жеста.', en: 'Relationships bloom from attention to small things — start with one warm gesture.' },
  health: { ru: 'Телу нравятся маленькие обещания, которые выполняются: стакан воды, сон, движение.', en: 'The body loves small promises kept: a glass of water, sleep, movement.' },
  discipline: { ru: 'Дисциплина — это забота, растянутая во времени. Начните с одного крошечного ритуала.', en: 'Discipline is care stretched over time. Start with one tiny ritual.' },
};
