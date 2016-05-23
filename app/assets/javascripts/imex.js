$(function(){
	$("#export").click(function() {
		$.ajax({
			type: "POST",
			url: "/events/export"
		});
	});
});
