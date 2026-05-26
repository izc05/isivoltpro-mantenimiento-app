import { classNames } from "../utils/classNames";

export default function Button({ children, icon: Icon, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-accent to-green-400 text-primaryDark shadow-soft",
    dark: "bg-primaryDark text-accent shadow-soft",
    outline: "border border-accent bg-white text-primary",
    ghost: "bg-white/10 text-white ring-1 ring-white/20",
    danger: "bg-danger text-white",
  };

  return (
    <button
      className={classNames(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-black transition active:scale-[0.98]",
        variants[variant],
        className
      )}
      {...props}
    >
      {Icon ? <Icon size={21} strokeWidth={2.6} /> : null}
      {children}
    </button>
  );
}
