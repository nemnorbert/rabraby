<?php
$siteINFO = new stdClass();
$siteJSON = loadJSON('json/site.json');
$siteINFO -> langAvailable = $siteJSON["languages"];
$siteINFO -> langUser = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : false;
$siteINFO -> redirect = false;
$currencyJSON = "";

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

if (in_array($parts[1], $siteINFO -> langAvailable) && isset($parts[2])) {
    $siteINFO -> langSite = $parts[1];
    $siteINFO -> page = $parts[2];
} else {
    $siteINFO -> langSite = in_array($siteINFO -> langUser, $siteINFO -> langAvailable) ? $siteINFO -> langUser : "en";
    $siteINFO -> page = count($parts) === 3 ? $parts[2] : $parts[1];
    $siteINFO -> redirect = true;
}

$siteINFO -> page = $siteINFO -> page === "" ? "home" : $siteINFO -> page;
$langJSON = loadJSON('json/languages/'.$siteINFO -> langSite.'.json');

// 404 Error
if (!isset($langJSON["nav"][$siteINFO->page])) {
    exportIT("Error404", $requestURI);
    $siteINFO -> page = "404";
}

$siteINFO -> link = $siteINFO -> mainPath . $siteINFO -> langSite . '/';


// Redirect it? If yes go other page
if ($siteINFO -> redirect) {
    urlRedirect($siteINFO);
}

// Load Open Hours
try {
    $pre = $siteINFO->test ? "http://localhost/redcat_api/" : "https://api.red-cat.hu/";
    $openAPI = loadJSON($pre."openTime?id=rabraby&lang=".$siteINFO -> langSite);
} catch (\Throwable $th) {
    $openAPI = false;
}

/*
echo '<pre>';
print_r($parts);
print_r($siteINFO);
echo '----------';
echo '</pre>';
*/
?>