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
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WelcomeNavigation } from '@/components/welcome-navigation';

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

                {/* Hero Section */}
                <div className="relative overflow-hidden pt-16">
                    <div className="relative px-6 py-16 sm:py-24 lg:px-12">
                        <div className="mx-auto max-w-5xl text-center">
                            <Badge className="mb-4 bg-amber-500/20 px-4 py-2 text-amber-800 hover:bg-amber-500/30 dark:text-amber-200">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Tentang BudayaKu
                            </Badge>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-50 sm:text-5xl lg:text-6xl">
                                Melestarikan Warisan
                                <br />
                                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-400">
                                    Budaya Nusantara
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-base text-amber-800/80 dark:text-amber-200/80 sm:text-lg lg:text-xl">
                                BudayaKu adalah platform digital yang didedikasikan untuk
                                melestarikan, mempromosikan, dan merayakan kekayaan budaya
                                Indonesia. Kami percaya bahwa warisan budaya adalah harta
                                yang harus dijaga untuk generasi mendatang.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="relative border-b border-amber-200 bg-white/50 px-6 py-12 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/50 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 transition-all hover:scale-105 hover:shadow-lg dark:border-amber-800 dark:from-amber-950 dark:to-orange-950">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Budaya
                                    </CardTitle>
                                    <PartyPopper className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                                        {stats.cultures.toLocaleString()}
                                    </div>
                                    <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                                        Dokumentasi budaya
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all hover:scale-105 hover:shadow-lg dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Event Budaya
                                    </CardTitle>
                                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                                        {stats.events.toLocaleString()}
                                    </div>
                                    <p className="text-xs text-blue-700/80 dark:text-blue-300/80">
                                        Acara yang terselenggara
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 transition-all hover:scale-105 hover:shadow-lg dark:border-emerald-800 dark:from-emerald-950 dark:to-green-950">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Produk Lokal
                                    </CardTitle>
                                    <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                        {stats.products.toLocaleString()}
                                    </div>
                                    <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80">
                                        Produk khas Indonesia
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 transition-all hover:scale-105 hover:shadow-lg dark:border-purple-800 dark:from-purple-950 dark:to-pink-950">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Komunitas
                                    </CardTitle>
                                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                                        {stats.users.toLocaleString()}
                                    </div>
                                    <p className="text-xs text-purple-700/80 dark:text-purple-300/80">
                                        Pengguna aktif
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision Section */}
                <div className="relative px-6 py-16 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Misi & Visi Kami
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Membangun jembatan antara tradisi dan modernitas
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Vision */}
                            <Card className="group relative overflow-hidden border-2 transition-all hover:scale-105 hover:border-amber-500 hover:shadow-xl">
                                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-amber-500/10 transition-all group-hover:scale-150"></div>
                                <CardHeader>
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                                        <Eye className="h-7 w-7" />
                                    </div>
                                    <CardTitle>Visi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Menjadi platform terdepan dalam pelestarian dan
                                        promosi budaya Indonesia, menghubungkan tradisi
                                        dengan generasi digital.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Mission */}
                            <Card className="group relative overflow-hidden border-2 transition-all hover:scale-105 hover:border-blue-500 hover:shadow-xl">
                                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-blue-500/10 transition-all group-hover:scale-150"></div>
                                <CardHeader>
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                                        <Target className="h-7 w-7" />
                                    </div>
                                    <CardTitle>Misi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Mendokumentasikan, melestarikan, dan mempromosikan
                                        kekayaan budaya Indonesia melalui teknologi digital
                                        yang inovatif dan mudah diakses.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Values */}
                            <Card className="group relative overflow-hidden border-2 transition-all hover:scale-105 hover:border-emerald-500 hover:shadow-xl">
                                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-emerald-500/10 transition-all group-hover:scale-150"></div>
                                <CardHeader>
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                                        <Heart className="h-7 w-7" />
                                    </div>
                                    <CardTitle>Nilai</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Autentisitas, inklusivitas, dan keberlanjutan dalam
                                        setiap langkah kami untuk menjaga warisan budaya
                                        nusantara.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* What We Do Section */}
                <div className="relative border-y border-amber-200 bg-white/50 px-6 py-16 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/50 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Apa yang Kami Lakukan
                            </h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Tiga pilar utama dalam melestarikan budaya Indonesia
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="group rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                    <Globe className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">
                                    Dokumentasi Budaya
                                </h3>
                                <p className="text-amber-50">
                                    Mengumpulkan dan mendokumentasikan berbagai bentuk
                                    budaya Indonesia dalam format digital yang dapat
                                    diakses siapa saja, kapan saja.
                                </p>
                            </div>

                            <div className="group rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                    <Calendar className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">
                                    Penyelenggaraan Event
                                </h3>
                                <p className="text-blue-50">
                                    Mengorganisir festival, workshop, dan acara budaya
                                    untuk memperkenalkan dan melestarikan tradisi kepada
                                    masyarakat luas.
                                </p>
                            </div>

                            <div className="group rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl md:col-span-2 lg:col-span-1">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                    <ShoppingBag className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">
                                    Marketplace Lokal
                                </h3>
                                <p className="text-emerald-50">
                                    Menyediakan platform bagi pengrajin dan pelaku UMKM
                                    untuk memasarkan produk budaya Indonesia ke pasar yang
                                    lebih luas.
                                </p>
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
                <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 px-6 py-16 text-white lg:px-12">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                            Mari Bergabung dalam Misi Kami
                        </h2>
                        <p className="mb-8 text-lg text-amber-50">
                            Bersama kita lestarikan warisan budaya Indonesia untuk
                            generasi mendatang. Mulai jelajahi kekayaan nusantara hari
                            ini!
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="bg-white text-amber-600 hover:bg-amber-50"
                                asChild
                            >
                                <Link href="/events/cultures">
                                    <PartyPopper className="mr-2 h-5 w-5" />
                                    Eksplorasi Budaya
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white bg-transparent text-white hover:bg-white/20"
                                asChild
                            >
                                <Link href="/events/list">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Lihat Event
                                </Link>
                            </Button>
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
