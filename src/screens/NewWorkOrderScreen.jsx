import { Building2, CalendarDays, Camera, Check, ChevronDown, ClipboardPlus, Flag, MapPin, User, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-base font-black text-white">{label}</span>
      <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/18 bg-white/6 px-4 text-white">
        <Icon className="shrink-0 text-white/85" size={23} />
        {children}
        <ChevronDown className="shrink-0 text-white/85" size={20} />
      </div>
    </label>
  );
}

export default function NewWorkOrderScreen({ installations, technicians, defaults = {}, onBack, onCreate }) {
  const [form, setForm] = useState({
    type: "Correctiva",
    installationId: defaults.installationId || installations[0]?.id || "",
    specialty: "Mecanica",
    location: "Planta Baja - Area de Bombas",
    technician: technicians[0]?.name || "",
    priority: "Alta",
    date: "2025-05-14",
    description: "Fuga de agua detectada en la conexion de la bomba principal. Requiere revision y reparacion inmediata.",
  });

  useEffect(() => {
    if (!defaults.installationId) return;
    setForm((current) => ({ ...current, installationId: defaults.installationId }));
  }, [defaults.installationId]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#07396B_0%,#001B3D_48%,#000D24_100%)] text-white">
        <Header
          title="Nueva orden"
          subtitle="Crear OT"
          compact
          onBack={onBack}
          actions={
            <button className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primaryDark" onClick={() => onCreate(form)} aria-label="Crear OT">
              <Check size={26} />
            </button>
          }
        />
      <main className="-mt-8 px-5 pb-8">
        <Card className="space-y-4 border-white/15 bg-white/5 text-white backdrop-blur">
          <Field label="Tipo de orden" icon={Wrench}>
            <select className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none" value={form.type} onChange={(event) => update("type", event.target.value)}>
              <option>Correctiva</option>
              <option>Preventiva</option>
            </select>
          </Field>

          <Field label="Instalacion" icon={Building2}>
            <select className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none" value={form.installationId} onChange={(event) => update("installationId", event.target.value)}>
              {installations.map((installation) => (
                <option key={installation.id} value={installation.id}>
                  {installation.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Especialidad" icon={Wrench}>
            <select className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none" value={form.specialty} onChange={(event) => update("specialty", event.target.value)}>
              {["Electricidad", "Climatizacion", "Fontaneria", "PCI", "Mecanica"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>

          <Field label="Zona" icon={MapPin}>
            <input className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none" value={form.location} onChange={(event) => update("location", event.target.value)} />
          </Field>

          <Field label="Tecnico asignado" icon={User}>
            <select className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none" value={form.technician} onChange={(event) => update("technician", event.target.value)}>
              {technicians.map((technician) => (
                <option key={technician.id}>{technician.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Prioridad" icon={Flag}>
            <select className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none" value={form.priority} onChange={(event) => update("priority", event.target.value)}>
              {["Alta", "Media", "Baja"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>

          <Field label="Fecha" icon={CalendarDays}>
            <input className="min-w-0 flex-1 bg-transparent text-lg font-black outline-none" type="date" value={form.date} onChange={(event) => update("date", event.target.value)} />
          </Field>

          <label className="block">
            <span className="mb-2 block text-base font-black text-white">Descripcion</span>
            <textarea
              className="min-h-28 w-full resize-none rounded-2xl border border-white/18 bg-white/6 p-4 text-base font-semibold text-white outline-none focus:border-accent"
              maxLength={500}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
            />
            <span className="mt-1 block text-right text-sm font-semibold text-white/60">{form.description.length}/500</span>
          </label>

          <div>
            <span className="mb-2 block text-base font-black text-white">Adjuntar foto visual demo</span>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative grid h-28 place-items-end rounded-2xl bg-[linear-gradient(135deg,#cbd5e1,#334155)] p-3">
                <button className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-primaryDark text-white" aria-label="Quitar foto">
                  <X size={18} />
                </button>
              </div>
              <button className="grid h-28 place-items-center rounded-2xl border-2 border-dashed border-accent text-accent">
                <span className="grid place-items-center gap-2 font-black">
                  <Camera size={32} />
                  Agregar foto
                </span>
              </button>
            </div>
          </div>

          <Button icon={ClipboardPlus} className="w-full text-xl" onClick={() => onCreate(form)}>
            Crear OT
          </Button>
        </Card>
      </main>
      </div>
    </>
  );
}
