<?php $foodJSON = loadJSON('json/food.json');?>

<header id="foodHeader" style="background-image: url(<?= l1nk("./img/food1.webp") ?>);">
  <h1 class="title"><?= $langJSON["menu"]["food"]; ?></h1>
</header>


<div id="food" class="box">
  <?php buildFood($foodJSON); ?>
</div>