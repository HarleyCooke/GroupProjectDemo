let teamPlayers = [];
let username = Date.now();
var url = './viewteam.html'

function LoadCreate(){  
    $("#teamCreate").append(`<span><form> Create a team: <input id="teamCreator"/></form></span>`)
}

function Remove(arr, value) {
    var tempArr = [];
    for (var item in arr){
        if (arr[item] != value){
            tempArr.push(arr[item])
        }
    }
    return tempArr;
}

function SendTeam(){
    console.log(teamPlayers)
    console.log(username)
    var teamJSON = {
        User: username,
        TeamName: $("#teamCreator").val(),
        Player1: teamPlayers[0],
        Player2: teamPlayers[1],
        Player3: teamPlayers[2],
        Player4: teamPlayers[3],
        Player5: teamPlayers[4],
        Player6: teamPlayers[5],
        Player7: teamPlayers[6],
        Player8: teamPlayers[7],
        Player9: teamPlayers[8],
        Player10: teamPlayers[9],
        Player11: teamPlayers[10],
        Player12: teamPlayers[11],
        Player13: teamPlayers[12],
        Player14: teamPlayers[13],
        Player15: teamPlayers[14]
    };
    console.log(teamJSON)
    $.post("https://ballstatsapi.azurewebsites.net/api/userteams/",teamJSON);
    window.location.href = url;
};

$(document).on('keyup','#teamCreator', function (){
    if (!$("#teamCreator").val().length > 0){
        $("#submitBtn").prop("disabled", true)
    }
    else{
        $("#submitBtn").prop("disabled", false)
    }
});

$(document).on('click','.add', function () {
    if (teamPlayers.length < 15){    
        $(this).removeClass('add') 
        $(this).addClass('added')
        var name = this.parentNode.parentNode.childNodes[0].innerHTML;
        var id = this.parentNode.parentNode.getAttribute("player-id");      
        var row = this.parentNode.parentNode; 
        $(row).css('background-color','#90eda8')
        $("#teamTab").append(`<tr><td id="${id}">ID: ${id} - ${name}</td><td><i class="remove fas fa-minus-square"></i></td></tr>`)
        teamPlayers.push(id);
    }
    if (teamPlayers.length == 15){
        if($("#subBtn").is(':empty')){
            $("#subBtn").append("<button class='btn btn-secondary' id='submitBtn' onclick='SendTeam();'>SUBMIT</button>")
        }
        $(".add").prop('disabled', true)
    }
});
$(document).on('click','.remove', function () {
    $(".add").prop('disabled', false)
    var id = this.parentNode.parentNode.childNodes[0].getAttribute('id')
    var row = this.parentNode.parentNode; 
    $(row).remove();
    $(`tr[player-id="${id}"]`).css('background-color','white');
    $(`tr[player-id="${id}"]`).children(6).children(0).removeClass('added')
    $(`tr[player-id="${id}"]`).children(6).children(0).addClass('add')
    teamPlayers = Remove(teamPlayers, id);
    if (teamPlayers.length < 15){
        $("#subBtn").empty();
        console.log(teamPlayers)
    }
});

$(document).ready(function () {
    $(document).on("keypress", "form", function(event) { 
            return event.keyCode != 13;
    });
    
    $('#playerTab').DataTable( {
        ajax: {
            url: 'https://ballstatsapi.azurewebsites.net/api/players/',
            "dataSrc": function (d) {       
                return d
            }
        },
        columns:[
            {data: 'NAME'},
            {data: 'TEAM'},
            {data: 'AGE'},
            {data: 'RAT'},
            {data: 'MIN'},
            {data: 'W_L'},
            {
                data: null,
                render: function ( data, type, row ) {
                    return '<i class="add fas fa-plus-square"></i>';
                }
            }
        ],
        createdRow: function (data, row){
            $(data).attr('player-id', row.ID)
        },
        "aoColumnDefs": [ {
            "aTargets": [ 3,4,5 ],
            "mRender": function (data) {
                var formmatedvalue = data.toFixed(2)
                return formmatedvalue;
            }
        }],
        "bLengthChange": false,
        "iDisplayLength": 15,
        "dom": '<"pull-left"f><"pull-right"l>tip'
    },
    );
    $("#playerCreate").css("width","45vw")
    $("#teamTab").css("width","35vw")
});

 function Confirm(){
    if (!$("#teamCreator").val() == ""){
        $("#confirmBtn").click(function(event){
            event.preventDefault();
        });
        $('#Main').css('visibility','visible');
        document.getElementById('teamForm').style.visibility = 'hidden';
        
    }
    else{
        alert("You must have a team name!")
    }
}
