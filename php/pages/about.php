<div class="about bg1">
<div class="bg_main"></div>
  <div class="bg_blur"></div>
  <div class="inner_box">
    <h1 class="title"><?= $langJSON["about"]["title"]; ?></h1>
    <p><?= $langJSON["about"]["desc"]; ?></p>
  </div>
</div>

<div class="vip">

  <div class="left">
    <img src="<?= $siteInfo->mainPath ?>img/vip.jpg" loading="lazy" alt="">
  </div>
  
  <div class="right">
    <p><?= $langJSON["about"]["vip"]; ?></p>
  </div>

</div>

<?php if ($siteLang === "hu") {require_once "php/modules/faq.php";} ?>

<?php require_once "php/modules/guest.php"; ?>