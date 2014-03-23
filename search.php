<form role="search">
	<div class="row">
		<div class="input-group col-xs-12 col-md-offset-2 col-md-8">
			<!-- span class="input-group-btn">
				<a class="btn btn-primary" href="#filter"><span class="glyphicon glyphicon-th-list"></span></a>
			</span -->
			<input type="text" class="form-control" id="search-box">
			<span class="input-group-btn" style="max-width: 200px;">
				<button type="submit" class="btn" id="search-button">Search</button>
			</span>
		</div>
	</div>
</form>

<div class="row">
	<div class="col-xs-12 col-md-offset-2 performance-label"><small></small></div>
</div>
<div class="row">
	<div class="col-xs-12 col-md-offset-2">
		<ul class="pagination">
		</ul>
	</div>
</div>

<div class="row">
	<div class="col-xs-12 col-lg-offset-2 col-lg-8">
		<div class="alert alert-warning" id="no-result">No results found.</div>
		<div class="alert alert-danger" id="error">No results found.</div>
		<div id="content"></div>
	</div>
</div>

<div class="row" id="loading">
	<img class="col-lg-offset-4 col-xs-1" src="/img/loader.gif" />
</div>
