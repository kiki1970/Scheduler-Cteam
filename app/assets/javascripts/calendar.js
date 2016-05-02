// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {

	
    var select = function(start, end) {
    	var st=moment(start).format('YYYY-MM-DDTHH:mm');
    	var en=moment(end).format('YYYY-MM-DDTHH:mm');
    	var allDay = !start.hasTime() && !end.hasTime();
    	$("#event_dialog").find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
    	$("#event_dialog").dialog("open");
    	$('#event_form [name=start]').val(st);
    	$('#event_form [name=end]').val(en);
    	if(allDay){
    		$('#event_form [name=allDay]').prop("checked",true);
    	}
       	calendar.fullCalendar('unselect');
	};
	
	var edit = function(event, jsEvent, view){
		var st=moment(event.start).format('YYYY-MM-DDTHH:mm');
    	$("#edit_dialog").find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
    	$('#edit_form [name=id]').hide();
    	$("#edit_dialog").dialog("open");
    	console.log(event.end);
    	$('#edit_form [name=start]').val(st);
    	if(event.end!=null){
    		var en=moment(event.end).format('YYYY-MM-DDTHH:mm');
      		$('#edit_form [name=end]').val(en);  		
    	}else $('#edit_form [name=end]').val(st);
    	$('#edit_form [name=id]').val(event.id);
		$('#edit_form [name=title]').val(event.title);
		$('#edit_form [name=location]').val(event.location);
		$('#edit_form [name=remarks]').val(event.remarks);
    	if(event.allDay){
    		$('#edit_form [name=allDay]').prop("checked",true);
    	}
	};
	
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