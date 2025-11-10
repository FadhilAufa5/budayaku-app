import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Calendar, MapPin, Users, Clock, Edit, Trash2, Eye, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Daftar Event', href: '/events/list' },
];

const eventData = [
    {
        id: 1,
        title: 'Festival Wayang Kulit',
        category: 'Festival',
        date: '2024-02-15',
        time: '19:00',
        location: 'Gedung Kesenian Jakarta',
        status: 'upcoming',
        participants: 250,
        maxParticipants: 500,
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
        price: 'Rp 50.000',
    },
    {
        id: 2,
        title: 'Workshop Membatik',
        category: 'Workshop',
        date: '2024-02-20',
        time: '14:00',
        location: 'Pekalongan, Jawa Tengah',
        status: 'upcoming',
        participants: 45,
        maxParticipants: 50,
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
        price: 'Rp 150.000',
    },
    {
        id: 3,
        title: 'Pameran Seni Rupa Kontemporer',
        category: 'Pameran',
        date: '2024-01-10',
        time: '10:00',
        location: 'Museum Nasional',
        status: 'completed',
        participants: 1240,
        maxParticipants: 2000,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        price: 'Gratis',
    },
    {
        id: 4,
        title: 'Pertunjukan Tari Saman',
        category: 'Pertunjukan',
        date: '2024-02-28',
        time: '18:00',
        location: 'Aceh Cultural Center',
        status: 'upcoming',
        participants: 180,
        maxParticipants: 300,
        image: 'https://images.unsplash.com/photo-1555400038-63f526b1c3b8?w=400',
        price: 'Rp 75.000',
    },
];

export default function EventsIndex() {
    const upcomingCount = eventData.filter(e => e.status === 'upcoming').length;
    const completedCount = eventData.filter(e => e.status === 'completed').length;
    const totalParticipants = eventData.reduce((sum, e) => sum + e.participants, 0);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming':
                return <Badge className="bg-blue-500">Akan Datang</Badge>;
            case 'ongoing':
                return <Badge className="bg-green-500">Berlangsung</Badge>;
            case 'completed':
                return <Badge variant="outline">Selesai</Badge>;
            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Event" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Daftar Event</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola agenda dan event budaya
                        </p>
                    </div>
                    <Button className="w-fit">
                        <Plus className="h-4 w-4" />
                        Buat Event Baru
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Event</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{eventData.length}</div>
                            <p className="text-muted-foreground text-xs">Semua event</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Akan Datang</CardTitle>
                            <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{upcomingCount}</div>
                            <p className="text-muted-foreground text-xs">Event mendatang</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
                            <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalParticipants.toLocaleString()}</div>
                            <p className="text-muted-foreground text-xs">Terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{completedCount}</div>
                            <p className="text-muted-foreground text-xs">Event sukses</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    placeholder="Cari event berdasarkan nama atau lokasi..."
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline">Semua</Button>
                                <Button variant="outline">Akan Datang</Button>
                                <Button variant="outline">Filter</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Events List */}
                <div className="grid gap-4 md:grid-cols-2">
                    {eventData.map((event) => (
                        <Card key={event.id} className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className="flex flex-col md:flex-row">
                                <div className="relative h-48 w-full md:h-auto md:w-48">
                                    <img
                                        src={event.image}
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
                                                {event.participants} / {event.maxParticipants} peserta
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="text-sm font-semibold">
                                                {event.price}
                                            </Badge>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-3 w-3" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button variant="outline" size="sm">
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
            </div>
        </AppLayout>
    );
}
