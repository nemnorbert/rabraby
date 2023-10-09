<!doctype html>
<html lang="<?= $siteINFO -> langSite ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?= $langJSON["meta"]["desc"]; ?>">
    
    <title><?= 'Rab Ráby, '.$langJSON["nav"][$siteINFO->page] ?></title>

    <meta property="og:title" content="<?= $langJSON["title"]; ?>" />
    <meta property="og:description" content="<?= $langJSON["meta"]["desc"]; ?>" />
    <meta property="og:url" content="https://rabraby.hu/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="" />

    <meta name="google-site-verification" content="0whkGTv_HMGrl7OIzwdiRY0IUc_0xuZKDGf0cgPywLw" />
    <link rel="alternate" hreflang="hu" href="https://rabraby.hu/hu/" />
    <link rel="alternate" hreflang="en" href="https://rabraby.hu/en/"/>
    <link rel="alternate" hreflang="x-default" href="https://rabraby.hu/en/" />

    <link rel="apple-touch-icon" sizes="180x180" href="<?= $siteINFO->mainPath ?>img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= $siteINFO->mainPath ?>img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= $siteINFO->mainPath ?>img/favicon/favicon-16x16.png">

    <link rel="stylesheet" href="<?= $siteINFO->mainPath ?>css/style.css?v=<?= time() ?>">
</head>
<body>

<nav id="primaryMenu">
  <img class="logo" src="<?= $siteINFO->mainPath ?>/img/logo/logo_black.webp" alt="Logo of Restaurant">
  <div id="hamburger" class="hamBtns"><span></span><span></span><span></span></div>
</nav>

<div id="secundaryMenu" data-visible="false">
  <div class="contact"><?= buildContactIcon($siteJSON); ?></div>
  <?= buildMenu($siteJSON, $siteINFO, $langJSON, "main"); ?>
  <div class="switch">
    <img class="lang" src="<?= $siteINFO->mainPath ?>img/flag/hu.svg" alt=""> 
    <img class="hamBtns" src="<?= $siteINFO->mainPath ?>img/icon/exit.svg" alt="">
  </div>
</div>

<?php mobileMenu($siteJSON, $siteINFO, $langJSON); ?>

<div id="preLoader">
  <img class="logo" src="<?= $siteINFO->mainPath ?>img/logo/logo_white.webp" alt="Logo of Restaurant">
</div>