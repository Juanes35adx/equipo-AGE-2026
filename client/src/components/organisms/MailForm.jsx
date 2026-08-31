export function MailForm({ id, type = "text", placeholder, value, onChange, error, label }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all ${
          error
            ? "border-red-400 ring-2 ring-red-100"
            : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-50"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}