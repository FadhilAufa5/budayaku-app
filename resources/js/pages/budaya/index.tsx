import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    Filter,
    MapPin,
    Eye,
    Sparkles,
    ChevronRight,
    Grid3x3,
    List,
} from 'lucide-react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

interface Culture {
    id: number;
    name: string;
    category: string;
    category_id: number;
    region: string;
    image: string;
    description: string;
    views: number;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
    cultures_count?: number;
}

interface Stats {
    total: number;
    categories: number;
    regions: number;
    totalViews: number;
}

interface BudayaIndexProps {
    cultures: {
        data: Culture[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    regions: string[];
    featuredCultures: Culture[];
    stats: Stats;
    filters: {
        search?: string;
        category?: string;
        region?: string;
    };
}

export default function BudayaIndex({
    cultures,
    categories,
    regions,
    featuredCultures,
    stats,
    filters,
}: BudayaIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [selectedRegion, setSelectedRegion] = useState(filters.region || 'all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/budaya', {
            search,
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            region: selectedRegion !== 'all' ? selectedRegion : undefined,
        });
    };

    const handleFilter = (type: 'category' | 'region', value: string) => {
        if (type === 'category') {
            setSelectedCategory(value);
        } else {
            setSelectedRegion(value);
        }

        router.get('/budaya', {
            search: filters.search,
            category: type === 'category' ? (value !== 'all' ? value : undefined) : filters.category,
            region: type === 'region' ? (value !== 'all' ? value : undefined) : filters.region,
        });
    };

    return (
        <>
            <Head title="Budaya Indonesia">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
                {/* Background Pattern - Batik Indonesia */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="batik-indonesian" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                {/* Motif Batik Parang */}
                                <path d="M 0,60 Q 15,45 30,60 T 60,60" stroke="currentColor" fill="none" strokeWidth="1"/>
                                <path d="M 60,60 Q 75,45 90,60 T 120,60" stroke="currentColor" fill="none" strokeWidth="1"/>
                                <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <circle cx="90" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <circle cx="30" cy="90" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <circle cx="90" cy="90" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                {/* Motif tambahan */}
                                <path d="M 15,0 L 15,15 M 45,0 L 45,15 M 75,0 L 75,15 M 105,0 L 105,15" stroke="currentColor" strokeWidth="0.5"/>
                                <path d="M 0,15 L 15,15 M 0,45 L 15,45 M 0,75 L 15,75 M 0,105 L 15,105" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#batik-indonesian)" className="text-amber-800 dark:text-amber-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation />

                {/* Hero Section */}
                <div className="relative overflow-hidden pt-16">
                    <div className="relative px-6 py-16 sm:py-20 lg:px-12">
                        <div className={`mx-auto max-w-7xl text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Badge className="mb-4 border-amber-600 bg-amber-500/20 px-4 py-2 text-amber-900 hover:bg-amber-500/30 dark:border-amber-400 dark:text-amber-100 animate-pulse">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Eksplorasi Kekayaan Nusantara
                            </Badge>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-50 sm:text-5xl lg:text-6xl bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-orange-400 dark:to-red-400">
                                Budaya Indonesia
                            </h1>
                            <p className="mx-auto mb-8 max-w-3xl text-base text-amber-800/80 dark:text-amber-200/80 sm:text-lg lg:text-xl">
                                Jelajahi keindahan batik, tarian tradisional, kerajinan tangan, dan
                                warisan budaya nusantara dari Sabang sampai Merauke
                            </p>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-600 dark:text-amber-400" />
                                    <Input
                                        type="text"
                                        placeholder="Cari batik, tarian, kerajinan..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="h-14 border-2 border-amber-200 bg-white/80 pl-12 pr-32 text-base backdrop-blur-sm focus:border-amber-500 dark:border-amber-800 dark:bg-amber-950/50"
                                    />
                                    <Button
                                        type="submit"
                                        className="absolute right-2 top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
                                    >
                                        Cari
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="relative border-y border-amber-200 bg-white/60 px-6 py-12 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/60 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="group border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-amber-800 dark:from-amber-950 dark:to-orange-950">
                                <CardContent className="p-6 text-center">
                                    <div className="mb-2 text-4xl font-bold text-amber-900 transition-all group-hover:scale-110 dark:text-amber-100">
                                        {stats.total}
                                    </div>
                                    <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                        Total Budaya
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="group border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
                                <CardContent className="p-6 text-center">
                                    <div className="mb-2 text-4xl font-bold text-blue-900 transition-all group-hover:scale-110 dark:text-blue-100">
                                        {stats.categories}
                                    </div>
                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Kategori
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="group border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-emerald-800 dark:from-emerald-950 dark:to-green-950">
                                <CardContent className="p-6 text-center">
                                    <div className="mb-2 text-4xl font-bold text-emerald-900 transition-all group-hover:scale-110 dark:text-emerald-100">
                                        {stats.regions}
                                    </div>
                                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                        Daerah
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="group border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-purple-800 dark:from-purple-950 dark:to-pink-950">
                                <CardContent className="p-6 text-center">
                                    <div className="mb-2 text-4xl font-bold text-purple-900 transition-all group-hover:scale-110 dark:text-purple-100">
                                        {stats.totalViews.toLocaleString()}
                                    </div>
                                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                        Total Views
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative px-6 py-12 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        {/* Featured Cultures */}
                        {featuredCultures && featuredCultures.length > 0 && (
                            <div className="mb-12">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                        Budaya Terpopuler
                                    </h2>
                                </div>
                                <div className="grid gap-6 md:grid-cols-3">
                                    {featuredCultures.map((culture, index) => (
                                        <Link
                                            key={culture.id}
                                            href={`/budaya/${culture.id}`}
                                            className="group"
                                            style={{ animationDelay: `${index * 150}ms` }}
                                        >
                                            <Card className="overflow-hidden border-2 border-amber-200 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-amber-500 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4 dark:border-amber-800">
                                                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900">
                                                    {culture.image ? (
                                                        <>
                                                            <img
                                                                src={`/storage/${culture.image}`}
                                                                alt={culture.name}
                                                                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
                                                        </>
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <MapPin className="h-20 w-20 text-amber-400 opacity-50" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-orange-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-30"></div>
                                                    <div className="absolute bottom-4 left-4 right-4 transform transition-all duration-300 group-hover:translate-y-0">
                                                        <Badge className="mb-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                                                            {culture.category}
                                                        </Badge>
                                                        <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                                            {culture.name}
                                                        </h3>
                                                        <div className="mt-2 flex items-center gap-4 text-sm text-white/90">
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-4 w-4" />
                                                                {culture.region}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="h-4 w-4" />
                                                                {culture.views.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute right-4 top-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                        <ChevronRight className="h-6 w-6 text-white drop-shadow-lg" />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Filters */}
                        <div className="mb-8 flex flex-col gap-4 rounded-xl border-2 border-amber-200 bg-white/60 p-6 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/60 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                <span className="font-semibold text-amber-900 dark:text-amber-100">
                                    Filter:
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => handleFilter('category', e.target.value)}
                                    className="rounded-lg border-2 border-amber-200 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition-colors hover:border-amber-400 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
                                >
                                    <option value="all">Semua Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name} ({cat.cultures_count || 0})
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => handleFilter('region', e.target.value)}
                                    className="rounded-lg border-2 border-amber-200 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition-colors hover:border-amber-400 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
                                >
                                    <option value="all">Semua Daerah</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                    Tampilan:
                                </span>
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className={viewMode === 'grid' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-200 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-100'}
                                >
                                    <Grid3x3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className={viewMode === 'list' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-200 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-100'}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Cultures Grid/List */}
                        {cultures.data.length > 0 ? (
                            <>
                                <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'}>
                                    {cultures.data.map((culture, index) => (
                                        <Link
                                            key={culture.id}
                                            href={`/budaya/${culture.id}`}
                                            className="group animate-in fade-in slide-in-from-bottom-4"
                                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                                        >
                                            <Card className={`overflow-hidden border-2 border-amber-200 bg-white/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-2xl dark:border-amber-800 dark:bg-amber-950/80 ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                                                <div className={`relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 ${viewMode === 'grid' ? 'h-48' : 'h-32 w-32 flex-shrink-0'}`}>
                                                    {culture.image ? (
                                                        <>
                                                            <img
                                                                src={`/storage/${culture.image}`}
                                                                alt={culture.name}
                                                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                                        </>
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <MapPin className={`text-amber-400 opacity-50 ${viewMode === 'grid' ? 'h-16 w-16' : 'h-10 w-10'}`} />
                                                        </div>
                                                    )}
                                                </div>
                                                <CardContent className={`relative ${viewMode === 'grid' ? 'p-4' : 'flex flex-1 flex-col justify-center p-4'}`}>
                                                    <Badge className="mb-2 w-fit border border-amber-300 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-800 transition-colors group-hover:from-amber-500/30 group-hover:to-orange-500/30 dark:text-amber-200">
                                                        {culture.category}
                                                    </Badge>
                                                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-amber-900 transition-colors group-hover:text-orange-600 dark:text-amber-100 dark:group-hover:text-amber-300">
                                                        {culture.name}
                                                    </h3>
                                                    <p className="mb-3 line-clamp-2 text-sm text-amber-700/80 dark:text-amber-300/80">
                                                        {culture.description}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-amber-600 dark:text-amber-400">
                                                        <div className="flex items-center gap-1 transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300">
                                                            <MapPin className="h-4 w-4" />
                                                            {culture.region}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            {culture.views.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {cultures.last_page > 1 && (
                                    <div className="mt-8 flex items-center justify-center gap-2">
                                        {cultures.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url)}
                                                className={
                                                    link.active
                                                        ? 'bg-amber-600 hover:bg-amber-700'
                                                        : 'border-amber-200 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-100'
                                                }
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Card className="border-2 border-amber-200 bg-white/80 p-12 text-center backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/80">
                                <Sparkles className="mx-auto mb-4 h-16 w-16 text-amber-400" />
                                <h3 className="mb-2 text-xl font-bold text-amber-900 dark:text-amber-100">
                                    Budaya Tidak Ditemukan
                                </h3>
                                <p className="text-amber-700 dark:text-amber-300">
                                    Coba ubah filter atau kata kunci pencarian Anda
                                </p>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative border-t border-amber-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                            <MapPin className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Indonesia - Dari Sabang sampai Merauke
                            </span>
                        </div>
                        <div className="text-center text-sm text-amber-800/80 dark:text-amber-200/80">
                            © 2025 BudayaKu | Lestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
