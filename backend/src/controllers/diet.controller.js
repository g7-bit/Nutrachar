import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ocrProcessGemini from "../utils/gemini.js";
import { ApiResponse } from "../utils/ApiRespoonse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Food } from "../models/food.model.js";
import { Diet } from "../models/diet.model.js";








const createDiet = asyncHandler(async (req, res) => {
  console.log("imagecontroller.jsx hello");
  console.log("req.boyd:RAW:: ", req.body);
  console.log("req.files :: RAW:: ", req.files);
  console.log("req.user:: RAW ", req.user);

  //checking empty manual data else Parsing it,  // converting manual data values to numbers

  if (req.body.manualData === "") {
    console.log("empty manual data");
    throw new ApiError(400, "empty manual food data");
  } else if (req.body.manualData) {
    req.body.manualData = JSON.parse(req.body.manualData);
  }
  // changing quantity array ele to numbers
  if (req.body.quantity) {
    req.body.quantity = req.body.quantity.map(Number);
  }

  // ? checks if null/undefined before chekcing .length,
  //   if req.body is undefined it makes the whole expression undefined
  const noImageFile = req.files?.length === 0; //false
  const noImageName = req.body?.foodNameforImage === undefined; // true
  const noQuantityForimage = req.body?.quantity === undefined; // true
  const noCompleteImage = noImageFile || noImageName || noQuantityForimage;

  const imagePresent = !noCompleteImage;
  const manualDataPresent = req.body?.manualData !== undefined;

  async function addDietData(dietArray, userId) {
    console.log("inside db walla unction, dietArray, ", dietArray);
    console.log("inside db walla userID, ", userId);
    try {
      const foods = await Food.insertMany(dietArray);

      if (!foods) throw new ApiError(500, "failed to create food items");
      const foodIds = foods.map((food) => food._id);
      // console.log(foodIds)

      const userDiet = new Diet({
        user: userId,
        foodItems: foodIds,
      });
      const createdDiet = await userDiet.save();
      console.log("diete, ", createdDiet);
      return createdDiet;
    } catch {
      console.log("diet.controller.js:: something went wrig in db");
      throw new ApiError(500, "Error occured when savind data in db");
    }
  }
  async function processImage(files, body) {
    let i = 0;
    let foodArray = [];
    for (const file of files) {
      console.log("filessss", file.path);
      try {
        console.log("processing images");
        const initGemData = await ocrProcessGemini(file.path);
        initGemData.dietgem.quantity = body.quantity[i];
        initGemData.dietgem.foodName = body.foodNameforImage[i];

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

  // for incomplete image data
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
    const processedFoodArray = await processImage(req.files, req.body);
    const finalArray = [...processedFoodArray, ...req.body.manualData];
    console.log("final array:: ", finalArray);

    addDietData(finalArray, req.user._id);

    return res.status(200).json(new ApiResponse(200, "done processing"));
  } else if (manualDataPresent) {
    console.log("only manual data");
    const manualDataArray = req.body.manualData;
    console.log("final manual array, ", manualDataArray);
    addDietData(manualDataArray, req.user._id);

  } else if (imagePresent) {
    console.log("ONly image data");
    const processedFoodArray = await processImage(req.files, req.body);
    console.log("diet controller:: processed food array : ", processedFoodArray)
    addDietData(processedFoodArray, req.user._id);

  }

  res.send("reached the end point");
});

const getAllDiets = asyncHandler(async (req, res) => {
  // console.log("diet.controller.js:: getallDiets:: , ", req.user._id);

  try {
    const dietGet = await Diet.find({ user: req.user._id });
    if(dietGet.length === 0 ){
      return res.status(200).json(new ApiResponse(200,dietGet, "no diets found"))
    }
    if (dietGet) {
      // console.log(
      //   "diet controller:: getalldiets:: findById:: server:: ",
      //   dietGet
      // );
      const dietData = dietGet.map((diet) => [diet._id,diet.createdAt]);
      if (dietData) {
        // console.log("asdfasdf",dietData)
        return res.status(200).json(new ApiResponse(200, dietData, "diet ids sent"));
      }
    }
  } catch (error) {
    console.log(
      "dietcontroller:: getAllDiets:: error while getting data",
      error
    );
    throw new ApiError(500, "Some erro occured while getting dietId data ");
  }

  res.send("received");
});

const getSingleDiet= asyncHandler(async(req,res)=>{

  const dietId = req?.params.dietId

  const data = await Diet.findById(dietId).populate("foodItems")
  if(!data) throw new ApiError(400, "Invalid DietId in Url, No Diet Found in DB")
  // console.log("diet id:: ",data.foodItems)

  const finalDataArray = data.foodItems

  return res.status(200)
  .json(new ApiResponse(200, finalDataArray, "Diet Data recieved"))
  
  


});

const updateDiet = asyncHandler(async (req,res)=>{

  console.log("req reached here")
  console.log("req body RAW :: diet.controller.jsx:: ",req.body)
  console.log("req user RAW :: diet.controller.jsx:: ",req.user)
  // return res.status(201)
  // .json(new ApiResponse(203, "Diet Data recieved"))

  throw new ApiError(400, "Invalid DietId in Url, No Diet Found in DB")

})


export { createDiet, getAllDiets,getSingleDiet, updateDiet };
