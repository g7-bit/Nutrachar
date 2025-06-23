import React, { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import {Input, Button} from './index.js'

function DynamicDataInput({
    control,
    name,
    fieldLabel = "field",
    defaultItem = {
      foodName: "",
      quantity: "",
      protein: "", // 
      carbs: "",
      fats: "",
      calories: "",
      sugar: "",
      addedSugar: "",
      saturatedFats: ""
}
}) {
    const {fields, append, remove}= useFieldArray({
        control,
        name
        
    });

  return (
    <div>
      <ul 
      className=''
      >
          {fields.map((item, index)=>(
            <li
            key={item.id}
            className='flex flex-wrap border m-2 p-2'
            >

              <Input
              label={`Food Name${index+1}`}
              type='text'
              {...control.register(`${name}.${index}.foodName`,{required:true})}
              />
              <Input
              label={`Quantity`}
              type='number'
              {...control.register(`${name}.${index}.quantity`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Protein/100gm`}
              type='number'
              {...control.register(`${name}.${index}.protein`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`carbs/100gm`}
              type='number'
              {...control.register(`${name}.${index}.carbs`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Fats/100gm`}
              type='number'
              {...control.register(`${name}.${index}.fats`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Calories /100gm`}
              type='number'
              {...control.register(`${name}.${index}.calories`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Sugar/100gm`}
              type='number'
              {...control.register(`${name}.${index}.sugar`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Added Sugar /100gm`}
              type='number'
              {...control.register(`${name}.${index}.addedSugar`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Saturated Fats /100gm`}
              type='number'
              {...control.register(`${name}.${index}.saturatedFats`,{required:true,valueAsNumber: true})}
              />

              <Button
              type='button'
              className='h-7 my-8 '
              onClick={()=>remove(index)}
              >
                Remove &#128465;
              </Button>

            </li>
          ))}
        </ul>
        {/* {error && <p className='text-red-400 text-center font-semibold'>{error}</p>} */}

        {(fields.length>0) &&
        <Button
        type='button'
        onClick={()=>append(defaultItem)}
        >
        add manual
        </Button>
        }
        {fields.length===0 &&
         <Button
        type='button'
        onClick={()=>append(defaultItem)}
        >
        Add manual data again
        </Button>
        }
    </div>
  )
}

export default DynamicDataInput