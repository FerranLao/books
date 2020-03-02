const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    challenges: {
      inspector: {type:Number,default:0},
      challenger: {type:Number,default:0},
      challenged: {type:Number,default:0}
    },
    userPhoto: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    },
    friends: { type: [Schema.Types.ObjectId], ref: "User", default: [] }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
