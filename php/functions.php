<?php
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

// Redirect
function urlRedirect($siteINFO) {
    $url = $siteINFO -> link . $siteINFO -> page;
    header("HTTP/1.1 301 Moved Permanently");
    header('Location: ' . $url);
    exit();
}

function wifiGuest() {
    global $siteINFO;

    $lang = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : "?";
    $os = "?";

    if (isset($_SERVER['HTTP_USER_AGENT'])) {
        $os = $_SERVER['HTTP_USER_AGENT'];
        $os = explode('(', $os, 2);
        $os = explode(')', $os[1], 2);
        $os = $os[0];
    }

    $sql = "INSERT INTO `wifi` (`id`, `date`, `lang`, `os`) VALUES (NULL, current_timestamp(), '".$lang."', '".$os."')";

    manageDatabase($siteINFO, $sql);
}

function exportIT($text, $other) {
    $path = "log";
    $other = "/ ".$other;

    $time = date('Y-m-d H:i:s');
    $message = "$time - [$text] $other" . PHP_EOL;
    $logFile = "log/".$path."_".date('y')."-".date('m').".txt";
    error_log($message, 3, $logFile);
}

// Build Alerts
function buildAlert($siteJSON, $siteINFO, $langJSON) {
    
    if (isset($_GET['wi'])) {
        $alertType = 'alertBlue';
        $alertMessage = '<div><i class="bi bi-wifi"></i> '.$langJSON["wifiWelcome"].'</div>';
        $html = '<div id="alertBox" class="' . $alertType . '">' . $alertMessage . '</div>';
        return $html;
    }

    if (isset($siteJSON["alert"][$siteINFO->langSite][0])) {
        $alerts = $siteJSON["alert"][$siteINFO->langSite];
        $alertType = 'alertRed';
        $alertMessage = '';
        foreach ($alerts as $alert) {
            $alertMessage .= '<div><i class="bi bi-exclamation-circle-fill"></i> ' . $alerts[0] . '</div>';
        }
        $html = '<div id="alertBox" class="' . $alertType . '">' . $alertMessage . '</div>';
        return $html;
    }
}

// Connect to Database
function connectToDatabase($siteINFO) {
    try {
        $testMode = isset($siteINFO->test) ? $siteINFO->test : false;
        $servername = $testMode ? DB_LOCAL_HOST : DB_SERVER_HOST;
        $username = $testMode ? DB_LOCAL_USER : DB_SERVER_USER;
        $password = $testMode ? DB_LOCAL_PASSWORD : DB_SERVER_PASSWORD;
        $dbname = $testMode ? DB_LOCAL_NAME : DB_SERVER_NAME;

        $db = new mysqli($servername, $username, $password, $dbname);

        if ($db->connect_error) {
            throw new Exception("Sikertelen kapcsolódás: " . $db->connect_error);
        }

        return $db;

    } catch (Exception $e) {
        exportIT("DB Connection Error", $e->getMessage());
        die();
    }
}

function manageDatabase($siteINFO, $sql) {
    $db = connectToDatabase($siteINFO);

    if ($db->connect_error) {
        die("Sikertelen kapcsolódás: " . $db->connect_error);
    }

    if ($db->query($sql) === TRUE) {
        //echo "Siker!!!";
    } else {
        echo "Error: " . $db->error;
        exportIT("DB Error", $db->error);
    }

    $db->close();
}

// Build Bubbles
function buildBubble($langJSON) {
    if (isset($langJSON["bubbles"][0])) {
        $bubble = '';
        foreach ($langJSON["bubbles"] as $item) {
            $bubble .= '<div class="item">'.$item.'</div>';
        }
        echo $bubble;
    }
}

