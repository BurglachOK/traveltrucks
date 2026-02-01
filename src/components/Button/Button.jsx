import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({ children, type = "button", className, ...props }) => {
  return (
    <button type={type} className={clsx(css.heroBtn)}{...props}>
      {children}
    </button>
  );
};

export default Button;
