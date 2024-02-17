<?php 
$foodJSON = loadJSON('json/food.json');
?>

<?= buildAlert($siteJSON, $siteINFO, $langJSON); ?>

<div id="home">
  <div class="main">
    <div class="title2">
      <?= buildContactIcon($siteJSON); ?>
    </div>
    <div class="title">
      <h1><?= $langJSON["title"]; ?>, Szentendre</h1>
      <p><?= $langJSON["home"]["welcome"]; ?></p>
      <div id="homeWidget">
        <?= buildBubble($langJSON); ?>
      </div>
    </div>
    <div id="homeCover">
      <img src="<?= $siteINFO->mainPath ?>img/cover.webp" alt="cover image of home page">
    </div>
  </div>
  <a class="secundary menu" href="<?= $siteINFO->link ?>menu">
    <div class="title2"><i class="bi bi-book-half"></i> <?= $langJSON["nav"]["menu"]; ?></div>
    <img src="<?= $siteINFO->mainPath ?>img/food_800px.webp" alt="Menu">
  </a>
  <div class="secundary openHours">
    <?= buildOpenHours($openAPI, $langJSON); ?>
  </div>
</div>

<div id="foodHome">
  <h2><?= $langJSON["menu"]["star"]; ?></h2>
  <?= foodContent(false, $langJSON, $siteINFO, $foodJSON); ?>
  <?= '<a class="btn" href="'.$siteINFO -> link.'menu"><i class="bi bi-book"></i> '.$langJSON["menu"]["show"].' ('.count($foodJSON["food"]).')</a>'; ?>
  <?php priceInfo($langJSON); ?>
</div>

<div id="reservation" class="container" style="background-image: url(<?= $siteINFO -> mainPath ?>./img/city_transparent.webp);">
  <div class="box">
    <h2><?= $langJSON["home"]["table"]["title"]; ?></h2>
    <?= buildReserve($langJSON); ?>
    <?= '<a class="phone" href="tel:'.$siteJSON["phone"].'">'.$siteJSON["phone"].'</a>'; ?>
    <?= '<p>'.$langJSON["home"]["table"]["online"].'</p>'; ?>
    <div class="contact">
      <?= buildContactIcon($siteJSON); ?>
    </div>
  </div>
</div>

<div id="aboutUs">

  <div class="about">
    <h2><?= $langJSON["about"]["title"]; ?></h2>
    <p><?= $langJSON["about"]["text"]; ?></p>
  </div>

  <div class="box">
    <img src="<?= $siteINFO->mainPath ?>img/balogh.webp" alt="Picture of Balogh Levente & Moldován András">
    <p>Balogh Levente & Moldován András</p>
  </div>
</div>

<div class="guest container">
  <?= buildGuest($langJSON); ?>
</div>

<div class="faq container">
  <?= buildFAQ($langJSON); ?>
</div>