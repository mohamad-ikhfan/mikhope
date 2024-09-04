<?php

namespace App\Models;

use App\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RouterMikrotik extends Model
{
    use HasFactory, CreatedUpdatedBy;

    protected $guarded = [];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_router_mikrotik',  'router_mikrotik_id', 'user_id');
    }
}