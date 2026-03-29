import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url of the video file
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true, 
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        iapublished: {
            type: Boolean,
            default: true
        },   
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"   
        }
    },
    {
    timestamps: true 
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

// Creates a "Video" collection in the database (Mongoose will automatically rename it to lowercase and plural with grammar "videos")

export const Video = mongoose.model("Video", videoSchema)
