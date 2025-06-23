 import mongoose, {Schema} from "mongoose"
 import jwt from "jsonwebtoken"
 import bcrypt from "bcrypt"

 const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required: [true, 'Password is required']
    },
    avatar:{
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },



}, {timestamps: true})


// before pass save,  hash using bcrypt
//  also, check if pass diff from existsing db pass

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next(); // do nothing when pass  !modified, and return to next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
} )


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        
    )
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        
    )
}

export const User = mongoose.model("User", userSchema)