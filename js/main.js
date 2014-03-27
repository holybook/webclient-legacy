var noResultBox = $('.alert#no-result');
var errorBox = $('.alert#error');
var loader = $("#loading");
var content = $('#content');

var limit = 10;
var offset = 0;
var pages = 10;

var currentPage = 1;
var Manager;

var client = es;

$(document).ready(function() {

    $('form').submit(function(event) {
        event.preventDefault();
        currentPage = 1;
        search();
    });

    // var suggestions = new Bloodhound({
    // datumTokenizer : function(data) {
    // console.log("datumTokenizer: ");
    // console.log(data);
    // return data;
    // },
    // queryTokenizer : function(query) {
    // console.log("queryTokenizer: ");
    // console.log(query);
    // return query;
    // },
    // // prefetch: '../data/films/post_1960.json',
    // remote : {
    // url : host("/suggest?wt=json&q=%QUERY"),
    // ajax : {
    // contentType : "application/json",
    // dataType : "json",
    // method : "GET"
    // },
    // filter : function(response) {
    // var sug = response.spellcheck.suggestions;
    // var result = [];
    // for (i in response.spellcheck.suggestions) {
    // if (sug[i] == "collation") {
    // result.push(sug[i + 1]);
    // }
    // }
    // return result;
    // }
    // }
    // });
    //
    // suggestions.initialize();
    //
    // $('#search-box').typeahead(null, {
    // name : 'suggestions',
    // displayKey : function(suggestion) {
    // console.log("DisplayKey: ");
    // console.log(suggestion);
    // return "string";
    // },
    // source : suggestions.ttAdapter()
    // });
});

function search() {
    var offset = limit * (currentPage - 1);
    var query = $('#search-box').val();
    noResultBox.hide();
    errorBox.hide();
    loader.fadeIn(100);
    client.search(query, offset, limit).then(function(data) {
        handleSearchResult.apply(this, data);
    }, function(err) {
        loader.hide(200);
        errorBox.text(err.message);
        errorBox.show();
    });
}

function handleSearchResult(found, time, data) {
    loader.fadeOut(100);
    content.html("");
    if (found == 0)
        noResultBox.show();
    fillPerformanceLabel(found, time);
    fillPagination(found);
    fillSearchResults(data);
}

function searchPage() {
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

function fillSearchResults(data) {
    for (i in data) {
        var doc = data[i];
        appendSearchResult($('#content'), doc);
    }
}

function appendSearchResult(container, doc) {
    var link = $("<a/>", {
        class : "search-result"
    }).append(
            $("<div/>").append($('<p/>').html(doc.body)).append(
                    $('<p/>').append($('<small/>').append(doc.author).append(" - ").append(doc.title).append(" - ").append(doc.section_title))));
    link.click(function() {
        // TODO: Reader
    });
    container.append(link).append('<br/>');
}