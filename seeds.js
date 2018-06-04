var  mongoose =     require("mongoose");
var YelpModel =     require("./models/campground.js");
var Comment =       require("./models/comment.js");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://images.unsplash.com/photo-1481682799713-eb3384705155?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66192cfe658b49cdd1bbbbebac99eaea&auto=format&fit=crop&w=1400&q=80",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author: {username: "as"}
    },
    {
        name: "Desert Mesa", 
        image: "https://images.unsplash.com/photo-1502113040754-9e3e85618a00?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f7e655cc68dc37a51ba6cd36e5327ca4&auto=format&fit=crop&w=1500&q=80",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        ,author: {username: "as"}   
    },
    {
        name: "Canyon Floor", 
        image: "https://images.unsplash.com/photo-1508430459690-9621c7aee2ae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e0afe4b6713c1c0eec4354a336f1592&auto=format&fit=crop&w=1526&q=80",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        ,author: {username: "as"}
        
    }
];

function seedDB() {
YelpModel.remove({},function(err)
{
    if (err) {console.log(err)}
  console.log("DB WAS CLEARED");
//   data.forEach(function(seed)
//   {
//       YelpModel.create(seed, function(err, camps)
//       {
//           if(err){console.log(err)} 
//                     else {
//                         console.log("added a new camp");
//                         Comment.create({ text: "This place is great, but I wish there was internet",
//                                 author: "Homer"},
//                                 function (err,comment) {
//                                     if(err) {console.log(err)}
//                                     else {
//                                         camps.comments.push(comment); //camps is a parent function placeholder - see above . comments - is object which will store all comments
//                                         camps.save();
//                                         console.log("New comment created");
//                                          }
                                    
//                                 }
                                
//                                         );
//                     }
//         } );
        
//   });
//    
}
);
} 
    
    
 
    
              module.exports = seedDB;