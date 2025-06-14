import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
       email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
      },
       fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
        
      },
      avatar: {
        type: String,// cloudinary url
        required: true,

      },
      coverImage: {
        type: String,// cloudinary url
        required: true,
      },
      watchHistory: [
        {
          type: Schema.Types.ObjectId,
          ref: "Video",
        },
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
      timestamps: true,
        
    }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
  
}

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,                            
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "1h",
    }
  );
  return token;
};
userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,                            
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "1h",
    }
  );
  return refreshToken;
};

export const User = mongoose.model("User", userSchema);