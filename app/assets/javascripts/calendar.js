// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {

	//カレンダー選択時の操作
    var select = function(start, end) {
    	var st=moment(start).format('YYYY-MM-DDTHH:mm');
    	var en=moment(end).format('YYYY-MM-DDTHH:mm');
    	var allDay = !start.hasTime() && !end.hasTime();
    	$("#event_dialog").find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
    	$('#event_form [name=location_cnt]').hide();
    	$('#event_form [name=location2]').hide();
    	$('#event_form [name=location3]').hide();
    	$('#event_form [name=location4]').hide();
    	$('#event_form [name=location5]').hide();
    	$("#event_dialog").dialog("open");
    	$('#event_form [name=start]').val(st);
    	$('#event_form [name=end]').val(en);
    	$("#event_form [name=location_cnt]").val("2");
    	if(allDay){
    		$('#event_form [name=allDay]').prop("checked",true);
    	}
       	calendar.fullCalendar('unselect');
	};
	//予定クリック時の操作
	var edit = function(event, jsEvent, view){
		var st=moment(event.start).format('YYYY-MM-DDTHH:mm');
		var cnt=6;
    	$("#edit_dialog").find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
    	$('#edit_form [name=id]').hide();
    	$('#edit_form [name=location_cnt]').hide();
    	$('#edit_form [name=location2]').show();
    	$('#edit_form [name=location3]').show();
    	$('#edit_form [name=location4]').show();
    	$('#edit_form [name=location5]').show();
    	$("#edit_form [name=location_plus]").show();
    	$("#edit_dialog").dialog("open");
    	console.log(event.end);
    	$('#edit_form [name=start]').val(st);
    	if(event.end!=null){
    		var en=moment(event.end).format('YYYY-MM-DDTHH:mm');
      		$('#edit_form [name=end]').val(en);  		
    	}else $('#edit_form [name=end]').val(st);
    	$('#edit_form [name=id]').val(event.id);
		$('#edit_form [name=title]').val(event.title);
		$('#edit_form [name=location1]').val(event.location1);
		$('#edit_form [name=location2]').val(event.location2);
		$('#edit_form [name=location3]').val(event.location3);
		$('#edit_form [name=location4]').val(event.location4);
		$('#edit_form [name=location5]').val(event.location5);
		var a=event.location5;
		console.log(a);
		if(event.location5==""){
			cnt=cnt-1;
			$('#edit_form [name=location5]').hide();
			if(event.location4==""){
				cnt=cnt-1;
				$('#edit_form [name=location4]').hide();
				if(event.location3==""){
					cnt=cnt-1;
					$('#edit_form [name=location3]').hide();
					if(event.location2==""){
						cnt=cnt-1;
						$('#edit_form [name=location2]').hide();
					}
				}
			}
		}else{
			$("#edit_form [name=location_plus]").hide();
		}
		$('#edit_form [name=remarks]').val(event.remarks);
		$("#edit_form [name=location_cnt]").val(cnt);
    	if(event.allDay){
    		$('#edit_form [name=allDay]').prop("checked",true);
    	}
	};
	//予定のドラッグ＆ドロップ、リサイズ時の操作
	var updateEvent = function(event){
		var data = {event: {title: event.title,
                	start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
                	end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
                	location: event.location,
                	remarks: event.remarks,
                	allDay: event.allDay}};
    	$.ajax({
        	type: "PUT",
        	url: "/events/"+event.id+".json",
        	data: data,
        	success: function() {
           		$("#calendar").fullCalendar('refetchEvents');
        	}
     	});
	};
	//カレンダーの各種設定
	var calendar = $('#calendar').fullCalendar({
		lang: 'ja',
		axisFormat: 'H:mm',
		timeFormat: 'H:mm',
		header:{right: 'agendaWeek month today prev next'},
		events:{
			url:'/events.json',
			success:function(events){
				$(events).each(function(){
					this.url = null;
				});		
			},
		},
		editable: true,
        selectable: true,
        selectHelper: true,
        ignoreTimezone: false,
        theme: true,
        select: select,
        eventClick: edit,
        eventResize: updateEvent,
        eventDrop: updateEvent
   });
});