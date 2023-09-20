//This module will find and return ratings in a range from 1-5 using a function and foreach loop
/*The user will be given the option to choose a rating from 1-5 to view products from the lowest rated to the highest 
by choosing from a pre-defined list .

eg. If the user chooses 5, all the products with a rating of 5 will be returned*/

import {jerseyRatings} from "./data-storage.js" //Imports from data storage module
import getRated from "./getRatings.js"


function ratingsFilter(a){

    
    if(a < 1 || a > 5){
        return null //For testing purposes, this if statement captures values outside the range
    }
    else{
        console.log("All products that have been rated") 
        getRated(); //gives a list of products that have been rated
        
        console.log("********************")
        
        console.log("Now showing rated products with a value of " + a)
       jerseyRatings.filter(i=>i.rating == a).forEach(result => console.log(result)) //filters products with a specific rating
        
    }
}




export default ratingsFilter

    