<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'role',
        'company',
        'years',
        'location',
        'description',
        'tech',
        'sort_order',
    ];

    protected $casts = [
        'description' => 'array',
        'tech' => 'array',
        'sort_order' => 'integer',
    ];
}
