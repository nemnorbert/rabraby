<footer>
  <div class="social">
    <div><?= $langJSON["footer"]["social"]; ?></div>
    <div class="content"><?php PrintSocial(); ?></div>
  </div>

  <div class="middle">
    <div>
      <img class="logo" src="./img/logo_white.png" alt="">
      <div>anno 1982</div>
    </div>
    <div>
      Haha
    </div>
    <div>
      hihi
    </div>
    <div>
      Ez is jo
    </div>
  </div>

  <div class="bottom">
    <div class="menu">Menu </div>
    <div class="creator">Powered By REDCAT</div>
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