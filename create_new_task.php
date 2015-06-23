<?php
	/**********************
	* X-Schedule PHP      *
	*                     *
	* Author: Liam Logue  *
	**********************/
	
	//Variables
	$count = 0;
	
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
	
	
	//Set $task to a new child of "task"
	$task = $xml->addChild('task');
	
	//Add attribute ID
	$task->addAttribute('id', $id);
	
	//Populate other values with POST values
	$childTitle = $task->addChild("title", $title);
	$childLeader = $task->addChild("leader", $leader);
	$childParticipants = $task->addChild("additionalParticipants", $participants);
	$childTcd = $task->addChild("tcd", $tcd);
	$childSummary = $task->addChild("summary", $summary);
	$childUrl = $task->addChild("url", $url);
	$childStatus = $task->addChild("status", $status);

	//Save & overwrite the old XML
	$xml->asXML("tasks.xml");
?>