<?php
set_include_path( $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR );

/////////////////////////////////////////////// BASE ///////////////////////////////////////////////
// Scan URL
function scanURL($siteINFO, $siteJSON) {
    $available = $siteJSON['languages']['site'];
    
    $url = $_SERVER['REQUEST_URI'];
    $parts = explode("?", $url);
    $parts = explode("/", $parts[0]);
    
    $test = (strtolower($parts[1]) === "rabraby") ? true : false;
    if ($test) {
        $siteINFO -> mainPath = '/rabraby/';
        $siteINFO -> redcatPath = '/redcat_center/';
    } else {
        $siteINFO -> mainPath = '/';
    }

    if (count($parts) >= 3 && in_array(strtolower($parts[2]), $available)) {
        $i = $test ? 3 : 2;
        $siteINFO->langURL = strtolower($parts[2]);
    } else {
        $i = $test ? 2 : 1;
    }

    // Out
    $siteINFO -> page = ($parts[$i] !== "") ? $parts[$i] : "home";
    $siteINFO -> test = $test;
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


/////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////
// Load JSON
function loadJSON($filePath) {
    $json = file_get_contents($filePath);
    $data = json_decode($json, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error decoding JSON: ' . json_last_error_msg());
    }

    return $data;
}

// Build Alerts
function buildAlert($siteJSON, $siteINFO) {
    $alerts = isset($siteJSON["alert"][$siteINFO -> langSite]) ? $siteJSON["alert"][$siteINFO -> langSite] : [];
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
function buildMenu($siteJSON, $siteINFO, $langJSON, $menu) {
    $menuArray = $siteJSON["menu"][$menu];
    $html = '';
    for ($i=0; $i < count($menuArray); $i++) { 
        $html .= '<a href="'.$siteINFO->mainPath.$menuArray[$i].'">'.$langJSON["nav"][$menuArray[$i]].'</a>';
    }
    return $html;
}

// Mobile Menu
function mobileMenu($siteJSON, $siteINFO, $langJSON) {
    $menu = $siteJSON["menu"]["mobile"];
    $html = '<nav id="appMenu">';
    for ($i = 0; $i < 4; $i++) { 
        $active = $siteINFO -> page === $menu[$i] ? ["active", "-fill"] : ["", ""];
        $html .= '<a href="'.$menu[$i].'" class="'.$active[0].'">
        <i class="bi bi-'.$siteJSON["icons"][$menu[$i]].$active[1].'"></i>
        <br>'.$langJSON["nav"][$menu[$i]].'</a>';
    }
    $html .= '</nav>';
    echo $html;
}

// Build Food Page Content
function buildFood($foodJSON, $langJSON, $siteJSON, $siteINFO) {
    $iso = $siteINFO -> langSite;
    $categories = $foodJSON["category"];

    // Languages
    $foodLangs = $siteJSON['languages']['foodMenu'];
    $menuLang = "en";

    if (isset($siteINFO -> langURL)) {
        $menuLang = $siteINFO -> langURL;
    } elseif (in_array($siteINFO -> langUser, $foodLangs)) {
        $siteINFO -> langUser;
    }
    
    // Categories Bar
    echo '<div id="foodCategories">
    <div class="content">
    <a target="_blank" class="btn drink" href="'.$siteINFO->mainPath.'pdf/itallap.pdf"><i class="bi bi-cup-hot-fill"></i> '.$langJSON["menu"]["drink"].'</a>';
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
                echo '<img src="'.$siteINFO->mainPath.'img/food/'.$id.'.webp" alt="'.$title.'" loading="lazy">';
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
function buildContactBase($siteJSON, $langJSON) {
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
function buildContactIcon($siteJSON) {
    $html = '';
    foreach ($siteJSON["contact"] as $item) {
        if ($item["bar"]) {
            $html .= '<a target="_blank" href="'.$item["link"].'"><i class="bi bi-'.$item["icon"].'"></i></a>';
        }
    }
    echo $html;
}

// Reserve Module
function buildReserve($langJSON) {
    $html = '';
    foreach ($langJSON["home"]["table"]["content"] as $item) {
        $html .= '<p>'.$item.'</p>';
    }
    return $html;
}

// FAQ Content Generator
function buildFAQ($langJSON) {
    $html = '<h2>'.$langJSON["home"]["faq"].'</h2>';

    foreach ($langJSON["faq"] as $item) {
        $html .= '<details>
            <summary>'.$item["question"].'</summary>
            <p>'.$item["answer"].'</p>
        </details>';
    }
    return $html;
}

// Guest
function buildGuest($langJSON) {
    $html = '<h2>'.$langJSON["home"]["guest"].'</h2>';
    $random = $langJSON["guest"];
    shuffle($random);

    $html .= '<div class="content">';
    for ($i=0; $i < 3; $i++) { 
        $html .= '<div class="item">
            <b>'.$random[$i]["name"].'</b>
            <p>'.$random[$i]["text"].'</p>
        </div>';
    }
    $html .= '</div>';
    $html .= '<div class="ratings"><p>Google: 4+<br><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></p>
        <a target="_blank" href="https://g.page/r/CSa2a1Wf650kEB0/review">'.$langJSON["home"]["guest2"].'</a></div>';

    return $html;
}

// Open Hours Generator
function buildOpenHours($langJSON, $siteJSON) {
    $html = '<div class="title">'.$langJSON["open"]["title"].'</div>';
    $weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    for ($i=0; $i < 7; $i++) { 
        $class = date("N") == $i+1 ? " today" : "";
        $day = $langJSON["open"]["days"][$i];
        
        $week = ($i+1) >= date("N") ? "this" : "next";
        $timestamp = strtotime($week." ".$weekDays[$i]);
        $status = date("Y-m-d", $timestamp);
        
        $openH = $siteJSON["openHours"];
        $theDay = isset($openH["special"][$status]) ? $openH["special"][$status] : $openH["default"][$i];
        
        $status = $theDay["open"] . " - " . $theDay["close"];
        $class .= $status == " - "  ? " closed" : "";
        $status = $status == " - " ? $langJSON["open"]["status"]["close"] : $status;
        
        // Final Build
        $html .= '<div class="day'.$class.'">
            <div>'.$day.'</div>
            <div>'.$status.'</div>
        </div>';
    }
    
    return $html;
}

// Company Informations
function buildCompanyInfos($langJSON, $siteJSON) {
    $comp = $langJSON["company"];
    $html = "";
    foreach ($siteJSON["company"] as $item) {
        $html .= '<div><b>'.$comp[$item["name"]].':</b><br>'.$item["text"].'</div>';
    }
    return $html;
}



/////////////////////////////////////////////// BACKEND ///////////////////////////////////////////////
$siteINFO = new stdClass();
$siteJSON = loadJSON('json/site.json');

scanURL($siteINFO, $siteJSON);
langDetect($siteINFO, $siteJSON);
?>