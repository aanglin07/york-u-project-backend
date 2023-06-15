//This module will find and return ratings in a range from 1-5
/*The user will be given the option to choose a rating from 1-5 to view products from the lowest rated to the highest 
by choosing from a pre-defined list .

eg. If the user chooses 5, all the products with a rating of 5 will be returned*/

import jerseyRatings from "./data-storage.js"

function ratingsFilter(a){
jerseyRatings.filter(i=>i.rating == a).forEach(result => console.log(result))
}


export default ratingsFilter

    