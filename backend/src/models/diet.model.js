import mongoose , {Schema} from "mongoose"
// todo: maybe add mongooseAggregatePaginate

const dietSchema = new Schema ({

    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index:true,
    },
    foodItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Food"
        }
    ]
}, {timestamps: true}
)

export const Diet = mongoose.model("Diet", dietSchema)