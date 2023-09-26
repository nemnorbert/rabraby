<header>
  <h1>Kapcsolat</h1>
</header>

<div class="contact bg1">
<div class="bg_main"></div>
  <div class="bg_blur"></div>
  <div class="inner_box">
    <h1 class="title"><?= $langJSON["contact"]["title"]; ?></h1>
    <div>
      <?php printContact(); ?>
    </div>
    <div class="social">
      <?php PrintSocial(); ?>
    </div>
  </div>
</div>

<div class="contact_info">
  <h2><i class="bi bi-info-circle"></i> <?= $langJSON["contact"]["cinfo"]; ?></h2>
  <div>
    <p><b><?= $siteJSON["bank"]["company"] ?></b> <?= $siteJSON["bank"]["account"] ?></p>
    <p><b><?= $langJSON["contact"]["vat"]; ?>:</b> <?= $siteJSON["bank"]["vatNum"] ?></p>
    <p><b><?= $langJSON["contact"]["vreg"]; ?>:</b> <?= $siteJSON["bank"]["regNum"] ?></p>
    <p><b>SWIFT:</b> <?= $siteJSON["bank"]["swift"] ?></p>
    <p><b>IBAN:</b> <?= $siteJSON["bank"]["iban"] ?></p>
  </div>
</div>