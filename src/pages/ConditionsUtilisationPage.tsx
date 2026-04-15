export default function ConditionsUtilisationPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-[#0B0E14] text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-6 font-['Montserrat']">Conditions d'utilisation</h1>
        <p className="text-gray-300 mb-6">
          Les présentes conditions d'utilisation régissent l'accès et l'usage du service ConnectZone.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Accès et utilisation</h2>
          <p className="text-gray-300 leading-7">
            En utilisant ConnectZone, vous acceptez de respecter les lois applicables et de ne pas utiliser le service à des fins frauduleuses ou préjudiciables.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Responsabilité</h2>
          <p className="text-gray-300 leading-7">
            ConnectZone met en relation des clients et des prestataires. L'éditeur ne garantit pas la disponibilité, la qualité ou la véracité des prestations proposées par les prestataires.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Comptes utilisateurs</h2>
          <p className="text-gray-300 leading-7">
            Les utilisateurs sont responsables de la confidentialité de leurs identifiants. Toute activité effectuée avec le compte d'un utilisateur est réputée avoir été initiée par ce dernier.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Modification des conditions</h2>
          <p className="text-gray-300 leading-7">
            ConnectZone se réserve le droit de modifier à tout moment ces conditions. Les mises à jour sont publiées sur cette page.
          </p>
        </section>
      </div>
    </main>
  );
}
