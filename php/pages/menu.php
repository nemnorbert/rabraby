<?php $foodJSON = loadJSON('json/food.json');?>

<header id="foodHeader" style="background-image: url(<?= l1nk("./img/food1.webp") ?>);">
  <h1 class="title"><?= $langJSON["menu"]["food"]; ?></h1>
</header>


<div id="food" class="box">
  <?php buildFood($foodJSON, $langJSON, $siteJSON, $siteInfo, $userLang); ?>
</div>

<div id="popupWindow">
  <div class="box">
    <div id="popupCode" class="code btn"></div>
    <img id="popupCover" class="cover" src="" alt="">
    <div id="popupContent" class="content food">
      <div id="popupTitle" class="title"></div>
      <div id="popupPrice" class="price"></div>
      <div class="allergies">
        <b>Allergiákkk:</b>
        <div id="popupAllergy"></div>
      </div>
      <i class="bi bi-x-circle-fill popupExit"></i>
    </div>
  </div>
  <div class="background popupExit"></div>
</div>