$(document).ready(function() {
	var selected = $(window.location.hash);
	if (window.location.hash.indexOf("_") != -1) {
		selected.addClass("marked");
	}
	$(document.body).scrollTop(selected.offset().top);
});