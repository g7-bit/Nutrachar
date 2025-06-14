  import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import { ApiError } from "../utils/ApiError.js";




const ai = new GoogleGenAI({ apiKey: "AIzaSyAfuwoQw4XAMog_nLc8nYiFRXy0OTl_tNI" });

async function ocrProcessGemini(filePath) {
try {
    const myfile = await ai.files.upload({
        file: filePath,
        config: { mimeType: "image/jpeg" },
      });
    
    
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-05-20",
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
      const sliced=response.text.slice(7,-3)
      // console.log("sliced:: ", sliced)
      const parsedText=JSON.parse(sliced)
      // console.log("gemini.js:: parsedText", parsedText)
      if(parsedText.dietgem === 'invalid'){
        throw new Error("Please provide actual nutritinal label image")
      }
      return parsedText
} catch (error) {
    console.log('gemini.js:: catch error:: ', error)
    throw new ApiError(500, "google api error")
}
  
}

export default ocrProcessGemini