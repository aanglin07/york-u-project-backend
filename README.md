# york-u-project-backend
## Project Description

This Application seeks to provide soccer fans with a one stop location to view old and new jerseys, while providing affiliate links to those jerseys to be purchased. Whether it's that jersey that brings back that nostalgic feeling of when your favourite team won that most coveted trophy or that most recently released kit, that fills fans with pride and hope of what a new season will bring. Users will be able to search and filter through a database jerseys and make purchases through affiiate links provided. They will also be able to make a wishlist that will be stored in a "wishcart" provided by the app. Users will be required to sign up and login to do so.

1.	User Inerface
2.	Admin Interface

Users registered for this application can
*	Login/Sign Up to the application
*	Browse jerseys from the online collection.
*	Filter them based on soccer league, year and team.
*	Add them to a Wishlist
*	Purchase them through an affiliate link

Admin of this application can
*	Manage jerseys collection(add and edit)
*	View list of users
*	Manage affiliate links(add and remove) 

## How to start the project
Use the command "npm start" to run the project in visual studio code application

## How to configure the environment
Use the command "npm run dev", this runs the project in the development mode,
on http://localhost:3000 to view it in your browser and also in Thunder Client or Postman to make use of the different routes created within the project.

## How to build and run the docker container
* Use the command "docker build -t jersey_app_mysql .", this will build the image.
* Use the command "docker run -p Host_Port:3000 jersey_app_mysql", this will run the docker container. HOST_PORT is any random number that you want to use on your machine as the port number.
* Use the command "docker container ls", this will display the running containers.
  


You may also see any lint errors in the console.
