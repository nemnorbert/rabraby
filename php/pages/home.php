<header >
  <?= buildAlert($siteJSON, $siteLang); ?>

  <div id="infoBtns">
    <div class="btn">Manófalvi</div>
    <div class="btn">Jason Statham</div>
    <div class="btn">Kályha</div>
  </div>
</header>

<div class="welcome">
  <h1>Rab Ráby Restaurant</h1>
  <div class="content">
    <div class="openHours">
      <?= buildOpenHours($langJSON, $siteJSON); ?>
    </div>
  </div>
</div>

<div class="reserve">
  <div class="box">
    <h2><?= $langJSON["home"]["table"]["title"]; ?></h2>
    <?= buildReserve($langJSON); ?>
    <div class="contact">
      <?= buildContactIcon(); ?>
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
  <a target="_blank" href="<?= $siteInfo->mainPath ?>img/hitel.jpg">
  <img src="<?= $siteInfo->mainPath ?>img/hitel_mini.webp" loading="lazy" alt="Támogatott az EU és Magyarország kormánya">
  </a>
</div>