//Dependencies are express, body-parse, and path
var express = require("express");
var bodyParser = require("body-parser");


//Express App ==========================================
var app = express();
var PORT = process.env.PORT || 3000;

//Express App handle data parsing =======================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//default set to home page route
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "/app/public/home.html"));
// });

// // route to survey page
// app.get("/survey", function(req, res) {
    
//     res.sendFile(path.join(__dirname, "/app/public/survey.html"));
// });

//link html routes here (CAN'T GET THIS PATH RIGHT)================================================
let htmlRoutes = require("./app/routing/htmlRoutes");
htmlRoutes(app);

// link api routes here ================================================
// let apiRoutes = require('./app/routing/apiRoutes');
// apiRoutes(app);

//==============================================================================
// User's answers (DATA) ================================
//new data gets push in this array
let allScores = [
    {
        "name":"Ahmed",
        "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        "scores":[
            5,
            1,
            4,
            4,
            5,
            1,
            2,
            5,
            4,
            1
          ]
    }
];
//Routes to api/friends
app.get("/api/friends",function(req,res){
    res.json(allScores)
})

app.post("/api/friends",function(req,res){
    //console.log("pinged");
    let currentFreind = req.body;
    let bestMatch; 
    let bestScore = 500;
    for (let i=0; i<allScores.length; i++){
        let currentMatch = 0;
        let newFriend = allScores[i];  // newFriend is someone from the allScores array
        for(let j=0; j<newFriend.scores.length; j++){
            let a = parseInt(newFriend.scores[j]);
            let b = parseInt(currentFreind.scores[j]);

            currentMatch += Math.abs(a-b)
            console.log(currentMatch);
        }
        //the newFriend with the least absolute number is the closest match
        if(currentMatch < bestScore){
            bestMatch = newFriend;
            bestScore = currentMatch;
            console.log(bestMatch);
        }
    }
    allScores.push(currentFreind);
    console.log(bestMatch)
    res.send(bestMatch)
});

// Starts the server to begin listening =================
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
