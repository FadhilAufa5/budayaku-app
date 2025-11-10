import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Laporan Penjualan', href: '/store/reports' },
];

const monthlyData = [
    { month: 'Jan', revenue: 45000000, orders: 123, avgOrder: 365854 },
    { month: 'Feb', revenue: 52000000, orders: 145, avgOrder: 358621 },
    { month: 'Mar', revenue: 48000000, orders: 134, avgOrder: 358209 },
    { month: 'Apr', revenue: 61000000, orders: 167, avgOrder: 365269 },
    { month: 'Mei', revenue: 55000000, orders: 152, avgOrder: 361842 },
    { month: 'Jun', revenue: 68000000, orders: 189, avgOrder: 359788 },
];

const topProducts = [
    { name: 'Batik Tulis Premium Solo', sold: 145, revenue: 123250000, trend: 'up' },
    { name: 'Keris Jawa Antik', sold: 12, revenue: 60000000, trend: 'up' },
    { name: 'Kain Tenun Ikat NTT', sold: 89, revenue: 57850000, trend: 'up' },
    { name: 'Wayang Kulit Set Pandawa', sold: 45, revenue: 54000000, trend: 'down' },
    { name: 'Topeng Bali Hand Carved', sold: 78, revenue: 35100000, trend: 'up' },
];

const categoryPerformance = [
    { category: 'Pakaian & Tekstil', percentage: 35, revenue: 125000000, color: 'bg-pink-500' },
    { category: 'Perhiasan', percentage: 25, revenue: 89000000, color: 'bg-yellow-500' },
    { category: 'Kerajinan Tangan', percentage: 20, revenue: 71000000, color: 'bg-purple-500' },
    { category: 'Senjata Tradisional', percentage: 12, revenue: 43000000, color: 'bg-red-500' },
    { category: 'Alat Musik', percentage: 8, revenue: 29000000, color: 'bg-blue-500' },
];

export default function StoreReports() {
    const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
    const totalOrders = monthlyData.reduce((sum, m) => sum + m.orders, 0);
    const avgOrderValue = totalRevenue / totalOrders;
    const growthRate = ((monthlyData[5].revenue - monthlyData[0].revenue) / monthlyData[0].revenue) * 100;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Penjualan" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Laporan Penjualan</h1>
                        <p className="text-muted-foreground mt-1">
                            Analisis performa penjualan toko budaya
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Calendar className="h-4 w-4" />
                            Filter Periode
                        </Button>
                        <Button>
                            <Download className="h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                    notation: 'compact',
                                }).format(totalRevenue)}
                            </div>
                            <div className="mt-1 flex items-center text-xs">
                                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                                <span className="text-green-600 font-medium">+{growthRate.toFixed(1)}%</span>
                                <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOrders}</div>
                            <div className="mt-1 flex items-center text-xs">
                                <TrendingUp className="mr-1 h-3 w-3 text-blue-600" />
                                <span className="text-blue-600 font-medium">+12.5%</span>
                                <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata Pesanan</CardTitle>
                            <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                    notation: 'compact',
                                }).format(avgOrderValue)}
                            </div>
                            <div className="mt-1 flex items-center text-xs">
                                <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                                <span className="text-red-600 font-medium">-2.4%</span>
                                <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pelanggan</CardTitle>
                            <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <div className="mt-1 flex items-center text-xs">
                                <TrendingUp className="mr-1 h-3 w-3 text-orange-600" />
                                <span className="text-orange-600 font-medium">+8.2%</span>
                                <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Monthly Revenue Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pendapatan Bulanan</CardTitle>
                            <CardDescription>6 bulan terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {monthlyData.map((data, index) => {
                                    const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));
                                    const percentage = (data.revenue / maxRevenue) * 100;
                                    
                                    return (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{data.month}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-muted-foreground">{data.orders} order</span>
                                                    <span className="font-bold">
                                                        {new Intl.NumberFormat('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                            minimumFractionDigits: 0,
                                                            notation: 'compact',
                                                        }).format(data.revenue)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performa Kategori</CardTitle>
                            <CardDescription>Kontribusi penjualan per kategori</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {categoryPerformance.map((cat, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{cat.category}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">{cat.percentage}%</span>
                                                <span className="font-bold">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0,
                                                        notation: 'compact',
                                                    }).format(cat.revenue)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                            <div
                                                className={`h-full ${cat.color} transition-all`}
                                                style={{ width: `${cat.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Produk Terlaris</CardTitle>
                        <CardDescription>Top 5 produk berdasarkan pendapatan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{product.name}</h4>
                                            <p className="text-muted-foreground text-sm">{product.sold} unit terjual</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-bold text-primary">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 0,
                                                    notation: 'compact',
                                                }).format(product.revenue)}
                                            </p>
                                            <div className="flex items-center justify-end gap-1 text-xs">
                                                {product.trend === 'up' ? (
                                                    <>
                                                        <TrendingUp className="h-3 w-3 text-green-600" />
                                                        <span className="text-green-600">Naik</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TrendingDown className="h-3 w-3 text-red-600" />
                                                        <span className="text-red-600">Turun</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
