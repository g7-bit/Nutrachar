import mongoose , {Schema} from "mongoose"
// todo: maybe add mongooseAggregatePaginate

const dietSchema = new Schema ({

    foodItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Food"
        }
    ]
}, {timestamps: true}
)

export const Diet = mongoose.model("Diet", dietSchema)