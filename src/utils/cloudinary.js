import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"//


    // Configuration
    cloudinary.config({ 
        cloud_name: processs.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
           if (!localFilePath) throw new Error("File path is required for uploading to Cloudinary")
            // Upload the file to Cloudinary
           const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto", // Automatically detect the file type (image, video, etc.)
           })
           console.log("file is uploaded on cloudinary: ",response.url);
           return response;
        } catch (error) {
            fs.unlinkSync(localFilePath) // Delete the local file after uploading to Cloudinary or if upload operation fails
            return null;
        }   
    }
    
export {uploadOnCloudinary}
