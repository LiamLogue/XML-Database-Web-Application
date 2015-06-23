/**********************
* X-Schedule jQuery   *
*                     *
* Author: Liam Logue  *
**********************/
$(document).ready(function() {
	//Table legend reveal
	$("h4#table_legend_click").click(function() {
		$("div#table_hidden_legend").slideToggle();
	});
	
	//Prevent "Enter" from submitting form(s)
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
	
	//Edit task reveal	
	$("#task_table").on("click", "td.pencil_edit", function() {
		//Hide edit mode
		$("div.task_edit").slideToggle();
		
		//Pass the ID to edit through to the function
		EditTask($(this).attr("id"));		
	});
	
	//Delete Task Button
	$("#btn_delete_task").click(function() {
		//Push the delete task with the ID
		DeleteTask($("#edit_id").val());
	});
	
	
	//Get the XML file
	$.ajax({
		type:		"GET",
		url:		"../Assignment1/tasks.xml",
		dataType:	"xml",
		success: function(xml) {			
			//Run createTableFromXML function
			$returnedVal = CreateTableFromXML(xml);
					
			//Append returned value
			$('#task_table tr:last').after($returnedVal);
		}	
	});
	
	
	//Reset button click
	$(".btn_reset").click(function() {
		location.reload(true);
	});
	
	
	
	//Search reveal
	$("a#search_by_status").click(function(e) {
		//Reveal the form
		$("div.search_by_status").slideToggle();
		$("div.search_by_leader_participants").slideUp();
		$("div.search_by_id").slideUp();
		return false;
		e.preventDefault();
	});
	
	$("a#display_leader_participants").click(function(e) {
		//Reveal the form
		$("div.search_by_leader_participants").slideToggle();
		$("div.search_by_status").slideUp();
		$("div.search_by_id").slideUp();
		return false;
		e.preventDefault();
	});
	
	$("a#display_id").click(function(e) {
		//Reveal the form
		$("div.search_by_id").slideToggle();
		$("div.search_by_leader_participants").slideUp();
		$("div.search_by_status").slideUp();
		return false;
		e.preventDefault();
	});
	
	
	//Search by status
	$("#btn_search_by_status").click(function() {				
		$("#task_table tr td:nth-child(8)").each(function(data){
			$toFind = $("#txt_search_by_status").val().toLowerCase();
			$theStatus = $(this).text().toLowerCase();

			if($theStatus.indexOf($toFind) < 0) {
				$(this).parent().remove();
			}
		});
	});
	
	//Search by leader
	$("#btn_search_by_leader").click(function() {		
		$("#task_table tr td:nth-child(3)").each(function(data){
			$toFind = $("#txt_search_by_leader").val().toLowerCase();
			$leaderName = $(this).text().toLowerCase();

			if($leaderName.indexOf($toFind) < 0) {
				$(this).parent().remove();
			}
		});
	});
	
	//Search by ID
	$("#btn_search_by_id").click(function() {				
		$("#task_table tr td:nth-child(1)").each(function(data){
			$toFind = $("#txt_search_by_id").val().toLowerCase();
			$theID = $(this).text().toLowerCase();
			
			if($theID.indexOf($toFind) < 0) {
				$(this).parent().remove();
			}
		});
	});
	
	
	//POST New Task
	$("#btn_new_task").click(function() {
		//Validate data
		$isValid = true;
		$errorMessage = "<strong>ERROR</strong><br/>The following errors have been found<br/><br/>";
		$pattern = /(0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)\d\d/g;
		
		//ID
		if($("#id").val() == "") {
			$errorMessage += "ID is invalid<br/>";
			$isValid = false;
		}
		
		//Title
		if($("#title").val() == "") {
			$errorMessage += "Please enter a valid title<br/>";
			$isValid = false;
		}
		
		//Leader
		if($("#leader").val() == "") {
			$errorMessage += "Please enter a valid leader<br/>";
			$isValid = false;
		}
		
		//TCD		
		if($("#tcd").val() == "") {
			$errorMessage += "Please enter a valid date (dd-mm-yyyy)<br/>";
			$isValid = false;
		}
		else if($("#tcd").val() !== "") {
			//Test regex
			$date = $("#tcd").val();
			$result = $pattern.test($date);

			if($result == false) {
				$errorMessage += "Please enter a valid date (dd-mm-yyyy)<br/>";
				$isValid = false;
			}
		}
		
		//Sumary
		if($("#summary").val() == "") {
			$errorMessage += "Please enter a valid summary<br/>";
			$isValid = false;
		}
		
		//Sumary
		if($("#status").val() == "") {
			$errorMessage += "Please select a valid status<br/>";
			$isValid = false;
		}
		
		//Check for validation errors
		if(!$isValid && $errorMessage.length > 0) {
			//Show our error area and populate the message
			$("#error_area").slideDown();
			$("#error_area").html($errorMessage);
			
			//Flush errorMessage
			$errorMessage = "";
		}
		else {
			//Create our POST string
			$.ajax({
				type:		"POST",
				url:		"create_new_task.php",
				data:		"id=" + $("#id").val() + "&title=" + $("#title").val() + "&leader=" + $("#leader").val() + "&participants=" + $("#participants").val() + "&tcd=" + $("#tcd").val() + "&summary=" + $("#summary").val() + "&url=" + $("#url").val() + "&status=" + $("#status").val(),
				success: function(data) {
					//Relocate the user to the homepage after a successful addition
					$(location).attr("href", "index.php");
				}
			}); 		
		}
	});
	
	
	//Update task
	$("#btn_update_task").click(function() {
		//Validate data
		$isValid = true;
		$errorMessage = "<strong>ERROR</strong><br/>The following errors have been found<br/><br/>";
		$pattern = /(0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)\d\d/g;
		
		//ID
		if($("#edit_id").val() == "") {
			$errorMessage += "ID is invalid<br/>";
			$isValid = false;
		}
		
		//Title
		if($("#edit_title").val() == "") {
			$errorMessage += "Please enter a valid title<br/>";
			$isValid = false;
		}
		
		//Leader
		if($("#edit_leader").val() == "") {
			$errorMessage += "Please enter a valid leader<br/>";
			$isValid = false;
		}
		
		//TCD		
		if($("#edit_tcd").val() == "") {
			$errorMessage += "Please enter a valid date (dd-mm-yyyy)<br/>";
			$isValid = false;
		}
		else if($("#edit_tcd").val() !== "") {
			//Test regex
			$date = $("#edit_tcd").val();
			$result = $pattern.test($date);

			if($result == false) {
				$errorMessage += "Please enter a valid date (dd-mm-yyyy)<br/>";
				$isValid = false;
			}
		}
		
		//Sumary
		if($("#edit_summary").val() == "") {
			$errorMessage += "Please enter a valid summary<br/>";
			$isValid = false;
		}
		
		//Sumary
		if($("#edit_status").val() == "") {
			$errorMessage += "Please select a valid status<br/>";
			$isValid = false;
		}
		
		//Check for validation errors
		if(!$isValid && $errorMessage.length > 0) {
			//Show our error area and populate the message
			$("#error_area").slideDown();
			$("#error_area").html($errorMessage);
			
			//Flush errorMessage
			$errorMessage = "";
		}
		else {
			//Create our POST string
			$.ajax({
				type:		"POST",
				url:		"update_task.php",
				data:		"id=" + $("#edit_id").val() + "&title=" + $("#edit_title").val() + "&leader=" + $("#edit_leader").val() + "&participants=" + $("#edit_participants").val() + "&tcd=" + $("#edit_tcd").val() + "&summary=" + $("#edit_summary").val() + "&url=" + $("#edit_url").val() + "&status=" + $("#edit_status").val(),
				success: function(data) {
					//Relocate the user to the homepage after a successful update
					$(location).attr("href", "index.php");
				}
			}); 
		}
	});	
});


