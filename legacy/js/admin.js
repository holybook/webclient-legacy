function initUpload() {
	var uploader = new plupload.Uploader({
		// General settings
		runtimes : 'html5,gears,flash,silverlight,browserplus',
		browse_button : "pickfiles",
		container : "container",
		url : '/book',
		max_file_size : '10mb',
		unique_names : true,
		// Specify what files to browse for
		filters : [ {
			title : "Books",
			extensions : "xml"
		} ],
		multipart : false,
		// Flash settings
		flash_swf_url : '/lib/plupload-2.1.0/js/Moxie.swf',
		// Silverlight settings
		silverlight_xap_url : '/lib/plupload-2.1.0/js/Moxie.xap'
	});
	
	uploader.bind('Init', function(up, params) {
		$('#runtime').html(
				$("<div/>").text("Current runtime: " + params.runtime));
	});
	// Client side form validation
	$('form').submit(function(e) {
		// Files in queue upload them first
		if (uploader.files.length > 0) {
			$('#uploadfiles').button('loading')
			$(".progress").fadeIn(200)
			uploader.start();
		} else {
			alertify.alert('You must queue at least one file.');
		}
		return false;
	});
	uploader.init();
	uploader.bind('FilesAdded', function(up, files) {
		$.each(files,
				function(i, file) {
					$('#filelist tbody').append(
							$("<tr/>", {
								id : file.id
							}).append($("<td/>").text(file.name).css({ "word-wrap": "break-word" }))
							.append($("<td/>").text(plupload.formatSize(file.size)))
							.append($("<td/>").text("0%")));
				});
		up.refresh(); // Reposition Flash/Silverlight
	});
	uploader.bind('FilesRemoved', function(up, files) {
		$.each(files,
				function(i, file) {
					$('#' + file.id).remove()
				});
		up.refresh(); // Reposition Flash/Silverlight
	});
	uploader.bind('UploadProgress', function(up, file) {
		$('#' + file.id + " td:nth-child(3)").html(file.percent + "%");
		var p = uploader.total.percent
		console.log(p)
		$(".progress-bar").css({
			"width" : p + "%"
		});
		$("#upload-speed").text(sprintf("%.0f KB/s", uploader.total.bytesPerSec/1024))
	});
	uploader.bind('UploadComplete', function(up, file) {
		$('#uploadfiles').button('reset')
		$("#upload-speed").empty()
		$(".progress").fadeOut(200)
	});
	uploader.bind('Error', function(up, err) {
		// display error using:
		// err.file, err.file.name, ...
		$('#' + err.file.id).css({
			"background-color": "#FF9291"
		});
	});
	uploader.bind('FileUploaded', function(up, file) {
		$('#' + file.id + " b").html("100%");
		$('#' + file.id).css({
			"background-color": "#EAFFED"
		});
	});
	$("#clear-list").click(function() {
		uploader.splice()
	});

}

function clear() {
	var button = $("#clear")
	alertify.confirm("Really delete all data?", function(e) {
		if (e) {
			button.button('loading')
			$.ajax({
				url : "/admin/clear-all-data",
				method : "POST",
				success : function() {
					button.button('reset')
				},
				error : function() {
					button.button('reset')
				}
			})
		} else {
		}
	})
}

$(document).ready(function() {
	alertify.set({
		labels : {
			ok : "Ok",
			cancel : "Cancel"
		}
	})
	$("#clear").click(clear)

	initUpload()
})