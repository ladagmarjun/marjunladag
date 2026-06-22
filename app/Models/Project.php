<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'company',
        'type',
        'year',
        'link',
        'description',
        'tech',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'tech' => 'array',
        'featured' => 'boolean',
        'year' => 'integer',
        'sort_order' => 'integer',
    ];
}
