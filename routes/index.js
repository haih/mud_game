
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};

var game = require('../models/gameModel');

module.exports = function(app) {
    var rounds = {};
    app.get('/', function(req, res) {
        res.render('index', { mud: 'mudGame' });
        //rounds = game.GenerateGame(7);
    })
    app.post('/',function(req,res){
        var answer = req.body.answer;
        var currentRound = game.getCurrentRound();
        console.log(answer + "  " + currentRound);
        var result = game.NextRound(answer,currentRound);
        console.log(result);
        res.send(result);
    })
};