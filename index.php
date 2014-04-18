<!doctype html>
<html dir="ltr" lang="en">
<head>
<meta charset="utf-8" />
<title>Holybook</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-capable" content="yes" />

<link rel="shortcut icon" href="favicon.ico" />
<link rel="apple-touch-icon" href="favicon.png" />

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
<link href="/lib/bootstrap-3.0.3/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link type="text/css" rel="stylesheet" media="all" href="/lib/mmenu/css/jquery.mmenu.css" />
<link rel="stylesheet" href="/lib/alertify-0.3.11/css/alertify.core.css" />
<link rel="stylesheet" href="/lib/alertify-0.3.11/css/alertify.default.css" />
<link rel="stylesheet" href="/lib/plupload-2.1.0/js/jquery.plupload.queue/css/jquery.plupload.queue.css" />
<link rel="stylesheet" href="/lib/bower_components/bootstrap-select/bootstrap-select.css" />
<link href="/css/main.css" rel="stylesheet" media="screen">
</head>
<body>
	<nav class="navbar navbar-default" role="navigation">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Holybook</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="active"><a href="#search" data-toggle="tab">Search</a></li>
				<li><a href="#read" data-toggle="tab">Read</a></li>
				<li><a href="#roadmap" data-toggle="tab">Roadmap</a></li>
			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</nav>

	<div id="body">
		<div class="container">
			<div class="tab-content">
				<div class="tab-pane active" id="search">
			  		<?php include 'search.htm'; ?>
			  	</div>
			  	<div class="tab-pane" id="read">
			  		<?php include 'read.htm'; ?>
			  	</div>
				<div class="tab-pane" id="roadmap">
			  		<?php include 'roadmap.htm'; ?>
			  	</div>
			</div>
		</div>
	</div>
	</div>
	<script src="/lib/bower_components/jquery/jquery.js"></script>
	<script src="/lib/bower_components/jquery-option-tree/jquery-option-tree.js"></script>
	<script src="/lib/bower_components/doT/doT.js"></script>
	<script src="/lib/bower_components/elasticsearch/elasticsearch.jquery.js"></script>
	<script src="/lib/bootstrap-3.0.3/js/bootstrap.min.js"></script>
	<script src="/lib/bower_components/bootstrap-select/bootstrap-select.js"></script>
	<script src="/lib/typeahead/typeahead.bundle.js"></script>
	<script src="/lib/alertify-0.3.11/js/alertify.min.js"></script>
	<script src="/lib/sprintf/js/sprintf.min.js"></script>
	<script type="text/javascript" src="http://bp.yahooapis.com/2.4.21/browserplus-min.js"></script>
    <script src="/lib/bower_components/base64js/base64.js"></script>
	<script type="text/javascript" src="/js/util.js"></script>
	<script src="js/searchclient.js"></script>
	<script src="js/search.js"></script>
	<script src="js/read.js"></script>
	<script src="js/main.js"></script>
</body>
</html>
