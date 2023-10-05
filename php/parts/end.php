<footer>
  <div class="social">
    <div><?= $langJSON["footer"]["social"]; ?></div>
    <div class="content"><?= buildContactIcon(); ?></div>
  </div>

  <div class="middle">
    <div>
      <img class="logo" src="./img/logo/logo_white.webp" alt="">
      <div>anno 1982</div>
    </div>
    <div>
      Nyitvatartás
    </div>
    <div>
  
    </div>
    <div class="contact">
      <?= buildContactbase(); ?>
    </div>
  </div>

  <div class="bottom">
    <?= buildMenu($siteJSON, $siteInfo, "other"); ?>
    <a class="creator" href="<?= $siteJSON["creator"]["url"] ?>">Powered by <img class="logo" src="<?= $siteInfo->redcatPath ?>img/logo/logo1.png" alt="logo of creator"></a>
  </div>
</footer>



<script>
let siteData = {
    provider: "RAB RÁBY Kft.",
    language: "<?= $siteLang; ?>",
    mainPath: "<?= $siteInfo->mainPath; ?>",
    redcatPath: "<?= $siteInfo->redcatPath; ?>",
    cookieConsent: {
      "necessary": ["cookie_consent_accepted", "cookie_consent_level"],
      "functionality": ["language"],
      "tracking": ["_ga"],
      "targeting": []
    }
};
</script>
<script src="<?= $siteInfo->mainPath ?>js/main.js?v=<?= time() ?>"></script>
<?php
  if ($siteInfo->page == "menu") {
    echo '<script src="'.$siteInfo->mainPath.'js/menu.js?v='.time().'"></script>';
  }
?>
</body>
</html>