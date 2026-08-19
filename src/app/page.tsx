export default function Home() {
  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-16 text-emerald-950">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl shadow-emerald-100">
        <p className="mb-4 font-semibold uppercase tracking-widest text-emerald-600">
          Finanzas + sustentabilidad
        </p>
        <h1 className="text-5xl font-bold tracking-tight">GREENInvest</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Compara el rendimiento de empresas públicas y conoce su impacto
          ambiental de una forma clara y fácil de entender.
        </p>
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-semibold">Primer prototipo</h2>
          <p className="mt-2 text-slate-600">
            Próximamente podrás buscar empresas de México y Estados Unidos,
            consultar el rendimiento de sus acciones y ver un indicador
            ambiental por colores.
          </p>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Herramienta educativa. No constituye asesoría financiera.
        </p>
      </section>
    </main>
  );
}
