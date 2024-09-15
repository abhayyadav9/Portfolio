import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
  socialLinks: [
    {
      platform: {
        type: String,
        required: true,
        trim: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator: function(v) {
            return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-z]{2,})+/.test(v);
          },
          message: props => `${props.value} is not a valid URL!`
        }
      },
      icon: {
        type: String,
        trim: true, // For storing icon class or URL
      }
    }
  ],
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10,15}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    trim: true
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  tagline: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
