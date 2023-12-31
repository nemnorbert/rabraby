<footer>
  <div class="social">
    <div><?= $langJSON["footer"]["social"]; ?></div>
    <div class="content"><?= buildContactIcon($siteJSON); ?></div>
  </div>

  <div class="middle">
    <div class="first">
      <img class="logo" src="<?= $siteINFO->mainPath ?>img/logo/logo_white.webp" alt="Logo of Restaurant (White)">
      <div>anno 1982</div>
    </div>

    <div class="contact">
      <b class="title"><?= $langJSON["contact"]["title"]; ?></b>
      <?= buildContactbase($siteJSON, $langJSON); ?>
    </div>

    <div class="openHours">
          <?= buildOpenHours($openAPI, $langJSON); ?>
    </div>

    <div class="support">
      <a target="_blank" href="<?= $siteINFO->mainPath ?>img/hitel.jpg">
        <img src="<?= $siteINFO->mainPath ?>img/hitel_mini.webp" loading="lazy" alt="Támogatott az EU és Magyarország kormánya">
      </a>
    </div>
  </div>

  <div class="bottom">
    <div class="menu">
      <?= buildMenu($siteJSON, $siteINFO, $langJSON, "other"); ?>
    </div>
    <a target="_blank" class="creator" href="<?= $siteJSON["creator"]["url"] ?>">Powered by <img class="logo" src="<?= $siteINFO->redcatPath ?>img/logo/logo1.png" alt="logo of creator"></a>
  </div>
</footer>

<div id="popUp" style="display: none;">
  <div id="popUpContent"></div>
  <div class="background popupExit"></div>
</div>

<script src="<?= $siteINFO->mainPath ?>js/main.js?v=<?= time() ?>"></script>
<?php
  if ($siteINFO->page === "menu" OR $siteINFO->page === "home") {
    echo '<script src="'.$siteINFO->mainPath.'js/menu.js?v='.time().'"></script>';
  }
?>
</body>
</html>