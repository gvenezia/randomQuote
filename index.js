// IIFE for containing scope of variables
;(function(){
  
var quoteString = "";
var quoteAuthor = "";

// Get a new quote on page load 
$(document).ready(function(){
  getQuote();
});
  
//   Get a new quote on button click
$("#generate").on("click", function(e){
      getQuote();
});

$("#generate").on("click", function(e){
  tweetQuote();
});
  
  
  function getQuote(){
      var xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        // convert the response to JSON
          var response = JSON.parse(this.responseText);
          
        // Extract the text from the preformatted content (the API put the content in an <p> elements)
          quoteString = $(response[0].content).text();
          quoteAuthor = response[0].title;
          
          // Put the quote on the page
          $('#quote').html(
              '<span class="comma">"</span><p id="quote-text">' + quoteString + 
              '<br><span class="comma" id="comma2">"</span><br> ' + "<span id='quote-author'> — " + 
              quoteAuthor + " — </span></p>"
              ); 
        }
      };
      
      xhttp.open("GET", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&callback=" + Math.random(), true);
      xhttp.send();
  };
  
  function tweetQuote(){
    var xhttp = new XMLHttpRequest();
      
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log("all good w/ tweetQuote()");
        }
    };
   xhttp.open("POST", "https://api.twitter.com/1.1/statuses/update.json?status=" + quoteString + " –" + quoteAuthor, true);
   xhttp.send();
  };
  
}());