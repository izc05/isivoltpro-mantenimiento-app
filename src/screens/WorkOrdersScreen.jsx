import { BriefcaseBusiness, CalendarDays, ChevronRight, Droplet, Plus, Search, ShieldCheck, Snowflake, Wrench, Zap } from "lucide-react";
import Card from "../components/Card";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { formatShortDate } from "../utils/dates";

const filters = ["Todas", "Preventivas", "Correctivas", "Pendientes", "Completadas"];

function WorkOrderIcon({ order }) {
  const specialties = {
    Electricidad: { icon: Zap, tone: "bg-blue-100 text-blue-700" },
    Climatizacion: { icon: Snowflake, tone: "bg-sky-100 text-sky-700" },
    Fontaneria: { icon: Droplet, tone: "bg-cyan-100 text-cyan-700" },
    PCI: { icon: ShieldCheck, tone: "bg-purple-100 text-purple-700" },
  };
  const specialty = specialties[order.specialty] || { icon: BriefcaseBusiness, tone: "bg-slate-100 text-slate-700" };
  const Icon = order.type === "Correctiva" ? Wrench : specialty.icon;
  const color = order.type === "Correctiva" ? "bg-red-100 text-danger" : specialty.tone;
  return (
    <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${color}`}>
      <Icon size={30} strokeWidth={2.5} />
    </div>
  );
}

export default function WorkOrdersScreen({ workOrders, filter, setFilter, onOpenWorkOrder, onNewWorkOrder }) {
  const visible = workOrders.filter((order) => {
    if (filter === "Todas") return true;
    if (filter === "Preventivas") return order.type === "Preventiva";
    if (filter === "Correctivas") return order.type === "Correctiva";
    if (filter === "Pendientes") return order.status === "Pendiente";
    if (filter === "Completadas") return order.status === "Completada";
    return true;
  });

  return (
    <>
      <Header
        title="Ordenes de trabajo"
        subtitle={`${workOrders.length} activas`}
        actions={
          <>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20" aria-label="Buscar">
              <Search size={24} />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primaryDark" onClick={onNewWorkOrder} aria-label="Nueva OT">
              <Plus size={28} />
            </button>
          </>
        }
      >
        <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={item === filter ? "shrink-0 rounded-2xl bg-accent px-5 py-3 font-black text-primaryDark" : "shrink-0 rounded-2xl border border-white/35 px-5 py-3 font-black text-white"}
            >
              {item}
            </button>
          ))}
        </div>
      </Header>
      <main className="space-y-4 px-5 pb-32 pt-6">
        {visible.map((order) => (
          <Card key={order.id} className="p-4">
            <button className="w-full text-left" onClick={() => onOpenWorkOrder(order.id)}>
              <div className="flex items-start gap-4">
                <WorkOrderIcon order={order} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="whitespace-nowrap text-lg font-black tracking-tight">{order.number}</h2>
                      <p className="mt-1 text-lg font-semibold leading-tight">{order.title}</p>
                    </div>
                    <StatusBadge status={order.status} className="shrink-0" />
                  </div>
                  <div className="mt-5 grid grid-cols-[1fr_1fr_auto] gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-500">
                    <span className="truncate">{order.installation}</span>
                    <span className="truncate">{order.specialty}</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={16} />
                      {formatShortDate(order.createdAt)}
                    </span>
                  </div>
                </div>
                <ChevronRight className="mt-10 shrink-0 text-slate-500" />
              </div>
            </button>
          </Card>
        ))}
      </main>
    </>
  );
}
