function Button({ children, className = "", type = "button", ...props }) {
  return <button className={`app-button ${className}`.trim()} type={type} {...props}>{children}</button>;
}

export default Button;