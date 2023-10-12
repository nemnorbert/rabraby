<header id="home" style="background-image: url(<?= $siteINFO -> mainPath ?>./img/header.jpg);">
  <?= buildAlert($siteJSON, $siteINFO); ?>
  <div id="homeWidget"></div>
</header>

<div id="welcome" class="container">
  <div class="text">
    <h1><?= $langJSON["title"]; ?></h1>
    <h3>anno 1982</h3>
    <p><?= $langJSON["home"]["welcome"]; ?></p>
  </div>
  <div class="openHours">
    <?= buildOpenHours($langJSON, $siteJSON); ?>
  </div>
  <div class="important">
    <div>Meleg kandaló</div>
    <div>Kutyabarát hely</div>
    <div>Szépkártya elfogadóhely</div>
  </div>
</div>

<div id="reservation" class="container" style="background-image: url(<?= $siteINFO -> mainPath ?>./img/contact.jpg);">
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

<div id="aboutUs" class="container">

  <div class="box">
    <h2><?= $langJSON["about"]["title"]; ?></h2>
    <p><?= $langJSON["about"]["text"]; ?></p>
  </div>

  <div class="box video">
    <h2><?= $langJSON["about"]["video"]; ?></h2>
    <div>
      <a target="_blank" href="#"><img src="<?= $siteINFO->mainPath ?>/img/video1.webp" alt="Video 01"></a>
      <a target="_blank" href="#"><img src="<?= $siteINFO->mainPath ?>/img/video2.webp" alt="Video 02"></a>
    </div>
  </div>

  <div class="box vip">
    <img src="<?= $siteINFO->mainPath ?>/img/vip.jpg" alt="VIP">
    <p><?= $langJSON["about"]["vip"]; ?></p>
  </div>
</div>

<div class="guest" class="container">
  <?= buildGuest($langJSON); ?>
</div>

<div class="faq">
  <?= buildFAQ($langJSON); ?>
</div>

<script src="<?= $siteINFO->mainPath ?>js/home.js"></script>