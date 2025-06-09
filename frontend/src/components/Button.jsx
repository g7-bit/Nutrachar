import React from 'react'

function Button({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor= "text-white",
    className="",
    ...props
}) {
  return (
    <button
    className={`mx-4 my-2 px-3 rounded-lg ${bgColor} ${textColor} ${className}`}
    type={type}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button