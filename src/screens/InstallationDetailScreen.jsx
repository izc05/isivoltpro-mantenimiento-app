import { CalendarDays, ChevronRight, Droplet, Edit3, FlameKindling, MapPin, MoreVertical, Phone, ShieldCheck, Snowflake, User, Users, Wrench, Zap } from "lucide-react";
import Card from "../components/Card";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { formatDateTime } from "../utils/dates";

const specialtyIcons = {
  Electricidad: Zap,
  Climatizacion: Snowflake,
  Fontaneria: Droplet,
  PCI: FlameKindling,
};

const summaryTones = {
  Activos: "bg-blue-100 text-blue-700",
  Preventivos: "bg-orange-100 text-orange-700",
  Correctivos: "bg-red-100 text-red-700",
  Tecnicos: "bg-purple-100 text-purple-700",
};

const specialtyTones = {
  Electricidad: "bg-orange-100 text-orange-700",
  Climatizacion: "bg-blue-100 text-blue-700",
  Fontaneria: "bg-cyan-100 text-cyan-700",
  PCI: "bg-red-100 text-red-700",
};

export default function InstallationDetailScreen({ installation, onBack }) {
  return (
    <>
      <Header
        title="Instalacion"
        subtitle={installation.name}
        onBack={onBack}
        actions={
          <>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20" aria-label="Editar">
              <Edit3 size={22} />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20" aria-label="Mas opciones">
              <MoreVertical size={23} />
            </button>
          </>
        }
      />
      <main className="-mt-8 space-y-5 px-5 pb-32">
        <Card className="relative z-10">
          <div className="grid grid-cols-[112px_1fr] gap-4">
            {installation.imageUrl ? (
              <img className="h-32 w-full rounded-3xl object-cover" src={installation.imageUrl} alt="" />
            ) : (
              <div className="grid h-32 place-items-center rounded-3xl bg-[radial-gradient(circle_at_top_left,#06315D,#001B3D)] text-accent">
                <ShieldCheck size={50} />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-black leading-none text-primaryDark">{installation.name}</h2>
              <p className="mt-2 font-semibold text-slate-500">Instalacion principal</p>
              <p className="mt-4 flex gap-2 text-sm font-semibold text-slate-500">
                <MapPin className="shrink-0 text-slate-600" size={18} />
                {installation.address}
              </p>
              <StatusBadge status="En operacion" className="mt-4" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-4 gap-3">
          {[
            ["Activos", installation.summary.assets, ShieldCheck],
            ["Preventivos", installation.summary.preventive, CalendarDays],
            ["Correctivos", installation.summary.corrective, Wrench],
            ["Tecnicos", installation.summary.technicians, Users],
          ].map(([label, value, Icon]) => (
            <Card key={label} className="grid place-items-center px-2 py-4 text-center">
              <div className={`grid h-11 w-11 place-items-center rounded-full ${summaryTones[label]}`}>
                <Icon size={23} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-500">{label}</p>
              <strong className="text-2xl font-black">{value}</strong>
            </Card>
          ))}
        </div>

        <section>
          <h2 className="mb-3 px-1 text-lg font-black">Especialidades</h2>
          <Card className="divide-y divide-slate-100 p-0">
            {installation.specialties.map((item) => {
              const Icon = specialtyIcons[item.name] || Wrench;
              return (
                <button key={item.name} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                  <div className={`grid h-11 w-11 place-items-center rounded-full ${specialtyTones[item.name] || "bg-slate-100 text-slate-700"}`}>
                    <Icon size={23} />
                  </div>
                  <strong className="flex-1 text-lg">{item.name}</strong>
                  <span className="font-semibold text-slate-500">{item.assets} activos</span>
                  <ChevronRight className="text-slate-500" />
                </button>
              );
            })}
          </Card>
        </section>

        <section>
          <h2 className="mb-3 px-1 text-lg font-black">Informacion</h2>
          <Card className="divide-y divide-slate-100 p-0">
            {[
              [User, "Responsable", installation.responsible],
              [Phone, "Telefono", installation.phone],
              [CalendarDays, "Ultima actualizacion", formatDateTime(installation.lastUpdate)],
            ].map(([Icon, label, value]) => (
              <div key={label} className="flex items-center gap-4 px-5 py-4">
                <Icon className="text-slate-500" size={22} />
                <span className="flex-1 font-semibold text-slate-500">{label}</span>
                <strong className="text-right">{value}</strong>
                <ChevronRight className="text-slate-500" />
              </div>
            ))}
          </Card>
        </section>
      </main>
    </>
  );
}
