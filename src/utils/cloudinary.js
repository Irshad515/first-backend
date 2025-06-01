import {v2 as cloudinary} from "cloudinary";
import fs from "fs"



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    

    const upLoadOnCloudinary =  async (LocalfilePath)=> {
            try {
                if(!LocalfilePath) return null;
                // upload file
                const response = await cloudinary.uploader.upload(LocalfilePath,{
                    resource_type:"auto"
                })
                // file has been uploaded successfuly
                console.log("file is uploaded on cloudinary", response.url);
                return response;

            } catch (error) {
                fs.unlinkSync(LocalfilePath); // delete the file from local storage
                console.log("Error uploading file to Cloudinary:", error);
            }
    }

    export { upLoadOnCloudinary };