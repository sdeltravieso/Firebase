
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJJd6t71T0yBNnNRAtbtPjubIpugdv2ok",
    authDomain: "train-scheduler-2e048.firebaseapp.com",
    databaseURL: "https://train-scheduler-2e048.firebaseio.com",
    projectId: "train-scheduler-2e048",
    storageBucket: "train-scheduler-2e048.appspot.com",
    messagingSenderId: "866162587233"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

  // button to add trains
  $('#add-train-btn').on('click', function(event) {
    // event.preventDefault();

    // get the input from the user
    var trainName = $('#trainNameInput').val().trim();
    var trainDestination = $('#destinationInput').val().trim();
    var firstTrain = $('#firstTrainInput').val().trim();
    var trainFrequency = $('#frequencyInput').val().trim();

    // temporary object to hold train data
    var newTrain = {
      train: trainName,
      destination: trainDestination,
      start: firstTrain,
      frequency: trainFrequency
    };

    // upload train data to the database
    database.ref().push(newTrain);

    // console.log(newTrain.train);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrain);
    // console.log(newTrain.frequency);

    // alert in console that train was added
    console.log("Successfully added train");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
  });

  database.ref().on('child_added', function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
    
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);
    
    // var firstTrainConverted = moment(firstTrain, "HH:mm");
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);
    
    // Current Time
		var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the times
		var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
		var trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);
    
    // Minute Until Train
		var minutesTillTrain = trainFrequency - trainRemainder;
		console.log("MINUTES TILL TRAIN: " + minutesTillTrain);
    
    // Next Train
		var nextTrain = moment().add(minutesTillTrain, "minutes").format("LT");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + 
    trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</tr>");

  });