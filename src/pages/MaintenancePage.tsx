export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#4B6BFB] px-4">
      <div className="max-w-3xl w-full bg-white rounded-[32px] border-[3px] border-black shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] mb-6 text-4xl font-black">
          ⚠️
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#111111] mb-4">
          Site en maintenance
        </h1>
        <p className="text-[#2A2A2A] text-lg md:text-xl leading-relaxed mb-6">
          Nous travaillons actuellement à améliorer ConnectZone. Toutes les pages sont temporairement indisponibles.
        </p>
        <p className="text-[#4B6BFB] font-bold">
          Revenez dans quelques instants pour réessayer.
        </p>
      </div>
    </main>
  );
}
