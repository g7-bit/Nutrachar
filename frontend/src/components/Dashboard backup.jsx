import React, { useState } from 'react'
import { useForm, useFieldArray, set } from 'react-hook-form'
import { Button, Input, Logo } from "./index.js";

function Dashboard() {

  const {register,handleSubmit, control} = useForm(
    {
      defaultValues:{
        dynField:[{ value:"", image:""}]
      }
    }
  )
  const {fields,append, remove} = useFieldArray({control,name: "dynField"})
  const [error, setError] = useState("")
  const [loading, setLoading]= useState(false)
 

  return (

    <div>
      <p>Halo</p>
      <form onSubmit={handleSubmit((data)=>console.log(data), (errors)=>{setError("*Please fill all fields")})}>
        <ul>
          {fields.map((item, index)=>(
            <li
            key={item.id}
            className='flex '
            >
              <Input
              label={`Food Name ${index+1}`}
              type='text'
              {...register(`dynField.${index}.value`,{required:true})}
              />
              <Input
              label={`Image ${index+1}`}
              type='file'
              accept="image/png, image/jpg, image/jpeg"
              {...register(`dynField.${index}.image`)}
              />
              <Button
              type='button'
              className='h-7 my-8 '
              onClick={()=>remove(index)}
              >
                Remove
              </Button>

            </li>
          ))}
        </ul>
        {error && <p className='text-red-400 text-center font-semibold'>{error}</p>}
        <Button
        type='button'
        onClick={()=>append({value:''})}
        >
        add Field
        </Button>
        <Button
        type='submit'
        className=''
        >
          Submit
        </Button>
        <Button
        type='button'
        >

        </Button>
      </form>
    </div>
  )
}

export default Dashboard