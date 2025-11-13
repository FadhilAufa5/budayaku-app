import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Search, Eye, Edit, Trash2, MapPin, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import { CultureDialog } from '@/components/cultures/culture-dialog';
import { DeleteCultureDialog } from '@/components/cultures/delete-culture-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Daftar Budaya', href: '/events/cultures' },
];

interface Culture {
    id: number;
    name: string;
    category: string;
    category_id: number;
    region: string;
    status: string;
    image: string;
    description: string;
    lastUpdated: string;
    views: number;
}

interface Category {
    id: number;
    name: string;
}

interface Stats {
    total: number;
    categories: number;
    totalViews: number;
    active: number;
}

interface CulturesIndexProps {
    cultures: {
        data: Culture[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    stats: Stats;
    filters: {
        search?: string;
        category?: string;
        status?: string;
    };
}

export default function CulturesIndex({ cultures, categories, stats, filters }: CulturesIndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/events/cultures', { search: searchQuery }, { preserveState: true });
    };

    const handleEdit = (culture: Culture) => {
        setSelectedCulture(culture);
        setIsDialogOpen(true);
    };

    const handleDelete = (culture: Culture) => {
        setSelectedCulture(culture);
        setIsDeleteDialogOpen(true);
    };

    const handleAddNew = () => {
        setSelectedCulture(null);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedCulture(null);
    };

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
        setSelectedCulture(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Budaya" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Daftar Budaya</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola dan eksplorasi kekayaan budaya Indonesia
                        </p>
                    </div>
                    <Button className="w-fit" onClick={handleAddNew}>
                        <Plus className="h-4 w-4" />
                        Tambah Budaya
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budaya</CardTitle>
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-muted-foreground text-xs">Dari berbagai daerah</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kategori</CardTitle>
                            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.categories}</div>
                            <p className="text-muted-foreground text-xs">Beragam kategori</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                            <p className="text-muted-foreground text-xs">Total kunjungan</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Aktif</CardTitle>
                            <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.active}</div>
                            <p className="text-muted-foreground text-xs">Budaya aktif</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari budaya berdasarkan nama, daerah, atau kategori..."
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit" variant="outline">Cari</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Culture Grid */}
                {cultures.data.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {cultures.data.map((culture) => (
                            <Card key={culture.id} className="group overflow-hidden transition-all hover:shadow-lg">
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900">
                                    {culture.image ? (
                                        <img
                                            src={`/storage/${culture.image}`}
                                            alt={culture.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <div className="text-center">
                                                <MapPin className="mx-auto h-16 w-16 text-amber-400 opacity-50" />
                                                <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">No Image</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                                            {culture.category}
                                        </Badge>
                                    </div>
                                </div>
                                
                                <CardHeader className="space-y-2">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">{culture.name}</CardTitle>
                                        <Badge 
                                            variant={culture.status === 'active' ? 'default' : 'outline'}
                                            className="text-xs"
                                        >
                                            {culture.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2">
                                        {culture.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {culture.region}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            {culture.views}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="flex-1"
                                            onClick={() => handleEdit(culture)}
                                        >
                                            <Edit className="h-3 w-3" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleDelete(culture)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground text-lg">Tidak ada budaya ditemukan</p>
                            <Button className="mt-4" onClick={handleAddNew}>
                                <Plus className="h-4 w-4" />
                                Tambah Budaya Pertama
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            <CultureDialog
                open={isDialogOpen}
                onOpenChange={handleDialogClose}
                culture={selectedCulture}
                categories={categories}
            />

            <DeleteCultureDialog
                open={isDeleteDialogOpen}
                onOpenChange={handleDeleteDialogClose}
                culture={selectedCulture}
            />
        </AppLayout>
    );
}
