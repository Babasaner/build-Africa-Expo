<?php
// Set CORS headers for security and flexibility
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Safe default API Key fallback
$apiKey = "495ac941-5eec-4cac-9562-baa7f6015250:fx";

// 2. Try parsing .env file to load the latest API key dynamically if available
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $name = trim($parts[0]);
            $value = trim($parts[1]);
            if ($name === 'VITE_DEEPL_API_KEY') {
                $apiKey = $value;
            }
        }
    }
}

// 3. Get request payload
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['text']) || !isset($data['target_lang'])) {
    http_response_code(400);
    echo json_encode(["error" => "text and target_lang are required"]);
    exit;
}

$texts = $data['text'];
$targetLang = strtoupper($data['target_lang']);

// 4. Build payload for DeepL API
$payload = [
    "text" => is_array($texts) ? $texts : [$texts],
    "target_lang" => $targetLang
];

// 5. Check if Pro or Free Key to target correct endpoint
$isFreeKey = (substr($apiKey, -3) === ':fx');
$deepLEndpoint = $isFreeKey 
    ? "https://api-free.deepl.com/v2/translate" 
    : "https://api.deepl.com/v2/translate";

$ch = curl_init($deepLEndpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: DeepL-Auth-Key " . $apiKey,
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => "Curl error: " . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

http_response_code($httpCode);
echo $response;
?>
