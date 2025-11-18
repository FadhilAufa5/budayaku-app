<?php

namespace App\Http\Controllers;

use App\Models\Culture;
use App\Models\CultureCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicCultureController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Culture::with('category')->where('status', 'active');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('region', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('category') && $request->input('category') !== 'all') {
            $query->where('culture_category_id', $request->input('category'));
        }

        if ($request->has('region') && $request->input('region') !== 'all') {
            $query->where('region', $request->input('region'));
        }

        $cultures = $query->latest()->paginate(12);

        $cultures->getCollection()->transform(function ($culture) {
            return [
                'id' => $culture->id,
                'name' => $culture->name,
                'category' => $culture->category?->name,
                'category_id' => $culture->culture_category_id,
                'region' => $culture->region,
                'image' => $culture->image ?: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800',
                'description' => $culture->description,
                'views' => $culture->views ?? 0,
                'created_at' => $culture->created_at->format('d M Y'),
            ];
        });

        $categories = CultureCategory::withCount('cultures')->get(['id', 'name']);
        
        $regions = Culture::where('status', 'active')
            ->select('region')
            ->distinct()
            ->orderBy('region')
            ->pluck('region');

        $featuredCultures = Culture::with('category')
            ->where('status', 'active')
            ->orderBy('views', 'desc')
            ->take(3)
            ->get()
            ->map(function ($culture) {
                return [
                    'id' => $culture->id,
                    'name' => $culture->name,
                    'category' => $culture->category?->name,
                    'region' => $culture->region,
                    'image' => $culture->image ?: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800',
                    'views' => $culture->views ?? 0,
                ];
            });

        $stats = [
            'total' => Culture::where('status', 'active')->count(),
            'categories' => CultureCategory::count(),
            'regions' => Culture::where('status', 'active')->distinct('region')->count('region'),
            'totalViews' => Culture::where('status', 'active')->sum('views'),
        ];

        return Inertia::render('budaya/index', [
            'cultures' => $cultures,
            'categories' => $categories,
            'regions' => $regions,
            'featuredCultures' => $featuredCultures,
            'stats' => $stats,
            'filters' => $request->only(['search', 'category', 'region']),
        ]);
    }

    public function show(Culture $culture): Response
    {
        $culture->increment('views');

        $relatedCultures = Culture::with('category')
            ->where('status', 'active')
            ->where('id', '!=', $culture->id)
            ->where(function ($query) use ($culture) {
                $query->where('culture_category_id', $culture->culture_category_id)
                    ->orWhere('region', $culture->region);
            })
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'category' => $item->category?->name,
                    'region' => $item->region,
                    'image' => $item->image ?: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800',
                    'views' => $item->views ?? 0,
                ];
            });

        return Inertia::render('budaya/show', [
            'culture' => [
                'id' => $culture->id,
                'name' => $culture->name,
                'category' => $culture->category?->name,
                'region' => $culture->region,
                'description' => $culture->description,
                'image' => $culture->image ?: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800',
                'views' => $culture->views ?? 0,
                'created_at' => $culture->created_at->format('d M Y'),
            ],
            'relatedCultures' => $relatedCultures,
        ]);
    }
}
