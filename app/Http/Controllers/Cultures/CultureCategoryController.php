<?php

namespace App\Http\Controllers\Cultures;

use App\Http\Controllers\Controller;
use App\Models\CultureCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CultureCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = CultureCategory::withCount('cultures');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        $categories = $query->latest()->paginate(12);

        $categories->getCollection()->transform(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'icon' => $category->icon,
                'color' => $category->color,
                'count' => $category->cultures_count,
            ];
        });

        $stats = [
            'total' => CultureCategory::count(),
            'totalCultures' => CultureCategory::withCount('cultures')->get()->sum('cultures_count'),
        ];

        return Inertia::render('cultures/categories', [
            'categories' => $categories,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:culture_categories,slug',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        CultureCategory::create($validated);

        return redirect()->route('culture-categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, CultureCategory $cultureCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:culture_categories,slug,' . $cultureCategory->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $cultureCategory->update($validated);

        return redirect()->route('culture-categories.index')->with('success', 'Kategori berhasil diupdate.');
    }

    public function destroy(CultureCategory $cultureCategory)
    {
        if ($cultureCategory->cultures()->count() > 0) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki budaya terkait.');
        }

        $cultureCategory->delete();

        return redirect()->route('culture-categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
