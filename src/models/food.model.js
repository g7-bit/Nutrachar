import mongoose, {Schema} from "mongoose"

const foodSchema = new Schema({
    foodName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        default:0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fats: {
        type: Number,
        default: 0
    },
    kcal: {
        type: Number,
        default: 0
    },
    sugar: {
        type: Number,
        default: 0,
    },
    addedSugar: {
        type: Number ,
        default: 0
    },
    saturatedFats: {
        type: Number,
        default: 0
    },
})

export const Food = mongoose.model("Food", foodSchema)