<?php
require_once __DIR__.'/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::create(__DIR__ .'/../../');;
$dotenv->load();


function error(){
	echo json_encode(array('success' => false));
	die;
}

if(($_SERVER['REQUEST_METHOD'] === 'POST')){
	if(empty($_POST['passcode'])){
		error();
	}

	$passcode = trim($_POST['passcode']);
	$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']); 

	if(! $conn ) {
		error();
	}
	$stmt = $conn->prepare("SELECT * FROM codes WHERE code = ?");
	//$stmt->bind_param("s", trim($_POST['passcode']));
	//$passcode = 'skaccess05';
	$stmt->bind_param("s", $passcode);
	$stmt->execute();
	$result = $stmt->get_result();
	$row = $result->fetch_array(MYSQLI_ASSOC);

	//echo(json_encode($row));

	$stmt = $conn->prepare("SELECT * FROM projects WHERE display_level <= ? ORDER BY date DESC");
	$stmt->bind_param("s", $row['level']);
	$stmt->execute();
	$result = $stmt->get_result();
	$projects = '';
	$modals = '';
	while($project = $result->fetch_array(MYSQLI_ASSOC)){	
		ob_start();
		include('parts/project-grid.php');
		$projects .= ob_get_clean();
		ob_start();
		include('parts/project-modal.php');
		$modals .= ob_get_clean();
		//echo json_encode($projects);
	}

	$response = array(
		'success'=> true,
		'projects' => $projects,
		'modals' => $modals,
	);
	echo json_encode($response);
}else{
	error();
}
