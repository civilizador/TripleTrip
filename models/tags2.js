     var mongoose   =   require("mongoose");

     var  Tags = new mongoose.Schema({  
          region: { tags : Array},
          subregion: { tags : Array},
          type:     { tags : Array}
         
     });
     
     module.exports = mongoose.model("Tags",Tags); 