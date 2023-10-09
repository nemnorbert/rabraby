<header id="sitemap">
    <?php 
        if (isset($error404)) {
            echo '<h1>'. $langJSON["404"]["title"].'</h1>
            <h2>'. $langJSON["404"]["desc"].'</h2>';
        } else {
            echo '<h1>'.$langJSON["nav"]["sitemap"].'</h1>';
        }

        echo '<div class="menu">'.buildMenu($siteJSON, $siteINFO, $langJSON, "main");
        echo buildMenu($siteJSON, $siteINFO, $langJSON, "other").'</div>';
    ?>
</header>