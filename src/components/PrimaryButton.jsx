import React from "react";
import { Button } from "flowbite-react";

const PrimaryButton = ({
  type = "button",
  className = "",
  children,
  ...props
}) => {
  return (
    <Button
      type={type}
      className={`bg-rose-400 border-none hover:bg-rose-500 py-2 px-3 rounded-md focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
