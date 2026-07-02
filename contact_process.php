<?php

    $to = "professawsmediahouse@gmail.com,gonyebrian0@gmail.com";
    $from = filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL);
    $name = htmlspecialchars(strip_tags(trim($_REQUEST['name'])));
    $subject = htmlspecialchars(strip_tags(trim($_REQUEST['subject'])));
    $number = htmlspecialchars(strip_tags(trim($_REQUEST['number'])));
    $cmessage = htmlspecialchars(strip_tags(trim($_REQUEST['message'])));

    if (!$from) {
        $from = 'no-reply@professawsmediahouse.com';
    }

    $headers = "From: " . $from . "\r\n";
    if (filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: " . $_REQUEST['email'] . "\r\n";
    }
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    $email_subject = "You have a message from Professaw's Media House.";

    $logo = 'img/logo.png';
    $link = '#';

	$body = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Express Mail</title></head><body>";
	$body .= "<table style='width: 100%;'>";
	$body .= "<thead style='text-align: center;'><tr><td style='border:none;' colspan='2'>";
	$body .= "<a href='{$link}'><img src='{$logo}' alt=''></a><br><br>";
	$body .= "</td></tr></thead><tbody><tr>";
	$body .= "<td style='border:none;'><strong>Name:</strong> {$name}</td>";
    $body .= "<td style='border:none;'><strong>Email:</strong> " . ($from !== 'no-reply@professawsmediahouse.com' ? $_REQUEST['email'] : 'Invalid email provided') . "</td>";
    $body .= "</tr>";
    $body .= "<tr><td style='border:none;'><strong>Phone:</strong> {$number}</td></tr>";
    $body .= "<tr><td style='border:none;'><strong>Subject:</strong> {$subject}</td></tr>";
    $body .= "<tr><td></td></tr>";
    $body .= "<tr><td colspan='2' style='border:none;'>{$cmessage}</td></tr>";
    $body .= "</tbody></table>";
    $body .= "</body></html>";

    $send = mail($to, $email_subject, $body, $headers);

    if ($send) {
        echo 'success';
        exit;
    }

    http_response_code(500);
    echo 'error';
?>