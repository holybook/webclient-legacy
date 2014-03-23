var noResultBox = $('.alert#no-result');
var errorBox = $('.alert#error');
var loader = $("#loading")
var content = $('#content')

var limit = 10;
var offset = 0;
var pages = 10;

var currentPage = 1;

$(document).ready(function() {
	// Add configuration for one or more providers.

	$("#filter").mmenu({
		counters : {
			add : true,
			update : true
		},
		slidingSubmenus : true,
		onClick : {
			setSelected : false,
			close : false
		}
	});

	$('form').submit(function(event) {
		currentPage = 1
		search()
		event.preventDefault()
	})
});

function search() {
	var query = $('#search-box').val()
	noResultBox.hide()
	errorBox.hide()
	loader.fadeIn(400)
	content.fadeOut(250)
	$.ajax({
		url : "/book/search/google",
		method : "POST",
		data : JSON.stringify({
			query : query,
			limit : limit,
			offset : offset
		}),
		success : handleSearchResult,
		error : function(jqXHR, textStatus, errorThrown) {
			loader.hide(200)
			errorBox.text(errorThrown)
			errorBox.show()
		},
		dataType : "json",
		contentType : "application/json; charset=UTF-8"
	})
}

function handleSearchResult(data) {
	loader.fadeOut(400)
	content.html("")
	if (data.results.length == 0)
		noResultBox.show()
	fillPerformanceLabel(data.found, data.time, data.is_approximate)
	fillPagination(data.found, data.is_approximate)
	fillSearchResults(data.results);
	content.fadeIn(250)
}

function searchPage() {
	offset = limit * (currentPage - 1)
	search()
}

function fillPagination(numberFound, isApproximate) {
	var count = Math.ceil(numberFound / limit)
	var container = $(".pagination")
	container.empty()
	var lower = Math.max(currentPage - pages / 2, 1)
	var higher = Math.min(lower + 9, count)
	if (higher - lower < 9) {
		lower = Math.max(higher - 9, 1)
	}

	var prev = (currentPage == 1) ? $("<li/>", {
		class : "disabled"
	}) : $("<li/>")
	var prevLink = $("<a/>").html("&laquo;")
	if (currentPage > 1) {
		prevLink.click(function() {
			currentPage--;
			searchPage()
		})
	}

	var next = (currentPage == count) ? $("<li/>", {
		class : "disabled"
	}) : $("<li/>")
	var nextLink = $("<a/>").html("&raquo;")
	if (currentPage != count) {
		nextLink.click(function() {
			currentPage++;
			searchPage()
		})
	}

	container.append(prev.append(prevLink))
	for (i = lower; i <= higher; ++i) {
		var link = $("<a/>").text(i)
		link.click(function() {
			currentPage = parseInt($(this).text())
			searchPage()
		})
		if (i == currentPage) {
			container.append($("<li/>", {
				class : "active"
			}).append(link))
		} else {
			container.append($("<li/>").append(link))
		}
	}
	container.append(next.append(nextLink))
}

function fillPerformanceLabel(numberFound, time, isApproximate) {
	text = $(".performance-label small")
	var resultsString = (numberFound == 1) ? "result" : "results";
	if (isApproximate) {
		text.text(sprintf("About %d %s (%.2f seconds)", numberFound,
				resultsString, time))
	} else {
		text.text(sprintf("%d %s (%.2f seconds)", numberFound, resultsString,
				time))
	}
}

function fillSearchResults(results) {
	for (i in results) {
		var doc = results[i]
		appendSearchResult($('#content'), doc)
	}
}

function appendSearchResult(container, doc) {
	container
			.append(
					$("<a/>", {
						href : doc["link"],
						target : "_blank",
						class : "search-result"
					})
							.append(
									$("<div/>")
											.append($('<p/>').html(doc["text"]))
											.append(
													$('<p/>')
															.append(
																	$(
																			'<small/>')
																			.append(
																					doc["author"])
																			.append(
																					" - ")
																			.append(
																					doc["title"])
																			.append(
																					" - ")
																			.append(
																					doc["section_title"])))))
			.append('<br/>')
}