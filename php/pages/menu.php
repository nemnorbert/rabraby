<?php 
  $foodJSON = loadJSON('json/food.json');
?>

<header id="foodHeader" style="background-image: url(<?= $siteINFO->mainPath ?>img/food1.webp);">
  <h1 class="title"><?= $langJSON["menu"]["food"]; ?></h1>
</header>


<div id="food" class="box">
  <?php buildFood($foodJSON, $langJSON, $siteJSON, $siteINFO); ?>
</div>

<?php if (isset($langJSON["menu"]["currency"])) {
  echo '<div class="infoPrice">*'.$langJSON["menu"]["currency"].'</div>';
} ?>

<?php require_once "php/modules/menuPopUp.php"; ?>