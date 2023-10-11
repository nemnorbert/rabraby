<header id="home">
  <?= buildAlert($siteJSON, $siteINFO); ?>
  <div id="homeWidget"></div>
</header>

<div class="welcome">
  <div class="text">
    <h1><?= $langJSON["title"]; ?></h1>
    <h3>Szentendre</h3>
    <h4>anno 1982</h4>
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

<div class="reserve">
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

<div class="guest">
  <?= buildGuest($langJSON); ?>
</div>

<div class="faq">
  <?= buildFAQ($langJSON); ?>
</div>

<script src="<?= $siteINFO->mainPath ?>js/home.js"></script>