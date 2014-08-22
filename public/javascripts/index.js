/**
 * Created by haihu on 2014/8/21.
 */

function showRound(){
    $.ajax({
        url: '/',//服务器端 取最新接口的URL
        type: 'GET',
        success: function (data) {
            html(JSON.parse(data).number);
        }
    });
}

function getAnswer(){
    var  answer = $('#answer').val();

    $.ajax({
        url: '/',//服务器端 取最新接口的URL
        type: 'POST',
        data:{answer:answer},
        success:function(data){
            alert(data);
            roundNum = roundNum + 1;
        }
    });
}

