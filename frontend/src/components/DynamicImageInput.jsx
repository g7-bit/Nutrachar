import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Input, Button } from "./index.js";

function DynamicImageInput({
  control,
  name,
  fieldLabel = "field",
  defaultItem = { foodName: "", image: "" },
  errors,
  loading= false
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="">
      <ul className="">
        {fields.map((item, index) => (
          <li key={item.id} className="flex flex-wrap gap-2 m-2 p-2 ">
            <Input
              label={`${fieldLabel} ${index + 1}`}
              type="text"
              {...control.register(`${name}.${index}.foodName`, {
                required: true,
              })}
            />
            <Input
              label={`Quantity: In gm OR units`}
              type="number"
              min='1'
              {...control.register(`${name}.${index}.quantity`, {required:true,valueAsNumber: true})}
            />
            <Input
              label={`Image ${index + 1}`}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              {...control.register(`${name}.${index}.image`, {
                required: true,
              })}
            />
            {/* {errors?.[name]?.[index]?.image?.type === "required" && (
              <p role="alert">Image is required</p>
            )} */}
            
                  {!loading && 
            <Button
              type="button"
              className="h-7 my-8 btn-hover  text-white rounded-2xl bg-red-500 "
              onClick={() => remove(index)}
            >
              Remove  &#128465;
            </Button>
            }
          </li>
        ))}
        
        
      </ul>
      {/* {error && <p className='text-red-400 text-center font-semibold'>{error}</p>} */}
      {!loading && 
      <Button type="button" onClick={() => append(defaultItem)}
      className="btn-hover rounded-full py-2 px-4 text-xl ml-19 text-white bg-indigo-500"
      >
        Add Image +
      </Button>
      }
    </div>
  );
}

export default DynamicImageInput;