/*************
* Functions  *
*************/

/**********************
* createTableFromXML  *
**********************/
var CreateTableFromXML = function(pXML) {
	//Table Row String
	$tableRowString = "";

	//Loop through each "tasks" element
	$(pXML).find("tasks").each(function() {
		$(pXML).find("task").each(function() {
		
			//Check task status and colour row accordingly
			$(this).find("status").each(function() {
				if($(this).text() == "New") {
					$tableRowString += "<tr class=\"info\">";
				}
				else if($(this).text() == "Done") {
					$tableRowString += "<tr class=\"success\">";
				}
				else if($(this).text() == "In Progress") {
					$tableRowString += "<tr class=\"warning\">";
				}
			});
			
			//Append task ID
			$tableRowString += "<td>" + $(this).attr("id") + "</td>";
			
			//Append task title
			$(this).find("title").each(function() {
				$tableRowString += "<td>" + $(this).text() + "</td>";
			});
			
			//Append task leader					
			$(this).find("leader").each(function() {
				$tableRowString += "<td>" + $(this).text() + "</td>";
			});
			
			//Append additional participants
			$(this).find("additionalParticipants").each(function() {
				$tableRowString += "<td>" + $(this).text() + "</td>";
			});
			
			//Append task TCD (Target completion Date)
			$(this).find("tcd").each(function() {
				$tableRowString += "<td>" + $(this).text() + "</td>";
			});
			
			//Append task summary
			$(this).find("summary").each(function() {
				$tableRowString += "<td>" + $(this).text() + "</td>";
			});
			
			//Append task URL
			$(this).find("url").each(function() {
				$tableRowString += "<td><a target='_blank' href='" + $(this).text() + "'>" + $(this).text() + "</a></td>";
			});
			
			//Append task status
			$(this).find("status").each(function() {
				$tableRowString += "<td>" + $(this).text() + "</td>";
			});
			
			//Append our pencil icon for editing
			$(this).find("status").each(function() {
				$tableRowString += "<td id=\"" + $(this).parent().attr("id") + "\" class=\"pencil_edit\"><abbr title='Click to change task status' class='initialism'><span id='" + $(this).parent().attr("id") + "' class=\"glyphicon glyphicon-pencil\"></span></abbr></td></tr>";
			});
		});
	});
	
	//Return value
	return $tableRowString
};

