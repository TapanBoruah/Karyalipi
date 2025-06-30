import mongoose ,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
         
    },
    refreshToken:{
        type:String
    }

},
{
    timestamps:true
}
)

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect=async function (password) {
 return await  bcrypt.compare(password,this.password)
}

UserSchema.statics.generateAccessToken=function(_id){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            password:this.password,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

UserSchema.statics.generateRefreshToken=function(_id){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",UserSchema);