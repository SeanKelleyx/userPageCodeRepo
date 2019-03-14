<?php
require '../vendor/autoload.php';
use \Mailjet\Resources;
$mj = new \Mailjet\Client('5f0611959399da35b02d2176ea59abd2', '16be4ef105f563a07895e7d2ddd717a9');

// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)){
   echo "No arguments Provided!";
   return false;
}
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 's.kelley27@gmail.com';
$email_subject = "Portfolio Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nIP: " . $_SERVER['REMOTE_ADDR'] . "\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$email_body_html = '<h4>You have received a new message from you website contact form.</h2><p>Here are the details:</p><ul><li>IP: ' . $_SERVER['REMOTE_ADDR'] . '<li>Name:  '.$name.'</li><li>Email: '.$email_address.'</li><li>Phone: '.$phone.'</li></ul><p><u>Message:</u> '.$message.'</p>'; 
if(isset($_POST['company'])){
	$email_body .= "\nCompany: " . $_POST['company'];
	$email_body_html .= "<br>Company: " . $_POST['company'];
}
$body = [
    'FromEmail' => "noreply@seankelley.tech",
    'FromName' => "Resume Website",
    'Subject' => "Portfolio Website Contact Form: ",
    'Text-part' => $email_body,
    'Html-part' => $email_bodyi_html,
    'Recipients' => [
        [
            'Email' => "s.kelley27@gmail.com"
        ]
    ]
];

$response = $mj->post(Resources::$Email, ['body' => $body]);
return $response->success()  
?>
