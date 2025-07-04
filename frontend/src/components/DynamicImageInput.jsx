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
    <div>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id} className="flex ">
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
              className="h-7 my-8 "
              onClick={() => remove(index)}
            >
              Remove
            </Button>
            }
          </li>
        ))}
      </ul>
      {/* {error && <p className='text-red-400 text-center font-semibold'>{error}</p>} */}
      {!loading && 
      <Button type="button" onClick={() => append(defaultItem)}>
        Add Another Image
      </Button>
      }
    </div>
  );
}

export default DynamicImageInput;
