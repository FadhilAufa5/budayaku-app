<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicEventController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Event::with('category')->where('status', '!=', 'cancelled');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('category') && $request->input('category') !== 'all') {
            $query->where('event_category_id', $request->input('category'));
        }

        if ($request->has('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $events = $query->orderBy('date', 'asc')->paginate(12);

        $events->getCollection()->transform(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'category' => $event->category?->name,
                'category_id' => $event->event_category_id,
                'date' => $event->date->format('Y-m-d'),
                'time' => $event->time->format('H:i'),
                'location' => $event->location,
                'status' => $event->status,
                'image' => $event->image,
                'description' => $event->description,
                'participants' => $event->participants,
                'max_participants' => $event->max_participants,
                'price' => $event->price,
                'formatted_date' => $event->date->format('d M Y'),
            ];
        });

        $categories = EventCategory::withCount('events')->get(['id', 'name']);
        
        $featuredEvents = Event::with('category')
            ->where('status', 'upcoming')
            ->orderBy('date', 'asc')
            ->take(3)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'category' => $event->category?->name,
                    'location' => $event->location,
                    'image' => $event->image,
                    'date' => $event->date->format('d M Y'),
                    'participants' => $event->participants,
                ];
            });

        $stats = [
            'total' => Event::where('status', '!=', 'cancelled')->count(),
            'upcoming' => Event::where('status', 'upcoming')->count(),
            'ongoing' => Event::where('status', 'ongoing')->count(),
            'totalParticipants' => Event::where('status', '!=', 'cancelled')->sum('participants'),
        ];

        return Inertia::render('event/index', [
            'events' => $events,
            'categories' => $categories,
            'featuredEvents' => $featuredEvents,
            'stats' => $stats,
            'filters' => $request->only(['search', 'category', 'status']),
        ]);
    }

    public function show(Event $event): Response
    {
        $relatedEvents = Event::with('category')
            ->where('status', '!=', 'cancelled')
            ->where('id', '!=', $event->id)
            ->where(function ($query) use ($event) {
                $query->where('event_category_id', $event->event_category_id)
                    ->orWhere('location', 'like', "%{$event->location}%");
            })
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'category' => $item->category?->name,
                    'location' => $item->location,
                    'image' => $item->image,
                    'date' => $item->date->format('d M Y'),
                    'participants' => $item->participants,
                ];
            });

        return Inertia::render('event/show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'category' => $event->category?->name,
                'location' => $event->location,
                'description' => $event->description,
                'image' => $event->image,
                'date' => $event->date->format('d M Y'),
                'time' => $event->time->format('H:i'),
                'status' => $event->status,
                'participants' => $event->participants,
                'max_participants' => $event->max_participants,
                'price' => $event->price,
                'full_date' => $event->date->format('Y-m-d'),
            ],
            'relatedEvents' => $relatedEvents,
        ]);
    }
}
