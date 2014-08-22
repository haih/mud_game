
//对配置文件进行增删查改
var path = require('path')
    , fs   = require('fs');

var ROUND_DATA_FILE = __dirname + '/../private/roundInfo.json';

function RoundInfo(question, answers) {
    this.question = question;
    this.answers = answers;
}

var GameCenter = function() {
    if (!this instanceof GameCenter) {
        return new GameCenter();
    }
    this.roundInfos = [];
    this.currentRound = 0;
    this.Init();
};

GameCenter.prototype.Init = function() {
    try {
            var roundData = JSON.parse(fs.readFileSync(ROUND_DATA_FILE, 'utf8'));

            for(var i in roundData) {
                this.roundInfos.push(new RoundInfo(roundData[i].question, roundData[i].answers));
            }
    } catch(e) {
        console.log(e);
    }
};

GameCenter.prototype.getCurrentRound = function(){
    return this.currentRound++;
};

GameCenter.prototype.NextRound = function(answer,currentRound){
    var rounds = this.GenerateGame(7);
    for( var i = 0 ; i < 2; i++) {
        if(rounds[currentRound][i] && rounds[currentRound][i].answers) {
            for(var j = 0 ; j < rounds[currentRound].length; j++)
            {
                console.log(rounds[currentRound][i].answers);
                if (rounds[currentRound][i].answers[j] === answer){
                    console.log(rounds[currentRound + 1][j].question);
                    return rounds[currentRound + 1][j].question;
                }
            }
        }
        console.log("Game Over~");
        return -1;
    }
}
GameCenter.prototype.GenerateGame = function(totalRound) {
    var r = 0;  // 关卡序数
    var rounds = {};    // 保存每关的节点
    var nodeUsed = 0;   // 已分配节点数
    var i = 0;
    var totalNode = this.roundInfos.length;
    for (r = 0; r < totalRound; r++) {
        // 计算本轮需要的节点数
        var nodeNeed = 0;
        if (r === 0) {
            nodeNeed++;
        } else {
            // 遍历上一关卡节点，上轮答案数=本轮节点数
            var roundLen = rounds[r - 1].length;
            for (i = 0; i < roundLen; i++) {
                if (rounds[r - 1][i].answers) {
                    nodeNeed += rounds[r - 1][i].answers.length;
                }
            }
        }
        if (nodeUsed + nodeNeed <= totalNode) {
            rounds[r] = [];
            for (i = 0; i < nodeNeed; i++) {
                rounds[r][i] = this.roundInfos[nodeUsed + i];
            }
            nodeUsed += nodeNeed;
        } else {
            console.log('关卡%d信息不足，初始化结束！', r);
            break;
        }
    }
    return rounds;
};

module.exports = new GameCenter();

//var gameCenter = new GameCenter();
//gameCenter.NextRound("白晶晶",1);
