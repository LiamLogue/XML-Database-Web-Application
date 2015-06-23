<?php
	/**********************
	* X-Schedule PHP      *
	*                     *
	* Author: Liam Logue  *
	**********************/
	
	/***************************************************
	* GetNewID - Gets a new UID for our new task       *
	***************************************************/
	function GetNewID() {
		//Load the XML file
		$xml = simplexml_load_file("https://dunluce.infc.ulst.ac.uk/d12ll/COM506/Assignment1/tasks.xml");
		
		//Calculate total nodes 
		$count = $xml->count();
		
		//Add one for our new node and pad with zeroes
		$count+=1;
		$count = str_pad($count, 3, "0", STR_PAD_LEFT);
		
		//Return our new ID
		return $count;
	}
?>