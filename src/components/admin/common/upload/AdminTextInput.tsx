export interface AdminTextInputProps {
  label: string;
  placeholder: string;
  multiline?: boolean;
}

export default function AdminTextInput({
  label,
  placeholder,
  multiline = false,
}: AdminTextInputProps) {
  return (
    <div>
      <p className="font-semibold text-lg mb-2">{label}</p>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          className="w-full border border-ot-gray-600 rounded-lg py-3 px-4 text-sm min-h-24"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-ot-gray-600 rounded-lg py-3 px-4 text-sm"
        />
      )}
    </div>
  );
}
