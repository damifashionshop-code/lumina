// Legal pages (RU/EN). NOTE FOR THE PROJECT OWNER: before launching,
// have these documents reviewed by a lawyer for the jurisdiction of
// your launch country. This text is a starting draft, not legal advice.
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';

function LegalLayout({ title, blocks, lawyerNote }: { title: string; blocks: { h?: string; p: string[] }[]; lawyerNote: string }) {
  const { t } = useLang();
  return (
    <article className="relative z-10 mx-auto max-w-3xl px-5 py-10">
      <Link to="/" className="text-sm text-lavender hover:text-champagne">{t.nav.back}</Link>
      <h1 className="mt-4 font-display text-5xl text-champagne">{title}</h1>
      <div className="glass mt-6 p-6 leading-relaxed text-pearl/85 md:p-9">
        {blocks.map((b, i) => (
          <section key={i} className={i > 0 ? 'mt-6' : ''}>
            {b.h && <h2 className="font-display text-2xl text-champagne">{b.h}</h2>}
            {b.p.map((p, j) => <p key={j} className="mt-3">{p}</p>)}
          </section>
        ))}
        <p className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-champagne/90">{lawyerNote}</p>
      </div>
    </article>
  );
}

const lawyerNote = {
  ru: '⚖️ Важно: перед публичным запуском проекта эти документы желательно проверить у юриста под юрисдикцию страны запуска. Данный текст — черновик, а не юридическая консультация.',
  en: '⚖️ Important: before launching this project publicly, please have these documents reviewed by a lawyer for the jurisdiction of your launch country. This text is a draft, not legal advice.',
};

export function Terms() {
  const { lang } = useLang();
  const ru = [
    { h: '1. Назначение сайта', p: ['Сайт Lumina предназначен исключительно для развлечения, творческой саморефлексии и улучшения настроения. Все отчёты, расчёты и интерпретации являются художественной игрой.'] },
    { h: '2. Характер результатов', p: ['Результаты не являются фактом, прогнозом, гарантией, диагнозом или профессиональной консультацией. Они не предсказывают будущее и не описывают объективные свойства личности.'] },
    { h: '3. Ответственность пользователя', p: ['Пользователь не должен принимать важные жизненные, финансовые, медицинские, юридические или иные решения только на основании отчёта.', 'Пользователь самостоятельно отвечает за любое использование информации с сайта.', 'Владелец проекта не несёт ответственности за действия пользователя, совершённые на основании развлекательного отчёта.'] },
    { h: '4. Не замена специалистам', p: ['Запрещено использовать сайт как замену консультациям квалифицированных специалистов: врачей, психологов, психотерапевтов, юристов, финансовых консультантов. При необходимости обращайтесь к профильным специалистам.'] },
    { h: '5. Возраст', p: ['Сайт рекомендован пользователям от 18 лет. Лица младше 18 лет могут использовать сайт только с согласия родителей или законных представителей.'] },
    { h: '6. Согласие', p: ['Перед генерацией отчёта пользователь подтверждает согласие с развлекательным характером проекта, отмечая соответствующие пункты на экране согласия. Без подтверждения отчёт не создаётся.'] },
  ];
  const en = [
    { h: '1. Purpose of the site', p: ['Lumina is intended exclusively for entertainment, creative self-reflection and mood improvement. All reports, calculations and interpretations are an artistic game.'] },
    { h: '2. Nature of results', p: ['Results are not facts, forecasts, guarantees, diagnoses or professional advice. They do not predict the future and do not describe objective personality traits.'] },
    { h: '3. User responsibility', p: ['Users must not make important life, financial, medical, legal or other decisions based solely on the report.', 'Users are solely responsible for any use of information from this site.', 'The project owner is not liable for user actions taken on the basis of this entertainment report.'] },
    { h: '4. Not a substitute for professionals', p: ['It is prohibited to use the site as a substitute for consultations with qualified professionals: doctors, psychologists, psychotherapists, lawyers, financial advisors. When needed, please consult the relevant specialists.'] },
    { h: '5. Age', p: ['The site is recommended for users aged 18+. Persons under 18 may use the site only with the consent of parents or legal guardians.'] },
    { h: '6. Consent', p: ['Before a report is generated, the user confirms agreement with the entertainment nature of the project by ticking the boxes on the consent screen. Without confirmation, no report is created.'] },
  ];
  return <LegalLayout title={lang === 'ru' ? 'Пользовательское соглашение' : 'Terms of Use'} blocks={lang === 'ru' ? ru : en} lawyerNote={lawyerNote[lang]} />;
}

