import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    PartyPopper, 
    Calendar, 
    ShoppingBag, 
    Users, 
    TrendingUp, 
    Activity,
    ArrowUpRight,
    Eye,
    Heart,
    Star,
    Package,
    Clock,
    DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
                {/* Welcome Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Selamat Datang, {auth.user?.name || 'Admin'}! 👋
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Berikut adalah ringkasan aktivitas platform BudayaKu hari ini.
                        </p>
                    </div>
                    <Badge variant="outline" className="hidden h-fit shrink-0 px-3 py-2 text-xs sm:flex sm:px-4 sm:text-sm">
                        <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden lg:inline">
                            {new Date().toLocaleDateString('id-ID', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </span>
                        <span className="lg:hidden">
                            {new Date().toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                            })}
                        </span>
                    </Badge>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Budaya Stats */}
                    <Card className="transition-all hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budaya</CardTitle>
                            <PartyPopper className="h-4 w-4 text-amber-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">156</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                                <span className="text-green-600">+12%</span>
                                <span>dari bulan lalu</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Event Stats */}
                    <Card className="transition-all hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Event Aktif</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Activity className="h-3 w-3 text-blue-600" />
                                <span>8 event bulan ini</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Toko Stats */}
                    <Card className="transition-all hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">342</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Package className="h-3 w-3 text-emerald-600" />
                                <span>89 terjual minggu ini</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Users Stats */}
                    <Card className="transition-all hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pengguna Aktif</CardTitle>
                            <Users className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                                <span className="text-green-600">+18%</span>
                                <span>user baru</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Budaya Terpopuler */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Budaya Terpopuler</CardTitle>
                                    <CardDescription>
                                        Budaya dengan views tertinggi minggu ini
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/events/cultures">
                                        Lihat Semua
                                        <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { name: 'Batik Parang', region: 'Yogyakarta', views: 2840, likes: 342, rating: 4.8 },
                                    { name: 'Tari Kecak', region: 'Bali', views: 2150, likes: 289, rating: 4.9 },
                                    { name: 'Wayang Kulit', region: 'Jawa Tengah', views: 1920, likes: 256, rating: 4.7 },
                                    { name: 'Angklung', region: 'Jawa Barat', views: 1680, likes: 198, rating: 4.6 },
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 font-semibold text-white">
                                                {index + 1}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">{item.region}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground sm:gap-4">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4 shrink-0" />
                                                <span className="text-xs sm:text-sm">{item.views.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart className="h-4 w-4 shrink-0" />
                                                <span className="text-xs sm:text-sm">{item.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-medium sm:text-sm">{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Akses cepat ke fitur utama
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/events/cultures">
                                        <PartyPopper className="mr-2 h-4 w-4 text-amber-600" />
                                        Kelola Budaya
                                    </Link>
                                </Button>
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/events/list">
                                        <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                                        Buat Event Baru
                                    </Link>
                                </Button>
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/store/products">
                                        <ShoppingBag className="mr-2 h-4 w-4 text-emerald-600" />
                                        Tambah Produk
                                    </Link>
                                </Button>
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/users">
                                        <Users className="mr-2 h-4 w-4 text-purple-600" />
                                        Kelola User
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Row */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Event Mendatang */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Event Mendatang</CardTitle>
                                    <CardDescription>
                                        Event yang akan berlangsung
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/events/schedule">
                                        Lihat Jadwal
                                        <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { title: 'Festival Batik Nusantara', date: '15 Des 2025', location: 'Jakarta', participants: 250 },
                                    { title: 'Workshop Wayang Kulit', date: '18 Des 2025', location: 'Yogyakarta', participants: 80 },
                                    { title: 'Pameran Kerajinan Tradisional', date: '22 Des 2025', location: 'Bandung', participants: 150 },
                                ].map((event, index) => (
                                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white sm:h-12 sm:w-12">
                                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-1">
                                            <p className="truncate text-sm font-medium leading-none sm:text-base">{event.title}</p>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
                                                <span>{event.date}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Users className="h-3 w-3 shrink-0" />
                                                <span>{event.participants} peserta</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pesanan Terbaru */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Pesanan Terbaru</CardTitle>
                                    <CardDescription>
                                        Transaksi toko hari ini
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/store/orders">
                                        Lihat Semua
                                        <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { id: '#ORD-001', customer: 'Budi Santoso', product: 'Batik Tulis Premium', amount: 850000, status: 'Diproses' },
                                    { id: '#ORD-002', customer: 'Siti Nurhaliza', product: 'Wayang Kulit Set', amount: 1250000, status: 'Dikirim' },
                                    { id: '#ORD-003', customer: 'Ahmad Dahlan', product: 'Angklung Tradisional', amount: 450000, status: 'Selesai' },
                                ].map((order, index) => (
                                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white sm:h-12 sm:w-12">
                                            <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="truncate text-sm font-medium leading-none sm:text-base">{order.customer}</p>
                                                <Badge variant={
                                                    order.status === 'Selesai' ? 'default' : 
                                                    order.status === 'Dikirim' ? 'secondary' : 'outline'
                                                } className="shrink-0 text-xs">
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <p className="truncate text-xs text-muted-foreground sm:text-sm">{order.product}</p>
                                            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 sm:text-sm">
                                                <DollarSign className="h-3 w-3 shrink-0" />
                                                <span>Rp {order.amount.toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
