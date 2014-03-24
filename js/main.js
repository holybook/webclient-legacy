var noResultBox = $('.alert#no-result');
var errorBox = $('.alert#error');
var loader = $("#loading");
var content = $('#content');

var limit = 10;
var offset = 0;
var pages = 10;

var currentPage = 1;
var Manager;

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
        currentPage = 1;
        search();
        event.preventDefault();
    });
});

function search() {
    var query = $('#search-box').val();
    noResultBox.hide();
    errorBox.hide();
    loader.fadeIn(100);
    $.ajax({
        url : "http://" + window.location.hostname + ":8983/solr/books_en/select",
        contentType : "application/json",
        dataType : "jsonp",
        jsonp : "json.wrf",
        data : {
            q : query,
            start : offset,
            rows : limit,
            wt : "json",
            debug : "timing"
        },
        method : "GET",
        success : handleSearchResult,
        error : function(jqXHR, textStatus, errorThrown) {
            loader.hide(200);
            errorBox.text(errorThrown);
            errorBox.show();
        },
        contentType : "application/json; charset=UTF-8"
    });
}

function handleSearchResult(data) {
    loader.fadeOut(100);
    if (data.responseHeader.status != 0) {
        errorBox.text(data.responseHeader.status);
        errorBox.show();
    } else {
        var found = data.response.numFound;
        var time = data.debug.timing.time / 1000.0;

        content.html("");
        if (found == 0)
            noResultBox.show();
        fillPerformanceLabel(found, time);
        fillPagination(found);
        fillSearchResults(data.response.docs);
    }
}

function searchPage() {
    offset = limit * (currentPage - 1);
    search();
}

function fillPagination(numberFound) {
    var count = Math.ceil(numberFound / limit);
    var container = $(".pagination");
    container.empty();
    var lower = Math.max(currentPage - pages / 2, 1);
    var higher = Math.min(lower + 9, count);
    if (higher - lower < 9) {
        lower = Math.max(higher - 9, 1);
    }

    var prev = (currentPage == 1) ? $("<li/>", {
        class : "disabled"
    }) : $("<li/>");
    var prevLink = $("<a/>").html("&laquo;");
    if (currentPage > 1) {
        prevLink.click(function() {
            currentPage--;
            searchPage();
        });
    }

    var next = (currentPage == count) ? $("<li/>", {
        class : "disabled"
    }) : $("<li/>");
    var nextLink = $("<a/>").html("&raquo;");
    if (currentPage != count) {
        nextLink.click(function() {
            currentPage++;
            searchPage();
        });
    }

    container.append(prev.append(prevLink));
    for ( var i = lower; i <= higher; ++i) {
        var link = $("<a/>").text(i);
        link.click(function() {
            currentPage = parseInt($(this).text());
            searchPage();
        });
        if (i == currentPage) {
            container.append($("<li/>", {
                class : "active"
            }).append(link));
        } else {
            container.append($("<li/>").append(link));
        }
    }
    container.append(next.append(nextLink));
}

function fillPerformanceLabel(numberFound, time) {
    text = $(".performance-label small");
    var resultsString = (numberFound == 1) ? "result" : "results";
    text.text(sprintf("%d %s (%.2f seconds)", numberFound, resultsString, time));
}

function fillSearchResults(results) {
    for (i in results) {
        var doc = results[i];
        appendSearchResult($('#content'), doc);
    }
}

function appendSearchResult(container, doc) {
    var link = $("<a/>", {
        class : "search-result"
    }).append(
            $("<div/>").append($('<p/>').html(doc["text"])).append(
                    $('<p/>').append($('<small/>').append(doc["author"]).append(" - ").append(doc["title"]).append(" - ").append(doc["section_title"]))));
    link.click(function() {
        $.ajax({
            url : "http://" + window.location.hostname + ":8983/solr/books_en/select",
            contentType : "application/json",
            dataType : "jsonp",
            jsonp : "json.wrf",
            data : {
                q : sprintf('title:"%s"', doc.title),
                start : 0,
                rows : 10,
                wt : "json",
                debug : "timing",
                sort : "section_index asc, index asc",
                fl : "text"
            },
            method : "GET",
            success : function(data) {
                console.log(data);
                // TODO: implement reader
            },
            error : function(jqXHR, textStatus, errorThrown) {
                loader.hide(200);
                errorBox.text(errorThrown);
                errorBox.show();
            },
            contentType : "application/json; charset=UTF-8"
        });
    });
    container.append(link).append('<br/>');
}