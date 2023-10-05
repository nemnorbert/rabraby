<?php
// Scan URL
function scanURL() {
    global $testServer, $siteInfo;

    $url = $_SERVER['REQUEST_URI'];
    $urlParts = explode("?", $url);
    $urlParts = explode("/", $urlParts[0]);
    
    $testServer = (strtolower($urlParts[1]) === "rabraby") ? true : false;
    if ($testServer) {
        $siteInfo -> mainPath = '/rabraby/';
        $siteInfo -> redcatPath = '/redcat_center/';
    } else {
        $siteInfo -> mainPath = '/';
        //$siteInfo -> $siteJSON['mainPath']['live'];
    }
    
    $i = ($testServer) ? 2 : 1;
    $siteInfo -> page = ($urlParts[$i] !== "") ? $urlParts[$i] : "home";
}

// Load JSON
function loadJSON($filePath) {
    $json = file_get_contents($filePath);
    return json_decode($json, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error decoding JSON: ' . json_last_error_msg());
    }

    return $data;
}

// Scan Cookies
function cookieScan() {
    global $cookieAccepted;
    global $cookieLevel;

    $cookieAccepted = false;
    $cookieLevel = '{"necessary": false, "functionality": false, "tracking": false, "targeting": false}';
    $cookieAccepted = isset($_COOKIE["cookie_consent_accepted"]) ? $_COOKIE["cookie_consent_accepted"] : $cookieAccepted;
    $cookieLevel = isset($_COOKIE["cookie_consent_level"]) ? json_decode($_COOKIE["cookie_consent_level"], JSON_OBJECT_AS_ARRAY) : json_decode($cookieLevel, JSON_OBJECT_AS_ARRAY);
}

// Language Detection
function languageDetect() {

    global $siteLang;
    global $availableLanguages;
    $siteLang = "en";
    
    // Check if language cookie is set
    if (isset($_COOKIE['language'])) {
        $cookieLanguage = strtolower($_COOKIE['language']);
        
        if (in_array($cookieLanguage, $availableLanguages)) {
            $siteLang = $cookieLanguage;
        }
    } else {
        if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
            $browserLanguages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
            $browserLanguage = strtolower(substr(chop($browserLanguages[0]), 0, 2));
        
            if (in_array($browserLanguage, $availableLanguages)) {
                $siteLang = $browserLanguage;
            }
        }
    }

    // Import lang data from JSON
    global $langJSON;
    $langJSON = loadJSON('json/languages/'.$siteLang.'.json');
}

function l1nk($link) {
    global $siteInfo;
    return $link;
}

// Build Alerts
function buildAlert($siteJSON, $siteLang) {
    $alerts = $siteJSON["alert"][$siteLang];
    if (count($alerts) > 0) {
        $html = '<div class="alertBox">';
        for ($i=0; $i < count($alerts); $i++) { 
            $html .= '<div><i class="bi bi-info-circle"></i> '.$alerts[$i].'</div>';
        }
        $html .= '</div>';
        return $html;
    }
}

// Build Menu
function buildMenu($siteJSON, $siteInfo, $menu) {
    global $langJSON;
    $menuArray = $siteJSON["menu"][$menu];
    $html = '<div class="menu">';
    for ($i=0; $i < count($menuArray); $i++) { 
        $html .= '<a href="'.$siteInfo->mainPath.$menuArray[$i].'">'.$langJSON["nav"][$menuArray[$i]].'</a>';
    }
    $html .=  '</div>';
    return $html;
}

// Mobile Menu
function mobileMenu($siteJSON, $siteInfo) {
    $menu = $siteJSON["menu"]["mobile"];
    $html = '<nav id="appMenu">';
    for ($i = 0; $i < 4; $i++) { 
        $active = $siteInfo -> page === $menu[$i]["en"] ? ["active", "-fill"] : ["", ""];
        $html .= '<a href="'.$menu[$i]["en"].'" class="'.$active[0].'"><i class="bi bi-'.$menu[$i]["icon"].$active[1].'"></i><br>'.$menu[$i]["hu"].'</a>';
    }
    $html .= '</nav>';
    echo $html;
}

