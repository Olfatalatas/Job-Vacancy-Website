<?php

/**
 * Forward Vercel requests to normal index.php
 */
$compiledViewPath = '/tmp/storage/framework/views';
if (!file_exists($compiledViewPath)) {
    mkdir($compiledViewPath, 0777, true);
}

try {
    if (empty($_ENV['APP_KEY']) && empty($_SERVER['APP_KEY'])) {
        die(json_encode(['error' => 'CRITICAL: APP_KEY is missing in Vercel Environment Variables!']));
    }
    
    require __DIR__ . '/../public/index.php';
} catch (\Throwable $e) {
    header('Content-Type: application/json');
    echo json_encode([
        'error_message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => explode("\n", $e->getTraceAsString())
    ]);
}
