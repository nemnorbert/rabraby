<footer>
  <div class="social">
    <div><?= $langJSON["footer"]["social"]; ?></div>
    <div class="content"><?php PrintSocial(); ?></div>
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
    <div>
      Kapcsolat
      +36205200000
    </div>
  </div>

  <div class="bottom">
    <?= buildMenu($siteJSON, "other"); ?>
    <a href="#">Powered by REDCAT</a>
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
</body>
</html>