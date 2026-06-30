<?php

/**
 * Forward Vercel requests to normal index.php
 */
$compiledViewPath = '/tmp/storage/framework/views';
if (!file_exists($compiledViewPath)) {
    mkdir($compiledViewPath, 0777, true);
}

require __DIR__ . '/../public/index.php';
