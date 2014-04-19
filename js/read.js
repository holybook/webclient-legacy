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
            {{ var id = base64.encode(it.book.title, true); }} \
            <div class="panel-group section-menu" id="{{=id}}_menu_header"> \
                <div class="panel panel-default"> \
                <div class="panel-heading">       \
                    <h4 class="panel-title">    \
                        <a data-toggle="collapse" data-parent="#{{=id}}_menu_header" href="#{{=id}}_menu_content" id="#{{=id}}_menu_link"></a> \
                    </h4> \
                </div> \
                <div id="{{=id}}_menu_content" class="panel-collapse collapse"> \
                    <div class="panel-body"> \
                        <ul class="nav"> \
                        {{~it.book.sections :s:si}} \
                            <li><a href="#{{= base64.encode(s.title, true) }}" data-toggle="tab">{{=(si+1)}}. {{= s.title }}</a></li>\
                        {{~}} \
                        </ul> \
                    </div> \
                </div> \
            </div> \
            </div> \
            <div class="tab-content" id="book-tabs"> \
                {{~it.book.sections :s:si}}   \
                    {{ var sid = base64.encode(s.title, true); }} \
                    <div class="tab-pane" id="{{=sid}}">                           \
                        <h3>{{=s.title}}</h3>       \
                        {{~s.text :t:i}}            \
                          <p id="{{=sid}}_{{=i}}">{{=t}}</p>               \
                        {{~}}                       \
                    </div>                          \
                {{~}}\
            </div>');

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
                readOnly: true,
                width: 40
            });

            client.book("en", selection.religion, selection.author, selection.book, function (percent) {
                $(".dial").val(percent * 100).trigger('change');
            }).then(function (data) {
                var bookId = "#" + base64.encode(data.book.title, true);
                var $book = $(bookId);
                $book.html(renderBook(data));
                $book.find(bookId + "_menu_content a").on('shown.bs.tab', function (e) {
                    console.log(e.target);
                    $book.find(".panel-title a").text(e.target.innerText);
                    $book.find(bookId + "_menu_content").collapse('hide');
                });
                $book.find("li:nth-child(1) a").tab('show');
            });

            $a.tab('show');
        });
    });
}

