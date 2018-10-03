var streams = [
    "geekandsundry",
    "pennyarcade",
    "criticalrole",
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];
  
  function getStreams() {
    streams.forEach(function(name) {
      var url =
        "https://wind-bow.gomix.me/twitch-api/channels/" + name + "?callback=?";
      $.getJSON(url, function(offlineData) {
        //console.log(offlineData);
        addStream(offlineData);
        getOnline(offlineData);
      });
    });
  }
  
  function addStream(data) {
    $("#streamRow").append(
      '<div id="' + data._id + '" class="row channel-container offline"><div class="col-sm-12"><div class="row channel-title"><div class="col-sm-12 channel-title"><h3 class="text-center"><strong>' +
        data.display_name +
        '</strong></h3"></div></div><div class="row channels-row"><div class="col-sm-2 align-self-center"><img src="' +
        data.logo +
        '" class="thumbnail-logo img-fluid" alt="' +
        data.name +
        '"logo"></div><div class="col-sm-8 channel-col align-self-center" id="' + data._id + 'details"><h5>' +
        data.status +
        '</h5></div><div class="col-sm-2 align-self-center"><a id="' + data._id + 'status" class="btn ui-btn status-btn ui-btn-inactive" href="' + data.url + '" target="_blank">Offline</btn></div></div></div></div>'
    );
  }
  
  function getOnline(data)
  {
    var url =
        "https://wind-bow.gomix.me/twitch-api/streams/" + data.name + "?callback=?";
    $.getJSON(url, function(json) {
      if (json.stream != null)
      {
        var statusButton = document.getElementById(json.stream.channel._id+'status');
        statusButton.classList.add("ui-btn-active");
        statusButton.classList.remove("ui-btn-inactive");
        statusButton.textContent="Online";
     
        var details = document.getElementById(json.stream.channel._id+'details');
        $(details).html('<p>' + json.stream.channel.status + '</p><img src="' + json.stream.preview.medium+  '" class= "img-fluid" alt="preview"/>');
        details.classList.add("text-center");
        
        var container = document.getElementById(json.stream.channel._id);
        container.classList.remove("offline");
        container.classList.add("online");
      }
    });
  }
  
  $('#all').on("click", function() {
    setActiveButton(this.id);
    this.blur();
    setVis("channel-container");
  });
  
  $('#online').on("click", function() {
    setActiveButton(this.id);
    this.blur();
    setVis("online");
  });
  
  $('#offline').on("click", function() {
    setActiveButton(this.id);
    this.blur();
    setVis("offline");
  })
  
  $("#refresh").on("click", function() {
    var all = document.getElementById("all");
    setActiveButton(all.id);
    this.blur();
    $("#streamRow").html("");
    getStreams();
  });
  
  function setActiveButton(button){
    var navButtons = document.getElementsByClassName("btn-block");
    
    for (var i = 0; i < navButtons.length; i++)
      {
        if (navButtons[i].id == button)
          {
            navButtons[i].classList.add("ui-btn-active");
          }
        else
          {
            navButtons[i].classList.remove("ui-btn-active");
          }
      }
  }
  
  function setVis(desiredType)
  {
    var containers = document.getElementsByClassName("channel-container");
    
    for (var i = 0; i < containers.length; i++)
      {
        if (containers[i].className.includes(desiredType))
          {
           containers[i].style.display = "block"; 
          }
        else
          {
            containers[i].style.display = "none";
          }
      }
  }
  
  $(document).ready(function() {
    getStreams();
  });
  //twitch bars         #392E5C
  //twitch background   #17141F
  //twitch tiles        #201C2B
  //twitch text dark    #4F4B5B
  //twitch text light   #AFACB4
  //twitch buttons      #6441A4
  //twitch button text  #DAD8DE
  //twitch button HL    #7D5BBE
  //button HL Border    #AC96D5
  //offline button bg   #CC2936
  //online button bg    #00C44E
  