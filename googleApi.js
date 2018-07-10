const fetch = require("node-fetch");
const apiKey = 'AIzaSyAN7NDeQarLqehAwQST-JC_K4xb7phaDdQ'
const apiRoute = 'https://maps.googleapis.com/maps/api/'
async function geocode ({capital,countryName}) {
     const response = await fetch( `${apiRoute}geocode/json?address=${capital},${countryName}&key=${apiKey}`)
     return (await response.json()).results 
}
async function searchNearbyPlace ({lat,lng}) {
     const response = await fetch( `${apiRoute}place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=museum&keyword=museum&key=`)
     return (await response.json()).results 
}
module.exports = {
     geocode,
     searchNearbyPlace,
}
