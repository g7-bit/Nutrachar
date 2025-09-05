import React from 'react'

function Button({
    children,
    type="button",
    
    
    className="",
    ...props
}) {
  return (
    <button
    className={`${className} mx-4 my-2 px-3   `}
    type={type}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button