<?php

namespace App\Models;

use App\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory, CreatedUpdatedBy;

    protected $guarded = [];
}