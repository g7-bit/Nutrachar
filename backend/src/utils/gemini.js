import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})


import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import { ApiError } from "../utils/ApiError.js";
console.log(`gem api key : -${process.env.GEMINI_API}-`)

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API,
});

async function ocrProcessGemini(filePath) {
  let parsedObject;
  try {
    const myfile = await ai.files.upload({
      file: filePath,
      config: { mimeType: "image/jpeg" },
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: createUserContent([
        createPartFromUri(myfile.uri, myfile.mimeType),
        `give me an object, in json format.
          give values /100gm,
          if no values of given macro, write 0
          if image is not of an nutritional label, give object dietgem:'invalid'
    
          just give me json, should follow json rules,
          the JSON key:value pari should look like :
    
          Example reply :-
          dietgem: {
          protein: 32,
          carbs:355,
          fats:31,
          kcal:432,
          sugar:43,
          addedSugar:94,
          saturatedFats:22      
          }
          `,
      ]),
    });
    // console.log("response full:: :: ",response);
    // console.log("response.text :: :",response.text);
    const sliced = response.text.slice(7, -3);
    // console.log("sliced:: ", sliced)
    parsedObject = JSON.parse(sliced);
    // console.log("gemini.js:: parsedText", parsedText)
  } catch (error) {
    console.log("gemini.js:: catch error:: ", error);
    throw new ApiError(500, "google api error")
  }
  if (parsedObject.dietgem === "invalid") {
    throw new ApiError(400, "Please provide actual nutritinal label image");
  }
  return parsedObject;
}

export default ocrProcessGemini;
