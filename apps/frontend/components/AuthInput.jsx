"use client";

export default function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-800">{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm 
          bg-white text-black
          placeholder-gray-500
          focus:ring-2 focus:ring-black/80 focus:border-black
          outline-none transition
        "
      />
    </div>
  );
}
