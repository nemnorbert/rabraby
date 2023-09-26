<main>
<?php
$page = (isset($siteInfo->page)) ? $siteInfo->page : "home";
$file = "php/pages/" . $page . ".php";

if (is_file($file)) {
    require_once $file;
} else {
    require_once "php/pages/404.php";
    $error404 = true;
}
?>
</main>