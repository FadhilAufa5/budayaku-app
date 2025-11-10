import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Package, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kategori Produk', href: '/store/categories' },
];

const categoryData = [
    {
        id: 1,
        name: 'Pakaian & Tekstil',
        slug: 'pakaian-tekstil',
        description: 'Batik, tenun, dan pakaian tradisional',
        productCount: 45,
        totalSales: 125000000,
        icon: '👘',
        color: 'bg-pink-500',
        trending: true,
    },
    {
        id: 2,
        name: 'Kerajinan Tangan',
        slug: 'kerajinan-tangan',
        description: 'Produk kerajinan dan seni kriya',
        productCount: 67,
        totalSales: 89000000,
        icon: '🎨',
        color: 'bg-purple-500',
        trending: true,
    },
    {
        id: 3,
        name: 'Alat Musik Tradisional',
        slug: 'alat-musik',
        description: 'Gamelan, angklung, dan instrumen tradisional',
        productCount: 23,
        totalSales: 45000000,
        icon: '🎵',
        color: 'bg-blue-500',
        trending: false,
    },
    {
        id: 4,
        name: 'Senjata Tradisional',
        slug: 'senjata-tradisional',
        description: 'Keris, mandau, dan senjata adat lainnya',
        productCount: 12,
        totalSales: 78000000,
        icon: '⚔️',
        color: 'bg-red-500',
        trending: false,
    },
    {
        id: 5,
        name: 'Perhiasan',
        slug: 'perhiasan',
        description: 'Perhiasan dan aksesoris tradisional',
        productCount: 34,
        totalSales: 156000000,
        icon: '💎',
        color: 'bg-yellow-500',
        trending: true,
    },
    {
        id: 6,
        name: 'Dekorasi & Ornamen',
        slug: 'dekorasi-ornamen',
        description: 'Hiasan rumah dan ornamen tradisional',
        productCount: 56,
        totalSales: 67000000,
        icon: '🏺',
        color: 'bg-green-500',
        trending: false,
    },
];

export default function StoreCategories() {
    const totalProducts = categoryData.reduce((sum, cat) => sum + cat.productCount, 0);
    const totalSales = categoryData.reduce((sum, cat) => sum + cat.totalSales, 0);
    const trendingCount = categoryData.filter(c => c.trending).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Produk" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kategori Produk</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola kategori untuk mengorganisir produk toko
                        </p>
                    </div>
                    <Button className="w-fit">
                        <Plus className="h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{categoryData.length}</div>
                            <p className="text-muted-foreground text-xs">Kategori aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalProducts}</div>
                            <p className="text-muted-foreground text-xs">Produk terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
                            <TrendingUp className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('id-ID', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                }).format(totalSales)}
                            </div>
                            <p className="text-muted-foreground text-xs">Total revenue</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Trending</CardTitle>
                            <TrendingUp className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{trendingCount}</div>
                            <p className="text-muted-foreground text-xs">Kategori populer</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari kategori produk..."
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Category Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryData.map((category) => (
                        <Card key={category.id} className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className={`h-2 ${category.color}`} />
                            
                            <CardHeader className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-3xl dark:from-gray-800 dark:to-gray-700">
                                            {category.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-base">{category.name}</CardTitle>
                                            </div>
                                            {category.trending && (
                                                <Badge variant="destructive" className="text-xs">
                                                    🔥 Trending
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <CardDescription className="line-clamp-2">
                                    {category.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground text-xs">Produk</p>
                                        <p className="font-semibold">{category.productCount} items</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Penjualan</p>
                                        <p className="font-semibold">
                                            {new Intl.NumberFormat('id-ID', {
                                                notation: 'compact',
                                                compactDisplay: 'short',
                                            }).format(category.totalSales)}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                                    <span className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                                        /{category.slug}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Package className="h-3 w-3" />
                                        Lihat Produk
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
