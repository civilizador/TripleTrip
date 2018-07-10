     var mongoose   =   require("mongoose");

     var  Tags = new mongoose.Schema({  
          branchName: String,
          tags : Array
     });
     
     module.exports = mongoose.model("Tags",Tags); 