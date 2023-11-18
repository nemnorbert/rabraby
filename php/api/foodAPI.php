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



//////////// MAIN CODE ////////////
$langJSON = loadJSON('json/food.json');
$siteJSON = loadJSON('json/site.json');
$siteINFO->test = $_SERVER['SERVER_NAME'] === 'localhost' ?? false;


// GET CHECKER (DATA SHIELD)
$get_code = isset($_GET['id']) ? $_GET['id'] : false;
$all_types = ["all", "one", "stars"];

$get_type = isset($_GET['type']) ? $_GET['type'] : false;
$get_type = in_array($get_type, $all_types) ? $get_type : false;

$get_lang = isset($_GET['lang']) ? $_GET['lang'] : "en";
$get_lang = in_array($get_lang, $siteJSON['languages']) ? $_GET['lang'] : "en";
$name = $langJSON[$get_code][$get_lang];

if (!$get_code || !$get_type) {
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

    // SQL1
    $sql = 'SELECT f.rr_id AS id, f.active, f.star, f.name, f.allergies, c.category, p.price
        FROM `foods` AS f
        LEFT JOIN category AS c ON f.category = c.id
        LEFT JOIN price AS p ON f.rr_id = p.rr_code
        WHERE f.rr_id = "'.$get_code.'" AND p.date = (
            SELECT MAX(date) 
            FROM price 
            WHERE rr_code = f.rr_id
        );';

    $result = $db->query($sql);

    if ($result !== false) {
        if ($result->num_rows > 0) {
            $foods = $result->fetch_assoc();
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

// GENERATE ONE ITEM
$json = array(
    // HEAD
    'type' => $type,
    'lang' => $get_lang,

    // FOOD DETAILS
    'id' => $foods["id"],
    'name' => $name,
    'category' => $foods["category"],
    'price' => array(
        'huf' => (int)$foods["price"]
    )
);
    
header('Content-Type: application/json');
echo json_encode($json);
?>
