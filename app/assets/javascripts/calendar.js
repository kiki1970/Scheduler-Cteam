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
    	console.log(allDay);
    	if(allDay){
    		$('#event_form [name=allDay]').prop("checked",true);
    	}
       	calendar.fullCalendar('unselect');
	};

	var calendar = $('#calendar').fullCalendar({
		lang: 'ja',
		axisFormat: 'H:mm',
		timeFormat: 'H:mm',
		header:{right: 'agendaWeek month today prev next'},
		events: '/events.json',
        selectable: true,
        selectHelper: true,
        ignoreTimezone: false,
        select: select
   });
});