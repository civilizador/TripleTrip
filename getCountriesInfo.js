      const User        = require("../models/user");
      const bodyParser  = require('body-parser');
      const fetch = require("node-fetch");

      const apiRoute11 = "https://restcountries.eu/rest/v2/alpha/"
      let visitedCountries = [];
      let responses = [];
      
               User.findById(req.params.id, function(err, foundUser) {
                         visitedCountries=foundUser.countriesVisited;
                })
      
               for (let i=0;i<visitedCountries.length;i++) {
                    
                    async function getAllCountriesInfo (visitedCountries) {
                         const response = await fetch( `${apiRoute11} + visitedCountries[i]`  )
                         responses.push(response) ;
                         console.log(responses)
                         return (await response.json()).results 
                    } 
                  
               }
   
module.exports = {
    responses
}



