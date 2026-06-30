<?php

/**
 * Forward Vercel requests to normal index.php
 */
$compiledViewPath = '/tmp/storage/framework/views';
if (!file_exists($compiledViewPath)) {
    mkdir($compiledViewPath, 0777, true);
}

try {
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
