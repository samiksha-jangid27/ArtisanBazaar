export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-gray-500 sm:flex-row sm:px-6 lg:px-0">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-black">ArtisanBazaar</span>. Built
          to support local artisans.
        </p>
        <div className="flex gap-4">
          <button className="hover:text-black">Terms</button>
          <button className="hover:text-black">Privacy</button>
          <button className="hover:text-black">Contact</button>
        </div>
      </div>
    </footer>
  );
}
