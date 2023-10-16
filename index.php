<?php
set_include_path( $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR );
date_default_timezone_set('Europe/Budapest');

require_once "php/functions.php";
require_once "php/backend.php";

require_once "php/parts/begin.php";
require_once "php/parts/main.php";
require_once "php/parts/end.php";
?>