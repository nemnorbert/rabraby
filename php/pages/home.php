<header>
  <?= buildAlert($siteJSON, $siteLang); ?>

</header>

<div class="welcome g0">
  <h1 class="title">Rab Ráby <?= $langJSON["restaurant"]; ?>, Szentendre (<?= $langJSON["since"]; ?>)</h1>

  <div class="hello f0">
    <div class="only_pc"><i class="bi bi-cup-hot-fill"></i></div>
    <p><?= $langJSON["home"]["welcome"]; ?></p>
  </div>

  <div class="other f0">
    <?= '<a class="faq btn" href="#faq"><i class="bi bi-question-circle-fill"></i> '.$langJSON["home"]["faq"].'</a>'; ?>
    <a class="btn faq" href="parking"><i class="bi bi-p-circle-fill"></i> <?= $langJSON["home"]["parking"]; ?></a>
  </div>
</div>

<div class="food_home">
  <h2 class="title"><?= $langJSON["home"]["food"]; ?></h2>
  <div class="f0">
    <img src="<?= $siteInfo->mainPath ?>img/food/01.webp" loading="lazy" alt="<?= $langJSON["alt"]["food_1"]; ?>">
    <img src="<?= $siteInfo->mainPath ?>img/food/02.webp" loading="lazy" alt="<?= $langJSON["alt"]["food_2"]; ?>">
    <img src="<?= $siteInfo->mainPath ?>img/food/03.webp" loading="lazy" alt="<?= $langJSON["alt"]["food_3"]; ?>">
    <img src="<?= $siteInfo->mainPath ?>img/food/04.webp" loading="lazy" alt="<?= $langJSON["alt"]["food_4"]; ?>">
  </div>
  <a href="menu" class="btn"><i class="bi bi-book-half"></i> <?= $langJSON["home"]["menu"]; ?></a>
</div>

<div class="table bg1">
  <div class="bg_blur"></div>
  <div class="inner_box">
    <h2 class="title"><?= $langJSON["home"]["table"]; ?></h2>
    <p><?= $langJSON["home"]["table2"]; ?></p>
    <p><?= $langJSON["home"]["table3"]; ?></p>
    <?php PrintSocial(); ?>
  </div>
</div>

<div class="about_home bg1">
  <div class="inner_box">
    <h2 class="title"><?= $langJSON["about"]["title"]; ?></h2>
    <p><?= $langJSON["about"]["desc"]; ?></p>
  </div>
</div>

<?php 
  require_once "php/modules/guest.php"; 
  require_once "php/modules/faq.php";
?>

<div class="eu">
  <div class="image"><a target="_blank" href="<?= $siteInfo->mainPath ?>img/hitel.jpg"><img src="<?= $siteInfo->mainPath ?>img/hitel_mini.webp" loading="lazy" alt="<?= $langJSON["alt"]["loan"]; ?>"></a></div>
</div>