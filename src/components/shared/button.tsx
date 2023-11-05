import React, { forwardRef } from "react";

interface Props {
  btn_type?: "primary-btn" | "primary-btn-outline";
  loading?: boolean;
}

const Button = forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
>(({ children, className, btn_type, loading, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`${
        btn_type ? btn_type : "primary-btn"
      } space-x-1 flex items-center justify-center ${className || ""}`}
      {...props}
    >
      {loading && (
        <div className="h-4 w-4  animate-spin  rounded-[50%] border-[2px] border-solid  border-white border-t-transparent "></div>
      )}
      <span>{children}</span>
    </button>
  );
});

export { Button };
