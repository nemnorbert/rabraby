<header id="contactHeader" style="background-image: url(<?= l1nk("./img/contact.jpg") ?>);">
  <div class="content contact">
    <h1><?= $langJSON["contact"]["title"] ?></h1>
    <div class="infos"><?= buildContactbase(); ?></div>
    <div class="social"><?= buildContactIcon(); ?></div>
  </div>
</header>
<div class="companyInfo">
  <h2><?= $langJSON["company"]["title"]; ?>:</h2>
  <h3>Rab Ráby Kft.</h3>
  <?= buildCompanyInfos(); ?>
</div>