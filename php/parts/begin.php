<!doctype html>
<html lang="<?= $siteLang ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?= $langJSON["meta_desc"]; ?>">
    
    <title><?= 'Rab Ráby, '.$langJSON["nav"][$siteInfo->page] ?></title>

    <meta property="og:title" content="<?= $langJSON["title"]; ?>" />
    <meta property="og:description" content="<?= $langJSON["meta_desc"]; ?>" />
    <meta property="og:url" content="https://rabraby.hu/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="" />

    <meta name="google-site-verification" content="0whkGTv_HMGrl7OIzwdiRY0IUc_0xuZKDGf0cgPywLw" />
    <link rel="alternate" hreflang="hu" href="https://rabraby.hu/" />
    <link rel="alternate" hreflang="en" href="https://rabraby.hu/en/"/>
    <link rel="alternate" hreflang="x-default" href="https://rabraby.hu/en/" />

    <link rel="apple-touch-icon" sizes="180x180" href="<?= $siteInfo->mainPath ?>img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= $siteInfo->mainPath ?>img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= $siteInfo->mainPath ?>img/favicon/favicon-16x16.png">

    <link rel="stylesheet" href="<?= $siteInfo->mainPath ?>css/style.css?v=<?= time() ?>">
</head>
<body>

<nav  id="mainMenu">
  <img class="logo" src="./img/logo.png" alt="">
  <div id="hamburger"><span></span><span></span><span></span></div>
</nav>

<?php mobileMenu($siteJSON, $siteInfo); ?>

<div id="pre_loader">
  <div class="logo"><span class="rr">Rab Ráby</span><br>Restaurant</div>
  <p><?= $langJSON["loading"]; ?></p>
</div>