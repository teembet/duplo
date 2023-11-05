import React, { useState } from "react";

interface Props {
  input?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  containerClass?: string;
}

const CustomPasswordInput: React.FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={` ${props.containerClass}`}>
      <div className="relative flex items-center">
        <input
          {...props.input}
          type={showPassword ? "text" : "password"}
          className={`primary-input ${props?.input?.className}`}
        />
        <button
          type="button"
          className="absolute right-2 bottom-[35%] text-primary text-xs font-bold cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <span>HIDE</span> : <span>SHOW</span>}
        </button>
      </div>
    </div>
  );
};

export default CustomPasswordInput;