// Build Food Page Content
function buildFood($foodJSON, $langJSON, $siteJSON, $siteInfo, $userLang) {
    $iso = $langJSON["iso"];
    $categories = $foodJSON["category"];

    // Languages
    $foodLangs = $siteJSON['languages']['foodMenu'];
    $menuLang = in_array($userLang, $foodLangs) ? $userLang : "en";
    
    // Categories Bar
    echo '<div id="foodCategories">
    <div class="content">
    <a class="btn drink" href="'.$siteInfo->mainPath.'pdf/itallap.pdf"><i class="bi bi-cup-hot-fill"></i> '.$langJSON["menu"]["drink"].'</a>';
    for ($i=0; $i < count($categories["en"]); $i++) {
        echo '<a href="#'.str_replace(' ', '', $categories["en"][$i]).'" class="btn">'.$categories[$menuLang][$i].'</a>';
    }
    echo    '</div>
    </div>';

    // Allergens Bar
    echo '<details id="allergysBox">
    <summary>'.$foodJSON["allergens"]["title"][$iso].'</summary>
    <div class="content">';
    for ($i=0; $i < count($foodJSON["allergens"]["hu"]); $i++) { 
      echo '<div class="btn allergyBtn" data-allergen="'.($i+1).'">'.$foodJSON["allergens"][$menuLang][$i].'</div>';
    }
    echo '</div>
    </details>';

    // Category Title
    for ($i=0; $i < count($categories[$menuLang]); $i++) {
        $food_category_en = $categories["en"][$i]; // Category title (english)
        $food_category = $categories[$menuLang][$i]; // Category title (user language)
        
        echo '<div id="'.str_replace(' ', '', $food_category_en).'" class="foodBox">
        <div class="foodTitles">
        <h2>'.$food_category.'</h2></div>
        <div class="foodContent">';
        
        // Food Title
        foreach ($foodJSON["food"] as $foodItem) {
            if ($foodItem["category"] == $food_category_en) {
                $id = $foodItem["id"];
                $title = $foodJSON["translate"][$id][$menuLang];
                $price = $foodItem["huf"];
                $allergens = $foodItem["allergens"];

                $allergyNumber = "";
                foreach ($allergens as $allergen) {
                    $allergyNumber .= $allergen . " ";
                }

                echo '<div class="foodItem" data-allergens="'.$allergyNumber.'" data-code="'.$id.'">';
                echo '<img src="'.$siteInfo->mainPath.'img/food/'.$id.'.webp" alt="'.$title.'" loading="lazy">';
                echo '<div class="btn code">#'.$id.'</div>';
                echo '<b>'.$title.'</b>';
                echo '<div class="price">'.$price.' Ft</div>';
                echo '</div>';
            }
        }
        echo '</div></div>';
    }
}


// Contact 01
function buildContactBase() {
    global $siteJSON, $langJSON;
    $html = '';
    foreach ($siteJSON["contact"] as $item) {
        if ($item["contact"]) {
            $content = $item["content"] == "translate" ? $langJSON["contact"][$item["name"]] : $item["content"];
            $html .= '<a target="_blank" href="'.$item["link"].'"><i class="bi bi-'.$item["icon"].'"></i> '.$content.'</a>';
        }
    }
    echo $html;
}

// Contact 02
function buildContactIcon() {
    global $siteJSON;
    $html = '';
    foreach ($siteJSON["contact"] as $item) {
        if ($item["bar"]) {
            $html .= '<a target="_blank" href="'.$item["link"].'"><i class="bi bi-'.$item["icon"].'"></i></a>';
        }
    }
    echo $html;
}

// FAQ Content Generator
function buildFAQ() {
    global $langJSON;
    $html = "";

    foreach ($langJSON["faq"] as $item) {
        $html .= '<details>
            <summary>'.$item["question"].'</summary>
            <p>'.$item["answer"].'</p>
        </details>';
    }
    return $html;
}

