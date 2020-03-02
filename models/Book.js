const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema(
  {
    title:{type:String, required:true},
    description:{type:String,default: "Lorem ipsum dolor sit amet consectetur adipiscing elit, cursus sollicitudin mattis metus pellentesque dis mus, condimentum conubia suscipit orci urna scelerisque. Pretium maecenas dignissim habitasse vel fames erat sem per litora, blandit congue duis suspendisse sociosqu fermentum convallis enim, vehicula gravida dictumst commodo lobortis morbi tincidunt risus. Potenti arcu quis a praesent commodo nostra mauris placerat iaculis fusce ullamcorper, molestie sed orci feugiat luctus integer sapien natoque risus justo"},
    price:{type:Number,required:true},
    year:{type:Number,required:true},
    author:{type:String,required:true},
    category:{type:String,enum:["Fiction","Romance","Fantasy","Science fiction","Terror","History"]},
    img:{type:String,required:true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("Book", bookSchema);
module.exports = User;