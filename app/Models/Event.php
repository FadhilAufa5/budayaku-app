<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'event_category_id',
        'title',
        'description',
        'date',
        'time',
        'location',
        'image',
        'status',
        'participants',
        'max_participants',
        'price',
    ];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime:H:i',
        'participants' => 'integer',
        'max_participants' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeByDate($query, $date)
    {
        return $query->whereDate('date', $date);
    }
}
