interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onPaste: () => void;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { label, value, placeholder, onChange, onPaste } = props;

  return (
    <div className="flex items-center space-x-4">
      <label className="w-48 text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-1 max-w-md">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        <button
          onClick={onPaste}
          className="px-3 py-2 bg-gray-100 text-gray-600 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors text-sm"
        >
          Paste
        </button>
      </div>
    </div>
  );
};

export default InputField;
