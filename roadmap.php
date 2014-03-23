<div class="row">
	<p>
	This page lists the features that are planned for the first official release version of <i>holybook</i>. Please refer to the
	<a href="https://github.com/holybook/webapp">public github repository</a> for a more detailed and technical status of the project.
	</p>

	<h2>Alpha Phase</h2>

	<p>In the <strong>alpha phase</strong>, the most basic features will be developed and deployed as a series of multiple alpha releases.
	The code will not be optimized for high load and this phase is intended to make this service robust and to try out different approaches for
	usability and search ranking.</p>

	<p><i>In this phase the service will only be available to a small number of trusted testers</i></p>

	<h3>Version 0.1 (Current)</h3>

	<table class="table">
		<tr>
			<td class="status"><span class="glyphicon glyphicon-check roadmap-status-success"></span></td>
			<td class="function">Search</td>
			<td>This is the most essential functionality of this service. It uses the <a href="https://developers.google.com/appengine/docs/java/search/">Google Search Api</a>
			to index books by paragraphs and to provide query functionality. The Google Search API supports a variety of query features:
				<ul>
			  		<li>Possibly nested AND, OR and NOT operators. AND means that the words need to appear in the same paragraph (no order specified)
			  		whereas OR means that only one of the options need to appear in the paragraph. So for example: <span class="query">test AND gold</span> will
			  		match all paragraphs containing both the words "test" and "gold" whereas <span class="query">test OR gold</span> matches all paragraphs containing
			  		the word <i>test</i> and/or the word <i>gold</i>. Note that a normal space is interpreted as AND (e.g. <span class="query">test gold</span> is the same as
			  		<span class="query">test AND gold</span>. NOT is used to exclude words. A paragraph does only match a query if it does not contain
			  		any of the words (or phrases) that are prepended by a NOT operator.</li>
			  		<li>Stemming is indicated by the ~ operator. Stemming means that along with a word, also it derived forms (plural, -ing) are accepted
			  		during search.</li>
			  		<li>Multiple words can be grouped by forming a phrase with the <i>"</i> character. For example <span class="query">"we test"</span> will only match
			  		paragraphs that contain the complete phrase <i>we test</i>. This works exactly the same way as in normal google search</li>
			  	</ul>
			  	Note that currently only the contents of the <a href="http://reference.bahai.org/en/">Bahai Reference Library</a> can be searched. The list of text that is
			  	indexed and available for search does not depend on the functionality of this service and thus is not tracked as part of this roadmap. However, the next release
			  	will include a reader application that allows to browse the available books so you can see which one's are available at a particular point in time.
			 </td>
		</tr>
		<tr>
			<td class="status"><span class="glyphicon glyphicon-check roadmap-status-success"></span></td>
			<td class="function">Responsive Menu</td>
			<td>
				This is a simple feature that shows a menu on top of the page. It allows a user to switch between different applications that are part of this
				service. Currently only the Search (and roadmap) are available. The menu is responsive, meaning it collapses on devices with small screens allowing
				the service to be used also on mobile phones without restrictions on the available functionality. Note that an app is planned but implementation will
				probably start after this service has been finished (i.e. reached v1.0).
			</td>
		</tr>
	</table>

	<h3>Version 0.2</h3>

	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Filter</td>
			<td>The filter allows to restrict a search query by selecting specific religions, authors, books etc. It will be provided as part of a more general page
			called <i>settings</i>.</td>
		</tr>
		<tr>
			<td class="status"></td>
			<td class="function">Reader</td>
			<td>The Reader provides functionality to browse the set of available books and read them. It will split up books in smaller chunks (e.g. sections) so that
			not the whole book needs to be requested at once, thus making the whole reading experience faster. The Reader application will work similar to the
			<a href="http://reference.bahai.org/en/">Bahai Reference Library</a> site.</td>
		</tr>
	</table>

	<h3>Version 0.3</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Ranking</td>
			<td>This feature will rank more relevant documents higher. Relevancy will be determined by certain metrics based on the usage of this service. For example
			quotations that are copied, clicked on or added to a collection are supposed to be more important. Also some books can be classified as more relevant than
			others. This is the most critical feature of this service as it defines the quality of search results.</td>
		</tr>
		<tr>
			<td class="status"></td>
			<td class="function">Search Settings</td>
			<td>Adds additional functionality to the settings dialog that is used for the filter. The user should be able to define results per page, maximum number of
			results and so on.</td>
		</tr>
	</table>

	<h3>Version 0.4</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Design Improvements</td>
			<td>Improve the design of the web sites.</td>
		</tr>
	</table>

	<h2>Private Beta Phase</h2>

	<p>In the <strong>private beta phase</strong>, the most essential functionality, introduced during alpha development is
	supplemented by a number of additional useful features. During this phase most of the final features will be completed and
	tested. Also an increasing number of users is going to test the service in terms of performance. A lively discussion within the
	private beta community is envisioned.</p>

	<p><i>In this phase the service will be available to a larger number of trusted users.</i></p>

	<h3>Version 0.5</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Direct Search</td>
			<td>This functionality addresses a common use case. A user has the exact location information of some text in a book (e.g. section and paragraph) and wants to directly
			jump to the text. This could be provided as an extension to the reader.</td>
		</tr>
		<tr>
			<td class="status"></td>
			<td class="function">Paragraph Translation</td>
			<td>Adds functionality to toggle the language of a selected passage.</td>
		</tr>
	</table>

	<h3>Version 0.6</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Private Collections</td>
			<td>User will be able to log in with their google accounts and save selected passages as part of collections. These
			collections are then saved in the cloud and can be accessed from any computer or device.</td>
		</tr>
		<tr>
			<td class="status"></td>
			<td class="function">Collection Sharing</td>
			<td>Adds social media capabilities such as sharing collections, following other user's collections an so on.</td>
		</tr>
	</table>

	<h3>Version 0.7</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Integration</td>
			<td>Adds functionality to integrate this service with other services. Some ideas are:
			<ul>
				<li>Support for Facebook and Twitter login</li>
				<li>Download Collections as PDF or text files</li>
				<li>Share a passage on Facebook, Google+, ...</li>
			</ul>
			</td>
		</tr>
	</table>

	<h2>Public Beta Phase</h2>

	<p>In the <strong>public beta phase</strong>, the functionality will only be slightly extended. Instead the focus is on
	making the service scalable and robust to an ever growing number of users. Depending on the number of users A/B testing
	and metrics might be used to improve user experience.</p>

	<p><i>In this phase the service will be publicly availabe, but still marked as beta.</i></p>

	<h3>Version 0.8</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Admin Editor</td>
			<td>This functionality allows a group of selected admins to correct errors in texts by employing a graphical
			user interface.</td>
		</tr>
		<tr>
			<td class="status"></td>
			<td class="function">Proof-Reading</td>
			<td>Once texts can be changed, proof-reading functionality will allow the community to report typing errors in
			the text. Due to the sensitive type of text that is provided by this service, the community will not be allowed to
			directly modify texts. Instead, the community can up or downvote change requests and these requests will then be reviewed
			and processed by administrators in order of voting rank.</td>
		</tr>
	</table>

	<h3>Version 0.9</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Timeline</td>
			<td>This feature will annotate books with the time in which they were written (if available) and align this with
			the history of the respective faith. This allows a more in-depth study of the texts in the scope of their historic
			context.</td>
		</tr>
	</table>

	<h2>Official Release</h2>

	<p>In this phase the focus lies on bugfixing and small changes to improve user experience. Also the community might select
	additional features that should be added to the service.</p>

	<p><i>In this phase the service will be publicly availabe.</i></p>

	<h3>Version 1.0</h3>
	<table class="table">
		<tr>
			<td class="status"><!-- span class="glyphicon glyphicon-refresh roadmap-status-progress"></span--></td>
			<td class="function">Release</td>
			<td>This is not actually a feature, but rather a re-relase of 0.8 with improved performance and stability which
			makes it production-ready.</td>
		</tr>
	</table>

</div>

<!--
0.1
Search
Menu

0.2
Filter
Reader

0.3
Ranking
Search Settings

PRIVATE BETA

0.4
Direct Search
Paragraph Translation

0.5
Private Collections
Collection Sharing

0.6
Integration with other services

PUBLIC BETA

0.7
Admin Editor
Proof-Reading

0.8
Timeline

RELEASE

EXPERIMENTAL:
Word Translation

Lucene (advanced Ranking)


-->
