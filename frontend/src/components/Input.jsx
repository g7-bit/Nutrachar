import React, { useId } from 'react'

function Input(
    label,
    type="text",
    className="",
    ...props
) {
    const id= useId()

    //todo: repair classname for block or inline-block
  return (
    <div>
        {label && 
        <label
        className='block mb-1'
        htmlFor={id}
        >
            {label}
        </label>}

        <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        id={id}
        />
    </div>
  )
}

export default Input