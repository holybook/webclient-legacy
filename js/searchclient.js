/**
 * Elastic search
 */
var es = {

    client : new $.es.Client({
        hosts : "http://" + window.location.hostname + ":" + window.location.port + "/es"
    }),

    search : function(query, offset, count) {
        return this.client.search({
            index : "books",
            type : "en",
            body : {
                from : offset,
                size : count,
                fields : [ "text", "author", "title", "section_title" ],
                query : {
                    query_string : {
                        default_field : "text",
                        query : query
                    }
                }
            }
        }).then(function(data) {
            var found = data.hits.total;
            var time = data.took / 1000.0;
            var docs = [];
            for (i in data.hits.hits) {
                var fields = data.hits.hits[i].fields;
                var doc = {};
                for (k in fields) {
                    doc[k] = fields[k][0];
                }
                doc.body = doc.text;
                docs.push(doc);
            }
            return [ found, time, docs ];
        }, function(err) {
            return err;
        });
    }

};

/**
 * solr
 */
var solr = {

    host : function(path) {
        return "http://" + window.location.hostname + ":" + window.location.port + "/solr/books_en" + path;
    },

    search : function(query, offset, count) {
        return $.ajax({
            url : this.host("/select"),
            contentType : "application/json",
            dataType : "json",
            data : {
                q : query,
                start : offset,
                rows : count,
                wt : "json",
                debug : "timing",
                hl : true
            },
            method : "GET"
        }).then(function(data) {
            var found = data.response.numFound;
            var time = data.debug.timing.time / 1000.0;
            var docs = [];
            for (i in data.response.docs) {
                var doc = data.response.docs[i];
                doc.body = data.highlighting[doc.id].text;
                docs.push(doc);
            }
            return [ found, time, docs ];
        }, function(err) {
            return err;
        });
    }

};