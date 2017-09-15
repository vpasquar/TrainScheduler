$(document).ready(function() {
 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxwf-9gmHR9Np4mBLXMqEFVj2DxjxIVxk",
    authDomain: "train-db-d9966.firebaseapp.com",
    databaseURL: "https://train-db-d9966.firebaseio.com",
    projectId: "train-db-d9966",
    storageBucket: "",
    messagingSenderId: "864222130721"
  };

  firebase.initializeApp(config);


    var database = firebase.database();

    var train = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";
  

    $("#submit").on('click', function(e) {
        e.preventDefault();
        train       =        $("#input-train").val().trim();
        destination =        $("#input-dest").val().trim();
        firstTrain  = moment($("#input-firstTrain").val().trim(), "HH:mm").format("X");
        frequency   =        $("#input-freq").val().trim()
           
       

        var newTrain = {
          trainName: train,
          trainDest: destination,
          trainFirstTrain:firstTrain,
          trainFreq:frequency  
        };




        database.ref().push(newTrain);

        $("#input-train").val("");
        $("#input-dest").val("");
        $("#input-firstTrain").val("");
        $("#input-freq").val("");



    });

    database.ref().orderByChild("name").on("child_added", function(childSnapshot){

        console.log(childSnapshot.val());

        var trainName       = childSnapshot.val().trainName;
        var trainDest       = childSnapshot.val().trainDest;
        var trainFirstTrain = childSnapshot.val().trainFirstTrain;
        var trainFreq       = childSnapshot.val().trainFreq;
            console.log(trainFirstTrain);
        var formatFirstTrain = moment.unix(trainFirstTrain).format("hh:mm");    
        var firstTrainConvert = moment(formatFirstTrain,"hh:mm").subtract(1,"years")
        var firstTrainConvert2 = moment(firstTrainConvert).format("hh:mm");
            console.log("converted first train time" + firstTrainConvert + firstTrainConvert2);
        var currentTime = moment();
            console.log("current time" +currentTime);
        var diffTime = moment().diff(moment(firstTrainConvert),"minutes");
            console.log(diffTime);
        var tRemainder = diffTime % trainFreq;   
            console.log(tRemainder);
        var nextMinutes = trainFreq - tRemainder;   
            console.log(nextMinutes); 
        var nextTrainTime = moment().add(nextMinutes,"minutes");
            console.log(nextTrainTime);
        var nextTrainTime2 = moment(nextTrainTime).format("hh:mm");    

      

        $("#t-body").append("<tr>" + 
            "<td id='t-train'>"        + trainName      + "</td>" +
            "<td id='t-dest'>"         + trainDest      + "</td>" + 
            "<td id='t-freq'>"         + trainFreq      + "</td>" + 
            "<td id='t-next-arvl'>"    + nextTrainTime2  + "</td>" + 
            "<td id='t-mins-away'>"    + nextMinutes    + "</td></tr>"); 

    }, function(err){
        console.log("hurr durr dis da errur" + err);
    });

    

});