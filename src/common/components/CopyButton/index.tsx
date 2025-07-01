import { useState } from "react";
import clsx from "clsx";

interface CopyButtonProps {
  value: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const { value, className } = props;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        "px-2 py-1 text-xs border rounded transition-colors",
        copied
          ? "bg-green-100 text-green-700 border-green-300"
          : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200",
        className
      )}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

export default CopyButton;