import { useAtom, useAtomValue } from "jotai";
import { userToken } from "../store/authAtom";
import { ShieldCheck, User, FolderKanban, Zap } from "lucide-react";
import { fetchUserAtom } from "../store/userAtom";
import { useEffect } from "react";

export default function Home() {
  const nameUser = localStorage.getItem("name");
  const token = useAtomValue(userToken);

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />,
      title: "Безопасная аутентификация",
      desc: "Полноценная система Auth на базе JWT (Access & Refresh tokens) с безопасным хранением паролей.",
    },
    {
      icon: <User className="w-6 h-6 text-blue-400 shrink-0" />,
      title: "Профиль пользователя",
      desc: "Возможность быстро управлять своими личными данными и настройками аккаунта.",
    },
    {
      icon: <FolderKanban className="w-6 h-6 text-purple-400 shrink-0" />,
      title: "Категоризация и контакты",
      desc: "Удобная организация долгов по папкам, категориям и конкретным людям.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400 shrink-0" />,
      title: "Мгновенный отклик UI",
      desc: "Клиентское состояние на реактивном Jotai — никаких лишних перерисовок и задержек.",
    },
  ];

  return (
    <section className="flex flex-col px-4 sm:px-6 lg:px-8 gap-16 py-12 max-w-5xl m-auto items-center">
      <div className="text-center flex flex-col items-center gap-4 max-w-2xl">
        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
          Учет финансов
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
          {token ? (
            <span>
              Добро пожаловать, <span className="text-emerald-400">{nameUser || "пользователь"}</span>!
            </span>
          ) : (
            "Добро пожаловать в сервис"
          )}
        </h1>
        {!token && (
          <p className="text-slate-400 text-sm sm:text-base">
            Пожалуйста, зарегистрируйтесь или войдите, чтобы начать пользоваться возможностями сервиса.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 text-center max-w-3xl bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          DebtTracker API & Web App
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          DebtTracker — это современный, легкий и надежный веб-сервис для контроля личных долгов, взаимных расчетов и финансовых обязательств. Больше никаких «я забыл, кто кому должен за пиццу» или перелистывания диалогов в мессенджерах. Всё четко, прозрачно и в одном месте.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Ключевой функционал</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-slate-800/80">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}