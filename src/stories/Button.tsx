// import React from 'react';
// import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional classes
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  label = "Button",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        "px-3 py-2 leading-none rounded-full",
        primary
          ? "bg-indigo-400 hover:bg-indigo-500 text-white"
          : "border border-gray-200 hover:bg-gray-100",
        className,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};
