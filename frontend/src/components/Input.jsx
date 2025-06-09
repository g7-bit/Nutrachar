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
        className={`block mb-1 ${labelClassName}`}
        htmlFor={id}
        >
            {label}
        </label>}

        <input
        type={type}
        className={`${inputClassName? inputClassName: "bg-blue-300" } rounded-2xl mb-5 mt-1 h-8 text-xl  `}
        // placeholder={placeholder}
        {...props}
        ref={ref}
        id={id}
        />
    </div>
  )
}

export default React.forwardRef(Input)