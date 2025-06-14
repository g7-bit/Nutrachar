import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ocrProcessGemini from "../utils/gemini.js";
import { ApiResponse } from "../utils/ApiRespoonse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createDiet = asyncHandler(async (req, res) => {
  console.log("imagecontroller.jsx hello");
  console.log("req.boyd:RAW:: ", req.body);
  console.log("req.files :: RAW:: ", req.files);

  if (req.body.manualData === "") {
    console.log("empty manual data");
    throw new ApiError(400, "empty manual food data");
  } else if (req.body.manualData) {
    req.body.manualData = JSON.parse(req.body.manualData);
  }``
  if(req.body.quantity){
    req.body.quantity = req.body.quantity.map(Number)
    console.log("parsed quantity",req.body.quantity)
  }

  console.log("exit of loop");

  // ? checks if null/undefined before chekcing .length,
  //   if req.body is undefined it makes the whole expression undefined
  const noImageFile = req.files?.length === 0; //false
  const noImageName = req.body?.foodNameforImage === undefined; // true
  const noQuantityForimage = req.body?.quantity === undefined; // true
  const noCompleteImage = noImageFile || noImageName || noQuantityForimage;

  const imagePresent = !noCompleteImage;
  const manualDataPresent = req.body?.manualData !== "";

  async function processImage(files) {
    let i = 0;
    let foodArray = [];
    for (const file of files) {
      console.log("filessss", file.path);
      try {
        console.log("processing images")
        const initGemData = await ocrProcessGemini(file.path);
        initGemData.dietgem.quantity = req.body.quantity[i];
        initGemData.dietgem.foodName = req.body.foodNameforImage[i];

        foodArray.push(initGemData.dietgem);

        i = i + 1;
      } catch (error) {
        console.log("deit.controller:: gemini try catch", error.message);
        throw new ApiError(
          400,
          error.message || "something went wrong while processing images "
        );
      }
    }
    return foodArray;
  }

  // if(true){
  if (!noImageFile || !noImageName) {
    if (noCompleteImage) {
      throw new ApiError(400, "incomplete image data");
    }
  }

  if (noCompleteImage && !manualDataPresent) {
    console.log("no data sent");
    throw new ApiError(400, "No data Or Invalid Data sent");
  }

  if (imagePresent && manualDataPresent) {
    console.log("BOth data present");
    const processedFoodArray = await processImage(req.files);
    const finalArray = [...processedFoodArray, ...req.body.manualData];
    console.log("final array:: ",finalArray);

    return res.status(200).json(new ApiResponse(200, "done processing"));
  } else if (manualDataPresent) {
    console.log("only manual data");
  } else if (imagePresent) {
    console.log("ONly image data");
  }

  res.send("reached the end point");
});
export { createDiet };
