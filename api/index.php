<?php
// Functions
require_once 'functionsAPI.php';

$apis = ["food", "drink"];
$requestURI = $_SERVER['REQUEST_URI'];
$parts = explode("?", $requestURI);
$parts = explode("/api/", $parts[0]);

// Redirect to API
if (isset($parts[1]) && in_array($parts[1], $apis)) {
    require_once $parts[1].'API.php';
} else {
    echo "API Not found";
}
?>