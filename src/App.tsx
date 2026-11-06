import { useMemo, useState } from "react";
import { Activity, BarChart3, Bell, BookOpen, BriefcaseBusiness, ChevronLeft, CircleHelp, LayoutDashboard, Search, ShieldCheck, Star, Wallet } from "lucide-react";

const symbols = [
  "ACAMD", "ADIB", "AIDC", "AJWA", "ALUM", "AMES", "AMIA", "AMII", "AMOC",
  "APSW", "ATLC", "AXPH", "BIGP", "CAED", "CPCI", "EALR", "EEII", "EFID",
  "EGAL", "FAIT", "FCMD", "FNAR", "GGRN", "GOUR", "ICFC", "IEEC", "INEG",
  "ISMA", "KWIN", "MILS", "MOED", "MOSC", "MPCO", "MTIE", "NIPH", "PRCL",
  "ROTO", "RUBX", "SAUD", "SIPC", "SKPC", "SMFR", "SPIN", "SPMD", "ZEOT"
];

const navigation = [
  { label: "لوحة السوق", icon: LayoutDashboard },
  { label: "الأسهم", icon: BarChart3 },
  { label: "محفظتي", icon: Wallet },
  { label: "قوائم المتابعة", icon: Star },
  { label: "التحليل الفني", icon: Activity },
  { label: "التحليل الأساسي", icon: BriefcaseBusiness },
  { label: "التوافق الشرعي", icon: ShieldCheck },
  { label: "التنبيهات", icon: Bell },
  { label: "المكتبة التعليمية", icon: BookOpen }
];

export default function App() {
  const [active, setActive] = useState("لوحة السوق");
  const [query, setQuery] = useState("");
  const filteredSymbols = useMemo(
    () => symbols.filter((symbol) => symbol.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">AM</div>
          <div><strong>AM Borsa</strong><span>مساعد البورصة المصرية</span></div>
        </div>
        <div className="nav-caption">القائمة الرئيسية</div>
        <nav>
          {navigation.map(({ label, icon: Icon }) => (
            <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => setActive(label)}>
              <Icon size={18} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note"><CircleHelp size={17} /><span>بيانات السوق تحتاج إلى ربط مصدر بيانات موثوق.</span></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><span className="eyebrow">منصة متابعة وتحليل</span><h1>{active}</h1></div>
          <div className="topbar-actions"><span className="market-status"><i /> وضع تجريبي</span><button className="icon-button" aria-label="التنبيهات"><Bell size={19} /></button><div className="avatar">AM</div></div>
        </header>

        <section className="welcome">
          <div><span className="welcome-kicker">أهلاً بك في</span><h2>AM Borsa Assistant</h2><p>تابع الأسهم، نظّم محفظتك، وادرس قراراتك الاستثمارية في مكان واحد.</p></div>
          <div className="welcome-symbol"><BarChart3 size={54} /></div>
        </section>

        <div className="section-heading"><div><h2>نظرة عامة</h2><p>ملخص مساحة العمل الاستثمارية</p></div></div>
        <section className="stats-grid">
          <article className="stat-card"><div className="stat-icon blue"><BarChart3 size={20} /></div><span>الأسهم في نطاق المتابعة</span><strong>45</strong><small>قائمة مبدئية قابلة للتحديث</small></article>
          <article className="stat-card"><div className="stat-icon green"><Wallet size={20} /></div><span>مكونات المحفظة</span><strong>—</strong><small>أضف حيازاتك لبدء المتابعة</small></article>
          <article className="stat-card"><div className="stat-icon amber"><Star size={20} /></div><span>قائمة المفضلة</span><strong>—</strong><small>لم تتم إضافة أسهم بعد</small></article>
          <article className="stat-card"><div className="stat-icon purple"><Bell size={20} /></div><span>التنبيهات النشطة</span><strong>—</strong><small>يمكن إعدادها لاحقاً</small></article>
        </section>

        <section className="content-grid">
          <article className="panel stocks-panel">
            <div className="panel-heading"><div><h2>نطاق الأسهم</h2><p>الرموز المحددة للنسخة الأولية</p></div><span className="count-pill">{filteredSymbols.length} سهم</span></div>
            <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث برمز السهم..." /></label>
            <div className="ticker-grid">{filteredSymbols.map((symbol) => <button className="ticker" key={symbol} onClick={() => setQuery(symbol)}>{symbol}<ChevronLeft size={14} /></button>)}</div>
            {filteredSymbols.length === 0 && <p className="empty-state">لا توجد نتائج مطابقة.</p>}
          </article>
          <article className="panel status-panel">
            <div className="panel-heading"><div><h2>موثوقية البيانات</h2><p>حالة مصادر المعلومات</p></div><ShieldCheck size={21} /></div>
            <div className="notice"><span className="notice-dot" /><div><strong>لم يتم ربط مصدر أسعار</strong><p>لن نعرض أسعاراً أو مؤشرات لحظية قبل إعداد مصدر بيانات والتحقق منه.</p></div></div>
            <div className="notice"><span className="notice-dot amber-dot" /><div><strong>الفحص الشرعي يحتاج مراجعة</strong><p>وجود السهم في القائمة لا يعني اعتماد توافقه الشرعي. ستظهر نتيجة الفحص مع مصدرها وتاريخها.</p></div></div>
            <div className="panel-footnote">آخر تحديث للبيانات: غير متاح</div>
          </article>
        </section>
        <footer>AM Borsa Assistant <span>© 2026</span><span className="footer-separator">•</span><span>نسخة تأسيسية — لا تمثل توصية استثمارية</span></footer>
      </main>
    </div>
  );
}