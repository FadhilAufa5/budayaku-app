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
import DomeGallery from '@/components/DomeGallery';

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
                <div className="relative px-6 pt-24 pb-12 sm:pt-32 lg:px-12">
                    <div className={`mx-auto max-w-7xl text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Badge className="mb-4 border-amber-600 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md px-4 py-2 text-amber-900 shadow-lg hover:from-amber-500/30 hover:to-orange-500/30 dark:border-amber-400 dark:text-amber-100 animate-pulse">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Eksplorasi Kekayaan Nusantara
                        </Badge>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-orange-400 dark:to-red-400">
                            Budaya Indonesia
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-base text-amber-800/90 dark:text-amber-200/90 sm:text-lg lg:text-xl">
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
                                    className="h-14 border-2 border-amber-200 bg-white/90 pl-12 pr-32 text-base shadow-xl backdrop-blur-md focus:border-amber-500 dark:border-amber-800 dark:bg-amber-950/80"
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-2 top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg hover:from-amber-500 hover:to-orange-500 hover:scale-105 transition-all"
                                >
                                    Cari
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* DomeGallery Showcase Section - Natural & Seamless */}
                {featuredCultures && featuredCultures.length > 0 && (
                    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-visible">
                        {/* Smooth Gradient Background - No Borders */}
                        <div className="absolute inset-0 -mx-6 lg:-mx-12">
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/0 via-amber-50/40 to-amber-50/0 dark:from-amber-950/0 dark:via-amber-950/40 dark:to-amber-950/0"></div>
                        </div>
                        
                        {/* Soft Edge Fade - Top */}
                        <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-amber-50 via-amber-50/50 to-transparent dark:from-amber-950 dark:via-amber-950/50 dark:to-transparent z-10 pointer-events-none"></div>
                        
                        {/* Soft Edge Fade - Bottom */}
                        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-amber-50 via-amber-50/50 to-transparent dark:from-amber-950 dark:via-amber-950/50 dark:to-transparent z-10 pointer-events-none"></div>
                        
                        {/* DomeGallery - Full Bleed */}
                        <div className="absolute inset-0">
                            <DomeGallery
                                images={featuredCultures.slice(0, 7).map(culture => ({
                                    src: culture.image ? `/storage/${culture.image}` : 'https://images.unsplash.com/photo-1592364395653-83e648b20cc2?w=600',
                                    alt: culture.name
                                }))}
                                fit={0.6}
                                minRadius={200}
                                maxRadius={800}
                                segments={35}
                                overlayBlurColor="rgba(255, 251, 235, 0)"
                                imageBorderRadius="12px"
                                openedImageBorderRadius="16px"
                                grayscale={false}
                                openedImageWidth="min(90vw, 400px)"
                                openedImageHeight="min(90vw, 400px)"
                                dragSensitivity={16}
                            />
                        </div>
                        
                        {/* Instruction Text - Floating */}
                        <div className="absolute bottom-12 left-0 right-0 z-20 text-center pointer-events-none">
                            <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-100 bg-white/70 dark:bg-black/50 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block shadow-2xl animate-bounce border border-amber-300/30 dark:border-amber-700/30">
                                🎨 Geser & Klik untuk Eksplorasi
                            </p>
                        </div>
                    </div>
                )}

                {/* About Indonesian Culture Section */}
                <div className="relative px-6 py-16 lg:px-12 lg:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            {/* Left Column - Text Content */}
                            <div className="space-y-6">
                                <div>
                                    <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 py-2 text-blue-900 dark:text-blue-100">
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Tentang Budaya Indonesia
                                    </Badge>
                                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-100 sm:text-4xl">
                                        Kekayaan Warisan{' '}
                                        <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                            Nusantara
                                        </span>
                                    </h2>
                                </div>
                                
                                <p className="text-base leading-relaxed text-amber-800/90 dark:text-amber-200/90 lg:text-lg">
                                    Indonesia memiliki lebih dari <strong className="text-amber-900 dark:text-amber-100">1.300 suku bangsa</strong> dan{' '}
                                    <strong className="text-amber-900 dark:text-amber-100">700 bahasa daerah</strong>, menjadikannya salah satu negara 
                                    dengan keberagaman budaya terkaya di dunia. Dari Sabang hingga Merauke, setiap daerah memiliki keunikan yang 
                                    membentuk identitas bangsa.
                                </p>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="group rounded-xl border-2 border-amber-200 bg-white/50 p-4 backdrop-blur-sm transition-all hover:scale-105 hover:border-amber-400 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950/50">
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                                                <Sparkles className="h-4 w-4" />
                                            </div>
                                            <h3 className="font-semibold text-amber-900 dark:text-amber-100">Seni & Tradisi</h3>
                                        </div>
                                        <p className="text-sm text-amber-700 dark:text-amber-300">
                                            Batik, wayang, tari tradisional, dan seni rupa yang diwariskan turun-temurun
                                        </p>
                                    </div>

                                    <div className="group rounded-xl border-2 border-blue-200 bg-white/50 p-4 backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-400 hover:shadow-lg dark:border-blue-800 dark:bg-blue-950/50">
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                                <Eye className="h-4 w-4" />
                                            </div>
                                            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Warisan Dunia</h3>
                                        </div>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            9 situs UNESCO termasuk Candi Borobudur, Prambanan, dan Subak Bali
                                        </p>
                                    </div>

                                    <div className="group rounded-xl border-2 border-emerald-200 bg-white/50 p-4 backdrop-blur-sm transition-all hover:scale-105 hover:border-emerald-400 hover:shadow-lg dark:border-emerald-800 dark:bg-emerald-950/50">
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                                                <MapPin className="h-4 w-4" />
                                            </div>
                                            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">17.000 Pulau</h3>
                                        </div>
                                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                            Kepulauan terbesar di dunia dengan keunikan budaya di setiap wilayah
                                        </p>
                                    </div>

                                    <div className="group rounded-xl border-2 border-purple-200 bg-white/50 p-4 backdrop-blur-sm transition-all hover:scale-105 hover:border-purple-400 hover:shadow-lg dark:border-purple-800 dark:bg-purple-950/50">
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                                                <ChevronRight className="h-4 w-4" />
                                            </div>
                                            <h3 className="font-semibold text-purple-900 dark:text-purple-100">Kuliner Khas</h3>
                                        </div>
                                        <p className="text-sm text-purple-700 dark:text-purple-300">
                                            Ribuan resep tradisional dengan rempah-rempah khas nusantara
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-amber-300/50 bg-gradient-to-br from-amber-100/50 to-orange-100/50 p-6 backdrop-blur-sm dark:border-amber-700/50 dark:from-amber-900/30 dark:to-orange-900/30">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                                            <Sparkles className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-bold text-amber-900 dark:text-amber-100">Misi Pelestarian</h4>
                                            <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                                                Platform ini hadir untuk mendokumentasikan, melestarikan, dan memperkenalkan kekayaan 
                                                budaya Indonesia kepada generasi muda dan dunia. Mari bersama menjaga warisan leluhur!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Indonesia Map */}
                            <div className="space-y-6">
                                <div className="relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-2xl dark:border-amber-800 dark:from-amber-950 dark:to-orange-950">
                                    {/* Decorative Pattern */}
                                    <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-amber-500/10 blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 h-40 w-40 translate-x-10 translate-y-10 rounded-full bg-orange-500/10 blur-3xl"></div>
                                    
                                    <div className="relative space-y-6">
                                        <h3 className="mb-6 text-2xl font-bold text-amber-900 dark:text-amber-100">
                                            Peta Indonesia & Statistik Budaya
                                        </h3>
                                        
                                            {/* Map Image */}
                                            <img 
                                                src="/peta.png" 
                                                alt="Peta Indonesia" 
                                                className="w-full h-auto rounded-2xl shadow-lg transition-all duration-500 hover:scale-105"
                                            />
                                        {/* Additional Info */}
                                        <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl border border-amber-300/50 bg-gradient-to-r from-amber-100/50 to-orange-100/50 p-4 backdrop-blur-sm dark:border-amber-700/50 dark:from-amber-900/30 dark:to-orange-900/30">
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-amber-900 dark:text-amber-100">38</div>
                                                <div className="text-xs text-amber-700 dark:text-amber-300">Provinsi</div>
                                            </div>
                                            <div className="text-center border-x border-amber-300/50 dark:border-amber-700/50">
                                                <div className="text-xl font-bold text-amber-900 dark:text-amber-100">700+</div>
                                                <div className="text-xs text-amber-700 dark:text-amber-300">Bahasa</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-amber-900 dark:text-amber-100">1.3K+</div>
                                                <div className="text-xs text-amber-700 dark:text-amber-300">Suku</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative px-6 py-12 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        {/* Content Header with Title & Description */}
                        <div className="mb-12 text-center">
                            <Badge className="mb-4 border-blue-600 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 text-blue-900 shadow-lg dark:border-blue-400 dark:text-blue-100">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Koleksi Budaya Nusantara
                            </Badge>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-100 sm:text-4xl">
                                Jelajahi{' '}
                                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                                    {stats.total}+ Budaya Indonesia
                                </span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-base text-amber-800/90 dark:text-amber-200/90">
                                Temukan kekayaan warisan budaya dari {stats.regions}+ daerah di Indonesia. 
                                Filter berdasarkan kategori atau wilayah untuk menemukan budaya yang Anda cari.
                            </p>
                            
                            {/* Statistics Row */}
                            <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-6 text-center">
                                <div className="group">
                                    <div className="mb-1 text-3xl font-bold text-amber-900 transition-transform group-hover:scale-110 dark:text-amber-100">
                                        {stats.total}+
                                    </div>
                                    <div className="text-sm text-amber-700 dark:text-amber-300">Budaya</div>
                                </div>
                                <div className="h-12 w-px bg-amber-300 dark:bg-amber-700"></div>
                                <div className="group">
                                    <div className="mb-1 text-3xl font-bold text-blue-900 transition-transform group-hover:scale-110 dark:text-blue-100">
                                        {stats.categories}
                                    </div>
                                    <div className="text-sm text-blue-700 dark:text-blue-300">Kategori</div>
                                </div>
                                <div className="h-12 w-px bg-amber-300 dark:bg-amber-700"></div>
                                <div className="group">
                                    <div className="mb-1 text-3xl font-bold text-emerald-900 transition-transform group-hover:scale-110 dark:text-emerald-100">
                                        {stats.regions}+
                                    </div>
                                    <div className="text-sm text-emerald-700 dark:text-emerald-300">Daerah</div>
                                </div>
                                <div className="h-12 w-px bg-amber-300 dark:bg-amber-700"></div>
                                <div className="group">
                                    <div className="mb-1 text-3xl font-bold text-purple-900 transition-transform group-hover:scale-110 dark:text-purple-100">
                                        {stats.totalViews.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-purple-700 dark:text-purple-300">Total Views</div>
                                </div>
                            </div>
                        </div>
                     
                        {/* Enhanced Filters with Pills/Chips Style */}
                        <div className="mb-10 space-y-6 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 p-6 backdrop-blur-sm shadow-xl dark:border-amber-800 dark:from-amber-950/80 dark:via-amber-950/50 dark:to-orange-950/50 lg:p-8">
                            {/* Filter by Category - Pills Style */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                                        Filter Kategori
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleFilter('category', 'all')}
                                        className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                            selectedCategory === 'all'
                                                ? 'border-amber-500 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                                                : 'border-amber-300 bg-white text-amber-900 hover:border-amber-400 hover:bg-amber-50 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100'
                                        }`}
                                    >
                                        <span className="relative z-10">Semua Kategori</span>
                                        {selectedCategory === 'all' && (
                                            <div className="absolute inset-0 -z-0 animate-pulse bg-gradient-to-r from-amber-400 to-orange-400 opacity-50"></div>
                                        )}
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleFilter('category', cat.id.toString())}
                                            className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                                selectedCategory === cat.id.toString()
                                                    ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                                                    : 'border-amber-300 bg-white text-amber-900 hover:border-blue-400 hover:bg-blue-50 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100'
                                            }`}
                                        >
                                            <span className="relative z-10">
                                                {cat.name}{' '}
                                                <span className={`ml-1 text-xs ${selectedCategory === cat.id.toString() ? 'opacity-90' : 'opacity-60'}`}>
                                                    ({cat.cultures_count || 0})
                                                </span>
                                            </span>
                                            {selectedCategory === cat.id.toString() && (
                                                <div className="absolute inset-0 -z-0 animate-pulse bg-gradient-to-r from-blue-400 to-indigo-400 opacity-50"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent dark:via-amber-700"></div>

                            {/* Filter by Region - Pills Style */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                                        Filter Daerah
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleFilter('region', 'all')}
                                        className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                            selectedRegion === 'all'
                                                ? 'border-emerald-500 bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg'
                                                : 'border-amber-300 bg-white text-amber-900 hover:border-emerald-400 hover:bg-emerald-50 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100'
                                        }`}
                                    >
                                        <span className="relative z-10">Semua Daerah</span>
                                        {selectedRegion === 'all' && (
                                            <div className="absolute inset-0 -z-0 animate-pulse bg-gradient-to-r from-emerald-400 to-green-400 opacity-50"></div>
                                        )}
                                    </button>
                                    {regions.map((region) => (
                                        <button
                                            key={region}
                                            onClick={() => handleFilter('region', region)}
                                            className={`group relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                                selectedRegion === region
                                                    ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                                    : 'border-amber-300 bg-white text-amber-900 hover:border-purple-400 hover:bg-purple-50 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100'
                                            }`}
                                        >
                                            <span className="relative z-10">{region}</span>
                                            {selectedRegion === region && (
                                                <div className="absolute inset-0 -z-0 animate-pulse bg-gradient-to-r from-purple-400 to-pink-400 opacity-50"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* View Mode & Results Count */}
                            <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                                <div className="text-sm text-amber-700 dark:text-amber-300">
                                    Menampilkan{' '}
                                    <span className="font-bold text-amber-900 dark:text-amber-100">
                                        {cultures.data.length}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-bold text-amber-900 dark:text-amber-100">
                                        {stats.total}
                                    </span>{' '}
                                    budaya
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                        Tampilan:
                                    </span>
                                    <div className="flex overflow-hidden rounded-lg border-2 border-amber-300 bg-white dark:border-amber-700 dark:bg-amber-950">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setViewMode('grid')}
                                            className={`rounded-none transition-all ${
                                                viewMode === 'grid'
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                                                    : 'text-amber-900 hover:bg-amber-100 dark:text-amber-100'
                                            }`}
                                        >
                                            <Grid3x3 className="h-4 w-4" />
                                        </Button>
                                        <div className="w-px bg-amber-300 dark:bg-amber-700"></div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setViewMode('list')}
                                            className={`rounded-none transition-all ${
                                                viewMode === 'list'
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                                                    : 'text-amber-900 hover:bg-amber-100 dark:text-amber-100'
                                            }`}
                                        >
                                            <List className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Cultures Grid/List */}
                        {cultures.data.length > 0 ? (
                            <>
                                <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-5'}>
                                    {cultures.data.map((culture, index) => (
                                        <Link
                                            key={culture.id}
                                            href={`/budaya/${culture.id}`}
                                            className="group animate-in fade-in slide-in-from-bottom-4"
                                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                                        >
                                            <Card className={`group relative overflow-hidden border-2 border-amber-200 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl dark:border-amber-800 dark:bg-amber-950/90 ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                                                {/* Decorative Gradient Overlay */}
                                                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5"></div>
                                                </div>

                                                {/* Image Container */}
                                                <div className={`relative overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-900 dark:via-orange-900 dark:to-red-900 ${viewMode === 'grid' ? 'h-56' : 'h-40 w-40 flex-shrink-0'}`}>
                                                    {culture.image ? (
                                                        <>
                                                            <img
                                                                src={`/storage/${culture.image}`}
                                                                alt={culture.name}
                                                                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                                                            />
                                                            {/* Gradient Overlay on Hover */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                                            
                                                            {/* Floating Badge on Image */}
                                                            <div className="absolute right-3 top-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                                <Badge className="border border-white/20 bg-white/90 text-amber-900 shadow-lg backdrop-blur-md dark:bg-amber-950/90 dark:text-amber-100">
                                                                    <Eye className="mr-1 h-3 w-3" />
                                                                    {culture.views.toLocaleString()}
                                                                </Badge>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <MapPin className={`animate-pulse text-amber-400 opacity-40 ${viewMode === 'grid' ? 'h-20 w-20' : 'h-12 w-12'}`} />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <CardContent className={`relative z-10 ${viewMode === 'grid' ? 'p-5' : 'flex flex-1 flex-col justify-center p-5'}`}>
                                                    {/* Category Badge */}
                                                    <Badge className="mb-3 w-fit border-0 bg-gradient-to-r from-amber-500/15 to-orange-500/15 px-3 py-1 text-xs font-semibold text-amber-900 shadow-sm transition-all duration-300 group-hover:from-amber-500/25 group-hover:to-orange-500/25 group-hover:shadow-md dark:text-amber-100">
                                                        {culture.category}
                                                    </Badge>
                                                    
                                                    {/* Title */}
                                                    <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-amber-900 transition-colors duration-300 group-hover:text-orange-600 dark:text-amber-100 dark:group-hover:text-orange-400">
                                                        {culture.name}
                                                    </h3>
                                                    
                                                    {/* Description */}
                                                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-amber-700/90 dark:text-amber-300/90">
                                                        {culture.description}
                                                    </p>
                                                    
                                                    {/* Footer Info */}
                                                    <div className="flex items-center justify-between border-t border-amber-200/50 pt-3 text-xs text-amber-600 dark:border-amber-800/50 dark:text-amber-400">
                                                        <div className="flex items-center gap-1.5 font-medium transition-all duration-300 group-hover:text-amber-700 group-hover:translate-x-1 dark:group-hover:text-amber-300">
                                                            <MapPin className="h-3.5 w-3.5" />
                                                            <span>{culture.region}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span className="font-semibold">{culture.views.toLocaleString()}</span>
                                                        </div>
                                                    </div>

                                                    {/* Hover Arrow Icon */}
                                                    <div className="absolute bottom-4 right-4 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                                                            <ChevronRight className="h-4 w-4" />
                                                        </div>
                                                    </div>
                                                </CardContent>

                                                {/* Shine Effect on Hover */}
                                                <div className="absolute inset-0 -translate-x-full opacity-30 transition-transform duration-700 group-hover:translate-x-full">
                                                    <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                                                </div>
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
