<div class="bg1 other_page sitemap">
<div class="bg_main"></div>
    <div class="inner_window f0">
        <?php 
            if (isset($error404)) {
                echo '<h1 class="title">'. $langJSON["nav"]["404"]["title"].'</h1>
                <h2>'. $langJSON["nav"]["404"]["desc"].'</h2>
                <p>'. $langJSON["nav"]["404"]["desc_2"].'</p>';
            } else {
                echo '<h1 class="title">'.$langJSON["nav"]["sitemap"].'</h1>';
            }
        ?>
        <ul class="btn5 f0">
            <?php 
                //PrintMenu($local, $language, $lang_data, $page); 
            ?>
            <?php 
                //PrintMenu2($local, $language, $lang_data, $page); 
            ?>
        </ul>
        <?php PrintSocial(); ?>
    </div>
</div>