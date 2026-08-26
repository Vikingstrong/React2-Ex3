import { useAtomValue } from "jotai";
import { userToken } from "../store/authAtom";
import Viewer from "../3d/Model";

export default function Home() {
  const nameUser = localStorage.getItem("name");
  const token = useAtomValue(userToken);

  

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

      <Viewer/>

      <div className="flex flex-col gap-4 text-center max-w-3xl bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          DebtTracker API & Web App
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          DebtTracker — это современный, легкий и надежный веб-сервис для контроля личных долгов, взаимных расчетов и финансовых обязательств. Больше никаких «я забыл, кто кому должен за пиццу» или перелистывания диалогов в мессенджерах. Всё четко, прозрачно и в одном месте.
        </p>
      </div>
    </section>
  );
}