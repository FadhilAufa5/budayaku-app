import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, FolderOpen, Image } from 'lucide-react';
import { useState } from 'react';
import { CategoryDialog } from '@/components/cultures/category-dialog';
import { DeleteCategoryDialog } from '@/components/cultures/delete-category-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kategori Budaya', href: '/events/culture-categories' },
];

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    count: number;
}

interface Stats {
    total: number;
    totalCultures: number;
}

interface CategoriesProps {
    categories: {
        data: Category[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    stats: Stats;
    filters: {
        search?: string;
    };
}

export default function CultureCategories({ categories, stats, filters }: CategoriesProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/events/culture-categories', { search: searchQuery }, { preserveState: true });
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    const handleDelete = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteDialogOpen(true);
    };

    const handleAddNew = () => {
        setSelectedCategory(null);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedCategory(null);
    };

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
        setSelectedCategory(null);
    };

    const averagePerCategory = categories.data.length > 0 
        ? Math.round(stats.totalCultures / stats.total)
        : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Budaya" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kategori Budaya</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola kategori untuk mengorganisir budaya Indonesia
                        </p>
                    </div>
                    <Button className="w-fit" onClick={handleAddNew}>
                        <Plus className="h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
                            <FolderOpen className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-muted-foreground text-xs">Kategori aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budaya</CardTitle>
                            <Image className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCultures}</div>
                            <p className="text-muted-foreground text-xs">Dalam semua kategori</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata</CardTitle>
                            <FolderOpen className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averagePerCategory}</div>
                            <p className="text-muted-foreground text-xs">Budaya per kategori</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari kategori..."
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit" variant="outline">Cari</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Category Grid */}
                {categories.data.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.data.map((category) => (
                            <Card key={category.id} className="group overflow-hidden transition-all hover:shadow-lg">
                                <div className={`h-2 ${category.color || 'bg-gray-500'}`} />
                                
                                <CardHeader className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-2xl dark:from-gray-800 dark:to-gray-700">
                                                {category.icon || '📁'}
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{category.name}</CardTitle>
                                                <Badge variant="outline" className="mt-1 text-xs">
                                                    {category.count} budaya
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <CardDescription className="line-clamp-2">
                                        {category.description || 'Tidak ada deskripsi'}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                                        <span className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                                            {category.slug}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="flex-1"
                                            onClick={() => router.get('/events/cultures', { category: category.id })}
                                        >
                                            <FolderOpen className="h-3 w-3" />
                                            Lihat
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleEdit(category)}
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleDelete(category)}
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
                            <p className="text-muted-foreground text-lg">Tidak ada kategori ditemukan</p>
                            <Button className="mt-4" onClick={handleAddNew}>
                                <Plus className="h-4 w-4" />
                                Tambah Kategori Pertama
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={handleDialogClose}
                category={selectedCategory}
            />

            <DeleteCategoryDialog
                open={isDeleteDialogOpen}
                onOpenChange={handleDeleteDialogClose}
                category={selectedCategory}
            />
        </AppLayout>
    );
}