// Build Menu
function buildMenu($siteJSON, $siteINFO, $langJSON, $menu) {
    $menuArray = $siteJSON["menu"][$menu];
    $html = '';
    for ($i=0; $i < count($menuArray); $i++) { 
        $html .= '<a href="'.$siteINFO -> link.$menuArray[$i].'">'.$langJSON["nav"][$menuArray[$i]].'</a>';
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

// Build Google Lang Page Meta
function buildGoogleMeta($siteINFO) {
    $array = array_merge(["x-default"], $siteINFO -> langAvailable);
    $lang = array_merge(["hu"], $siteINFO -> langAvailable);
    $html = '<meta name="google-site-verification" content="BPa8GuaOXP4IZtISH4p8X3XAZk50VYdhuwax7mQy9BQ" />';
    $page = $siteINFO -> page;

    for ($i=0; $i < count($array); $i++) {
        $html .= '<link rel="alternate" hreflang="'.$array[$i].'" href="https://rabraby.hu/'.$lang[$i].'/'.$page.'"/>';
    }
    return $html;
}

// Build Food Page Content
function buildFood($foodJSON, $langJSON, $siteJSON, $siteINFO) {
    $lang = $siteINFO -> langSite;
    $categories = $langJSON["menu"]["categories"];
    $categoriesEN = $foodJSON["categories"];

    // Categories Bar
    echo '<div id="foodCategories">
    <div class="content">
    <a target="_blank" class="btn drink" href="'.$siteINFO->mainPath.'pdf/itallap.pdf"><i class="bi bi-cup-hot-fill"></i> '.$langJSON["menu"]["drink"].'</a>';
    for ($i=0; $i < count($categories); $i++) {
        echo '<a href="#'.str_replace(' ', '', $categoriesEN[$i]).'" class="btn">'.$categories[$i].'</a>';
    }
    echo    '</div>
    </div>';

    // Allergens Bar
    echo '<details id="allergysBox">
    <summary>'.$langJSON["allergy"]["title"].'</summary>
    <div class="content">';
    for ($i=0; $i < count($langJSON["allergy"]["array"]); $i++) { 
      echo '<div class="btn allergyBtn" data-allergen="'.($i+1).'">'.$langJSON["allergy"]["array"][$i].'</div>';
    }
    echo '</div>
    </details>';

    // Category Title
    for ($i=0; $i < count($categories); $i++) {
        $item = $categories[$i]; // Category title (english)
        $itemEN = $categoriesEN[$i]; // Category title (user language)
        
        echo '<div id="'.str_replace(' ', '', $itemEN).'" class="foodBox">
        <div class="foodTitles">
        <h2>'.$item.'</h2></div>';
        
        // Food Content
        foodContent($itemEN, $langJSON, $siteINFO, $foodJSON);
        echo '</div>';
    }
}

// Food Generator
function foodContent($category, $langJSON, $siteINFO, $foodJSON) {
    global $currencyJSON;

    $foods = $foodJSON["food"];
    $lang = $siteINFO -> langSite;
    $currencyCount = "";
    
    if ($lang !== "hu") {
        // Currencies
        $jsonData = loadJSON("https://center.red-cat.hu/json/currency.json");
        $currencyJSON = $jsonData;
        $json = isset($langJSON["currencies"][0]) && $jsonData["success"] ? $jsonData["rates"] : false;
        $currencyArray = [];
        if ($json) {
            $text = "";
            $eur = $json["HUF"] * 0.94;
            foreach ($langJSON["currencies"] as $item) {
                $currencyPrice = $json[$item];
                $result = $eur / $currencyPrice;
                array_push($currencyArray, array($result, $item));
            }
        }
    }
    
    $html = '<div class="foodContent">';
        foreach ($foods as $food) {

            // Checker
            $check = isset($food["star"]) ? true : false;
            if ($category !== false) {
                $check = $category == $food["category"] ? true : false;
            }

            $symbol = $lang == "hu" ? "Ft" : "HUF";

            // Final Generator
            if ($check) {
                $id = $food["id"];
                $title = $foodJSON[$id][$lang];
                $huf = $food["huf"];

                // Allergy
                $allergens = $food["allergens"];
                $allergyNums = "";
                foreach ($allergens as $allergen) {
                    $allergyNums .= $allergen . " ";
                }

                // Currency Counter
                if ($lang !== "hu") {
                    $currencyCount = '';
                    for ($i=0; $i < count($currencyArray); $i++) { 
                        $currencyCount .= '~'.number_format($huf / $currencyArray[$i][0], 0, ',', ' ').' '.$currencyArray[$i][1].' ';
                    }
                    $currencyCount .= '**';
                }

                // HTML
                $html .= '<div id="'.$id.'" class="foodItem" data-name="'.$title.'" data-allergens="'.$allergyNums.'" data-price1="'.$huf.'" data-price2="'.$currencyCount.'" data-code="'.$id.'">
                    <div class="code">#'.$id.'</div>
                    <div class="image">
                        <img src="'.$siteINFO->mainPath.'img/food/'.$id.'_400px.webp" alt="'.$title.'" loading="lazy">
                    </div>
                    <div class="content">
                        <div class="title">'.$title.'</div>
                        <div class="bottom">';
                if ($lang !== "hu") {
                    $html .= '<div class="price2">'.$currencyCount.'</div>';
                }
                $html .=     '<div class="price">'.number_format($huf, 0, ',', ' ').' '.$symbol.'*</div>
                        </div>
                    </div>
                </div>';
            }
        }
    $html .= '</div>';
    echo $html;
}

function priceInfo($langJSON) {
    $price = "";
    $currency = "";

    if (isset($langJSON["menu"]["price"])) {
        $price = '*'.$langJSON["menu"]["price"].'<br>';
    }
    if (isset($langJSON["menu"]["currency"])) {
        $currency = '**'.$langJSON["menu"]["currency"].'<br>';
    }

    echo '<div id="infoPrice">'.$price.$currency.'</div>';
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
    $random = $langJSON["reviews"];
    shuffle($random);

    //$html .= '<div class="content">';
    for ($i=0; $i < 3; $i++) { 
        $title = isset($random[$i]["title"]) ? $random[$i]["title"] : "";
        $html .= '<div class="item">
            <b>'.$random[$i]["name"].'</b>
            <i>'. $title .'</i>
            <p>'.$random[$i]["text"].'</p>
        </div>';
    }
    //$html .= '</div>';
    $html .= '<div class="ratings"><p>Google: 4+<br><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></p>
        <a target="_blank" href="https://g.page/r/CSa2a1Wf650kEB0/review">'.$langJSON["home"]["guest2"].'</a></div>';

    return $html;
}

// Open Hours
function buildOpenHours($openAPI, $langJSON) {

    if ($openAPI) {
        $specount = 0;
        $html = '<div class="title">' . $openAPI["translate"]["title"] . '</div>';
        foreach ($openAPI["open"] as $item) {

            $class = $item["today"] ? " today" : "";
            $class .= !$item["open"][0] ? " closed" : "";
            $special = $item["special"] ? "(*) " : "";
            $specount = $item["special"] ? $specount + 1 : $specount;
            $openTime = ($item["open"][0] ?? false && $item["open"][1] ?? false) ? ($item["open"][0]." - ".$item["open"][1]) : $openAPI["translate"]["close"];

            $html .= '<div class="day' . $class . '">
                <div title="'.$item["date"].'">' . $item["day"] . '</div>
                <div>'.$special.$openTime.'</div>
            </div>';
        }

        $spe = $specount > 0 ? '<div class="special">*'.$openAPI["translate"]["special"].' ('.$specount.')</div>' : "";
        $html .= $spe;
    } else {
        $html = '<div class="title">' . $langJSON["open"]["title"] . ':</div>
        <a target="_blank" href="https://g.page/rabraby?gm">Google Page</a>';
    }

    return $html;
}


// Company Informations
function buildCompanyInfos($langJSON, $siteJSON) {
    $comp = $langJSON["company"];
    
    $html = '<div class="content">';
    $html .= '<h3>Rab Ráby Kft.</h3>';
    foreach ($siteJSON["company"] as $item) {
        $html .= '<div><b>'.$comp[$item["name"]].':</b><br>'.$item["text"].'</div>';
    }
    $html .= '</div>';
    return $html;
}
?>