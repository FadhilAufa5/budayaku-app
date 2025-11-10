import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Search, Eye, Package, TrendingUp, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Pesanan', href: '/store/orders' },
];

const orderData = [
    {
        id: 'ORD-2024-001',
        customerName: 'Budi Santoso',
        customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
        items: 2,
        total: 1500000,
        status: 'pending',
        date: '2024-02-10 14:30',
        products: ['Batik Tulis Premium Solo', 'Kain Tenun Ikat NTT'],
    },
    {
        id: 'ORD-2024-002',
        customerName: 'Siti Nurhaliza',
        customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
        items: 1,
        total: 1200000,
        status: 'processing',
        date: '2024-02-10 11:20',
        products: ['Wayang Kulit Set Pandawa'],
    },
    {
        id: 'ORD-2024-003',
        customerName: 'Ahmad Yani',
        customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
        items: 3,
        total: 1400000,
        status: 'shipped',
        date: '2024-02-09 16:45',
        products: ['Topeng Bali Hand Carved', 'Angklung Tradisional', 'Kain Batik'],
    },
    {
        id: 'ORD-2024-004',
        customerName: 'Dewi Lestari',
        customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi',
        items: 1,
        total: 5000000,
        status: 'completed',
        date: '2024-02-08 09:15',
        products: ['Keris Jawa Antik'],
    },
    {
        id: 'ORD-2024-005',
        customerName: 'Rudi Hermawan',
        customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi',
        items: 2,
        total: 1100000,
        status: 'cancelled',
        date: '2024-02-07 13:25',
        products: ['Batik Cap', 'Kain Songket'],
    },
];

export default function StoreOrders() {
    const totalOrders = orderData.length;
    const pendingOrders = orderData.filter(o => o.status === 'pending').length;
    const processingOrders = orderData.filter(o => o.status === 'processing').length;
    const completedOrders = orderData.filter(o => o.status === 'completed').length;
    const totalRevenue = orderData
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                        <Clock className="h-3 w-3" /> Menunggu
                    </Badge>
                );
            case 'processing':
                return (
                    <Badge className="bg-blue-500">
                        <Package className="h-3 w-3" /> Diproses
                    </Badge>
                );
            case 'shipped':
                return (
                    <Badge className="bg-purple-500">
                        <Truck className="h-3 w-3" /> Dikirim
                    </Badge>
                );
            case 'completed':
                return (
                    <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3" /> Selesai
                    </Badge>
                );
            case 'cancelled':
                return (
                    <Badge variant="destructive">
                        <XCircle className="h-3 w-3" /> Dibatalkan
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesanan" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kelola Pesanan</h1>
                        <p className="text-muted-foreground mt-1">
                            Monitor dan kelola pesanan pelanggan
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                            <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOrders}</div>
                            <p className="text-muted-foreground text-xs">Semua pesanan</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingOrders}</div>
                            <p className="text-muted-foreground text-xs">Perlu konfirmasi</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Diproses</CardTitle>
                            <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{processingOrders}</div>
                            <p className="text-muted-foreground text-xs">Sedang dikemas</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{completedOrders}</div>
                            <p className="text-muted-foreground text-xs">Berhasil</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('id-ID', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                }).format(totalRevenue)}
                            </div>
                            <p className="text-muted-foreground text-xs">Dari pesanan selesai</p>
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
                                    placeholder="Cari pesanan berdasarkan ID atau nama pelanggan..."
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline">Semua</Button>
                                <Button variant="outline">Menunggu</Button>
                                <Button variant="outline">Diproses</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders List */}
                <div className="space-y-4">
                    {orderData.map((order) => (
                        <Card key={order.id} className="overflow-hidden transition-all hover:shadow-md">
                            <CardHeader>
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <img src={order.customerAvatar} alt={order.customerName} />
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-base">{order.id}</CardTitle>
                                                {getStatusBadge(order.status)}
                                            </div>
                                            <CardDescription>
                                                {order.customerName} • {order.date}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            }).format(order.total)}
                                        </div>
                                        <p className="text-muted-foreground text-sm">{order.items} item</p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-muted-foreground mb-2 text-xs font-medium">Produk:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {order.products.map((product, index) => (
                                            <Badge key={index} variant="secondary">
                                                {product}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="h-3 w-3" />
                                        Detail Pesanan
                                    </Button>
                                    {order.status === 'pending' && (
                                        <>
                                            <Button size="sm" variant="default">
                                                <CheckCircle className="h-3 w-3" />
                                                Konfirmasi
                                            </Button>
                                            <Button size="sm" variant="destructive">
                                                <XCircle className="h-3 w-3" />
                                                Tolak
                                            </Button>
                                        </>
                                    )}
                                    {order.status === 'processing' && (
                                        <Button size="sm" variant="default">
                                            <Truck className="h-3 w-3" />
                                            Kirim
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
