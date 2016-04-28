// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {

	
    var select = function(start, end, allDay) {
    	$("#event_dialog").dialog(open);
        var title = "a";
		var data = {event: {title: title,
                    start: start,
                    end: end, 
                    allDay: allDay}};
       	calendar.fullCalendar('unselect');
	};

	var calendar = $('#calendar').fullCalendar({
		axisFormat: 'H:mm',
		timeFormat: {
			agenda: 'H:mm - H:mm'
		},
		header:{right: 'agendaWeek month today prev next'},
		events: '/events.json',
        selectable: true,
        selectHelper: true,
        ignoreTimezone: false,
        select: select
   });
});