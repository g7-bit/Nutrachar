import React, { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import {Input, Button} from './index.js'

function DynamicDataInput({
    control,
    name,
    storeFields,
    fieldLabel = "field",
    loading= false,
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
    let {fields, append, remove,replace}= useFieldArray({
        control,
        name,
      
        
    });

     useEffect(()=>{console.log("curr fields", fields)},[fields])

    useEffect(()=>{
      if(storeFields){
        console.log("store is here")
        replace(storeFields)
      }else{
        remove(0)
        console.log("store isn't here")
      }
      console.log("initial fields",fields)
      console.log("dynamicInput.jsx:: fields", fields)
    },[])
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
              min='1'
              step='any'
              {...control.register(`${name}.${index}.quantity`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Protein/100gm`}
              type='number'
              min='0'
              step='any'
              {...control.register(`${name}.${index}.protein`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`carbs/100gm`}
              type='number'
              min='0'
              step='any'
              {...control.register(`${name}.${index}.carbs`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Fats/100gm`}
              type='number'
              min='0'
              step='any'
              {...control.register(`${name}.${index}.fats`,{required:true,valueAsNumber: true})}
              />
              {/* <Input
              label={`Calories /100gm`}
              type='number'
              min='0'
              step='any'
              {...control.register(`${name}.${index}.calories`,{required:true,valueAsNumber: true})}
              /> */}
              <Input
              label={`Sugar/100gm`}
              type='number'
              min='0'
              step='any'
              {...control.register(`${name}.${index}.sugar`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Added Sugar /100gm`}
              type='number'
              min='0'
              step='any'
              {...control.register(`${name}.${index}.addedSugar`,{required:true,valueAsNumber: true})}
              />
              <Input
              label={`Saturated Fats /100gm`}
              type='number'
              min='0'
              step='any'
              {...control.register(`${name}.${index}.saturatedFats`,{required:true,valueAsNumber: true})}
              />

              {!loading && 
              <Button
              type='button'
              className='h-7 my-8 '
              onClick={()=>remove(index)}
              >
                Remove &#128465;
              </Button>
              }

            </li>
          ))}
        </ul>
        {/* {error && <p className='text-red-400 text-center font-semibold'>{error}</p>} */}

{!loading && 
<div>
        
        {(fields.length>0) &&
        <Button
        type='button'
        onClick={()=>append(defaultItem)}
        >
          add another manual food data
        </Button>
        }


        {fields.length===0 &&
         <Button
        type='button'
        onClick={()=>append(defaultItem)}
        >
        Add food data manually
        </Button>
        }
              </div>
}
    </div>
  
  )
}

export default DynamicDataInput