<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to_email = "jotaworks.webdevelopment@gmail.com";
    $subject = "New Form Submission";
    $headers = "From: jotaworks.webdevelopment@gmail.com"; // Replace with info@ email when I create it

    // Collect form data
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $services = $_POST["services"];
    $email = $_POST["email"];

    // Compose the email message
    $message = "First Name: $first_name\n";
    $message .= "Last Name: $last_name\n";
    $message .= "Services: $services\n";
    $message .= "Email: $email\n";

    // Send email
    if (mail($to_email, $subject, $message, $headers)) {
        echo "Email sent successfully";
    } else {
        echo "Email failed to send";
    }
} else {
    echo "Invalid request";
}
?>