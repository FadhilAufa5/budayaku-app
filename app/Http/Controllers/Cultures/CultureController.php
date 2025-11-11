<?php

namespace App\Http\Controllers\Cultures;

use App\Http\Controllers\Controller;
use App\Models\Culture;
use App\Models\CultureCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CultureController extends Controller
{
    public function index(Request $request)
    {
        $query = Culture::with('category');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('region', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('category', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('category')) {
            $query->where('culture_category_id', $request->input('category'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        $cultures = $query->latest()->paginate(12);

        $cultures->getCollection()->transform(function ($culture) {
            return [
                'id' => $culture->id,
                'name' => $culture->name,
                'category' => $culture->category?->name,
                'category_id' => $culture->culture_category_id,
                'region' => $culture->region,
                'status' => $culture->status,
                'image' => $culture->image,
                'description' => $culture->description,
                'views' => $culture->views,
                'lastUpdated' => $culture->updated_at->format('Y-m-d'),
            ];
        });

        $stats = [
            'total' => Culture::count(),
            'categories' => CultureCategory::count(),
            'totalViews' => Culture::sum('views'),
            'active' => Culture::where('status', 'active')->count(),
        ];

        return Inertia::render('cultures/index', [
            'cultures' => $cultures,
            'categories' => CultureCategory::all(['id', 'name']),
            'stats' => $stats,
            'filters' => $request->only(['search', 'category', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'culture_category_id' => 'required|exists:culture_categories,id',
            'region' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        Culture::create($validated);

        return redirect()->route('cultures.index')->with('success', 'Budaya berhasil ditambahkan.');
    }

    public function update(Request $request, Culture $culture)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'culture_category_id' => 'required|exists:culture_categories,id',
            'region' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $culture->update($validated);

        return redirect()->route('cultures.index')->with('success', 'Budaya berhasil diupdate.');
    }

    public function destroy(Culture $culture)
    {
        $culture->delete();

        return redirect()->route('cultures.index')->with('success', 'Budaya berhasil dihapus.');
    }
}
