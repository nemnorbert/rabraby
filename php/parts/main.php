<main>
<?php
if (isset($siteINFO->page) && is_string($siteINFO->page)) {
    $page = $siteINFO->page;
    $file = "php/pages/" . $page . ".php";

    if (is_file($file)) {
        require_once $file;
    } else {
        require_once "php/pages/404.php";
    }
} else {
    require_once "php/pages/home.php";
}
?>
</main>