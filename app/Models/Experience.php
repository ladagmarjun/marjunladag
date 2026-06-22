<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'role',
        'company',
        'years',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
