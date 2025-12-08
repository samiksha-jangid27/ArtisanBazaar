export default function ForArtisansPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-4xl font-semibold mb-6">
        Become a Seller on ArtisanBazaar
      </h1>

      <p className="text-gray-600 max-w-2xl mb-10">
        Join thousands of local creators selling handmade art, crafts, and
        beautiful products. We help you reach customers across India.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-xl mb-12">
        <h2 className="text-xl font-semibold mb-3">Why sell with us?</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✔ No approval needed — start selling instantly</li>
          <li>✔ Showcase your handcrafted products</li>
          <li>✔ Reach buyers across India</li>
          <li>✔ Easy product management dashboard</li>
          <li>✔ Zero coding required</li>
        </ul>
      </div>

      <a
        href="/dashboard/create-product"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Start Selling Now
      </a>
    </div>
  );
}
