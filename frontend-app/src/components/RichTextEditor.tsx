interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="bg-white">
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-sans text-sm text-gray-900 "
        placeholder="Tulis deskripsi pekerjaan di sini..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}