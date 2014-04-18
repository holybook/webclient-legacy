function initRead() {

    var renderObjects = doT.template(
        '{{ for (var e in it) { }} \
             <li><a>{{=e}}</a></li> \
         {{ } }}');

    var renderTabHeader = doT.template(
        '<a href="#{{=it.encoded}}" data-toggle="tab">{{=it.name}}</a>'
    );

    var renderTab = doT.template(
        '<div class="tab-pane" id="{{=it.encoded}}"> \
            <div class="row" id="loading-book"> \
                <div class="loader"> \
                    <input type="text" class="dial" data-min="0" data-max="100"> \
                </div> \
            </div> \
         </div>'
    );

    var renderBook = doT.template('\
            {{~it.book.sections :s:si}}        \
                <div>                           \
                    <h3>{{=s.title}}</h3>       \
                    {{~s.text :t:i}}            \
                      <p>{{=t}}</p>               \
                    {{~}}                       \
                </div>                          \
            {{~}}');

    client.toc().then(function (data) {
        var $religions = $("#religion");
        var $authors = $("#author");
        var $books = $("#book");

        var selection = {};
        var next = {
            "religion": $authors,
            "author": $books
        };

        function fill($div, obj) {
            $div.html(renderObjects(obj));
            var $firstChild = $div.find("li:nth-child(1) a");

            $div.find("a").click(function () {
                select($div, $(this), obj);
            });

            select($div, $firstChild, obj);
        }

        function select($div, $a, objects) {
            var id = $div.attr("id");
            var obj = objects[$a.text()];
            selection[id] = $a.text();
            // set active:
            $div.find(".active").removeClass("active");
            $a.parent().addClass("active");

            var $next = next[id];
            if (typeof($next) != 'undefined') {
                fill($next, obj);
            }
        }

        fill($("#religion"), data);

        $("#open-book").click(function () {
            var $tabHeader = $("<li/>");
            var sel = {
                name: selection.book,
                encoded: base64.encode(selection.book, true)
            };
            $tabHeader.html(renderTabHeader(sel)).insertBefore($("#add-tab"));
            var $a = $tabHeader.children().first();
            $("#book-tabs").append(renderTab(sel));
            $('#dialog-browse').modal('hide');
            $(".dial").knob({
                readOnly : true,
                width : 40
            });

            client.book("en", selection.religion, selection.author, selection.book, function(percent) {
                $(".dial").val(percent*100).trigger('change');
            }).then(function(data) {
                $("#" + base64.encode(data.book.title, true)).html(renderBook(data));
            });

            $a.tab('show');
        });
    });
}

