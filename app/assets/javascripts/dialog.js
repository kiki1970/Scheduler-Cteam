$(document).ready(function() {
	var dialog = $("#event_dialog").dialog({
    	modal:true,
    	autoOpen:ture,
    	height:300,
    	width:100,
    	buttons:{
            "OK":function(){

                //ここで何をすれば良い???????

                $(this).dialog("close");
            },
            "Cancel":function(){
                $(this).dialog("close");
            }
       },
       resizable:false
    });
});