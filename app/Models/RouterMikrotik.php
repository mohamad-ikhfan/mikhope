<?php

namespace App\Models;

use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use RouterOS\Client;
use RouterOS\Config;

class RouterMikrotik extends Model
{
    use HasFactory, CreatedUpdatedBy;

    protected $guarded = [];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_router_mikrotik',  'router_mikrotik_id', 'user_id');
    }

    protected function config()
    {
        return new Config([
            'host' => $this->host,
            'port' => $this->port,
            'user' => $this->user,
            'pass' => $this->pass,
        ]);
    }

    public function connect()
    {
        return (new Client($this->config(), autoConnect: false))->connect();
    }

    public function client()
    {
        return (new Client($this->config()));
    }
}
