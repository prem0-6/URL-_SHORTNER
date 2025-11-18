import mongoose from "mongoose";

const UrlSchema = mongoose.Schema({
    originalID:{type:String,required:true},
    shortID:{type:String,required:true,unique:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,   // references a user
        ref: "User",                            // the model name
        required: false                          // true if you want only logged-in users
      },
});
const Url = mongoose.model('Url',UrlSchema);
export default Url;