 var express     = require("express");
 var router  = express.Router({mergeParams: true});
 var Post   = require("../models/trips");
 var Comment     = require("../models/comment");
 var middleware  = require("../middleware.js")
//  COMMENTS CREATE ROUTE

    router.post("/",middleware.isLoggedIn, function(req,res){
    //    looking for camp by ID
    Post.findById(req.params.id,function (err,campById) 
    {
     if(err) {console.log("Something wrong"), console.log(err);}
     else { //      create new comment 
            Comment.create(req.body.comment,  function(err,comment)
            {
            if(err) {console.log("Something wrong"), console.log(err);}
            else{
            //      add username and id of the author to comment
                    comment.author.id = req.user._id; // after creating comment with Comment.create we can grab user id from the request
                    comment.author.username = req.user.username;//   and just plug it in the author field
                    console.log(req.user.username);
            //      save comment
                    comment.save();
                    campById.comments.push(comment._id); //   pushing just created comment by passing  "comment" value.
                                                    //  "comment" - is a above function's placeholder which contains just created comment.
                    campById.save();
                    console.log(comment);
                    res.redirect("/index/" + campById._id);
                }
            });
        }   });
    });
    
//  EDIT COMMENT ROUTE
    
    router.get("/:comment_id/edit",  middleware.checkCommentOwnership, function(req, res)
    {
        res.send("EDIT ROUTE");
    } );
    
                
  module.exports=router;