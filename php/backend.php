<?php
$siteINFO = new stdClass();
$siteJSON = loadJSON('json/site.json');
$siteINFO -> langAvailable = $siteJSON["languages"]["site"];
$siteINFO -> langUser = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : false;

// Test Server?
if ($_SERVER['SERVER_NAME'] === 'localhost') {
    $preURL = '/rabraby';
    $siteINFO -> test = true;
    $siteINFO -> mainPath = $siteJSON["mainPath"]["test"];
    $siteINFO -> redcatPath = $siteJSON["redcatPath"]["test"];
} else {
    $preURL = '';
    $siteINFO -> test = false;
    $siteINFO -> mainPath = $siteJSON["mainPath"]["web"];
    $siteINFO -> redcatPath = $siteJSON["redcatPath"]["web"];
}

$requestURI = $_SERVER['REQUEST_URI'];
$requestURI = str_replace($preURL, '', $requestURI);
$parts = explode("?", $requestURI);
$parts = explode("/", $parts[0]);

if (in_array($parts[1], $siteINFO -> langAvailable)) {
    $siteINFO -> langSite = $parts[1];
    $siteINFO -> page = $parts[2];
    $siteINFO -> urlIso = true;
} else {
    $siteINFO -> langSite = in_array($siteINFO -> langUser, $siteINFO -> langAvailable) ? $siteINFO -> langUser : "en";
    $siteINFO -> page = count($parts) === 3 ? $parts[2] : $parts[1];
    $siteINFO -> urlIso = false;
}
$siteINFO -> page = $siteINFO -> page === "" ? "home" : $siteINFO -> page;
$langJSON = loadJSON('json/languages/'.$siteINFO -> langSite.'.json');

    // 404 Error
    if (!isset($langJSON["nav"][$siteINFO->page])) {
        errorExport("Error 404", $requestURI);
        header('Location: '.$siteINFO -> mainPath ."404");
    }

/*
echo '<pre>';
    print_r($parts);
    print_r($siteINFO);
    echo '----------';
echo '</pre>';
*/
?>