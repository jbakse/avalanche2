import classNames from "classnames";

interface ButtonProps {
  primary?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  label = "Button",
  className = "",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        "rounded-full px-3 py-2 leading-none",
        {
          "bg-indigo-400 text-white hover:bg-indigo-500": primary,
          "border border-gray-400 bg-gray-200 hover:bg-gray-100": !primary,
        },
        className,
      )}
    >
      {label}
    </button>
  );
};
