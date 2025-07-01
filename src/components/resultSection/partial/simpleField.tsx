interface SimpleFieldProps {
  label: string;
  value: string;
  className?: string;
}

const SimpleField: React.FC<SimpleFieldProps> = (props) => {
  const { label, value, className } = props;

  return (
    <div className={className}>
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="ml-2 text-gray-800 break-words">{value}</span>
    </div>
  );
};

export default SimpleField;
