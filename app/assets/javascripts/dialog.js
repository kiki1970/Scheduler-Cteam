$(function() {
    $( "#event_dialog" ).dialog({
        modal:true,
        autoOpen:false,
        height:400,
        width:250,
        resizable:false,
        buttons:{
            "OK":function(){
				var title = $('#event_form [name=title]').val();
				var start = $('#event_form [name=start]').val();
				console.log(start);
                var end = $('#event_form [name=end]').val();
                var location = $('#event_form [name=location]').val();
                var remarks = $('#event_form [name=remarks]').val();
                var allDay = $('#event_form [name=allDay]:checked').val();
                var data = {event: {title: title,
                            start: start,
                            end: end,
                            location: location,
                            remarks: remarks, 
                            allDay: allDay}};
                $.ajax({
            		type: "POST",
            		url: "/events",
            		data: data,
            		success: function() {
                	$("#calendar").fullCalendar('refetchEvents');
            	}
        		});
                $(this).dialog("close");
            },
            "Cancel":function(){
                $(this).dialog("close");
            }
        }
    });
});