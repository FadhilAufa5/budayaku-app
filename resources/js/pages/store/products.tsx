import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Eye, Star, ShoppingCart, Package, TrendingUp, DollarSign } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Produk', href: '/store/products' },
];

const productData = [
    {
        id: 1,
        name: 'Batik Tulis Premium Solo',
        category: 'Pakaian',
        price: 850000,
        stock: 15,
        sold: 45,
        rating: 4.8,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
    },
    {
        id: 2,
        name: 'Wayang Kulit Set Pandawa',
        category: 'Kerajinan',
        price: 1200000,
        stock: 8,
        sold: 12,
        rating: 4.9,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    },
    {
        id: 3,
        name: 'Angklung Tradisional',
        category: 'Alat Musik',
        price: 350000,
        stock: 0,
        sold: 28,
        rating: 4.7,
        status: 'out_of_stock',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400',
    },
    {
        id: 4,
        name: 'Kain Tenun Ikat NTT',
        category: 'Tekstil',
        price: 650000,
        stock: 20,
        sold: 67,
        rating: 4.9,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1615719413546-198b25453f43?w=400',
    },
    {
        id: 5,
        name: 'Keris Jawa Antik',
        category: 'Senjata Tradisional',
        price: 5000000,
        stock: 3,
        sold: 5,
        rating: 5.0,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=400',
    },
    {
        id: 6,
        name: 'Topeng Bali Hand Carved',
        category: 'Kerajinan',
        price: 450000,
        stock: 12,
        sold: 34,
        rating: 4.6,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1582747652881-94ac88ac73d7?w=400',
    },
];

export default function StoreProducts() {
    const totalProducts = productData.length;
    const activeProducts = productData.filter(p => p.status === 'active').length;
    const totalStock = productData.reduce((sum, p) => sum + p.stock, 0);
    const totalSold = productData.reduce((sum, p) => sum + p.sold, 0);
    const totalRevenue = productData.reduce((sum, p) => sum + (p.price * p.sold), 0);

    const getStatusBadge = (status: string, stock: number) => {
        if (status === 'out_of_stock' || stock === 0) {
            return <Badge variant="destructive">Stok Habis</Badge>;
        }
        if (stock < 10) {
            return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Stok Terbatas</Badge>;
        }
        return <Badge className="bg-green-500">Tersedia</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk Toko" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Produk Toko Budaya</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola produk dan inventori toko budaya
                        </p>
                    </div>
                    <Button className="w-fit">
                        <Plus className="h-4 w-4" />
                        Tambah Produk
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                            <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalProducts}</div>
                            <p className="text-muted-foreground text-xs">{activeProducts} aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Stok</CardTitle>
                            <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStock}</div>
                            <p className="text-muted-foreground text-xs">Unit tersedia</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Terjual</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSold}</div>
                            <p className="text-muted-foreground text-xs">Unit terjual</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                            <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('id-ID', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                }).format(totalRevenue)}
                            </div>
                            <p className="text-muted-foreground text-xs">Total revenue</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata Rating</CardTitle>
                            <Star className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {(productData.reduce((sum, p) => sum + p.rating, 0) / productData.length).toFixed(1)}
                            </div>
                            <p className="text-muted-foreground text-xs">Dari 5.0</p>
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
                                    placeholder="Cari produk berdasarkan nama atau kategori..."
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline">Semua</Button>
                                <Button variant="outline">Tersedia</Button>
                                <Button variant="outline">Filter</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Products Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {productData.map((product) => (
                        <Card key={product.id} className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2">
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                                        {product.category}
                                    </Badge>
                                </div>
                                <div className="absolute top-2 left-2">
                                    {getStatusBadge(product.status, product.stock)}
                                </div>
                            </div>
                            
                            <CardHeader className="space-y-2">
                                <CardTitle className="text-base line-clamp-1">{product.name}</CardTitle>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{product.rating}</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {product.sold} terjual
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">Harga</span>
                                        <span className="text-lg font-bold text-primary">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            }).format(product.price)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">Stok</span>
                                        <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                                            {product.stock} unit
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="h-3 w-3" />
                                        Detail
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
