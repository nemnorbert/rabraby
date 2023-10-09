<footer>
  <div class="social">
    <div><?= $langJSON["footer"]["social"]; ?></div>
    <div class="content"><?= buildContactIcon($siteJSON); ?></div>
  </div>

  <div class="middle">
    <div>
      <img class="logo" src="<?= $siteINFO->mainPath ?>img/logo/logo_white.webp" alt="">
      <div>anno 1982</div>
    </div>
    <div>
      <div class="openHours">
        <?= buildOpenHours($langJSON, $siteJSON); ?>
      </div>
    </div>
    <div>
  
    </div>
    <div class="contact">
      <?= buildContactbase($siteJSON, $langJSON); ?>
    </div>
  </div>

  <div class="bottom">
    <?= buildMenu($siteJSON, $siteINFO, $langJSON, "other"); ?>
    <a class="creator" href="<?= $siteJSON["creator"]["url"] ?>">Powered by <img class="logo" src="<?= $siteINFO->redcatPath ?>img/logo/logo1.png" alt="logo of creator"></a>
  </div>
</footer>



<script>
let siteINFO = {
    language: "<?= $siteINFO -> langSite; ?>",
    mainPath: "<?= $siteINFO->mainPath; ?>",
    redcatPath: "<?= $siteINFO->redcatPath; ?>",
};
</script>
<script src="<?= $siteINFO->mainPath ?>js/main.js?v=<?= time() ?>"></script>
<?php
  if ($siteINFO->page === "menu") {
    echo '<script src="'.$siteINFO->mainPath.'js/menu.js?v='.time().'"></script>';
  }
?>
</body>
</html>