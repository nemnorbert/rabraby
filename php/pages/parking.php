<div class="bg1 parking">
<div class="bg_main"></div>
    <div class="inner_window f0">
        <h1 class="title"><?= $langJSON["home"]["parking2"]; ?></h1>
        <p><?= $langJSON["home"]["parking3"]; ?></p>
        <div class="f0">
            <b><?= $langJSON["park"]["navi"]; ?>:</b>
            <a class="btn" target="_blank" href="https://goo.gl/maps/TkLoKxx2CiqshpTw7"><i class="bi bi-p-circle-fill"></i> <?= $langJSON["park"]["car"]; ?></a>
            <a class="btn" target="_blank" href="https://goo.gl/maps/NRjDn6Wge79cRHr96"><i class="bi bi-bicycle"></i> <?= $langJSON["park"]["walk"]; ?></a>
        </div>
        <a target="_blank" href="<?= $siteInfo->mainPath ?>img/parking.webp"><img src="<?= $siteInfo->mainPath ?>img/parking.webp" loading="lazy" alt="parking map of szentendre"></a>
        <a class="btn" target="_blank" href="https://szentendre.hu/parkolas/"><i class="bi bi-info-circle"></i> <?= $langJSON["home"]["moreinfo"]; ?></a>
    </div>
</div>