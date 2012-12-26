function jsonFlickrApi(response) {
 	if (response.stat != "ok"){
		return;
 	}

	window.onload = function(){
		var showcase = document.getElementById('showcase');
		var photosContainer = document.getElementById("photos");
		var photosList = document.createElement("ul");
		for (var i=0; i < response.photos.photo.length; i++) {
			var photo = response.photos.photo[i];

			var output = document.createElement("li");
			var img = document.createElement("img");
			img.src = pictureThumb(photo);
			var link = document.createElement("a");
			link.href = linkURL(photo);
			link.setAttribute('data-medium', pictureMedium(photo));

			// Attach event listener to link
			link.addEventListener('click', function(e) {
				if (e.button == 0) {
					var img = document.createElement('img');
					img.src = this.getAttribute('data-medium');
					var link = document.createElement('a');
					link.href = this.href;
					link.appendChild(img);

					showcase.innerHTML = "";
					showcase.appendChild(link);
					showcase.className = "show";
					e.preventDefault();
				}
			}, false);

			link.appendChild(img);
		 	output.appendChild(link);
			photosList.appendChild(output);
		}
		photosContainer.appendChild(photosList);

		var firstPhoto = response.photos.photo[0];
		var showcase = document.getElementById('showcase');
		var link = document.createElement('a');
		link.href = linkURL(firstPhoto);
		var img = document.createElement('img');
		img.src = pictureMedium(firstPhoto);
		link.appendChild(img);
		showcase.appendChild(link);

		showcase.addEventListener('click', function(e) {
			showcase.className = "";
			e.preventDefault();
		});
	}

	// Utility-Functions: Generieren von Flickr-URLs
	// Dokumentation siehe http://www.flickr.com/services/api/misc.urls.html

	// Die URL des Fotos (Thumbnail):	
	function pictureThumb(photo) {
	 	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	 	photo.id + "_" + photo.secret + "_" + "s.jpg";
	}

	// Die URL des Fotos (Mittel):	
	function pictureMedium(photo) {
	 	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	 	photo.id + "_" + photo.secret + "_" + "z.jpg";				
	}

	// Die URL des Fotos (Groß):		
	function pictureLarge(photo) {
	 	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	 	photo.id + "_" + photo.secret + "_" + "b.jpg";				
	}
	
	// Die URL zur entsprechenden Seite bei Flickr:
	function linkURL(photo) {	
	 	return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
	}
}
