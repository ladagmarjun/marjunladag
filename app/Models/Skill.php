<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'color',
        'src',
        'src_light',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
