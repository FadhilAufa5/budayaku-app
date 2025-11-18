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
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

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
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: culture?.name || '',
        culture_category_id: culture?.category_id || '',
        region: culture?.region || '',
        description: culture?.description || '',
        image: null as File | null,
        status: culture?.status || 'active',
        _method: 'POST' as 'POST' | 'PUT',
    });

    useEffect(() => {
        if (culture) {
            setData({
                name: culture.name,
                culture_category_id: culture.category_id,
                region: culture.region,
                description: culture.description || '',
                image: null,
                status: culture.status,
                _method: 'PUT',
            });
            setImagePreview(culture.image ? `/storage/${culture.image}` : null);
        } else {
            setData('_method', 'POST');
            reset();
            setImagePreview(null);
        }
    }, [culture]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = isEdit ? `/events/cultures/${culture.id}` : '/events/cultures';

        post(url, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                onOpenChange(false);
                reset();
                setImagePreview(null);
            },
        });
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
                                Gambar Budaya
                            </Label>
                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-48 w-full rounded-lg object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute right-2 top-2"
                                        onClick={handleRemoveImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="image"
                                        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PNG, JPG, JPEG atau WEBP (MAX. 2MB)
                                            </p>
                                        </div>
                                        <input
                                            id="image"
                                            type="file"
                                            className="hidden"
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            )}
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
