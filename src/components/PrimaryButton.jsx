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
      className={`add-button focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
