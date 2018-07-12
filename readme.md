<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
 
#TripleTrip - advanced travel blog/adviser
<hr>
<h3> App runs on Node.js </h3>
<h4>  </h4>
<h2 class='btn btn-warnign'> Feautures </h2>
<hr>
<ul>
 <li><h2> User Profile </h2> </li>
 <pre>
   1. User model stores information about visited countries and loads map in profile page .
   2. User can change avatar
   3. User model stores home coutry information and loads map in profile page .
   4. Each user can play GAME basing on the countries he visited.
 </pre>
 <hr>
 <li><h2> Posts </h2> </li>
 <pre>
   1. Post model has visited places/ visited  cities which works with google geocoder.
   2. Each visited city is link to wikipedia
   3. Post has Like and Unlike
   4. Post has type of trip like: relaxing, history rich and etc.
   5. Post has tags 
   6. Each post has small visited country map with main regions on it.
   7. You can add additional fields (dynamicly created inputs) while creating post
   
 </pre>
 </ul>
req.user - contains LOGED IN user information. 

Because if no one loged in there is no request posible because isLoggedIn function that we are using to check
if user login before applying any changes.

Problems: 
1. Automatically read home city of the user and hightlight city on the map.
2. When registering allow user to select from the list of cities.
3. 
