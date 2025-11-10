<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('events/schedule');
    }
}
