import { BarChart3, Building2, ChevronRight, ClipboardCheck, Download, FileText, ShieldCheck } from "lucide-react";
import Card from "../components/Card";
import Header from "../components/Header";

const reports = [
  { title: "Partes correctivos", text: "Intervenciones, tiempos y evidencias.", icon: ClipboardCheck },
  { title: "Partes preventivos", text: "Planes ejecutados y tareas pendientes.", icon: ShieldCheck },
  { title: "Informe mensual", text: "Resumen operativo del mes en curso.", icon: BarChart3 },
  { title: "Informe por instalacion", text: "Estado de activos por centro.", icon: Building2 },
  { title: "Exportar datos", text: "Descarga local para copia o revision.", icon: Download },
];

export default function ReportsScreen() {
  return (
    <>
      <Header title="Informes" subtitle="Partes, resumenes y exportaciones" />
      <main className="space-y-4 px-5 pb-32 pt-6">
        {reports.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-4">
              <button className="flex w-full items-center gap-4 text-left">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-800">
                  <Icon size={30} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-black">{item.title}</h2>
                  <p className="mt-1 font-semibold text-slate-500">{item.text}</p>
                </div>
                <ChevronRight className="text-slate-700" />
              </button>
            </Card>
          );
        })}
        <div className="rounded-app border border-slate-200 bg-white p-5 text-slate-950 shadow-soft">
          <FileText className="text-slate-800" size={34} />
          <h2 className="mt-3 text-2xl font-black">Informes preparados para PDF</h2>
          <p className="mt-2 font-semibold text-slate-500">En esta primera fase quedan planteadas las salidas principales para generar partes tecnicos mas adelante.</p>
        </div>
      </main>
    </>
  );
}
