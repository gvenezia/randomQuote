// IIFE for containing scope of variables
;(function(){

// Get a new quote on page load 
$(document).ready(getQuote());
  
//   Get a new quote on button click
  $(".quote-button").on("click", function(e){
      getQuote();
  });
  
  
  function getQuote(){
      var xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        // convert the response to JSON
          var response = JSON.parse(this.responseText);
          
        // Extract the text from the preformatted content (the API put the content in an <p> elements)
          var quoteString = $(response[0].content).text();
          
        // Put the quote in the 
          $('#quote').html(
              "<p id='quote-text'>" + quoteString + 
              " — " + "<span id='quote-author'>" + 
              response[0].title + "</span></p>"
              ); 
        }
      };
      
      xhttp.open("GET", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&callback=" + Math.random(), true);
      xhttp.send();
  };
  
}());