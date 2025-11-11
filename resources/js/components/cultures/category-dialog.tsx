import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
}

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
}

export function CategoryDialog({ open, onOpenChange, category }: CategoryDialogProps) {
    const isEdit = !!category;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: category?.name || '',
        slug: category?.slug || '',
        description: category?.description || '',
        icon: category?.icon || '',
        color: category?.color || '',
    });

    useEffect(() => {
        if (category) {
            setData({
                name: category.name,
                slug: category.slug || '',
                description: category.description || '',
                icon: category.icon || '',
                color: category.color || '',
            });
        } else {
            reset();
        }
    }, [category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/events/culture-categories/${category.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        } else {
            post('/events/culture-categories', {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        }
    };

    const colorOptions = [
        { value: 'bg-pink-500', label: 'Pink' },
        { value: 'bg-purple-500', label: 'Purple' },
        { value: 'bg-blue-500', label: 'Blue' },
        { value: 'bg-green-500', label: 'Green' },
        { value: 'bg-orange-500', label: 'Orange' },
        { value: 'bg-red-500', label: 'Red' },
        { value: 'bg-yellow-500', label: 'Yellow' },
        { value: 'bg-indigo-500', label: 'Indigo' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEdit
                                ? 'Perbarui informasi kategori budaya.'
                                : 'Tambahkan kategori budaya baru ke dalam sistem.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Nama Kategori <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Tarian Tradisional"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">
                                Slug
                                <span className="text-muted-foreground text-xs ml-1">
                                    (Kosongkan untuk auto-generate)
                                </span>
                            </Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="tarian-tradisional"
                                className={errors.slug ? 'border-red-500' : ''}
                            />
                            {errors.slug && (
                                <p className="text-sm text-red-500">{errors.slug}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Deskripsi
                            </Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Deskripsi singkat tentang kategori..."
                                className={errors.description ? 'border-red-500' : ''}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="icon">
                                Icon (Emoji)
                            </Label>
                            <Input
                                id="icon"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                placeholder="💃"
                                className={errors.icon ? 'border-red-500' : ''}
                                maxLength={4}
                            />
                            {errors.icon && (
                                <p className="text-sm text-red-500">{errors.icon}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="color">
                                Warna
                            </Label>
                            <div className="grid grid-cols-4 gap-2">
                                {colorOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setData('color', option.value)}
                                        className={`h-10 rounded-md ${option.value} ${
                                            data.color === option.value
                                                ? 'ring-2 ring-offset-2 ring-foreground'
                                                : ''
                                        }`}
                                        title={option.label}
                                    />
                                ))}
                            </div>
                            {errors.color && (
                                <p className="text-sm text-red-500">{errors.color}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                onOpenChange(false);
                                reset();
                            }}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : isEdit ? 'Update Kategori' : 'Tambah Kategori'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
