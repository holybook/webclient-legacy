/**
 * Elastic search
 */
var es = {

    host: function (path) {
        return "http://" + window.location.hostname + ":" + window.location.port + "/es" + path;
    },

    client: new $.es.Client({
        hosts: "http://" + window.location.hostname + ":" + window.location.port + "/es"
    }),

    search: function (query, offset, count) {
        return $.ajax({
            url: this.host("/_public/search"),
            contentType: "application/json",
            dataType: "json",
            data: {
                q: query,
                from: offset,
                size: count
            },
            method: "GET"
        }).then(function (data) {
            var found = data.hits.total;
            var time = data.took / 1000.0;
            var docs = [];
            for (i in data.hits.hits) {
                var fields = data.hits.hits[i].fields;
                var doc = {};
                for (k in fields) {
                    doc[k] = fields[k][0];
                }
                doc.body = data.hits.hits[i].highlight.text[0];
                docs.push(doc);
            }
            return [ found, time, docs ];
        }, function (err) {
            return err;
        });
    },

    toc: function () {
        return $.ajax({
            url: this.host("/_public/books/en"),
            contentType: "application/json",
            method: "GET"
        });
    },

    book: function (language, religion, author, title, onProgress) {
        return $.ajax({
            url: this.host(sprintf("/_public/book/%s/%s/%s/%s", language, religion, author, title)),
            contentType: "application/json",
            method: "GET",
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                //Download progress
                if (typeof(onProgress) != "undefined") {
                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            //Do something with download progress
                            onProgress(percentComplete);
                        }
                    }, false);
                }
                return xhr;
            },
        });
    }

};

/**
 * solr
 */
var solr = {

    host: function (path) {
        return "http://" + window.location.hostname + ":" + window.location.port + "/solr/books_en" + path;
    },

    search: function (query, offset, count) {
        return $.ajax({
            url: this.host("/select"),
            contentType: "application/json",
            dataType: "json",
            data: {
                q: query,
                start: offset,
                rows: count,
                wt: "json",
                debug: "timing",
                hl: true
            },
            method: "GET"
        }).then(function (data) {
            var found = data.response.numFound;
            var time = data.debug.timing.time / 1000.0;
            var docs = [];
            for (i in data.response.docs) {
                var doc = data.response.docs[i];
                doc.body = data.highlighting[doc.id].text;
                docs.push(doc);
            }
            return [ found, time, docs ];
        }, function (err) {
            return err;
        });
    }

};