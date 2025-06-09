import React from 'react'
import { useFieldArray } from 'react-hook-form'

function DynamicImageInput({
    control,
    name,
    fieldLabel = "field",
    defaultItem= {value:"", image:""}
}) {
    const {fields, append, remove}= useFieldArray({
        control,
        name
    })
  return (
    <div>
      
    </div>
  )
}

export default DynamicImageInput