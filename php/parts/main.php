<main>
<?php
$page = isset($siteINFO->page) ? $siteINFO->page : "home";
$file = "php/pages/" . $page . ".php";

if (is_file($file)) {
    require_once $file;
} else {
    require_once "php/pages/404.php";
}
?>
</main>