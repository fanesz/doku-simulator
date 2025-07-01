import clsx from "clsx";

interface ActionButtonProps {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const {
    variant = "primary",
    size = "medium",
    className = "",
    onClick,
    disabled = false,
    children,
  } = props;
  const baseClasses =
    "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-white text-red-600 border border-red-600 hover:bg-red-50 focus:ring-red-500",
    secondary:
      "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
    danger:
      "bg-red-600 text-white border border-red-600 hover:bg-red-700 focus:ring-red-500",
    success:
      "bg-green-600 text-white border border-green-600 hover:bg-green-700 focus:ring-green-500",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-6 py-2",
    large: "px-8 py-3 text-lg",
  };

  const buttonClasses = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
