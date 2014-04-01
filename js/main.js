$(document).ready(function() {

    initSearch();
    initRead();

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

