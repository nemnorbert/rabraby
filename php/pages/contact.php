<header id="contactHeader" style="background-image: url(<?= $siteINFO -> mainPath ?>./img/contact.jpg);">
  <div class="content contact">
    <h1><?= $langJSON["contact"]["title"] ?></h1>
    <div class="infos"><?= buildContactbase($siteJSON, $langJSON); ?></div>
    <div class="social"><?= buildContactIcon($siteJSON); ?></div>
  </div>
</header>

<div class="companyContent">
  <div class="companyInfo container">
    <h2><?= $langJSON["company"]["title"]; ?></h2>
    <?= buildCompanyInfos($langJSON, $siteJSON); ?>
  </div>

  <div class="faq container">
    <?= buildFAQ($langJSON); ?>
  </div>
</div>