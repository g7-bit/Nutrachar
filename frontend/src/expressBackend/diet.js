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
    } catch (error) {
      console.log(error.response?.data);
    }
  }
}


const dietService = new DietService();

export default dietService;