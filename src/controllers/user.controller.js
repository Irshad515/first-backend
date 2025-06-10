import { asynchandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import { user} from "../models/user.model.js";
import {upLoadOnCloudinary} from "../utils/cloudinary.js";
const registerUser = asynchandler(async (req, res) => {
   // get the user detils 
    const { fullname, email, password,username } = req.body
    console.log("email", email);
    console.log("fullname", fullname); 

   // validation- not empty
   if(
    [fullname,email,username,password].some((field) =>
    {field?.trim()=== ""}
         )
   ){
        throw new ApiError(400, "All fields are required");
   }

   // check if user already exists-username/email
     const existeduser = user.findOne({
        $or: [
            { email: email },
            { username: username }
        ]   
    })
    if(existeduser) {
        throw new ApiError(409, "User already exists with this email or username");
    }   
   //check of images ,check avtar
  const avtarLocalPath =  req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;
if(!avtarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "Avatar and cover image are required"); 
}


   //upload them to cloudinary,avtar
 const avatar = await upLoadOnCloudinary(avtarLocalPath);
 const coverImage = await upLoadOnCloudinary(coverImageLocalPath);
    if(!avatar ) {
         throw new ApiError(500, "Error uploading images to cloudinary");
    }


   // create user-create entry in db

   user.create({
        fullname,
        email,
        username:toLOwerCase(),
        password, // hash the password before saving
        avatar: avatar.url, // cloudinary url
        coverImage: coverImage?.url || "" // cloudinary url
    });
   // remove paswword and refresh token from response
   // check for user creation
   //return response

});

export {registerUser};