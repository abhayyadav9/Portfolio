import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    socialMedia:{
      type: String,
      require:true,
    },
    socialLinks: {
      type: String,
    },
    icon:{
      type:String,
      default:""

    },

    tagline: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
