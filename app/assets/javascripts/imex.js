$(function(){
	$("#import").click(function() {
		$("#import_dialog").dialog("open");
	});
	$("#export").click(function() {
		$.ajax({
			type: "POST",
			url: "/events/export.csv"
		});
	});
});
