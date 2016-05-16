// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {

	//カレンダー選択時の操作
    var select = function(start, end) {
    	var st=moment(start).format('YYYY-MM-DDTHH:mm');
    	var en=moment(end).format('YYYY-MM-DDTHH:mm');
    	var allDay = !start.hasTime() && !end.hasTime();
    	$("#event_dialog").find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
    	$('#event_form [name=url_cnt]').hide();
    	$('#event_form [name=url2]').hide();
    	$('#event_form [name=url3]').hide();
    	$('#event_form [name=url4]').hide();
    	$('#event_form [name=url5]').hide();
    	$("#event_dialog").dialog("open");
    	$('#event_form [name=start]').val(st);
    	$('#event_form [name=end]').val(en);
    	$("#event_form [name=url_cnt]").val("2");
    	if(allDay){
    		$('#event_form [name=allDay]').prop("checked",true);
    	}
       	calendar.fullCalendar('unselect');
	};
	//編集画面
	var edit = function(event){
		var st=moment(event.start).format('YYYY-MM-DDTHH:mm');
		var cnt=6;
    	$("#edit_dialog").find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
    	$('#edit_form [name=id]').hide();
    	$('#edit_form [name=url_cnt]').hide();
    	$('#edit_form [name=url2]').show();
    	$('#edit_form [name=url3]').show();
    	$('#edit_form [name=url4]').show();
    	$('#edit_form [name=url5]').show();
    	$("#edit_form [name=url_plus]").show();
    	$('#edit_form [name=start]').val(st);
    	if(event.end!=null){
    		var en=moment(event.end).format('YYYY-MM-DDTHH:mm');
      		$('#edit_form [name=end]').val(en);  		
    	}else $('#edit_form [name=end]').val(st);
    	$('#edit_form [name=id]').val(event.id);
		$('#edit_form [name=title]').val(event.title);
		$('#edit_form [name=location]').val(event.location);
		$('#edit_form [name=url1]').val(event.url1);
		$('#edit_form [name=url2]').val(event.url2);
		$('#edit_form [name=url3]').val(event.url3);
		$('#edit_form [name=url4]').val(event.url4);
		$('#edit_form [name=url5]').val(event.url5);
		if(event.url5==""){
			cnt=cnt-1;
			$('#edit_form [name=url5]').hide();
			if(event.url4==""){
				cnt=cnt-1;
				$('#edit_form [name=url4]').hide();
				if(event.url3==""){
					cnt=cnt-1;
					$('#edit_form [name=url3]').hide();
					if(event.url2==""){
						cnt=cnt-1;
						$('#edit_form [name=url2]').hide();
					}
				}
			}
		}else{
			$("#edit_form [name=url_plus]").hide();
		}
		$('#edit_form [name=remarks]').val(event.remarks);
		$("#edit_form [name=url_cnt]").val(cnt);
    	if(event.allDay){
    		$('#edit_form [name=allDay]').prop("checked",true);
    	}
	};
	//予定クリック時の操作
	var confirm = function(event){
		$("#confirm_dialog").dialog("open");
		if(event.allDay){
			if(moment(event.start).format('YYYY年MM月DD日')==moment(event.end).subtract(1, 'days').format('YYYY年MM月DD日')){
				document.getElementById("confirm_start").textContent = moment(event.start).format('YYYY年MM月DD日');
				document.getElementById("confirm_end").textContent = "";
			}else{
				document.getElementById("confirm_start").textContent = moment(event.start).format('YYYY年MM月DD日')+"～";
				document.getElementById("confirm_end").textContent = moment(event.end).subtract(1, 'days').format('YYYY年MM月DD日');
			}
		}else{
			if(moment(event.start).format('YYYY年MM月DD日')==moment(event.end).format('YYYY年MM月DD日')){
				document.getElementById("confirm_start").textContent = moment(event.start).format('YYYY年MM月DD日HH:mm')+"～"+moment(event.end).format('HH:mm');
				document.getElementById("confirm_end").textContent = "";
			}else{
				document.getElementById("confirm_start").textContent = moment(event.start).format('YYYY年MM月DD日HH:mm')+"～";
				document.getElementById("confirm_end").textContent = moment(event.end).format('YYYY年MM月DD日HH:mm');
			}
		}
		document.getElementById("confirm_title").textContent = event.title;
		document.getElementById("confirm_location").textContent = event.location;
		var url1=document.getElementById("confirm_url1");
		url1.textContent = event.url1;
		url1.parentNode.href = event.url1;
		var url2=document.getElementById("confirm_url2");
		url2.textContent = event.url2;
		url2.parentNode.href = event.url2;
		var url3=document.getElementById("confirm_url3");
		url3.textContent = event.url3;
		url3.parentNode.href = event.url3;
		var url4=document.getElementById("confirm_url4");
		url4.textContent = event.url4;
		url4.parentNode.href = event.url4;
		var url5=document.getElementById("confirm_url5");
		url5.textContent = event.url5;
		url5.parentNode.href = event.url5;
		document.getElementById("confirm_remarks").textContent = event.remarks;
		edit(event);
	};
	//予定のドラッグ＆ドロップ、リサイズ時の操作
	var updateEvent = function(event){
		var data = {event: {title: event.title,
                	start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
                	end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
                	location: event.location,
                	url1: event.url1,
                	url2: event.url2,
                	url3: event.url3,
                	url4: event.url4,
                	url5: event.url5,
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
        eventClick: confirm,
        eventResize: updateEvent,
        eventDrop: updateEvent
   });
});