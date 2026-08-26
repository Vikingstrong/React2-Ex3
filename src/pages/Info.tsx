import { useAtomValue } from "jotai";
import { userToken } from "../store/authAtom";
import { NavLink } from "react-router";
import { Button } from "@mui/material";
import { 
  ShieldCheck, 
  FolderKanban, 
  CreditCard, 
  Users, 
  CheckCircle2, 
  Lock, 
  PieChart, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Clock
} from "lucide-react";
import InfoModelViewer from "../3d/InfoModel";

export default function Info() {
  const token = useAtomValue(userToken);

  const features = [
    {
      icon: <FolderKanban className="w-8 h-8 text-emerald-400" />,
      title: "Организация по папкам",
      description: "Создавайте тематические папки (друзья, семья, бизнес, путешествия) и управляйте долгами по категориям."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Контакты и детали",
      description: "Привязывайте должников и кредиторов с телефонами, email и заметками, чтобы всегда быть на связи."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-amber-400" />,
      title: "Учет выплат и платежей",
      description: "Фиксируйте частичные или полные возвраты долгов с датами и примечаниями. Остаток рассчитывается автоматически."
    },
    {
      icon: <Lock className="w-8 h-8 text-rose-400" />,
      title: "Безопасность данных",
      description: "Авторизация по JWT токенам с автообновлением. Ваши финансовые записи изолированы и доступны только вам."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Создайте папку и контакт",
      description: "Разделите свои контакты по смысловым группам и добавьте людей, с кем ведёте расчеты."
    },
    {
      number: "02",
      title: "Зафиксируйте долг",
      description: "Укажите, кто кому должен («Мне должны» или «Я должен»), сумму, валюту и срок возврата."
    },
    {
      number: "03",
      title: "Вносите выплаты",
      description: "Каждый платеж сохраняется в истории, а статус долга динамически меняется на частичный или оплаченный."
    }
  ];

  const stats = [
    { value: "100%", label: "Прозрачность расчетов", icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
    { value: "0", label: "Забытых обещаний и долгов", icon: <TrendingUp className="w-5 h-5 text-blue-400" /> },
    { value: "24/7", label: "Доступ с любого устройства", icon: <Clock className="w-5 h-5 text-amber-400" /> },
    { value: "JWT", label: "Защищенный API и шифрование", icon: <ShieldCheck className="w-5 h-5 text-purple-400" /> }
  ];

  return (
    <div className="max-w-5xl m-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-16 text-white">
      
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-4">
        <div className="flex flex-col gap-5 max-w-xl text-center lg:text-left items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            О сервисе DebtTracker
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Полный контроль над <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">долгами и выплатами</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            DebtTracker — это специализированная платформа для учета личных займов, взаиморасчетов и графика платежей. Забудьте о неловких напоминаниях и путанице в заметках.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
            {token ? (
              <NavLink to="/folders">
                <Button 
                  variant="contained" 
                  color="success" 
                  endIcon={<ArrowRight className="w-4 h-4" />}
                  sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 3.5, py: 1.2, fontSize: "16px" }}
                >
                  Перейти в Мои Папки
                </Button>
              </NavLink>
            ) : (
              <>
                <NavLink to="/register">
                  <Button 
                    variant="contained" 
                    color="success" 
                    endIcon={<ArrowRight className="w-4 h-4" />}
                    sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 3.5, py: 1.2, fontSize: "16px" }}
                  >
                    Начать пользоваться
                  </Button>
                </NavLink>
                <NavLink to="/login">
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderRadius: "12px", 
                      textTransform: "none", 
                      fontWeight: 600, 
                      px: 3, 
                      py: 1.2, 
                      color: "#94a3b8", 
                      borderColor: "#334155",
                      "&:hover": { borderColor: "#64748b", color: "#ffffff" } 
                    }}
                  >
                    Войти в аккаунт
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <InfoModelViewer modelPath="/low_poly_safe.glb" />
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-1.5 p-2">
            <div className="p-2 bg-slate-800/60 rounded-xl mb-1">
              {stat.icon}
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</span>
            <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Core Features */}
      <section className="flex flex-col gap-8">
        <div className="text-center flex flex-col items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Что умеет сервис DebtTracker</h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Все необходимые инструменты для прозрачного учета долгов и соблюдения финансового порядка.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="flex gap-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-800/40 transition-all duration-300 group"
            >
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/50 shrink-0 h-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="flex flex-col gap-8 p-8 rounded-3xl bg-slate-900/30 border border-slate-800/80">
        <div className="text-center flex flex-col items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Как это устроено</h2>
          <p className="text-slate-400 text-sm max-w-lg">
            Всего три простых шага, чтобы навсегда закрыть вопрос с неучтенными долгами.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl relative">
              <span className="text-4xl font-black text-emerald-500/20">{step.number}</span>
              <h4 className="text-lg font-bold text-white">{step.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="flex flex-col items-center text-center gap-5 p-10 bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 rounded-3xl">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
          <PieChart className="w-8 h-8" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Готовы навести порядок в финансах?</h3>
        <p className="text-slate-400 text-sm sm:text-base max-w-md">
          Создайте свой аккаунт прямо сейчас и начните вести учет за 1 минуту.
        </p>
        <div className="pt-2">
          <NavLink to={token ? "/folders" : "/register"}>
            <Button 
              variant="contained" 
              color="success" 
              endIcon={<ArrowRight className="w-4 h-4" />}
              sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 4, py: 1.3, fontSize: "16px" }}
            >
              {token ? "Перейти в Папки" : "Зарегистрироваться бесплатно"}
            </Button>
          </NavLink>
        </div>
      </section>

    </div>
  );
}
