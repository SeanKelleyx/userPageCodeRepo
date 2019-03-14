<?php
require_once __DIR__.'/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::create(__DIR__);;
$dotenv->load();

function all_fields(){
	return (
		isset($_POST['name']) && trim($_POST['name']) != '' &&
		isset($_POST['image']) && trim($_POST['image']) != '' &&
		isset($_POST['projectType']) && trim($_POST['projectType']) != '' &&
		isset($_POST['reach']) && trim($_POST['reach']) != '' &&
		isset($_POST['client']) && trim($_POST['client']) != '' &&
		isset($_POST['description']) && trim($_POST['description']) != '' &&
		isset($_POST['technologies']) && trim($_POST['technologies']) != '' &&
		isset($_POST['displayLevel']) && trim($_POST['displayLevel']) != ''
	);
}

if(($_SERVER['REQUEST_METHOD'] === 'POST') && all_fields()) {

	try {
		$mysqli = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
		$stmt = $mysqli->prepare("INSERT INTO projects (name, image_url, project_type, reach, link_url, client, description, technologies, display_level) values (?,?,?,?,?,?,?,?,?)");
		$stmt->bind_param("si", $_POST['name'], $_POST['image'], $_POST['projectType'], $_POST['reach'], $_POST['link'], $_POST['client'], $_POST['description'], $_POST['technologies'], $_POST['displayLevel']);
		$stmt->execute();
		$stmt->close();
		mysqli_close($mysqli);

	} catch(Exception $e) {
		error_log($e->getMessage());
		exit('Database Error');
	}

}else{
	exit('Not all fields are present');
}
