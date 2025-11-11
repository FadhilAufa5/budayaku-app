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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Culture {
    id: number;
    name: string;
    category_id: number;
    region: string;
    description: string;
    image: string;
    status: string;
}

interface Category {
    id: number;
    name: string;
}

interface CultureDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    culture?: Culture | null;
    categories: Category[];
}

export function CultureDialog({ open, onOpenChange, culture, categories }: CultureDialogProps) {
    const isEdit = !!culture;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: culture?.name || '',
        culture_category_id: culture?.category_id || '',
        region: culture?.region || '',
        description: culture?.description || '',
        image: culture?.image || '',
        status: culture?.status || 'active',
    });

    useEffect(() => {
        if (culture) {
            setData({
                name: culture.name,
                culture_category_id: culture.category_id,
                region: culture.region,
                description: culture.description || '',
                image: culture.image || '',
                status: culture.status,
            });
        } else {
            reset();
        }
    }, [culture]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/events/cultures/${culture.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        } else {
            post('/events/cultures', {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Edit Budaya' : 'Tambah Budaya Baru'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEdit
                                ? 'Perbarui informasi budaya.'
                                : 'Tambahkan budaya baru ke dalam sistem.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Nama Budaya <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Tari Kecak"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="culture_category_id">
                                Kategori <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.culture_category_id.toString()}
                                onValueChange={(value) => setData('culture_category_id', parseInt(value))}
                            >
                                <SelectTrigger className={errors.culture_category_id ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.culture_category_id && (
                                <p className="text-sm text-red-500">{errors.culture_category_id}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="region">
                                Daerah <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="region"
                                value={data.region}
                                onChange={(e) => setData('region', e.target.value)}
                                placeholder="Contoh: Bali"
                                className={errors.region ? 'border-red-500' : ''}
                            />
                            {errors.region && (
                                <p className="text-sm text-red-500">{errors.region}</p>
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
                                placeholder="Deskripsi singkat tentang budaya..."
                                className={errors.description ? 'border-red-500' : ''}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">
                                URL Gambar
                            </Label>
                            <Input
                                id="image"
                                value={data.image}
                                onChange={(e) => setData('image', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className={errors.image ? 'border-red-500' : ''}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">{errors.image}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) => setData('status', value)}
                            >
                                <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Nonaktif</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-500">{errors.status}</p>
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
                            {processing ? 'Menyimpan...' : isEdit ? 'Update Budaya' : 'Tambah Budaya'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
