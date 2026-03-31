import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"  // For generating JSON Web Bearer Tokens (JWT) for user authentication and authorization, allowing users to securely access protected routes and resources in the application.
import bcrypt from "bcrypt"  // library For hashing passwords before saving them to the database and comparing hashed passwords during login

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // Creates an index on the username field for faster search and enforces uniqueness at the database level
        },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avtar: {
        type: String, // cloudinary url of the profile picture
        required: true
    },
    coverimage: {
        type: String, // cloudinary url of the cover image
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }
},
    {
    timestamps: true // Automatically adds createdAt and updatedAt fields to the schema
    }
)
userSchema.pre("save", async function (next) // 1. The mongoose middleware (Hook)/(Trigger): pre("save") pauses the saving process
{
    if (thiis.isModified("password")) return next() ;
    
    this.password = bcrypt.hash(this.passsword, 10) //2. The Tool: You call Bcrypt to scramble the password
    
    next() // 3. The Callback: You tell Mongoose to continue saving
})

userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password,this.passsword)
}
userSchema.methods.generateAccessToken = function () { // 1. The Tool: You call JWT to create a token
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.generateRefreshToken = function () { 
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