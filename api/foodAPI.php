<?php
//////////// IMPORT ////////////
require_once '../php/config.php';
$siteINFO = new stdClass();
$siteINFO->status = "ready";

//////////// FUNCTIONS ////////////
function buildCurrency($currencyJSON, $langJSON, $row) {
    $currencies = $langJSON["currencies"] ?? [];

    if (empty($currencies)) {return null;}

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
$langFoodJSON = loadJSONapi('../json/food.json');
$siteJSON = loadJSONapi('../json/site.json');
$currencyJSON = loadJSONapi("https://center.red-cat.hu/json/currency.json");
$siteINFO->test = $_SERVER['SERVER_NAME'] === 'localhost' ?? false;


// GET CHECKER (DATA SHIELD)
$get_code = isset($_GET['id']) ? $_GET['id'] : false;
$all_types = ["all", "one", "stars"];

$get_type = (isset($_GET['type']) && in_array($_GET['type'], $all_types)) ? $_GET['type'] : false;
if (!$get_type) {
    errorHandler("bad_type", "bad param: type");
}

$get_lang = isset($_GET['lang']) ? $_GET['lang'] : "en";
$get_lang = in_array($get_lang, $siteJSON['languages']) ? $get_lang : "en";
$langJSON = loadJSONapi('../json/languages/'.$get_lang.'.json');

$name = isset($langFoodJSON[$get_code][$get_lang]) ? $langFoodJSON[$get_code][$get_lang] : false;

if (!$get_type) {
    errorHandler("bad_params", "wrong parameters");
}


// DATABASE
$db = connectDB($siteINFO);

if ($siteINFO->status === "ready") {
    // SQL
    $sql = 'SELECT f.rr_id AS id, f.active, f.star, f.name, f.allergy, c.category, p.price
        FROM `foods` AS f
        LEFT JOIN category AS c ON f.category = c.id
        LEFT JOIN price AS p ON f.rr_id = p.rr_code
        WHERE f.active = 1';

    switch ($get_type) {
        case "one":
            $sql .= ' AND f.rr_id = "'.$get_code.'"';
            break;
        case "stars":
            $sql .= ' AND f.star = 1';
            break;
        default:
            //
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

// HEAD
$apiOut = array(
    'type' => $get_type,
    'lang' => $get_lang,
);

// FOOD DETAILS
if (!empty($foods)) {
    $apiOut['foods'] = $foods;
} else {
    $apiOut['foods'] = null;
}

header('Content-Type: application/json');
echo json_encode($apiOut);
?>