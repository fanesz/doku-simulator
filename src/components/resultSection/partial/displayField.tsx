import CopyButton from "@commonComponents/CopyButton";
import clsx from "clsx";

interface DisplayFieldProps {
  label: string;
  value: string;
  showCopy?: boolean;
  className?: string;
  valueClassName?: string;
}

const DisplayField: React.FC<DisplayFieldProps> = (props) => {
  const { label, value, showCopy = false, className, valueClassName } = props;

  return (
    <div className={clsx("flex justify-between items-center", className)}>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-gray-500 block">{label}</span>
        <p
          className={clsx(
            "text-sm font-semibold text-gray-800 break-words",
            valueClassName
          )}
        >
          {value}
        </p>
      </div>
      {showCopy && <CopyButton value={value} className="ml-2 flex-shrink-0" />}
    </div>
  );
};

export default DisplayField;
