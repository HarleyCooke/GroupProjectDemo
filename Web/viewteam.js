let players = {};
let team = [];

function GetPlayers(){
    $.ajax({
        url: "https://ballstatsapi.azurewebsites.net/api/players",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data){
            players = data;
        }
    });
}


function LoadTeam(){
    var s = document.getElementById(`TeamPick`);
    var teamID = s.options[s.selectedIndex].value;

    $.ajax({
        url: `https://ballstatsapi.azurewebsites.net/api/Userteams/${teamID}`,
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (data){
            for (var i = 1; i < 16; i++){
                team.push(players[data[`Player${i}`]]);
            }
            console.log(team)
            $("#UserTeam").DataTable( {
                data: team,
                columns: [
                    {data: 'NAME'},
                    {data: 'AGE'},
                    {data: 'Position'},
                    {data: 'RAT'},
                    {data: 'FG_'},
                    {data: 'FT_'},
                    {data: 'TP_'},
                    {data: 'AST'},
                    {data: 'REB'},
                    {data: 'BLK'},
                    {data: 'STL'},
                    {data: 'W_L'},
                    {data: 'PLAYERVALUE'},
                ],
                "aoColumnDefs": [
                    {
                        "aTargets": [ 3,4,5,6,7,8,9,10,11 ],
                        "mRender": function (data) {
                            var formmatedvalue = data.toFixed(2)
                            return formmatedvalue;
                        }
                    },
                    {
                        "aTargets": [ 12 ],
                        "mRender": function (data) {
                            var formmatedvalue = "$" + data.toFixed(2)
                            return formmatedvalue;
                        }
                    }
                ],
                "paging": false,
                "bLengthChange": false,
                "iDisplayLength": 15,
                "dom": '<"pull-left"f><"pull-right"l>tip'
            });
        }
    });

    $("#UserTeam").css('visibility', 'visible')
}

$(document).ready(function (){
    GetPlayers();

    $.ajax({
        url: "https://ballstatsapi.azurewebsites.net/api/Userteams/",
        dataType: "JSON",
        async: false,
        crossDomain: true,
        success: function (teamdata){
            Userteams = teamdata;
        }
    });

    var ele = document.getElementById('TeamPick');
    for (var i = 0; i < Userteams.length; i++) {
        ele.innerHTML = ele.innerHTML +
        '<option value="' + Userteams[i]['ID'] + '">' + Userteams[i]['TeamName'] +  '</option>';
    }       
});