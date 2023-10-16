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

$ready = in_array($parts[1], $siteINFO -> langAvailable);
if ($ready) {
    $siteINFO -> langSite = $parts[1];
    $siteINFO -> page = $parts[2];
    $langJSON = loadJSON('json/languages/'.$siteINFO -> langSite.'.json');
} else {
    if (!in_array($siteINFO -> langUser, $siteINFO -> langAvailable) && $siteINFO -> langUser) {
        errorExport("No User Lang: ".$siteINFO -> langUser, $requestURI);
    }

    $siteINFO -> langSite = in_array($siteINFO -> langUser, $siteINFO -> langAvailable) ? $siteINFO -> langUser : "en";
    $siteINFO -> page = count($parts) === 3 ? $parts[2] : $parts[1];
    header('Location: '.$siteINFO -> mainPath . $siteINFO -> langSite . "/" . $siteINFO -> page);
}

/*
echo '<pre>';
    print_r($parts);
    print_r($siteINFO);
echo '</pre>';

// Scan URL
function scanURL($siteINFO, $siteJSON) {
    $available = $siteJSON['languages']['site'];
    $langUser = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : "en";
    $bad = false;

    $url = $_SERVER['REQUEST_URI'];
    $parts = explode("?", $url);
    $parts = explode("/", $parts[0]);
    
    // Test or Live
    $test = (strtolower($parts[1]) === "rabraby") ? true : false;
    if ($test) {
        $siteINFO -> mainPath = $siteJSON["mainPath"]["test"];
        $siteINFO -> redcatPath = $siteJSON["redcatPath"]["test"];
    } else {
        $siteINFO -> mainPath = $siteJSON["mainPath"]["web"];
        $siteINFO -> redcatPath = $siteJSON["redcatPath"]["web"];
    }

    //
    if (count($parts) >= 3 && in_array(strtolower($parts[2]), $available)) {
        $i = $test ? 3 : 2;
        $siteINFO->langURL = strtolower($parts[2]);
    } else {
        $i = $test ? 2 : 2;
        $bad = true;
    }

    // Out
    $siteINFO -> page = ($parts[$i] !== "") ? $parts[$i] : "home";
    $siteINFO -> test = $test;

    if ($bad) {
        $iso = in_array($langUser, $available) ? $langUser : "en";
        $newURL = 'Location: '.$siteINFO -> mainPath . $iso . "/" . $siteINFO -> page;
        header($newURL);
        exit;
    }
}

// Language Detection
function langDetect($siteINFO, $siteJSON) {
    global $langJSON;
    $available = $siteJSON['languages']['site'];
    $siteLang = "en"; $userLang = "en";

    if (isset($siteINFO->langURL)) {
        if (in_array($siteINFO->langURL, $available)) {
            $siteLang = $siteINFO->langURL;
        }
    } else if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        $userLang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

        if (in_array($userLang, $available)) {
            $siteLang = $userLang;
        }
    }

    // Out
    $langJSON = loadJSON('json/languages/'.$siteLang.'.json');
    $siteINFO -> langUser = $userLang;
    $siteINFO -> langSite = $siteLang;
    $siteINFO -> langAvailable = $available;
}
*/
?>