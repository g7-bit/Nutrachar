import axios from "axios";

export class DietService {
  constructor() {}

  async createNewDiet(formdata) {
    try {
      const requesty = await axios.post("api/v1/diet/newDiet", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response from server::", requesty);
      return {success: true}
    } catch (error) {
      console.log(error.response?.data);
      return {
        success: false,
        message: error.response?.data.message
      }

    }
  }
  async getAllDiets() {
    try {
      const allDietData = await axios.get("/api/v1/diet/getAllDiets");
      console.log("diet.js:: alldeitedata", allDietData);
      // console.log("diet.js:: alldeitedata", allDietData.data.data);
      if (allDietData) {
        return allDietData.data.data;
      }
    } catch (error) {}
  }

  async getSingleDiet(dietId) {
    try {
      const dietresponse = await axios.get(
        `/api/v1/diet/getSingleDiet/${dietId}`
      );

      return dietresponse.data.data;
    } catch (error) {
    console.log("dietJsx:: getsingle:: error:: ", error)
    return false
    }
  }
}

const dietService = new DietService();

export default dietService;