export function Privacy() {
  const { lang } = useLang();
  const ru = [
    { h: '1. Какие данные вы вводите', p: ['Имя или псевдоним, дата рождения, опционально — время и город рождения, а также свободные ответы на вопросы для икигай-блока.'] },
    { h: '2. Где обрабатываются данные', p: ['В текущей версии (MVP) все данные обрабатываются локально в вашем браузере. Мы не отправляем, не сохраняем и не видим ваши данные — они не покидают ваше устройство.', 'На устройстве в localStorage сохраняются только настройки комфорта (язык, звук, анимации).'] },
    { h: '3. Будущие функции', p: ['Если в будущем появятся email-рассылка, PDF-отправка на почту или оплата, для каждой такой функции будет запрошено отдельное явное согласие, а данные не будут храниться на сервере без него.'] },
    { h: '4. Удаление данных', p: ['Кнопка «Очистить мои данные» в отчёте удаляет все сохранённые настройки из вашего браузера. Также вы можете очистить данные сайта средствами браузера.'] },
    { h: '5. Продажа данных', p: ['Мы не продаём и не передаём персональные данные третьим лицам.'] },
  ];
  const en = [
    { h: '1. What data you enter', p: ['Name or nickname, date of birth, optionally — time and city of birth, plus free-form answers to the ikigai questions.'] },
    { h: '2. Where the data is processed', p: ['In the current version (MVP), all data is processed locally in your browser. We do not send, store or see your data — it never leaves your device.', 'Only comfort settings (language, sound, animations) are stored in your browser’s localStorage.'] },
    { h: '3. Future features', p: ['If email delivery, PDF-by-email or payments are added in the future, each such feature will ask for separate explicit consent, and no data will be stored on a server without it.'] },
    { h: '4. Data deletion', p: ['The “Clear my data” button in the report removes all saved settings from your browser. You can also clear site data using your browser tools.'] },
    { h: '5. Selling data', p: ['We do not sell or share personal data with third parties.'] },
  ];
  return <LegalLayout title={lang === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'} blocks={lang === 'ru' ? ru : en} lawyerNote={lawyerNote[lang]} />;
}

export function Disclaimer() {
  const { lang, t } = useLang();
  const ru = [
    { p: [t.footer.disclaimer] },
    { p: ['Этот развлекательный self-discovery проект не предсказывает судьбу, не ставит диагнозы и не заменяет консультации специалистов. Используйте результат как игру, вдохновение и повод улыбнуться.'] },
    { p: ['Если вам сейчас тяжело эмоционально, пожалуйста, обратитесь к близким или к квалифицированному специалисту — забота о себе важнее любых отчётов.'] },
  ];
  const en = [
    { p: [t.footer.disclaimer] },
    { p: ['This entertainment self-discovery project does not predict fate, does not diagnose and does not replace professional consultations. Use the result as a game, an inspiration and a reason to smile.'] },
    { p: ['If you are going through an emotionally hard time, please reach out to loved ones or a qualified professional — taking care of yourself matters more than any report.'] },
  ];
  return <LegalLayout title={lang === 'ru' ? 'Отказ от ответственности' : 'Disclaimer'} blocks={lang === 'ru' ? ru : en} lawyerNote={lawyerNote[lang]} />;
}

export function HowItWorks() {
  const { t } = useLang();
  return <LegalLayout title={t.how.title} blocks={[{ p: [...t.how.body] }]} lawyerNote={t.report.disclaimerInline} />;
}
