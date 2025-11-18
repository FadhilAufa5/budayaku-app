import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    Filter,
    MapPin,
    Calendar,
    Sparkles,
    ChevronRight,
    Grid3x3,
    List,
    Clock,
    Users,
    PartyPopper,
} from 'lucide-react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

interface Event {
    id: number;
    title: string;
    category: string;
    category_id: number;
    location: string;
    image: string;
    description: string;
    date: string;
    time: string;
    status: string;
    participants: number;
    max_participants: number | null;
    price: string;
    formatted_date: string;
}

interface Category {
    id: number;
    name: string;
    events_count?: number;
}

interface Stats {
    total: number;
    upcoming: number;
    ongoing: number;
    totalParticipants: number;
}

interface EventIndexProps {
    events: {
        data: Event[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    featuredEvents: Event[];
    stats: Stats;
    filters: {
        search?: string;
        category?: string;
        status?: string;
    };
}

export default function EventIndex({
    events,
    categories,
    featuredEvents,
    stats,
    filters,
}: EventIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/event', {
            search,
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            status: selectedStatus !== 'all' ? selectedStatus : undefined,
        });
    };

    const handleFilter = (type: 'category' | 'status', value: string) => {
        if (type === 'category') {
            setSelectedCategory(value);
        } else {
            setSelectedStatus(value);
        }

        router.get('/event', {
            search: filters.search,
            category: type === 'category' ? (value !== 'all' ? value : undefined) : filters.category,
            status: type === 'status' ? (value !== 'all' ? value : undefined) : filters.status,
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming':
                return <Badge className="bg-blue-500 text-white">Akan Datang</Badge>;
            case 'ongoing':
                return <Badge className="bg-green-500 text-white">Berlangsung</Badge>;
            case 'completed':
                return <Badge variant="outline">Selesai</Badge>;
            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Event Budaya Indonesia">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
                {/* Background Pattern */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="event-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="75" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="25" cy="75" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="75" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <path d="M 0,50 Q 25,25 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#event-pattern)" className="text-blue-800 dark:text-blue-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation />

                {/* Hero Section */}
                <div className="relative px-6 pt-24 pb-12 sm:pt-32 lg:px-12">
                    <div className={`mx-auto max-w-7xl text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Badge className="mb-4 border-blue-600 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md px-4 py-2 text-blue-900 shadow-lg hover:from-blue-500/30 hover:to-indigo-500/30 dark:border-blue-400 dark:text-blue-100 animate-pulse">
                            <PartyPopper className="mr-2 h-4 w-4" />
                            Acara & Festival Budaya
                        </Badge>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-300 dark:via-indigo-400 dark:to-purple-400">
                            Event Budaya Indonesia
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-base text-blue-800/90 dark:text-blue-200/90 sm:text-lg lg:text-xl">
                            Ikuti festival, workshop, dan acara budaya yang menampilkan kekayaan 
                            warisan nusantara dari berbagai daerah di Indonesia
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600 dark:text-blue-400" />
                                <Input
                                    type="text"
                                    placeholder="Cari event, festival, workshop..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-14 border-2 border-blue-200 bg-white/90 pl-12 pr-32 text-base shadow-xl backdrop-blur-md focus:border-blue-500 dark:border-blue-800 dark:bg-blue-950/80"
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-2 top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:scale-105 transition-all"
                                >
                                    Cari
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="relative px-6 pb-12 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="group border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Event</div>
                                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</div>
                                    <p className="text-xs text-blue-700/80 dark:text-blue-300/80">Acara budaya</p>
                                </CardContent>
                            </Card>

                            <Card className="group border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-green-800 dark:from-green-950 dark:to-emerald-950">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-medium text-green-900 dark:text-green-100">Akan Datang</div>
                                        <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.upcoming}</div>
                                    <p className="text-xs text-green-700/80 dark:text-green-300/80">Event mendatang</p>
                                </CardContent>
                            </Card>

                            <Card className="group border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-purple-800 dark:from-purple-950 dark:to-pink-950">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-medium text-purple-900 dark:text-purple-100">Berlangsung</div>
                                        <PartyPopper className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.ongoing}</div>
                                    <p className="text-xs text-purple-700/80 dark:text-purple-300/80">Event aktif</p>
                                </CardContent>
                            </Card>

                            <Card className="group border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-orange-800 dark:from-orange-950 dark:to-red-950">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-medium text-orange-900 dark:text-orange-100">Total Peserta</div>
                                        <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{stats.totalParticipants.toLocaleString()}</div>
                                    <p className="text-xs text-orange-700/80 dark:text-orange-300/80">Terdaftar</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative px-6 py-12 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        {/* Filters */}
                        <div className="mb-10 space-y-6 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/50 p-6 backdrop-blur-sm shadow-xl dark:border-blue-800 dark:from-blue-950/80 dark:via-blue-950/50 dark:to-indigo-950/50 lg:p-8">
                            {/* Filter by Category */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
                                        Filter Kategori
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleFilter('category', 'all')}
                                        className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                            selectedCategory === 'all'
                                                ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                                                : 'border-blue-300 bg-white text-blue-900 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100'
                                        }`}
                                    >
                                        <span className="relative z-10">Semua Kategori</span>
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleFilter('category', cat.id.toString())}
                                            className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                                selectedCategory === cat.id.toString()
                                                    ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                                                    : 'border-blue-300 bg-white text-blue-900 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100'
                                            }`}
                                        >
                                            <span className="relative z-10">
                                                {cat.name}{' '}
                                                <span className={`ml-1 text-xs ${selectedCategory === cat.id.toString() ? 'opacity-90' : 'opacity-60'}`}>
                                                    ({cat.events_count || 0})
                                                </span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-700"></div>

                            {/* Filter by Status */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
                                        Filter Status
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleFilter('status', 'all')}
                                        className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                            selectedStatus === 'all'
                                                ? 'border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                                                : 'border-blue-300 bg-white text-blue-900 hover:border-green-400 hover:bg-green-50 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100'
                                        }`}
                                    >
                                        <span className="relative z-10">Semua Status</span>
                                    </button>
                                    <button
                                        onClick={() => handleFilter('status', 'upcoming')}
                                        className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                            selectedStatus === 'upcoming'
                                                ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                                                : 'border-blue-300 bg-white text-blue-900 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100'
                                        }`}
                                    >
                                        <span className="relative z-10">Akan Datang</span>
                                    </button>
                                    <button
                                        onClick={() => handleFilter('status', 'ongoing')}
                                        className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                            selectedStatus === 'ongoing'
                                                ? 'border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                                                : 'border-blue-300 bg-white text-blue-900 hover:border-green-400 hover:bg-green-50 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100'
                                        }`}
                                    >
                                        <span className="relative z-10">Berlangsung</span>
                                    </button>
                                    <button
                                        onClick={() => handleFilter('status', 'completed')}
                                        className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                            selectedStatus === 'completed'
                                                ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                                : 'border-blue-300 bg-white text-blue-900 hover:border-purple-400 hover:bg-purple-50 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100'
                                        }`}
                                    >
                                        <span className="relative z-10">Selesai</span>
                                    </button>
                                </div>
                            </div>

                            {/* View Mode & Results Count */}
                            <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                    Menampilkan{' '}
                                    <span className="font-bold text-blue-900 dark:text-blue-100">
                                        {events.data.length}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-bold text-blue-900 dark:text-blue-100">
                                        {stats.total}
                                    </span>{' '}
                                    event
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Tampilan:
                                    </span>
                                    <div className="flex overflow-hidden rounded-lg border-2 border-blue-300 bg-white dark:border-blue-700 dark:bg-blue-950">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setViewMode('grid')}
                                            className={`rounded-none transition-all ${
                                                viewMode === 'grid'
                                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                                                    : 'text-blue-900 hover:bg-blue-100 dark:text-blue-100'
                                            }`}
                                        >
                                            <Grid3x3 className="h-4 w-4" />
                                        </Button>
                                        <div className="w-px bg-blue-300 dark:bg-blue-700"></div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setViewMode('list')}
                                            className={`rounded-none transition-all ${
                                                viewMode === 'list'
                                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                                                    : 'text-blue-900 hover:bg-blue-100 dark:text-blue-100'
                                            }`}
                                        >
                                            <List className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Events Grid/List */}
                        {events.data.length > 0 ? (
                            <>
                                <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-5'}>
                                    {events.data.map((event, index) => (
                                        <Link
                                            key={event.id}
                                            href={`/event/${event.id}`}
                                            className="group animate-in fade-in slide-in-from-bottom-4"
                                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                                        >
                                            <Card className={`group relative overflow-hidden border-2 border-blue-200 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-2xl dark:border-blue-800 dark:bg-blue-950/90 ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                                                {/* Image Container */}
                                                <div className={`relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 ${viewMode === 'grid' ? 'h-56' : 'h-40 w-40 flex-shrink-0'}`}>
                                                    {event.image ? (
                                                        <>
                                                            <img
                                                                src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400'}
                                                                alt={event.title}
                                                                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                                            <div className="absolute right-3 top-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                                {getStatusBadge(event.status)}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <Calendar className={`animate-pulse text-blue-400 opacity-40 ${viewMode === 'grid' ? 'h-20 w-20' : 'h-12 w-12'}`} />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <CardContent className={`relative z-10 ${viewMode === 'grid' ? 'p-5' : 'flex flex-1 flex-col justify-center p-5'}`}>
                                                    <Badge className="mb-3 w-fit border-0 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 px-3 py-1 text-xs font-semibold text-blue-900 dark:text-blue-100">
                                                        {event.category}
                                                    </Badge>
                                                    
                                                    <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-blue-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-blue-100 dark:group-hover:text-indigo-400">
                                                        {event.title}
                                                    </h3>
                                                    
                                                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-blue-700/90 dark:text-blue-300/90">
                                                        {event.description}
                                                    </p>
                                                    
                                                    <div className="space-y-2 border-t border-blue-200/50 pt-3 text-xs dark:border-blue-800/50">
                                                        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                                                            <Calendar className="h-3.5 w-3.5" />
                                                            <span>{event.formatted_date} • {event.time} WIB</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                                                            <MapPin className="h-3.5 w-3.5" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                                                                <Users className="h-3.5 w-3.5" />
                                                                <span>{event.participants} {event.max_participants ? `/ ${event.max_participants}` : ''} peserta</span>
                                                            </div>
                                                            <Badge variant="outline" className="text-xs font-semibold">
                                                                {event.price || 'Gratis'}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-4 right-4 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                                                            <ChevronRight className="h-4 w-4" />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {events.last_page > 1 && (
                                    <div className="mt-8 flex items-center justify-center gap-2">
                                        {events.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url)}
                                                className={
                                                    link.active
                                                        ? 'bg-blue-600 hover:bg-blue-700'
                                                        : 'border-blue-200 text-blue-900 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-100'
                                                }
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Card className="border-2 border-blue-200 bg-white/80 p-12 text-center backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/80">
                                <PartyPopper className="mx-auto mb-4 h-16 w-16 text-blue-400" />
                                <h3 className="mb-2 text-xl font-bold text-blue-900 dark:text-blue-100">
                                    Event Tidak Ditemukan
                                </h3>
                                <p className="text-blue-700 dark:text-blue-300">
                                    Coba ubah filter atau kata kunci pencarian Anda
                                </p>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative border-t border-blue-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            <Calendar className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                BudayaKu - Acara Budaya Indonesia
                            </span>
                        </div>
                        <div className="text-center text-sm text-blue-800/80 dark:text-blue-200/80">
                            © 2025 BudayaKu | Lestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
