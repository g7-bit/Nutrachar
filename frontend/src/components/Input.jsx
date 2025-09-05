import React, { useId } from 'react'



function Input({
    label,
    type="text",
    labelClassName="",
    inputClassName="",
    // placeholder= label,
    ...props
},ref) {
    const id= useId()

    //todo: repair classname for block or inline-block
  return (
    <div>
        {label && 
        <label
        className={`animate-fade-up-fast block opacity-60 font-sans font-light ${labelClassName}`}
        htmlFor={id}
        >
            {label}
        </label>}

        <input
        type={type}
        className={`${inputClassName} animate-fade-up-slow font-serif font-stretch-extra-expanded bg-blue-300 shadow-sm rounded-2xl mb-3 mt-1 text-sm md:text-xl p-2 text-center `}
        // placeholder={placeholder}
        {...props}
        ref={ref}
        id={id}
        />
    </div>
  )
}

export default React.forwardRef(Input)