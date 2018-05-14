# Project_Athelet

## Project Working URL: http://ec2-18-220-71-110.us-east-2.compute.amazonaws.com/choose

# Technologies used ***MERN Stack ***<br/>
<br/>
* REACT 
* MONGODB 
* NODE
* EXPRESS
<br/><br/>

The project has 3 routes <br/>
a) /choose  -- (options to select Register or view previous records)<br/>
b) /Register  -- (Registration)<br/>
c) /PlayersList  -- (List of previous registered users)<br/><br/>
<br/><br/>

## Steps after downloading Sourse Code <br/>
npm install <br/>
npm install -g nodemon <br/>
nodemon  <br/>
npm run dev <br/>

# API
## GET: http://ec2-18-220-71-110.us-east-2.compute.amazonaws.com/usersList <br/>
## POST: http://ec2-18-220-71-110.us-east-2.compute.amazonaws.com/usersList <br/>

(takes imput as JSON body having 
Sample Structure
{    
    "Name": "Open SponserShip",
    "DOB": "Mon Sep 25 2017 00:36:06 GMT-0400 (Eastern Daylight Time)",
    "Nationality": "USAA",
    "Location": "California",
    "Association": "CS",
    "Team": "Software",
    "Gender": "Male",
    "Sports": [
        "Golf",
        "Cricket",
        "Basketball"
    ],
    "About": "reamwork",
    "Interests": "Development, Designing",
    "Charities": "Career",
    "SocialMediaHandles": {
        "linkedin": "https://www.linkedin.com/company/5341686/",
        "facebook": "https://www.linkedin.com/company/5341686/",
        "instagram": "https://www.linkedin.com/company/5341686/"
    },
    "ProfileImage": "data:image/jpeg;base64,/9j/Fs4usSYpbtpfnu+URzL"
})


# TASK: <br/>
I would like you to create a multi-step or multi-screen athlete profile form that gathers standard demographic, sports and event data. Here is a list of data points and sports you might want to use:
### Data Points:
Name, Date of Birth, Nationality, Location, Association (e.g. NBA, NFL), Team (e.g. New York Giants), Gender, Sports (Can Multiple), About, Interests, Charities, Social Media Handles (Facebook, Twitter, Instagram, Youtube, Twitch, Snapchat), Pets, Drinks Alcohol, Married, Profile Image (S3 storage)
### Sports
Golf, Tennis, Cricket, Basketball, Baseball, American Football, Aquatics, Archery, Automobile Racing, Badminton, Beach Volleyball, Bobsleigh, Body Building, Boxing, Cross Country Running, Cross Country Skiing, Curling

Here is a suggested organization of the form but use your best judgement and creativity:
-> Basic Info: name, sport, nationality, gender, date of birth
-> About: description, location, team etc
-> Social Media: handles
-> Summary: show the athlete a wrap-up screen with the info they added, and give them a way to go back and edit if there are any mistake
-> Submit: On submit, the payload should be sent to a simple end point which persists the profile. This should be saved to a simple free MongoDB instance, such as mLab.

### List: 
After submission I should see a list of all profiles I have created in a simple table view (BONUS FEATURE)
API : Node/Express
Mongoose ORM (MongoDB)
3 End Points - POST, GET, PUT
Request Param Validation - express-validator (Bonus Feature)

## This is a single-page application. There willn't be page reloads between screens.
