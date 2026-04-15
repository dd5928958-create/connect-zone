export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-[#0B0E14] text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-6 font-['Montserrat']">Mentions légales</h1>
        <p className="text-gray-300 mb-6">
          Le présent site ConnectZone est édité par ConnectZone, une plateforme de mise en relation entre clients et prestataires de services.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Éditeur</h2>
          <p className="text-gray-300 leading-7">
            ConnectZone<br />
            Siège social : Cotonou, Bénin<br />
            Email : connectzoneteam@gmail.com<br />
            Téléphone : +229 01 41 73 32 86
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Hébergement</h2>
          <p className="text-gray-300 leading-7">
            Ce site est hébergé sur Railway.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Propriété intellectuelle</h2>
          <p className="text-gray-300 leading-7">
            L'ensemble des contenus présents sur ce site (textes, images, logos, design) est protégé par le droit de la propriété intellectuelle. Toute reproduction totale ou partielle sans autorisation est interdite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Conditions d’accès</h2>
          <p className="text-gray-300 leading-7">
            L’accès au site ConnectZone est libre et gratuit. L’éditeur se réserve le droit de modifier, suspendre ou interrompre l’accès au service à tout moment.
          </p>
        </section>
      </div>
    </main>
  );
}
