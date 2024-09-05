<?php

namespace App\Traits;

use RouterOS\Client;
use RouterOS\Config;

trait RouterMikrotik
{
    public static function connect($model)
    {
        $config = new Config([
            'host' => $model->host,
            'user' => $model->user,
            'pass' => $model->pass,
            'port' => $model->port,
        ]);

        $client = new Client($config);
    }
}
