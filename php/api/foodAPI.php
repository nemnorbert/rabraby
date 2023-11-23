<?php
//////////// IMPORT ////////////
require_once 'php/config.php';
$siteINFO = new stdClass();
$siteINFO->status = "ready";

//////////// FUNCTIONS ////////////
function errorHandler($type, $text) { 
    global $siteINFO;
    $siteINFO->status = $type;
       
    $path = "api_log";
    $time = date('Y-m-d H:i:s');
    $message = "$time - [$type] $text" . PHP_EOL;
    $logFile = "log/".$path."_".date('y')."-".date('m').".txt";
    //error_log($message, 3, $logFile);

    header('Content-Type: application/json');
    echo json_encode(array(
        'error' => $type,
        'text' => $text,
        'time' => $time
    ));
    exit();
}

function inputCheck($type, $length) {

}

function loadJSON($filePath) {
    try {
        $json = file_get_contents($filePath);

        if ($json === false) {
            throw new Exception('Error reading JSON file: ' . error_get_last()['message']);
        }

        $data = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Error decoding JSON: ' . json_last_error_msg());
        }

        return $data;
    } catch (Exception $e) {
        errorHandler("json_error", $e->getMessage());
        return null;
    }
}

function connectDB($siteINFO) {
    try {
        $testMode = isset($siteINFO->test) ? $siteINFO->test : false;
        $servername = $testMode ? DB_LOCAL_HOST : DB_SERVER_HOST;
        $username = $testMode ? DB_LOCAL_USER : DB_SERVER_USER;
        $password = $testMode ? DB_LOCAL_PASSWORD : DB_SERVER_PASSWORD;
        $dbname = $testMode ? DB_LOCAL_NAME : DB_SERVER_NAME;

        $db = new mysqli($servername, $username, $password, $dbname);

        if ($db->connect_error) {
            $db->close();
            throw new Exception("Connection Error: " . $db->connect_error);
        }
        return $db;

    } catch (Exception $e) {
        errorHandler("connect_error", $e->getMessage());
    }
}

function buildCurrency($currencyJSON, $langJSON, $row) {
    $currencies = $langJSON["currencies"] ?? [];

    if (empty($currencies)) {
        return null;
    }

    $rates = $currencyJSON["rates"];
    $eur = $rates["HUF"] * 0.94;
    $out = [];
    foreach ($currencies as $item) {
        $value = $row["price"] / ($eur / $rates[$item]);
        $out[] = ["currency" => $item, "value" => round($value)];
    }

    return $out;
}


//////////// MAIN CODE ////////////
$langFoodJSON = loadJSON('json/food.json');
$siteJSON = loadJSON('json/site.json');
$currencyJSON = loadJSON("https://center.red-cat.hu/json/currency.json");
$siteINFO->test = $_SERVER['SERVER_NAME'] === 'localhost' ?? false;


// GET CHECKER (DATA SHIELD)
$get_code = isset($_GET['id']) ? $_GET['id'] : false;
$all_types = ["all", "one", "stars"];

$get_type = isset($_GET['type']) ? $_GET['type'] : false;
$type = in_array($get_type, $all_types) ? $get_type : "all";

$get_lang = isset($_GET['lang']) ? $_GET['lang'] : "en";
$get_lang = in_array($get_lang, $siteJSON['languages']) ? $get_lang : "en";
$langJSON = loadJSON('json/languages/'.$get_lang.'.json');

$name = isset($langFoodJSON[$get_code][$get_lang]) ? $langFoodJSON[$get_code][$get_lang] : false;

if (!$get_code || !$get_type || !$name) {
    errorHandler("bad_params", "wrong parameters");
}


/*
echo "<pre>";
var_dump($get_code);
var_dump($get_type);
echo "<pre>";
*/

// DATABASE
$db = connectDB($siteINFO);

if ($siteINFO->status === "ready") {
    // SQL
    $sql = 'SELECT f.rr_id AS id, f.active, f.star, f.name, f.allergy, c.category, p.price
        FROM `foods` AS f
        LEFT JOIN category AS c ON f.category = c.id
        LEFT JOIN price AS p ON f.rr_id = p.rr_code
        WHERE f.active = 1';

    switch ($type) {
        case "one":
            $sql .= ' AND f.rr_id = "'.$get_code.'"';
            break;
        case "stars":
            $sql .= ' AND f.star = 1';
            break;
        default:
            //
    }

    switch ($type) {
        case "one":
            $sql .= ' AND f.rr_id = "'.$get_code.'"';
            break;
        case "star":
            $sql .= ' AND f.star = 1';
            break;
        case "all":
            break;
        default:
    }

    $sql .= ' AND p.date = (
            SELECT MAX(date) 
            FROM price 
            WHERE rr_code = f.rr_id
        )
        ORDER BY f.category ASC, f.rr_id ASC';


    // RESULT
    $result = $db->query($sql);

    if ($result === false) {
        errorHandler("database_error", "SQL query error");
    }

    if ($result !== false) {
        $foods = array();

        while ($row = $result->fetch_assoc()) {
            $row['name'] = $langFoodJSON[$row['id']][$get_lang];
            $row['active'] = (bool)$row['active'];
            $row['star'] = (bool)$row['star'];
            $row['category2'] = 'kateg';
            $row['price'] = intval($row['price']);
            $row["price_other"] = buildCurrency($currencyJSON, $langJSON, $row);
            $foods[] = $row;
        }

        if (!empty($foods)) {

        } else {
            errorHandler("database_error", "No matching records found");
        }

        $result->close();
    } else {
        errorHandler("database_error", "SQL query error");
    }    
}

$db->close();

$type = $get_type;

// HEAD
$apiOut = array(
    'type' => $type,
    'lang' => $get_lang,
);

// FOOD DETAILS
if (!empty($foods)) {
    $apiOut['foods'] = $foods; // Módosítva az 'items' kulcsra, amely tartalmazza az összes eredményt
} else {
    $apiOut['foods'] = null; // Ha nincs találat
}

header('Content-Type: application/json');
echo json_encode($apiOut);
?>