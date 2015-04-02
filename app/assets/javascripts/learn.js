function parseAnswer(){
  var rawAnswer = $(".answer").text();
  $.ajax({
    method: "get",
    url: "/asciidoctor",
    data: {input: rawAnswer}
  })
  .done(function(data){
    $(".answer").html(data.parsed);
  });
}


function createNextButton(){
  $("textarea").attr("disabled", true);
  var nextButton = $("<button class='next'>Next</button>");
  $(".exercise-number").remove();
  $(".exercise h1").after("<div class='check'><i class='fa fa-check'></i></div>");
  $(".exercise").after(nextButton);
}


var parseInput = _.debounce(function(){
  var ordinality = $(".exercise").data("ordinality");
  var input = $("textarea").val();
  var preview = $(".preview");
  $.ajax({
    method: "get",
    url: "/asciidoctor",
    data: {input: input}
  })
  .done(function(data){
    preview.html(data.parsed);
    var parsedAnswer = $(".answer").html();
    var parsedInput = preview.html();
    if (parsedInput === parsedAnswer){
      createNextButton();
    }
  });
}, 150);


function createExercise(data){
  var source = $("#exercise-template").html();
  var template = Handlebars.compile(source);
  var context = {ordinality: data.ordinality, topic: data.topic, description: data.description, answer: data.answer};
  var html = template(context);
  $(".exercise-area").append(html);
  parseAnswer();
}


function updateProgressBar(option){
  var currentExerciseOrdinality = parseInt($(".exercise").data("ordinality"));
  var numberOfExercises = parseInt($(".progress-bar").data("number-of-exercises"));
  var percentageWidth = (currentExerciseOrdinality / numberOfExercises - 1 / numberOfExercises) * 100;
  if (option === "init"){
    $(".progress-bar").width(percentageWidth + "%");  
  } else {
    $(".progress-bar").animate({
      width: percentageWidth + "%"
    }, 500);
  }
}


$(document).ready(function(){
  parseAnswer();
  updateProgressBar("init");
  userRecord = {};

  $(".exercise-area").on("click", ".next", function(){
    var ordinality = $(".exercise").data("ordinality");
    $(".exercise-area").empty();
    $.ajax({
      method: "get",
      url: "/next-exercise",
      data: {input: ordinality}
    })
    .done(function(data){
      // http://stackoverflow.com/questions/824349/modify-the-url-without-reloading-the-page
      // history.pushState(data, "title", "/asdf");
      //
      //
      // need to add this when page loads! this should be added for the one before, not the current one
      // only one thing is getting pushed to history, not a sequence of things.
      history.pushState({data: data}, "", "/" + data.ordinality.toString());
      createExercise(data);
      updateProgressBar();
    });
  });

  window.onpopstate = function(e){
    if (e.state){
      console.log(e);
      console.log(e.state);
      console.log(e.state.data);

      // createExercise(e.state);
      // updateProgressBar();
    }
  };

  $(".exercise-area").on("keyup", "textarea", parseInput);
});