/**********************
* EditTask            *
**********************/
var EditTask = function(pTaskID) {
	//Get the XML file
	$.ajax({
		type:		"GET",
		url:		"../Assignment1/tasks.xml",
		dataType:	"xml",
		success: function(xml) {			
			//Pass XML to ParseXMLToID function
			ParseXMLToID(xml, pTaskID);
		}	
	});
};

/**********************
* DeleteTask          *
**********************/
var DeleteTask = function(pTaskID) {
	//Create our POST string
		$.ajax({
			type:		"POST",
			url:		"delete_task.php",
			data:		"id=" + pTaskID,
			success: function(data) {
				//Relocate the user to the homepage after a successful addition
				alert("Task " + pTaskID + " succesfully deleted");
				$(location).attr("href", "index.php");
			}
		}); 
};
/**********************
* ParseXMLToID        *
**********************/
var ParseXMLToID = function(pXML, pID) {
	//Loop through each "tasks" element
	$(pXML).find("tasks").each(function() {
		$(pXML).find("task").each(function() {
			//Compare clicked & passed in IDs
			if($(this).attr("id") == pID) {
				//It's a match, populate the edit fields
				$("#edit_id").val($(this).attr("id"));
				$("#edit_title").val($(this).children("title").text());
				$("#edit_leader").val($(this).children("leader").text());
				$("#edit_participants").val($(this).children("additionalParticipants").text());
				$("#edit_tcd").val($(this).children("tcd").text());
				$("#edit_summary").val($(this).children("summary").text());
				$("#edit_url").val($(this).children("url").text());
				$("#edit_status").val($(this).children("status").text());				
			}
		});
	});
};