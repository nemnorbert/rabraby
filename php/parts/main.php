<main>
<?php
if (isset($siteINFO->page) && is_string($siteINFO->page)) {
    $file = "php/pages/" . $siteINFO->page . ".php";

    if (is_file($file)) {
        require_once $file;
    } else {
        require_once "php/pages/404.php";
        errorExport("Error 404", $requestURI);
    }
} else {
    require_once "php/pages/home.php";
}
?>
</main>