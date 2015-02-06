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
      $.ajax({
        method: "post",
        url: "/records/create",
        data: {ordinality: ordinality}
      }).done(function(){
        createNextButton();
      }).fail(function(){
        createNextButton();
      });
    }
  });
}, 300);


function createNextExercise(data){
  var container = $("<div class='exercise' data-ordinality=" + data.ordinality + "></div>");
  
  var header = $("<header></header>");
  header.append("<h1>" + data.topic + "</h1>");
  header.append("<div style='clear: both'></div>");
  header.append("<p>" + data.description + "</p>");
  container.append(header);

  var parsed = $("<div class='parsed'></div>");
  parsed.append("<div class='answer'>" + data.answer + "</div>");
  parsed.append("<div class='preview'></div>");
  parsed.append("<div style='clear: both; border-bottom: 1px solid #efefef;'></div>");
  container.append(parsed);

  container.append("<div class='input'><textarea placeholder='Type AsciiDoc here...'></textarea></div>");

  $(".exercise-area").append(container);
  parseAnswer();
}

function updateProgressBar(option){
  var currentExercise = parseInt($(".exercise").data("ordinality"));
  var numberOfExercises = parseInt($(".progress-bar").data("number-of-exercises"));
  var percentageWidth = currentExercise / numberOfExercises * 100;
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
      createNextExercise(data);
      updateProgressBar();
    });
  });

  $(".exercise-area").on("keyup", "textarea", parseInput);
});
