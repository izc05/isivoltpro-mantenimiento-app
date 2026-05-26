import { BriefcaseBusiness, Building2, CalendarDays, CheckCircle2, Edit3, Flag, MapPin, Play, Trash2, UserPlus, Wrench, Zap } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { formatDateTime } from "../utils/dates";

function PhotoTile({ type }) {
  const labels = {
    pasillo: "Pasillo sin alumbrado",
    techo: "Registro de luminaria",
    clima: "Unidad de climatizacion",
    panel: "Panel tecnico",
    bomba: "Grupo de presion",
    agua: "Zona de fuga",
    pci: "Equipo PCI",
  };
  return (
    <div className="grid h-32 place-items-end overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#e2e8f0,#64748b)] p-3">
      <span className="rounded-xl bg-black/40 px-3 py-1 text-xs font-black text-white">{labels[type] || "Foto demo"}</span>
    </div>
  );
}

export default function WorkOrderDetailScreen({ order, onBack, onUpdateStatus }) {
  const rows = [
    [Building2, "Instalacion", order.installation],
    [Zap, "Especialidad", order.specialty],
    [MapPin, "Ubicacion", order.location],
    [Flag, "Prioridad", order.priority],
    [UserPlus, "Tecnico asignado", order.technician],
    [CalendarDays, "Fecha creacion", formatDateTime(order.createdAt)],
  ];

  return (
    <>
      <Header
        title={order.number}
        subtitle={order.type}
        onBack={onBack}
        actions={
          <>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20" aria-label="Editar">
              <Edit3 size={22} />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-danger ring-1 ring-white/20" aria-label="Eliminar">
              <Trash2 size={22} />
            </button>
          </>
        }
      >
        <div className={order.type === "Correctiva" ? "rounded-3xl border border-red-400/60 bg-gradient-to-r from-red-600 to-red-700 p-5 shadow-soft" : "rounded-3xl border border-accent/45 bg-white/8 p-5"}>
          <div className="flex items-center gap-5">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/12 text-white">
              {order.type === "Correctiva" ? <Wrench size={38} /> : <BriefcaseBusiness size={38} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-3xl font-black">{order.type}</h2>
                <StatusBadge status={order.status} />
              </div>
              <p className="mt-1 text-lg font-semibold text-white/78">{order.title}</p>
            </div>
          </div>
        </div>
      </Header>

      <main className="-mt-5 space-y-4 px-5 pb-48">
        <Card className="divide-y divide-slate-100 p-0">
          {rows.map(([Icon, label, value]) => (
            <div key={label} className="grid grid-cols-[28px_1fr_1fr] items-center gap-3 px-5 py-4">
              <Icon className="text-slate-700" size={22} />
              <span className="font-semibold text-slate-500">{label}</span>
              <strong className="text-right">{value}</strong>
            </div>
          ))}
        </Card>

        <Card>
          <h2 className="text-lg font-black">Descripcion</h2>
          <p className="mt-3 rounded-2xl bg-slate-50 p-4 font-semibold leading-relaxed text-slate-600">{order.description}</p>
          <h2 className="mt-5 text-lg font-black">Fotos</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {order.photos.map((photo) => (
              <PhotoTile key={photo} type={photo} />
            ))}
          </div>
        </Card>

        <div className="sticky bottom-28 z-30 grid grid-cols-3 gap-3 rounded-[28px] bg-appBg/95 py-3 backdrop-blur">
          <Button icon={UserPlus} variant="outline" onClick={() => onUpdateStatus(order.id, "Pendiente")}>
            Asignar
          </Button>
          <Button icon={Play} variant="dark" onClick={() => onUpdateStatus(order.id, "En curso")}>
            En curso
          </Button>
          <Button icon={CheckCircle2} onClick={() => onUpdateStatus(order.id, "Completada")}>
            Completar
          </Button>
        </div>
      </main>
    </>
  );
}
