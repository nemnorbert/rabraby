<main>
<?php
    $file = "php/pages/" . $siteINFO->page . ".php";

    if (is_file($file)) {
        require_once $file;
    } else {
        require_once "php/pages/404.php";
    }
?>
</main>