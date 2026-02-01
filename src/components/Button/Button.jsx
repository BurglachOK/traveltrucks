import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({ children, className, type = "button", ...props }) => {
  return (
    <button type={type} className={clsx(css.heroBtn, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
