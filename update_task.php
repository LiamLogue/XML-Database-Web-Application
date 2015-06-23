<?php
	/**********************
	* X-Schedule PHP      *
	*                     *
	* Author: Liam Logue  *
	**********************/
	
	//Variables
	
	//Grab our POST values
	$id = $_POST["id"];
	$title = $_POST["title"];
	$leader = $_POST["leader"];
	$participants = $_POST["participants"];
	$tcd = $_POST["tcd"];
	$summary = $_POST["summary"];
	$url = $_POST["url"];
	$status = $_POST["status"];

	//Load the XML file
	$xml = simplexml_load_file("https://dunluce.infc.ulst.ac.uk/d12ll/COM506/Assignment1/tasks.xml");
	
	//Loop all ID nodes
	foreach ($xml->xpath('//tasks/task[@id="' . $id . '"]') as $item)
	{    
		$item -> id = $id;
		$item -> title = $title;
		$item -> leader = $leader;
		$item -> additionalParticipants = $participants;
		$item -> tcd = $tcd;
		$item -> summary = $summary;
		$item -> url = $url;
		$item -> status = $status;
		
		//Save & overwrite the old XML
		$xml->asXML("tasks.xml");
	}
?>