// Company Informations
function buildCompanyInfos() {
    global $langJSON, $siteJSON;
    $comp = $langJSON["company"];
    $html = "";
    foreach ($siteJSON["company"] as $item) {
        $html .= '<div><b>'.$comp[$item["name"]].':</b><br>'.$item["text"].'</div>';
    }
    return $html;
}































/////////////////////////////// ORIGINAL FUNCTIONS ///////////////////////////
function buildSocial() {
    global $siteJSON;
    echo '<a href="mailto:'.$siteJSON["contact"]["email"].'"><i class="bi bi-envelope-fill"></i></a>
    <a href="'.$siteJSON["contact"]["facebook"].'" target="_blank"><i class="bi bi-facebook"></i></a>
    <a href="'.$siteJSON["contact"]["instagram"].'" target="_blank"><i class="bi bi-instagram"></i></a>
    <a href="'.$siteJSON["contact"]["gpage"].'" target="_blank"><i class="bi bi-google"></i></a>';
}
function printContact() {
    global $siteJSON;
    global $langJSON;
    echo '<p><a href="'.$siteJSON["contact"]["gpage"].'"><i class="bi bi-geo-alt-fill"></i> '.$siteJSON["contact"]["address"].'</a></p>
    <p><a href="tel:'.$siteJSON["contact"]["phone"].'"><i class="bi bi-telephone-fill"></i> '.$siteJSON["contact"]["phone"].'</a></p>
    <p><a href="tel:'.$siteJSON["contact"]["mobile"].'"><i class="bi bi-phone-fill"></i> '.$siteJSON["contact"]["mobile"].'</a></p>
    <p><a href="mailto:'.$siteJSON["contact"]["email"].'"><i class="bi bi-envelope-fill"></i> '.$siteJSON["contact"]["email"].'</a></p>
    <p><a target="_blank" href="'.$siteJSON["contact"]["digicard"].'"><i class="bi bi-person-vcard-fill"></i> '.$langJSON["contact"]["card"].'</a></p>';
}



function printMenu($menu) {
    global $siteJSON;
    global $siteInfo;
    $path = $siteInfo->mainPath;
    
    echo '<ul class="'.$menu.'Menu">';
    for ($i=0; $i < count($siteJSON["menu"][$menu]); $i++) { 
        $page = $siteJSON["menu"][$menu][$i];
        echo '<li><a href="'.$path.$page.'">'.$page.'</a></li>';
    }
    echo '</ul>';
}


function printOpen($langJSON, $siteJSON) {
    $openJSON = $siteJSON["open_hours"];
    $days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    $daysCount = count($days);
    $text = '<div id="openHours">';
    $text .= '<b>'.$langJSON["open"]["title"].':</b>';
    $text .= '<div>';
    for ($i = 0; $i < $daysCount; $i++) {
        $day = $langJSON["open"]["days"][$i];
        $today = (date("N") == $i + 1) ? ' now' : '';
        
        if (empty($openJSON[$days[$i]]["open"])) {
            $text .= '<div class="day"><div>' . $day . ':</div><div class="closed">' . $langJSON["open"]["status"]["close"] . '</div></div>';
        } else {
            $text .= '<div class="day' . $today . '"><div>' . $day . ':</div><div>' . $openJSON[$days[$i]]["open"] . '-' . $openJSON[$days[$i]]["close"] . '</div></div>';
        }
    }

    $text .= '</div>';
    $text .= '<a href="parking"><div class="btn"><i class="bi bi-p-circle-fill"></i> ' . $langJSON["home"]["parking2"] . '</div></a>';
    $text .= '</div>';
    echo $text;
}











///////////////////// BACKEND
$openJSON = "";

set_include_path( $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR );
$siteInfo = new stdClass();
//$redcatJSON = loadJSON('json/redcat.json');
$siteJSON = loadJSON('json/site.json');

$testServer;
scanUrl();

$cookieAccepted;
$cookieLevel;
cookieScan();

$siteLang;
$availableLanguages = $siteJSON['languages']['site'];
$userLang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
languageDetect();
?>