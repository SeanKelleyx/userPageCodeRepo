<?php
require_once __DIR__.'/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::create(__DIR__);;
$dotenv->load();
$error = '';

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

if(($_SERVER['REQUEST_METHOD'] === 'POST')){
       if(all_fields()) {
		try{
			$link = null;
			if(isset($_POST['link']) &&  $_POST['link'] != ''){
				$link = $_POST['link'];
			}
			$mysqli = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
			$stmt = $mysqli->prepare("INSERT INTO projects (name, image_url, project_type, reach, link_url, client, description, technologies, display_level) values (?,?,?,?,?,?,?,?,?)");
			$stmt->bind_param("ssssssssi", $_POST['name'], $_POST['image'], $_POST['projectType'], $_POST['reach'], $link, $_POST['client'], $_POST['description'], $_POST['technologies'], $_POST['displayLevel']);
			$stmt->execute();
			$stmt->close();
			mysqli_close($mysqli);

		} catch(Exception $e) {
			$error = 'Database Error';
		}
	}else{
		$error = 'Not all fields are present';
	}
}

?>
<style>
input[type=text],
textarea {
	width: 300px;
	max-width: 100%;
	margin-bottom: 20px;
}
textarea{
	height: 100px;
}
</style>
<h1>Local Admin Panel</h1>
<h2>Add Projects</h2>
<p>Errors: <?php echo $error; ?></p>
<form id="project-form" method="POST">
<input name="name" type='text' placeholder="name"/><br>
<input name="image" type="text" placeholder="relative url for image"/><br>
<input name="projectType" type="text" placeholder="Project type"/><br>
<input name="reach" type="text" placeholder="reach"/><br>
<input name="link" type="text" placeholder="url (optional)"/><br>
<input name="client" type="text" placeholder="client"/><br>
<textarea name="description"></textarea><br>
<input name="technologies" type="text" placeholder="technologies used"/><br>
<input name="displayLevel" type="text" placeholder="display level"/><br>
<input type="submit"/>
</form>
