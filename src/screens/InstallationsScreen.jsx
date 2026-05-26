import { ChevronRight, Plus, Search, ShieldCheck, Building2, MapPin } from "lucide-react";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import Card from "../components/Card";

const filters = ["Todas", "Electricidad", "Fontaneria", "Climatizacion", "PCI"];

function InstallationVisual({ visual }) {
  const icons = {
    hospital: Building2,
    clinic: Building2,
    residence: Building2,
    sports: ShieldCheck,
    school: Building2,
  };
  const Icon = icons[visual] || Building2;
  return (
    <div className="grid h-28 w-28 shrink-0 place-items-center rounded-3xl bg-[radial-gradient(circle_at_top_left,#06315D,#001B3D)] text-accent">
      <Icon size={46} strokeWidth={2.2} />
    </div>
  );
}

export default function InstallationsScreen({ installations, onOpenInstallation }) {
  return (
    <>
      <Header
        title="Instalaciones"
        subtitle={`${installations.length} guardadas localmente`}
        eyebrow="Plan Pro"
        actions={
          <>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20" aria-label="Buscar">
              <Search size={24} />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20" aria-label="Nueva instalacion">
              <Plus size={26} />
            </button>
          </>
        }
      />
      <main className="space-y-5 px-5 pb-32 pt-6">
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={index === 0 ? "rounded-2xl bg-accent px-6 py-3 font-black text-primaryDark" : "rounded-2xl border border-primary/30 bg-white px-6 py-3 font-black text-primary"}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {installations.map((installation) => (
            <Card key={installation.id} className="p-4">
              <button className="flex w-full items-center gap-4 text-left" onClick={() => onOpenInstallation(installation.id)}>
                {installation.imageUrl ? (
                  <img className="h-28 w-28 shrink-0 rounded-3xl object-cover" src={installation.imageUrl} alt="" />
                ) : (
                  <InstallationVisual visual={installation.visual} />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl font-black leading-tight">{installation.name}</h2>
                    <StatusBadge status={installation.status} className="shrink-0" />
                  </div>
                  <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-500">
                    <MapPin className="mt-0.5 shrink-0 text-primary" size={17} />
                    {installation.address}
                  </p>
                  <div className="mt-4 flex items-center justify-between font-bold text-slate-700">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck size={18} className="text-primary" />
                      {installation.assetsCount} activos
                    </span>
                    <ChevronRight className="text-primary" />
                  </div>
                </div>
              </button>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
