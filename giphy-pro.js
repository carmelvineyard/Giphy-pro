$(document).ready(function() {

//global var, an array:
	var topics = ["yarn", "embroidery", "knitting", "crochet", "speedpaint", "cross stitch", "disney"];
//creating the buttons:
	function renderButtons() {
		$("#button-bank").empty();
		for (var i = 0; i < topics.length; i++) {
			var b = $("<button>");
			b.addClass("topic");
			b.addClass("btn-lg");
			b.attr("data-name", topics[i]);
			b.text(topics[i]);
			$("#button-bank").append(b);
		}
	} //renderButtons close

	$("#button-bank").on("click", ".topic", function() {
		$("#image-bank").empty();
		var query = $(this).attr("data-name");
		console.log(query);
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        query + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response) {
        	console.log(response);
        	var results = response.data; 
        	console.log(results);

        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $("<div class='image'>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating);
        		
        		var topicImage = $("<img>");
        		topicImage.attr("src", results[i].images.fixed_height.url);
        		topicImage.attr("data-state", "animate");
        		topicImage.addClass("gif");
        		topicImage.attr("data-animate", results[i].images.fixed_height.url)
        		topicImage.attr("data-still", results[i].images.fixed_height_still.url)

        		gifDiv.append(p);
        		gifDiv.append(topicImage);

        		$("#image-bank").append(gifDiv);
        	}

         }); // done function close
	}); //on click close

	//Adding a button via the form:
	$("#add-butt").on("click", function(event) {
		event.preventDefault();
		var newT = $("#new-butt").val().trim();
		if (newT === "") {
			alert("Please enter a search term");
		} else {
			topics.push(newT);
			renderButtons();
			$("#new-butt").val("");
		} 
	});// add-butt on click close

	//Before I forget, the pausing feature:
	$("#image-bank").on("click", ".gif", function() {
		console.log(this);
		var state = $(this).attr("data-state");
		console.log(state);
		//console.log(results[i]);
		if (state === "still") {
			$(this).attr("data-state", "animate");
			$(this).attr("src", $(this).attr("data-animate"));
		} else {
			$(this).attr("data-state", "still");
			$(this).attr("src", $(this).attr("data-still"));
		}
	}); //gif onclick close

	
	renderButtons();










});//document.ready close

