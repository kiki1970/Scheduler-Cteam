$(function() {
    $( "#event_dialog" ).dialog({
        modal:true,
        autoOpen:false,
        height:400,
        width:250,
        resizable:false,
        buttons:{
            "作成":function(){
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
            "キャンセル":function(){
                $(this).dialog("close");
            }
        }
    });
    $( "#edit_dialog" ).dialog({
    	modal:true,
        autoOpen:false,
        height:400,
        width:250,
        resizable:false,
        buttons:{        	
            "確定":function(){
				var id = $('#edit_form [name=id]').val();
				var title = $('#edit_form [name=title]').val();
				var start = $('#edit_form [name=start]').val();
                var end = $('#edit_form [name=end]').val();
                var location = $('#edit_form [name=location]').val();
                var remarks = $('#edit_form [name=remarks]').val();
                var allDay = $('#edit_form [name=allDay]:checked').val();
                var data = {event: {title: title,
                            start: start,
                            end: end,
                            location: location,
                            remarks: remarks, 
                            allDay: allDay}};
                $.ajax({
            		type: "PUT",
            		url: "/events/"+id+".json",
            		data: data,
            		success: function() {
                		$("#calendar").fullCalendar('refetchEvents');
            		}
        		});
                $(this).dialog("close");
            },
            "キャンセル":function(){
                $(this).dialog("close");
            },
            "削除":function(){
        		var id = $('#edit_form [name=id]').val();
        		$('#delete_form [name=id]').hide();
        		$('#delete_form [name=id]').val(id);
				$("#delete_dialog").dialog("open");
        	}
        }
    });
    $( "#delete_dialog" ).dialog({
    	modal:true,
        autoOpen:false,
        height:150,
        width:250,
        resizable:false,
        buttons:{
        	"OK":function(){
        		$.ajax({
            		type: "DELETE",
            		url: "/events/"+id+".json",
            		success: function() {
                		$("#calendar").fullCalendar('refetchEvents');
            		}
        		});
        		$(this).dialog("close");
        		$("#edit_form").dialog("close");
        	},
        	"キャンセル":function(){
        		$(this).dialog("close");
        	}
        }
    });
});