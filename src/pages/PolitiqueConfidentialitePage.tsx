export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-[#0B0E14] text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-6 font-['Montserrat']">Politique de confidentialité</h1>
        <p className="text-gray-300 mb-6">
          Cette page décrit la façon dont ConnectZone collecte et utilise vos données personnelles.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Données collectées</h2>
          <p className="text-gray-300 leading-7">
            Nous collectons uniquement les données nécessaires au fonctionnement du service : email, informations de contact et messages transmis via le formulaire de contact.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Finalités</h2>
          <p className="text-gray-300 leading-7">
            Les données sont utilisées pour répondre aux demandes des utilisateurs, assurer le support et permettre l'accès aux fonctionnalités du site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Partage des données</h2>
          <p className="text-gray-300 leading-7">
            Aucune donnée personnelle n'est revendue. Les données peuvent être partagées avec des prestataires techniques pour l'hébergement et le fonctionnement du site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Durée de conservation</h2>
          <p className="text-gray-300 leading-7">
            Les données sont conservées le temps nécessaire au traitement des demandes, sauf obligations légales contraires.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Vos droits</h2>
          <p className="text-gray-300 leading-7">
            Vous pouvez exercer vos droits d'accès, de rectification ou de suppression en contactant connectzoneteam@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
