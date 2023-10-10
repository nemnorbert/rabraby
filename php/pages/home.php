<header id="home">
  <?= buildAlert($siteJSON, $siteINFO); ?>
  <div id="homeWidget"></div>
</header>

<div class="welcome">
  <div>
    <h1>Rab Ráby Restaurant</h1>
    <div><?= $langJSON["home"]["welcome"]; ?></div>
  </div>
  <div class="openHours">
    <?= buildOpenHours($langJSON, $siteJSON); ?>
  </div>
  <div>

  </div>
</div>

<div class="reserve">
  <div class="box">
    <h2><?= $langJSON["home"]["table"]["title"]; ?></h2>
    <?= buildReserve($langJSON); ?>
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

<div class="support">
  <a target="_blank" href="<?= $siteINFO->mainPath ?>img/hitel.jpg">
  <img src="<?= $siteINFO->mainPath ?>img/hitel_mini.webp" loading="lazy" alt="Támogatott az EU és Magyarország kormánya">
  </a>
</div>

<script src="<?= $siteINFO->mainPath ?>js/home.js"></script>