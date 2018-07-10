const fetch = require("node-fetch");
const apiKey = 'Lx2iZQSSyPmcnV6LfMzh0Nf6uPz2InZB'
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
