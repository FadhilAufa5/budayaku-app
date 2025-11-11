import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Search, Calendar, MapPin, Users, Clock, Edit, Trash2, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { EventDialog } from '@/components/events/event-dialog';
import { DeleteEventDialog } from '@/components/events/delete-event-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Daftar Event', href: '/events/list' },
];

interface Event {
    id: number;
    title: string;
    category: string;
    category_id: number;
    date: string;
    time: string;
    location: string;
    status: string;
    image: string;
    description: string;
    participants: number;
    maxParticipants: number | null;
    price: string;
}

interface Category {
    id: number;
    name: string;
}

interface Stats {
    total: number;
    upcoming: number;
    completed: number;
    totalParticipants: number;
}

interface EventsIndexProps {
    events: {
        data: Event[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    stats: Stats;
    filters: {
        search?: string;
        category?: string;
        status?: string;
    };
}

export default function EventsIndex({ events, categories, stats, filters }: EventsIndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/events/list', { search: searchQuery }, { preserveState: true });
    };

    const handleEdit = (event: Event) => {
        setSelectedEvent(event);
        setIsDialogOpen(true);
    };

    const handleDelete = (event: Event) => {
        setSelectedEvent(event);
        setIsDeleteDialogOpen(true);
    };

    const handleAddNew = () => {
        setSelectedEvent(null);
        setIsDialogOpen(true);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming':
                return <Badge className="bg-blue-500">Akan Datang</Badge>;
            case 'ongoing':
                return <Badge className="bg-green-500">Berlangsung</Badge>;
            case 'completed':
                return <Badge variant="outline">Selesai</Badge>;
            case 'cancelled':
                return <Badge variant="destructive">Dibatalkan</Badge>;
            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Event" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Daftar Event</h1>
                        <p className="text-muted-foreground mt-1">Kelola agenda dan event budaya</p>
                    </div>
                    <Button className="w-fit" onClick={handleAddNew}>
                        <Plus className="h-4 w-4" />
                        Buat Event Baru
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Event</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-muted-foreground text-xs">Semua event</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Akan Datang</CardTitle>
                            <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.upcoming}</div>
                            <p className="text-muted-foreground text-xs">Event mendatang</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
                            <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalParticipants.toLocaleString()}</div>
                            <p className="text-muted-foreground text-xs">Terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completed}</div>
                            <p className="text-muted-foreground text-xs">Event sukses</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari event berdasarkan nama atau lokasi..."
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit" variant="outline">Cari</Button>
                        </form>
                    </CardContent>
                </Card>

                {events.data.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {events.data.map((event) => (
                            <Card key={event.id} className="group overflow-hidden transition-all hover:shadow-lg">
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative h-48 w-full md:h-auto md:w-48">
                                        <img
                                            src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400'}
                                            alt={event.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                                                {event.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <CardHeader className="space-y-2">
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                                {getStatusBadge(event.status)}
                                            </div>
                                            
                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {event.date} • {event.time} WIB
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    {event.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    {event.participants} {event.maxParticipants ? `/ ${event.maxParticipants}` : ''} peserta
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="text-sm font-semibold">
                                                    {event.price || 'Gratis'}
                                                </Badge>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                                                        <Edit className="h-3 w-3" />
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => handleDelete(event)}>
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground text-lg">Tidak ada event ditemukan</p>
                            <Button className="mt-4" onClick={handleAddNew}>
                                <Plus className="h-4 w-4" />
                                Buat Event Pertama
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            <EventDialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setSelectedEvent(null);
                }}
                event={selectedEvent}
                categories={categories}
            />

            <DeleteEventDialog
                open={isDeleteDialogOpen}
                onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open);
                    if (!open) setSelectedEvent(null);
                }}
                event={selectedEvent}
            />
        </AppLayout>
    );
}
