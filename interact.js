
$(document).ready(function(){

    var streamers  = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                      "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var streamerList = {};


    function getStreamData(streamerFilter) {

        var streamerCount = 0;
        var n, i;
        var filterS = streamerFilter;

        var offlineIcon = "<i class='material-icons' style = 'font-size:40px'>" +
        "videocam_off</i>";

        for (n in streamers) {

            streamerList[streamers[n]] = [offlineIcon, streamers[n], "Offline"];

            $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/"
                + streamers[n]+"?callback=?", function(data) {

                  streamerCount++;

                    if (data.stream != null) {

                        var logoLink = "<img src= " + data["stream"].preview["small"] +
                                        "alt='logo'></img>";
                        var streamerName = data["stream"].channel["display_name"];

                        streamerList[streamerName] = [logoLink, streamerName, "Online"];
                    }

                    if (streamerCount == 8) {
                        addElements(filterS);
                    }
                }
            );
        }

    }

    function addElements(streamerFilter) //add elements depending on button pressed
    {
        console.log(streamerFilter);
        for (i in streamerList) { //iterates thru object returning each key as i

            if (streamerFilter === "all") {
                    $(".flex-container").append(createOnlineStreamerElement
                                (streamerList[i][0], streamerList[i][1],
                                 streamerList[i][2]));
            }
            else if (streamerFilter === "online") {
                if (streamerList[i][2] === "Online") {
                    $(".flex-container").append(createOnlineStreamerElement
                                (streamerList[i][0], streamerList[i][1],
                                 streamerList[i][2]));
                }
            }
            else if (streamerFilter === "offline") {
                if (streamerList[i][2] === "Offline") {
                    $(".flex-container").append(createOnlineStreamerElement
                                (streamerList[i][0], streamerList[i][1],
                                 streamerList[i][2]));
                }

            }
        }
    }

    function clearElements() {
        $(".flex-container").empty();
        streamerList = {};
    }

    //clears streamer list and gets all offline and online streamers
    function getAllStreamers() {
        clearElements();
        getStreamData("all");
    }

    //clears streamer list and gets all online streamers
    function getOnlineStreamers() {
        clearElements();
        getStreamData("online");
    }

    //clears streamer list and gets all offline streamers
    function getOfflineStreamers() {
        clearElements();
        getStreamData("offline");
    }

    //creates HTML for each streamer
    function createOnlineStreamerElement(logo, name, info) {

        var newElement =
        "<a class ='flex-item' href= https://www.twitch.tv/" + name + ">" +
        //"<div class ='flex-item'>" +

            "<div id='logo'>" +
                 logo +
            "</div>" +
            "<div id = 'streamerName'>" +
                "<h2>" + name + "</h2>" +
            "</div>" +
            "<div id = 'streamerInfo'>" +
                "<h2>" + info + "</h2>" +
            "</div>" +

       // "</div>";
        "</a>";
        return newElement;
    }

    $("#all").click(getAllStreamers);
    $("#online").click(getOnlineStreamers);
    $("#offline").click(getOfflineStreamers);

    //console.log("running script");
    getStreamData("all");
});
