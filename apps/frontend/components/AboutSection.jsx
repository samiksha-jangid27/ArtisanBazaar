export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="grid md:grid-cols-2 gap-10 rounded-3xl bg-white shadow-sm p-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Supporting local art & craft
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            ArtisanBazaar connects independent artisans with buyers who value
            stories, culture, and craft. Each product is curated, handmade, and
            fairly priced — helping makers sustain their art.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            From small studios to home-based creators, we handle discovery,
            payments, and logistics so that artisans can focus on creating.
          </p>
        </div>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Artisans onboarded</span>
            <span className="font-semibold text-gray-900">450+</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Handmade products</span>
            <span className="font-semibold text-gray-900">3,000+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cities we ship to</span>
            <span className="font-semibold text-gray-900">80+</span>
          </div>
        </div>
      </div>
    </section>
  );
}
