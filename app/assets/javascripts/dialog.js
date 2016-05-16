$(function() {
	//予定作成ダイアログの挙動
	$("#event_dialog").dialog({
		modal : true,
		autoOpen : false,
		height : 410,
		width : 250,
		resizable : false,
		buttons : {
			"作成" : function() {
				var title = $('#event_form [name=title]').val();
				var start = $('#event_form [name=start]').val();
				var end = $('#event_form [name=end]').val();
				var location = $('#event_form [name=location]').val();
				var url1 = $('#event_form [name=url1]').val();
				var url2 = $('#event_form [name=url2]').val();
				var url3 = $('#event_form [name=url3]').val();
				var url4 = $('#event_form [name=url4]').val();
				var url5 = $('#event_form [name=url5]').val();
				var remarks = $('#event_form [name=remarks]').val();
				var allDay;
				if ($('#event_form [name=allDay]:checked').val())
					allDay = true;
				else
					allDay = false;
				var data = {
					event : {
						title : title,
						start : start,
						end : end,
						location : location,
						url1 : url1,
						url2 : url2,
						url3 : url3,
						url4 : url4,
						url5 : url5,
						remarks : remarks,
						allDay : allDay
					}
				};
				var st = moment(start).format('YYYY-MM-DD HH:mm:ss UTC');
				var en = moment(end).format('YYYY-MM-DD HH:mm:ss UTC');
				if (!allDay) {
					$.ajax({
						type : "GET",
						url : "/events/search.json",
						data : {
							event : {
								title : 0,
								start : st,
								end : en
							}
						},
						success : function(result) {
							if (result != null) {
								$("#double_caution").dialog("open");
							} else {
								$.ajax({
									type : "POST",
									url : "/events",
									data : data,
									success : function() {
										$("#calendar").fullCalendar('refetchEvents');
									}
								});
								$("#event_dialog").dialog("close");
							}
						}
					});
				} else {
					$.ajax({
						type : "POST",
						url : "/events",
						data : data,
						success : function() {
							$("#calendar").fullCalendar('refetchEvents');
						}
					});
					$(this).dialog("close");
				}
			},
			"キャンセル" : function() {
				$(this).dialog("close");
			}
		}
	});
	//予定編集ダイアログの挙動
	$("#edit_dialog").dialog({
		modal : true,
		autoOpen : false,
		height : 450,
		width : 250,
		resizable : false,
		buttons : {
			"確定" : function() {
				var id = $('#edit_form [name=id]').val();
				var title = $('#edit_form [name=title]').val();
				var start = $('#edit_form [name=start]').val();
				var end = $('#edit_form [name=end]').val();
				var location = $('#edit_form [name=location]').val();
				var url1 = $('#edit_form [name=url1]').val();
				var url2 = $('#edit_form [name=url2]').val();
				var url3 = $('#edit_form [name=url3]').val();
				var url4 = $('#edit_form [name=url4]').val();
				var url5 = $('#edit_form [name=url5]').val();
				var remarks = $('#edit_form [name=remarks]').val();
				var allDay;
				if ($('#edit_form [name=allDay]:checked').val())
					allDay = true;
				else
					allDay = false;
				var data = {
					event : {
						title : title,
						start : start,
						end : end,
						location : location,
						url1 : url1,
						url2 : url2,
						url3 : url3,
						url4 : url4,
						url5 : url5,
						remarks : remarks,
						allDay : allDay
					}
				};
				var st = moment(start).format('YYYY-MM-DD HH:mm:ss UTC');
				var en = moment(end).format('YYYY-MM-DD HH:mm:ss UTC');
				if (!allDay) {
					$.ajax({
						type : "GET",
						url : "/events/search.json",
						data : {
							event : {
								title : id,
								start : st,
								end : en
							}
						},
						success : function(result) {
							if (result != null) {
								$("#double_caution2").dialog("open");
							} else {
								$.ajax({
									type : "PUT",
									url : "/events/" + id + ".json",
									data : data,
									success : function() {
										$("#calendar").fullCalendar('refetchEvents');
									}
								});
								$("#edit_dialog").dialog("close");
							}
						}
					});
				} else {
					$.ajax({
						type : "PUT",
						url : "/events/" + id + ".json",
						data : data,
						success : function() {
							$("#calendar").fullCalendar('refetchEvents');
						}
					});
					$(this).dialog("close");
				}
			},
			"キャンセル" : function() {
				$(this).dialog("close");
			}
		}
	});
	//削除確認ダイアログの挙動
	$("#delete_dialog").dialog({
		modal : true,
		autoOpen : false,
		height : 150,
		width : 250,
		resizable : false,
		buttons : {
			"OK" : function() {
				var id = $('#delete_form [name=id]').val();
				$.ajax({
					type : "DELETE",
					url : "/events/" + id + ".json",
					success : function() {
						$("#calendar").fullCalendar('refetchEvents');
					}
				});
				$(this).dialog("close");
				$("#edit_dialog").dialog("close");
			},
			"キャンセル" : function() {
				$(this).dialog("close");
			}
		}
	});

	//確認ダイアログの挙動
	$("#confirm_dialog").dialog({
		modal : true,
		autoOpen : false,
		height : 400,
		width : 250,
		resizable : false,
		buttons : [{
			text : "削除",
			click : function() {
				var id = $('#edit_form [name=id]').val();
				$('#delete_form [name=id]').hide();
				$('#delete_form [name=id]').val(id);
				$("#delete_dialog").dialog("open");
				$(this).dialog("close");
			}
		}, {
			text : "編集",
			click : function() {
				$("#edit_dialog").dialog("open");
				$(this).dialog("close");
			}
		}, {
			text : "閉じる",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});

	$("#double_caution").dialog({
		modal : true,
		autoOpen : false,
		height : 150,
		width : 250,
		resizable : false,
		buttons : {
			"OK" : function() {
				var title = $('#event_form [name=title]').val();
				var start = $('#event_form [name=start]').val();
				var end = $('#event_form [name=end]').val();
				var location = $('#event_form [name=location]').val();
				var url1 = $('#event_form [name=url1]').val();
				var url2 = $('#event_form [name=url2]').val();
				var url3 = $('#event_form [name=url3]').val();
				var url4 = $('#event_form [name=url4]').val();
				var url5 = $('#event_form [name=url5]').val();
				var remarks = $('#event_form [name=remarks]').val();
				var allDay;
				if ($('#event_form [name=allDay]:checked').val())
					allDay = true;
				else
					allDay = false;
				var data = {
					event : {
						title : title,
						start : start,
						end : end,
						location : location,
						url1 : url1,
						url2 : url2,
						url3 : url3,
						url4 : url4,
						url5 : url5,
						remarks : remarks,
						allDay : allDay
					}
				};
				$.ajax({
					type : "POST",
					url : "/events",
					data : data,
					success : function() {
						$("#calendar").fullCalendar('refetchEvents');
					}
				});
				$(this).dialog("close");
				$("#event_dialog").dialog("close");
			},
			"キャンセル" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#double_caution2").dialog({
		modal : true,
		autoOpen : false,
		height : 150,
		width : 250,
		resizable : false,
		buttons : {
			"OK" : function() {
				var id = $('#edit_form [name=id]').val();
				var title = $('#edit_form [name=title]').val();
				var start = $('#edit_form [name=start]').val();
				var end = $('#edit_form [name=end]').val();
				var location = $('#edit_form [name=location]').val();
				var url1 = $('#edit_form [name=url1]').val();
				var url2 = $('#edit_form [name=url2]').val();
				var url3 = $('#edit_form [name=url3]').val();
				var url4 = $('#edit_form [name=url4]').val();
				var url5 = $('#edit_form [name=url5]').val();
				var remarks = $('#edit_form [name=remarks]').val();
				var allDay;
				if ($('#edit_form [name=allDay]:checked').val())
					allDay = true;
				else
					allDay = false;
				var data = {
					event : {
						title : title,
						start : start,
						end : end,
						location : location,
						url1 : url1,
						url2 : url2,
						url3 : url3,
						url4 : url4,
						url5 : url5,
						remarks : remarks,
						allDay : allDay
					}
				};
				$.ajax({
					type : "PUT",
					url : "/events/" + id + ".json",
					data : data,
					success : function() {
						$("#calendar").fullCalendar('refetchEvents');
					}
				});
				$(this).dialog("close");
				$("#edit_dialog").dialog("close");
			},
			"キャンセル" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#event_form [name=url_plus]").click(function() {
		var cnt = Number($("#event_form [name=url_cnt]").val());
		$("#event_form [name=url" + cnt + "]").show();
		if (cnt >= 5) {
			$("#event_form [name=url_plus]").hide();
		} else {
			cnt = cnt + 1;
			$("#event_form [name=url_cnt]").val(cnt);
		}
	});

	$("#edit_form [name=url_plus]").click(function() {
		var cnt = Number($("#edit_form [name=url_cnt]").val());
		$("#edit_form [name=url" + cnt + "]").show();
		if (cnt >= 5) {
			$("#edit_form [name=url_plus]").hide();
		} else {
			cnt = cnt + 1;
			$("#edit_form [name=url_cnt]").val(cnt);
		}
	});
});
