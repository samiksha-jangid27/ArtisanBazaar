export default function ContactPage() {
  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-[#fff9d6] to-white px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-10 rounded-3xl shadow-lg border border-yellow-200">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-700 mb-6">
          Have questions? We’d love to hear from you.  
        </p>

        <form className="grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-xl p-3 bg-yellow-50 text-black"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="border rounded-xl p-3 bg-yellow-50 text-black"
          />

          <textarea
            rows="4"
            placeholder="Message"
            className="border rounded-xl p-3 bg-yellow-50 text-black"
          />

          <button
            type="submit"
            className="bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
