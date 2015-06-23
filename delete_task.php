<?php
	/**********************
	* X-Schedule PHP      *
	*                     *
	* Author: Liam Logue  *
	**********************/
	
	//Variables
	
	//Grab our POST values
	$id = $_POST["id"];

	//Load the XML file
	$xml = simplexml_load_file("https://dunluce.infc.ulst.ac.uk/d12ll/COM506/Assignment1/tasks.xml");
	
	//Loop all ID nodes
	foreach ($xml->xpath('//tasks/task[@id="' . $id . '"]') as $item)
	{    
		unset($item[0]);
		
		//Save & overwrite the old XML
		$xml->asXML("tasks.xml");
	}
?>