// components/GradientButton.jsx
import React from "react";
import PropTypes from "prop-types";

const GradientButton = ({
  children = "Submit",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-4 text-white py-3 rounded-md
  bg-gradient-to-r from-rose-400 to-cyan-500
  hover:from-rose-400 hover:to-rose-400
  transition-all duration-700 ease-in-out shadow-md text-md font-semibold
  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  ${className}`}
      style={{
        padding: "0.75rem !important",
        fontSize: "1rem !important",
        backgroundImage:
          "linear-gradient(to right, #f43f5e, #06b6d4) !important",
      }}
    >
      {children}
    </button>
  );
};

GradientButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default GradientButton;
