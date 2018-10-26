module.exports = function(app){

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
        allScores.push(req.body)
    });

}