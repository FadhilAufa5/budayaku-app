<?php

namespace App\Http\Controllers\Cultures;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CultureReviewController extends Controller
{
    public function index()
    {
        return Inertia::render('cultures/reviews');
    }
}
