<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class EventScheduleController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->input('month', now()->month);
        $year = $request->input('year', now()->year);

        $startDate = Carbon::create($year, $month, 1)->startOfMonth();
        $endDate = Carbon::create($year, $month, 1)->endOfMonth();

        $events = Event::with('category')
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date')
            ->orderBy('time')
            ->get();

        $groupedEvents = $events->groupBy(function ($event) {
            return $event->date->format('Y-m-d');
        })->map(function ($dayEvents, $date) {
            return [
                'date' => $date,
                'dayName' => Carbon::parse($date)->locale('id')->translatedFormat('l'),
                'events' => $dayEvents->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'time' => $event->time->format('H:i'),
                        'location' => $event->location,
                        'category' => $event->category?->name,
                        'participants' => $event->participants,
                        'color' => $event->category?->color ?? 'bg-gray-500',
                    ];
                })->values(),
            ];
        })->values();

        $calendarData = $this->generateCalendarDays($year, $month, $events);

        $stats = [
            'totalEvents' => $events->count(),
            'totalParticipants' => $events->sum('participants'),
            'categories' => $events->groupBy('category.name')->map->count()->sortDesc()->take(3),
        ];

        return Inertia::render('events/schedule', [
            'schedule' => $groupedEvents,
            'calendar' => $calendarData,
            'stats' => $stats,
            'currentMonth' => [
                'month' => $month,
                'year' => $year,
                'name' => Carbon::create($year, $month)->locale('id')->translatedFormat('F Y'),
            ],
        ]);
    }

    private function generateCalendarDays($year, $month, $events)
    {
        $startDate = Carbon::create($year, $month, 1);
        $endDate = $startDate->copy()->endOfMonth();
        $startDay = $startDate->copy()->startOfWeek();
        $endDay = $endDate->copy()->endOfWeek();

        $days = [];
        $current = $startDay->copy();

        while ($current <= $endDay) {
            $hasEvent = $events->contains(function ($event) use ($current) {
                return $event->date->isSameDay($current);
            });

            $days[] = [
                'date' => $current->day,
                'fullDate' => $current->format('Y-m-d'),
                'isCurrentMonth' => $current->month == $month,
                'hasEvent' => $hasEvent,
                'isToday' => $current->isToday(),
            ];

            $current->addDay();
        }

        return $days;
    }
}
