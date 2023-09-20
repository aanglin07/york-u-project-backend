import {jerseyRatings} from "./data-storage.js"


/*This module returns all products that has a rating. Since a user cannot give a rating of 0. 
This was used to filter all products that got a rating*/

function getRated(){
     jerseyRatings.filter(i=>i.rating > 0).forEach(rated => console.log(rated))
}

 export  default getRated

