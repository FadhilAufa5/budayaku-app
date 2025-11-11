<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Culture extends Model
{
    protected $fillable = [
        'culture_category_id',
        'name',
        'region',
        'description',
        'image',
        'status',
        'views',
    ];

    protected $casts = [
        'views' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(CultureCategory::class, 'culture_category_id');
    }
}
