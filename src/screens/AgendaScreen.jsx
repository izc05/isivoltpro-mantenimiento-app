import { CalendarPlus, ChevronRight, MapPin, Plus, Settings, Zap } from "lucide-react";
import Card from "../components/Card";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { getWeekDays } from "../utils/dates";

export default function AgendaScreen({ workOrders, onOpenWorkOrder, onNewWorkOrder }) {
  const agenda = [
    workOrders[0],
    workOrders[1],
    { ...workOrders[2], id: "agenda-16", number: "OT-2025-00016", installation: "Planta Industrial", title: "Revision grupo de presion", time: "12:00", type: "Preventivo" },
    { ...workOrders[4], id: "agenda-17", number: "OT-2025-00017", title: "Revision BIE planta 1", time: "15:00", type: "Preventivo" },
  ];
  const getAgendaTone = (order) =>
    order.type === "Correctiva" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700";

  return (
    <>
      <Header
        title="Calendario"
        subtitle="Mayo 2025"
        actions={
          <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20" aria-label="Ajustes agenda">
            <Settings size={24} />
          </button>
        }
      >
        <div className="rounded-3xl bg-white p-3 text-appText shadow-soft">
          <div className="grid grid-cols-7 gap-1">
            {getWeekDays().map((day) => (
              <button key={day.day} className={day.selected ? "rounded-2xl bg-primaryDark px-1 py-3 text-accent shadow-soft" : "rounded-2xl px-1 py-3"}>
                <span className="block text-xs font-black text-slate-500">{day.label}</span>
                <strong className="mt-2 block text-lg font-black">{day.day}</strong>
                {day.selected ? <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-accent" /> : null}
              </button>
            ))}
          </div>
        </div>
      </Header>

      <main className="relative space-y-4 px-5 pb-32 pt-6">
        <h2 className="px-1 text-2xl font-black">Viernes 23 de mayo</h2>
        <div className="absolute bottom-36 left-8 top-20 w-px bg-slate-200" />
        {agenda.map((order) => (
          <div key={order.id} className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-3">
            <span className="mt-11 h-4 w-4 rounded-full border-4 border-appBg bg-accent" />
            <Card className="p-3">
              <button
                className="grid w-full grid-cols-[66px_minmax(0,1fr)_18px] items-center gap-3 text-left"
                onClick={() => onOpenWorkOrder(order.id === "agenda-16" || order.id === "agenda-17" ? workOrders[0].id : order.id)}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl ${getAgendaTone(order)}`}>
                    {order.type === "Correctiva" ? <Zap size={30} /> : <CalendarPlus size={30} />}
                  </div>
                  <strong className="text-base font-black text-primaryDark">{order.time}</strong>
                </div>
                <div className="min-w-0 border-l border-slate-100 pl-3">
                  <strong className="block text-base font-black leading-tight text-primaryDark">{order.number}</strong>
                  <p className="mt-1 truncate font-semibold text-slate-600">{order.title}</p>
                  <div className="mt-2 flex min-w-0 items-center gap-2">
                    <StatusBadge status={order.type === "Correctiva" ? "Correctivo" : "Preventivo"} className="shrink-0 text-xs" />
                    <span className="flex min-w-0 items-center gap-1 text-sm font-semibold text-slate-500">
                      <MapPin size={16} className="shrink-0 text-blue-600" />
                      <span className="truncate">{order.installation}</span>
                    </span>
                  </div>
                </div>
                <ChevronRight className="text-slate-500" />
              </button>
            </Card>
          </div>
        ))}
        <div className="flex justify-end pr-1 pt-1">
          <button
            className="grid h-16 w-16 place-items-center rounded-full bg-accent text-primaryDark shadow-soft"
            onClick={onNewWorkOrder}
            aria-label="Nueva orden"
          >
            <Plus size={34} />
          </button>
        </div>
      </main>
    </>
  );
}
