;
(function IIFE(){
  "use strict";
  
  // ============= Variables ==============
  var quoteString = "",
      quoteAuthor = "",
      tweetableString = "";
      
  const tweetButtonLink = document.getElementById('tweet'); 
  
  // ============= Page Load ==============
  // Get a new quote on page load 
  $(document).ready(function(){
    getQuote();
    
    // setTweetHrefText();
  });
    
  // ============= Click Events ==============
  // Get a new quote on button click
  $("#generate").on("click", function(e){
    getQuote();
    
    // setTweetHrefText();
  });
  
  // ============= Functions ==============
  // Get quote from Quotes on Design API
  function getQuote(){
      var xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        // convert the Quotes on Design (QoD) response to JSON
          var QoDresponse = JSON.parse(this.responseText);
          
        // Extract the text from the preformatted content (the API put the content in an <p> elements)
          quoteString = $(QoDresponse[0].content).text();
          quoteAuthor = QoDresponse[0].title;
          
          // Eliminate any extra spaces at the end of the string
          while ( quoteString.endsWith(" ") ){
              quoteString = quoteString.slice(0, -1);
          }
          
          setTweetHrefText(); // Why does this only work within the getQuote function and not in the event listeners?
           
          // Put the quote on the page
          $('#quote').html(
              '<span id="big-quote-top" class="big-quotes">"</span><p id="quote-text">' + quoteString + 
              '<br><span class="big-quotes" id="big-quote-bottom">"</span><br> ' + "<span id='quote-author'> — " + 
              quoteAuthor + " — </span></p>"
              ); 
          }
      };
      
      // Open the url with a random number in order to get a random quote
      xhttp.open("GET", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&callback=" + Math.random(), true);
      xhttp.send();
  };
  
  // set the href link on the tweet button 
  // attach the quote's string to the twitter API link
  function setTweetHrefText(){
    // If the quote is too long, shorten it and add an elipsis.
    // Otherwise, simply assign quoteString to tweetableString
    if (quoteString.length + quoteAuthor.length + 2 > 280) {
      tweetableString = quoteString.slice(0, 279 - quoteAuthor.length - 5);
      tweetableString = `"${tweetableString}..." —${quoteAuthor}`;
    } else {
      tweetableString = `"${quoteString}" —${quoteAuthor}`;
    }
    
    // Set the href twitter link + the current quote on the tweetbutton 
    tweetButtonLink.href = `https://twitter.com/intent/tweet?text=${tweetableString}`;
  };
  
})();