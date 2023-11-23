<?php
function loadJSONapi($filePath) {
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
?>