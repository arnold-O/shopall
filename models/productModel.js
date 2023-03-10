const mongoose = require('mongoose'); 
const slugify = require('slugify')

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: "Category", 
      
    },
    brand:{
        type: String,
        enum: ["Apple", "Sony", "Imose",'Microsoft','Lenovo', 'Facebook'],

    },
    quantity:{
        type:Number,
        required:true
    },

    images:{
        type:Array
    },
    quantity:Number,
    sold:{
        type:Number,
        default:0
    },
    color:{
        type: String,
        enum: ["Black", "Brown", "Red"],

    },
    ratings:[
        {
            star:Number,
            postedby:{
                type:mongoose.Schema.ObjectId,
                ref:"User"
            }
        }
    ]
},
{
    timestamps:true
});

 
productSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
  });
  

//Export the model
module.exports = mongoose.model('Product', productSchema);