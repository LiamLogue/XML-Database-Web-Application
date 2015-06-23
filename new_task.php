<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>X-Schedule : XML Task Database</title>

		<!-- Load CSS -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/style.css" rel="stylesheet">
		
		<!-- Google Fonts -->
		<link href='https://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body>
		<!-- Header -->
		<div class="header">
			<div class="header_logo_container">
				<span class="header_logo"><span class="glyphicon glyphicon-list-alt" style="color: #42BEE0 !important;"></span> X-Schedule <span style="font-size: 44px !important;">:</span> </span><span class="header_logo_sub">XML TASK DATABASE</span>
			</div>
		</div>
		
		<!-- Navbar -->
		<nav class="navbar navbar-default" role="navigation">
			<div class="container-fluid">
				<!-- Collapse-able nav menu for mobile/smaller screens -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#xschedule-navbar-collapse">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>

				<!-- Nav menu links -->
				<div class="collapse navbar-collapse" id="xschedule-navbar-collapse">
					<ul class="nav navbar-nav">
						<li><a href="index.php">Home</a></li>
						<li class="active"><a href="new_task.php">Create New Task</a></li>
						<li><a id="display_id" href="#">Display Tasks By ID</a></li>
						<li><a id="display_leader_participants" href="#">Display Tasks By Leader</a></li>
						<li><a id="search_by_status" href="#">Display Tasks By Status</a></li>
					</ul>
				</div>
			</div>
		</nav>
		
		<!-- Search Feature -->
		<!-- By ID -->
		<div class="search_by_id">
			<div class="search_container">
				<form class="form" role="form">
					<div class="form-group">
						<div class="margin_left">
							<label class="control-label">Search by ID</label>
							<input id="txt_search_by_id" type="text" class="form-control" placeholder="e.g. 001" />
							<button id="btn_search_by_id" type="button" class="btn btn-primary" style="margin-top: 5px;">Search</button>
							<button type="button" class="btn btn-info btn_reset" style="margin-top: 5px; margin-=left: 5px;">Reset</button>
						</div>
					</div>
				</form>
			</div>
		</div>
			
		<!-- By Leader / Participants -->
		<div class="search_by_leader_participants">
			<div class="search_container">
				<form class="form" role="form">
					<div class="form-group">
						<div class="margin_left">
							<label class="control-label">Search by Leader / Participants</label>
							<input id="txt_search_by_leader" name="txt_search_by_leader" type="text" class="form-control" placeholder="e.g. D. Graves" />
							<button id="btn_search_by_leader" type="button" class="btn btn-primary" style="margin-top: 5px;">Search</button>
							<button type="button" class="btn btn-info btn_reset" style="margin-top: 5px; margin-=left: 5px;">Reset</button>
						</div>
					</div>
				</form>
			</div>
		</div>
			
			
		<!-- By Task Status -->
		<div class="search_by_status">
			<div class="search_container">
				<form class="form" role="form">
					<div class="form-group">
						<div class="margin_left">
							<label class="control-label">Search by Status<span class="text-muted"></label>							
							<select id="txt_search_by_status" class="form-control">
								<option>New</option>
								<option>In Progress</option>
								<option>Done</option>
							</select>
							
							<button id="btn_search_by_status" type="button" class="btn btn-primary" style="margin-top: 5px;">Search</button>
							<button type="button" class="btn btn-info btn_reset" style="margin-top: 5px; margin-=left: 5px;">Reset</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		
		<!-- Content -->
		<div class="container">
			<form class="form" role="form" style="margin-top: 20px !important;">
				<div class="form-group col-lg-2">
					<!-- ID -->
					<label for="id" class="control-label">ID (Autofilled)</label>
					<div>
						<?php
							//Query the total node count and add + 1 to get our ID
							include('get_new_id.php');
							
							$newID = GetNewID();
						
							echo('<input type="text" class="form-control" id="id" value="' . $newID . '" disabled>');
						?>
					</div>
				</div>
				<div class="form-group col-lg-12">
					<!-- Title -->
					<label for="title" class="control-label">Title</label>
					<div>
						<input type="text" class="form-control" id="title" placeholder="e.g. Task #123...">
					</div>
				</div>
				<div class="form-group col-lg-5">
					<!-- Leader -->
					<label for="leader" class="control-label">Leader</label>
					<div>
						<input type="text" class="form-control" id="leader" placeholder="e.g. J. Smith...">
					</div>
				</div>
				<div class="form-group col-lg-5">
					<!-- Participants -->
					<label for="participants" class="control-label">Participants</label>
					<div>
						<input type="text" class="form-control" id="participants" placeholder="(Optional) J. Bloggs...">
					</div>
				</div>
				<div class="form-group col-lg-2">
					<!-- T.C.D -->
					<label for="tcd" class="control-label"><abbr title="Target Completion Date" class="initialism">T.C.D</abbr></label>
					<div>
						<input type="text" class="form-control" id="tcd" placeholder="e.g. 01-02-2014">
					</div>
				</div>
				<div class="form-group col-lg-12">
					<!-- Summary -->
					<label for="summary" class="control-label">Summary</label>
					<div>
						<input type="text" class="form-control" id="summary" placeholder="e.g. This task will...">
					</div>
				</div>
				<div class="form-group col-lg-10">
					<!-- URL -->
					<label for="url" class="control-label">URL</label>
					<div>
						<input type="text" class="form-control" id="url" placeholder="(Optional) http://www.google.com/">
					</div>
				</div>
				<div class="form-group col-lg-2">
					<!-- Status -->
					<label for="status" class="control-label">Status</label>
					<div>
						<select id="status" class="form-control">
							<option>New</option>
							<option>In Progress</option>
							<option>Done</option>
						</select>
					</div>
				</div>
				
				<!-- Submit -->
				<div class="form-group col-lg-12">				
					<br />
					<button id="btn_new_task" type="button" class="btn btn-success btn-lg btn-block">Submit</button>
				</div>
			</form>
		</div>
	
		<!-- Error area -->
		<div class="container">	
			<div id="error_area" class="alert alert-danger col-lg-10 col-lg-offset-1" role="alert">
				
			</div>
		</div>
		
		<!-- Footer -->
		<div class="footer_container">
			<div class="footer_text">
				<span>COM506 - <span class="footer_blue">Assignment 1</span> - Liam Logue</span>
			</div>
			<br />
			<br />
			<br />
			<br />
		</div>
		
		<!-- Load JS at the bottom of the page (faster page load) -->
		<script src="scripts/jquery-1.11.1.min.js"></script>
		<script src="scripts/bootstrap.min.js"></script>
		<script src="scripts/script.js"></script>
	</body>
</html>