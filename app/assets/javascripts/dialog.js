$(function() {
	//予定作成ダイアログの挙動
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
                var location1 = $('#event_form [name=location1]').val();
                var location2 = $('#event_form [name=location2]').val();
                var location3 = $('#event_form [name=location3]').val();
                var location4 = $('#event_form [name=location4]').val();
                var location5 = $('#event_form [name=location5]').val();
                var remarks = $('#event_form [name=remarks]').val();
                var allDay = $('#event_form [name=allDay]:checked').val();
                var data = {event: {title: title,
                            start: start,
                            end: end,
                            location1: location1,
                            location2: location2,
                            location3: location3,
                            location4: location4,
                            location5: location5,
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
    //予定編集ダイアログの挙動
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
                var location1 = $('#edit_form [name=location1]').val();
                var location2 = $('#edit_form [name=location2]').val();
                var location3 = $('#edit_form [name=location3]').val();
                var location4 = $('#edit_form [name=location4]').val();
                var location5 = $('#edit_form [name=location5]').val();
                var remarks = $('#edit_form [name=remarks]').val();
                var allDay = $('#edit_form [name=allDay]:checked').val();
                var data = {event: {title: title,
                            start: start,
                            end: end,
                            location1: location1,
                            location2: location2,
                            location3: location3,
                            location4: location4,
                            location5: location5,
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
    //削除確認ダイアログの挙動
    $( "#delete_dialog" ).dialog({
    	modal:true,
        autoOpen:false,
        height:150,
        width:250,
        resizable:false,
        buttons:{
        	"OK":function(){
        		var id = $('#delete_form [name=id]').val();
        		$.ajax({
            		type: "DELETE",
            		url: "/events/"+id+".json",
            		success: function() {
                		$("#calendar").fullCalendar('refetchEvents');
            		}
        		});
        		$(this).dialog("close");
        		$("#edit_dialog").dialog("close");
        	},
        	"キャンセル":function(){
        		$(this).dialog("close");
        	}
        }
    });
    
    $( "#event_form [name=location_plus]").click(function(){
		var cnt=Number($("#event_form [name=location_cnt]").val());
    	$("#event_form [name=location"+cnt+"]").show();
    	if(cnt>=5){
    		$("#event_form [name=location_plus]").hide();
    	}else{
    		cnt=cnt+1;
    		$("#event_form [name=location_cnt]").val(cnt);
		}
    });
    
    $( "#edit_form [name=location_plus]").click(function(){
		var cnt=Number($("#edit_form [name=location_cnt]").val());
    	$("#edit_form [name=location"+cnt+"]").show();
    	if(cnt>=5){
    		$("#edit_form [name=location_plus]").hide();
    	}else{
    		cnt=cnt+1;
    		$("#edit_form [name=location_cnt]").val(cnt);
		}
	});
});