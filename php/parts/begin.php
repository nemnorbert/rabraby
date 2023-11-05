<!doctype html>
<html lang="<?= $siteINFO -> langSite ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?= $langJSON["meta"]["desc"]; ?>">
    <meta name="theme-color" content="hsl(34, 49%, 63%)">
    <title><?= $langJSON["title"].', '.ucfirst($langJSON["nav"][$siteINFO->page]).' ('.$siteINFO -> langSite.')'; ?></title>

    <meta property="og:title" content="<?= $langJSON["title"]; ?>">
    <meta property="og:description" content="<?= $langJSON["meta"]["desc"]; ?>">
    <meta property="og:url" content="https://rabraby.hu/">
    <meta property="og:type" content="website">
    <meta property="og:image" content="">

    <?= buildGoogleMeta($siteINFO); ?>
    
    <link rel="apple-touch-icon" sizes="180x180" href="<?= $siteINFO->mainPath ?>img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= $siteINFO->mainPath ?>img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= $siteINFO->mainPath ?>img/favicon/favicon-16x16.png">

    <link rel="stylesheet" href="<?= $siteINFO->mainPath ?>css/style.css?v=<?= time() ?>">
</head>
<body>
<script>
  let siteINFO = {
      language: "<?= $siteINFO -> langSite; ?>",
      mainPath: "<?= $siteINFO->mainPath; ?>",
      redcatPath: "<?= $siteINFO->redcatPath; ?>",
      page: "<?= $siteINFO->page; ?>",
  };
</script>

<div id="preLoader">
  <img class="logo" src="<?= $siteINFO->mainPath ?>img/logo/logo_white.webp" alt="Logo of Restaurant">
  <img class="loading" src="<?= $siteINFO->mainPath ?>img/loading.webp" alt="Loading Image">
</div>

<nav id="primaryMenu">
  <a class="logo" href="<?= $siteINFO->link."home" ?>">
    <img src="<?= $siteINFO->mainPath ?>img/logo/logo_black.webp" alt="Logo of Restaurant">
  </a>
  
  <div class="right">
    <div class="menu">
      <?= buildMenu($siteJSON, $siteINFO, $langJSON, "main"); ?>
    </div>
    <div id="flag">
      <img src="<?= $siteINFO->mainPath ?>img/flag/<?= $siteINFO->langSite ?>.svg" alt="language switcher">
    </div>
    <div id="hamburger" class="hamBtns"><span></span><span></span><span></span></div>
  </div>
</nav>

<div id="secundaryMenu" data-visible="false">
  <div class="contact"><?= buildContactIcon($siteJSON); ?></div>
    <div class="menu">
      <?= buildMenu($siteJSON, $siteINFO, $langJSON, "main"); ?>
    </div>
  <div class="switch">
    <img class="hamBtns" src="<?= $siteINFO->mainPath ?>img/icon/exit.svg" alt="Exit icon">
  </div>
</div>

<?php mobileMenu($siteJSON, $siteINFO, $langJSON); ?>