import { Head, Link } from '@inertiajs/react';
import {
    Heart,
    Target,
    Users,
    Eye,
    Sparkles,
    Calendar,
    ShoppingBag,
    Award,
    Globe,
    PartyPopper,
    MapPin,
    Star,
    ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { useEffect, useState } from 'react';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    avatar: string;
}

interface Stats {
    cultures: number;
    events: number;
    products: number;
    users: number;
}

interface AboutProps {
    stats: Stats;
    team: TeamMember[];
}

export default function About({ stats, team }: AboutProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Indonesian cultural images
    const culturalImages = [
        { src: '/images/borobudur.jpg', alt: 'Borobudur Temple', caption: 'Candi Borobudur' },
        { src: '/images/batik.jpg', alt: 'Batik Pattern', caption: 'Batik Indonesia' },
        { src: '/images/wayang.jpg', alt: 'Wayang Kulit', caption: 'Wayang Kulit' },
        { src: '/images/tari-kecak.jpg', alt: 'Tari Kecak', caption: 'Tari Kecak Bali' },
        { src: '/images/angklung.jpg', alt: 'Angklung', caption: 'Angklung' },
        { src: '/images/gamelan.jpg', alt: 'Gamelan', caption: 'Gamelan Jawa' },
    ];

    return (
        <>
            <Head title="Tentang Kami">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
                {/* Background Pattern */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="batik-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="75" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="25" cy="75" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="75" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <path d="M 0,50 Q 25,25 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <path d="M 50,0 Q 25,25 50,50 T 50,100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#batik-pattern)" className="text-amber-800 dark:text-amber-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation />

                {/* Hero Section with Parallax */}
                <div className="relative overflow-hidden pt-16">
                    <div 
                        className="absolute inset-0 z-0"
                        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/50 to-amber-50 dark:via-amber-950/50 dark:to-amber-950"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1592364395653-83e648b20cc2?w=1200"
                            alt="Indonesian Culture"
                            className="h-full w-full object-cover opacity-30"
                        />
                    </div>
                    
                    <div className="relative z-10 px-6 py-16 sm:py-24 lg:px-12">
                        <div className={`mx-auto max-w-5xl text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Badge className="mb-4 animate-pulse bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-white shadow-lg">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Tentang BudayaKu
                            </Badge>
                            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-4 text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-50 sm:text-5xl lg:text-6xl">
                                Melestarikan Warisan
                                <br />
                                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                                    Budaya Nusantara
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-6 text-base text-amber-800/80 dark:text-amber-200/80 sm:text-lg lg:text-xl" style={{ animationDelay: '200ms' }}>
                                BudayaKu adalah platform digital yang didedikasikan untuk
                                melestarikan, mempromosikan, dan merayakan kekayaan budaya
                                Indonesia. Kami percaya bahwa warisan budaya adalah harta
                                yang harus dijaga untuk generasi mendatang.
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: '400ms' }}>
                                <Button 
                                    size="lg"
                                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
                                    asChild
                                >
                                    <Link href="/budaya">
                                        Jelajahi Budaya
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section with Animation */}
                <div className="relative border-b border-amber-200 bg-white/60 px-6 py-12 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/60 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="group border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-amber-800 dark:from-amber-950 dark:to-orange-950 animate-in fade-in slide-in-from-bottom-4">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Budaya
                                    </CardTitle>
                                    <PartyPopper className="h-5 w-5 text-amber-600 transition-transform group-hover:rotate-12 group-hover:scale-125 dark:text-amber-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-amber-900 transition-all group-hover:scale-110 dark:text-amber-100">
                                        {stats.cultures.toLocaleString()}+
                                    </div>
                                    <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                                        Dokumentasi budaya
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Event Budaya
                                    </CardTitle>
                                    <Calendar className="h-5 w-5 text-blue-600 transition-transform group-hover:rotate-12 group-hover:scale-125 dark:text-blue-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-blue-900 transition-all group-hover:scale-110 dark:text-blue-100">
                                        {stats.events.toLocaleString()}+
                                    </div>
                                    <p className="text-xs text-blue-700/80 dark:text-blue-300/80">
                                        Acara yang terselenggara
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-emerald-800 dark:from-emerald-950 dark:to-green-950 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Produk Lokal
                                    </CardTitle>
                                    <ShoppingBag className="h-5 w-5 text-emerald-600 transition-transform group-hover:rotate-12 group-hover:scale-125 dark:text-emerald-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-emerald-900 transition-all group-hover:scale-110 dark:text-emerald-100">
                                        {stats.products.toLocaleString()}+
                                    </div>
                                    <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80">
                                        Produk khas Indonesia
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl dark:border-purple-800 dark:from-purple-950 dark:to-pink-950 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '300ms' }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Komunitas
                                    </CardTitle>
                                    <Users className="h-5 w-5 text-purple-600 transition-transform group-hover:rotate-12 group-hover:scale-125 dark:text-purple-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-purple-900 transition-all group-hover:scale-110 dark:text-purple-100">
                                        {stats.users.toLocaleString()}+
                                    </div>
                                    <p className="text-xs text-purple-700/80 dark:text-purple-300/80">
                                        Pengguna aktif
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Cultural Gallery Section */}
                <div className="relative px-6 py-16 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4">
                            <Badge className="mb-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-2">
                                <Globe className="mr-2 h-4 w-4" />
                                Galeri Budaya
                            </Badge>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Kekayaan Budaya Indonesia
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Keindahan dan keberagaman warisan nusantara
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-6">
                                <img 
                                    src="https://images.unsplash.com/photo-1592364395653-83e648b20cc2?w=600"
                                    alt="Borobudur Temple"
                                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                    <div className="absolute bottom-0 p-4">
                                        <h3 className="text-lg font-bold text-white">Candi Borobudur</h3>
                                        <p className="text-sm text-white/80">Warisan Dunia UNESCO</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '100ms' }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=600"
                                    alt="Traditional Batik"
                                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                    <div className="absolute bottom-0 p-4">
                                        <h3 className="text-lg font-bold text-white">Batik Indonesia</h3>
                                        <p className="text-sm text-white/80">Seni Kain Tradisional</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '200ms' }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1570737543098-481eb1d07af6?w=600"
                                    alt="Wayang Kulit"
                                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                    <div className="absolute bottom-0 p-4">
                                        <h3 className="text-lg font-bold text-white">Wayang Kulit</h3>
                                        <p className="text-sm text-white/80">Seni Pertunjukan Jawa</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '300ms' }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1608998730020-0b3c7bce7aff?w=600"
                                    alt="Traditional Dance"
                                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                    <div className="absolute bottom-0 p-4">
                                        <h3 className="text-lg font-bold text-white">Tari Kecak</h3>
                                        <p className="text-sm text-white/80">Tarian Tradisional Bali</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '400ms' }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600"
                                    alt="Traditional Food"
                                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                    <div className="absolute bottom-0 p-4">
                                        <h3 className="text-lg font-bold text-white">Kuliner Nusantara</h3>
                                        <p className="text-sm text-white/80">Cita Rasa Indonesia</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: '500ms' }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1519412666065-94acb3f8838f?w=600"
                                    alt="Traditional Music"
                                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                    <div className="absolute bottom-0 p-4">
                                        <h3 className="text-lg font-bold text-white">Gamelan</h3>
                                        <p className="text-sm text-white/80">Musik Tradisional Jawa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision Section - Enhanced */}
                <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-6 py-20 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 lg:px-12 lg:py-32">
                    <div className="mx-auto max-w-7xl">
                        {/* Section Header */}
                        <div className="mb-16 text-center">
                            <Badge className="mb-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2 text-amber-900 dark:text-amber-100">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Visi & Misi
                            </Badge>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-100 sm:text-4xl lg:text-5xl">
                                Tujuan & Komitmen Kami
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-amber-800/80 dark:text-amber-200/80">
                                Membangun jembatan antara tradisi dan modernitas untuk masa depan budaya Indonesia
                            </p>
                        </div>

                        {/* Vision - Large Featured Card */}
                        <div className="mb-12">
                            <div className="group relative overflow-hidden rounded-3xl border-2 border-amber-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-sm transition-all hover:shadow-amber-500/25 dark:border-amber-800/50 dark:bg-amber-950/80 lg:p-12">
                                {/* Decorative Elements */}
                                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-amber-400/10 to-orange-500/10 blur-3xl"></div>
                                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-400/10 to-red-500/10 blur-3xl"></div>
                                
                                <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                                    {/* Icon Section */}
                                    <div className="flex justify-center lg:col-span-3 lg:justify-start">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl lg:h-32 lg:w-32">
                                            <Eye className="h-12 w-12 text-white lg:h-16 lg:w-16" />
                                        </div>
                                    </div>
                                    
                                    {/* Content Section */}
                                    <div className="lg:col-span-9">
                                        <div className="mb-4 flex items-center gap-3">
                                            <h3 className="text-3xl font-bold text-amber-900 dark:text-amber-100 lg:text-4xl">
                                                Visi Kami
                                            </h3>
                                            <div className="h-px flex-1 bg-gradient-to-r from-amber-300 to-transparent dark:from-amber-700"></div>
                                        </div>
                                        <p className="text-lg leading-relaxed text-amber-800 dark:text-amber-200 lg:text-xl">
                                            Menjadi <strong className="text-amber-900 dark:text-amber-100">platform terdepan</strong> dalam pelestarian dan promosi budaya Indonesia, 
                                            menghubungkan tradisi dengan generasi digital. Kami berkomitmen untuk menjadikan warisan budaya nusantara 
                                            dapat diakses oleh siapa saja, di mana saja, kapan saja.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mission - Large Featured Card */}
                        <div className="mb-12">
                            <div className="group relative overflow-hidden rounded-3xl border-2 border-blue-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-sm transition-all hover:shadow-blue-500/25 dark:border-blue-800/50 dark:bg-blue-950/80 lg:p-12">
                                {/* Decorative Elements */}
                                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-500/10 blur-3xl"></div>
                                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-500/10 blur-3xl"></div>
                                
                                <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                                    {/* Content Section */}
                                    <div className="lg:col-span-9">
                                        <div className="mb-4 flex items-center gap-3">
                                            <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-100 lg:text-4xl">
                                                Misi Kami
                                            </h3>
                                            <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent dark:from-blue-700"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-lg leading-relaxed text-blue-800 dark:text-blue-200 lg:text-xl">
                                                Kami hadir dengan tiga fokus utama:
                                            </p>
                                            <ul className="space-y-3 text-base text-blue-800 dark:text-blue-200 lg:text-lg">
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                                                        <span className="text-sm font-bold">1</span>
                                                    </div>
                                                    <span><strong>Mendokumentasikan</strong> berbagai bentuk budaya Indonesia dalam format digital yang mudah diakses</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                                                        <span className="text-sm font-bold">2</span>
                                                    </div>
                                                    <span><strong>Melestarikan</strong> warisan budaya melalui teknologi digital yang inovatif dan interaktif</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                                                        <span className="text-sm font-bold">3</span>
                                                    </div>
                                                    <span><strong>Mempromosikan</strong> kekayaan budaya Indonesia kepada generasi muda dan dunia internasional</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    {/* Icon Section */}
                                    <div className="flex justify-center lg:col-span-3 lg:justify-end">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl lg:h-32 lg:w-32">
                                            <Target className="h-12 w-12 text-white lg:h-16 lg:w-16" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Values - Compact Card */}
                        <div>
                            <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/50 bg-gradient-to-br from-white/80 to-emerald-50/50 p-8 shadow-xl backdrop-blur-sm dark:border-emerald-800/50 dark:from-emerald-950/80 dark:to-green-950/50 lg:p-10">
                                <div className="relative text-center">
                                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                                        <Heart className="h-10 w-10 text-white" />
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-emerald-900 dark:text-emerald-100 lg:text-3xl">
                                        Nilai-Nilai Kami
                                    </h3>
                                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-emerald-800 dark:text-emerald-200">
                                        <strong>Autentisitas</strong> dalam setiap dokumentasi, <strong>Inklusivitas</strong> untuk semua kalangan, 
                                        dan <strong>Keberlanjutan</strong> dalam menjaga warisan budaya nusantara untuk generasi mendatang.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What We Do Section - Simplified */}
                <div className="relative bg-white/60 px-6 py-20 backdrop-blur-sm dark:bg-amber-950/60 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <Badge className="mb-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2 text-amber-900 dark:text-amber-100">
                                <Star className="mr-2 h-4 w-4" />
                                Layanan Kami
                            </Badge>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-100 sm:text-4xl">
                                Apa yang Kami Lakukan
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-amber-800/80 dark:text-amber-200/80">
                                Tiga pilar utama dalam melestarikan budaya Indonesia
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Card 1 - Dokumentasi */}
                            <div className="group relative overflow-hidden rounded-2xl border-2 border-amber-200/50 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl dark:border-amber-800/50 dark:bg-amber-950/90">
                                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/10 to-orange-500/10 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                                        <Globe className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold text-amber-900 dark:text-amber-100">
                                        Dokumentasi Budaya
                                    </h3>
                                    <p className="leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                                        Mengumpulkan dan mendokumentasikan berbagai bentuk budaya Indonesia dalam format digital yang dapat diakses siapa saja, kapan saja.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 - Event */}
                            <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-200/50 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl dark:border-blue-800/50 dark:bg-blue-950/90">
                                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-500/10 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                        <Calendar className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold text-blue-900 dark:text-blue-100">
                                        Penyelenggaraan Event
                                    </h3>
                                    <p className="leading-relaxed text-blue-800/90 dark:text-blue-200/90">
                                        Mengorganisir festival, workshop, dan acara budaya untuk memperkenalkan dan melestarikan tradisi kepada masyarakat luas.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 - Marketplace */}
                            <div className="group relative overflow-hidden rounded-2xl border-2 border-emerald-200/50 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-emerald-400 hover:shadow-xl dark:border-emerald-800/50 dark:bg-emerald-950/90">
                                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/10 to-green-500/10 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                                        <ShoppingBag className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                                        Marketplace Lokal
                                    </h3>
                                    <p className="leading-relaxed text-emerald-800/90 dark:text-emerald-200/90">
                                        Menyediakan platform bagi pengrajin dan pelaku UMKM untuk memasarkan produk budaya Indonesia ke pasar yang lebih luas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="relative px-6 py-16 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Tim Kami
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Orang-orang berdedikasi di balik BudayaKu
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {team.map((member, index) => (
                                <Card
                                    key={index}
                                    className="group overflow-hidden border-2 transition-all hover:scale-105 hover:border-amber-500 hover:shadow-xl"
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="relative mb-4 inline-block">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 blur-xl transition-opacity group-hover:opacity-100"></div>
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="relative h-24 w-24 rounded-full border-4 border-background shadow-lg"
                                            />
                                            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-amber-500 to-orange-600">
                                                <Award className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="mb-1 text-lg font-bold">
                                            {member.name}
                                        </h3>
                                        <p className="mb-3 text-sm font-medium text-amber-600 dark:text-amber-400">
                                            {member.role}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {member.bio}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 px-6 py-20 text-white lg:px-12">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -left-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-white/20 blur-3xl"></div>
                        <div className="absolute -bottom-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-white/20 blur-3xl" style={{ animationDelay: '1s' }}></div>
                    </div>
                    
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <h2 className="mb-4 animate-in fade-in slide-in-from-bottom-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Mari Bergabung dalam Misi Kami
                        </h2>
                        <p className="mb-8 animate-in fade-in slide-in-from-bottom-6 text-lg text-amber-50 lg:text-xl" style={{ animationDelay: '100ms' }}>
                            Bersama kita lestarikan warisan budaya Indonesia untuk
                            generasi mendatang. Mulai jelajahi kekayaan nusantara hari
                            ini!
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: '200ms' }}>
                            <Button
                                size="lg"
                                className="bg-white text-amber-600 shadow-2xl transition-all hover:bg-amber-50 hover:scale-105"
                                asChild
                            >
                                <Link href="/budaya">
                                    <PartyPopper className="mr-2 h-5 w-5" />
                                    Eksplorasi Budaya
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white bg-transparent text-white shadow-2xl transition-all hover:bg-white hover:text-amber-600"
                                asChild
                            >
                                <Link href="/event">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Lihat Event
                                </Link>
                            </Button>
                        </div>
                        
                        {/* Additional Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/30 pt-8">
                            <div className="animate-in fade-in slide-in-from-bottom-10" style={{ animationDelay: '300ms' }}>
                                <div className="text-3xl font-bold">34+</div>
                                <div className="text-sm text-amber-100">Provinsi</div>
                            </div>
                            <div className="animate-in fade-in slide-in-from-bottom-10" style={{ animationDelay: '400ms' }}>
                                <div className="text-3xl font-bold">700+</div>
                                <div className="text-sm text-amber-100">Bahasa Daerah</div>
                            </div>
                            <div className="animate-in fade-in slide-in-from-bottom-10" style={{ animationDelay: '500ms' }}>
                                <div className="text-3xl font-bold">1300+</div>
                                <div className="text-sm text-amber-100">Suku Bangsa</div>
                            </div>
                        </div>
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
                            © 2025 detouhuyy | All rights reserved
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
