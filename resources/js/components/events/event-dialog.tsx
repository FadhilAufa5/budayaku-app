import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    category_id: number;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    status: string;
    maxParticipants: number | null;
    price: string;
}

interface Category {
    id: number;
    name: string;
}

interface EventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event?: Event | null;
    categories: Category[];
}

export function EventDialog({ open, onOpenChange, event, categories }: EventDialogProps) {
    const isEdit = !!event;
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        title: event?.title || '',
        event_category_id: event?.category_id || '',
        description: event?.description || '',
        date: event?.date || '',
        time: event?.time || '',
        location: event?.location || '',
        image: null as File | null,
        status: event?.status || 'upcoming',
        max_participants: event?.maxParticipants || '',
        price: event?.price || '',
        _method: 'POST' as 'POST' | 'PUT',
    });

    useEffect(() => {
        if (event) {
            setData({
                title: event.title,
                event_category_id: event.category_id,
                description: event.description || '',
                date: event.date,
                time: event.time,
                location: event.location,
                image: null,
                status: event.status,
                max_participants: event.maxParticipants || '',
                price: event.price || '',
                _method: 'PUT',
            });
            setImagePreview(event.image ? `/storage/${event.image}` : null);
        } else {
            setData('_method', 'POST');
            reset();
            setImagePreview(null);
        }
    }, [event]);

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

        const url = isEdit ? `/events/list/${event.id}` : '/events/list';

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
                        <DialogTitle>{isEdit ? 'Edit Event' : 'Buat Event Baru'}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? 'Perbarui informasi event.' : 'Tambahkan event baru ke dalam sistem.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Judul Event <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Contoh: Festival Wayang Kulit"
                                className={errors.title ? 'border-red-500' : ''}
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="event_category_id">Kategori <span className="text-red-500">*</span></Label>
                            <Select
                                value={data.event_category_id.toString()}
                                onValueChange={(value) => setData('event_category_id', parseInt(value))}
                            >
                                <SelectTrigger className={errors.event_category_id ? 'border-red-500' : ''}>
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
                            {errors.event_category_id && <p className="text-sm text-red-500">{errors.event_category_id}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date">Tanggal <span className="text-red-500">*</span></Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className={errors.date ? 'border-red-500' : ''}
                                />
                                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="time">Waktu <span className="text-red-500">*</span></Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={data.time}
                                    onChange={(e) => setData('time', e.target.value)}
                                    className={errors.time ? 'border-red-500' : ''}
                                />
                                {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Lokasi <span className="text-red-500">*</span></Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                placeholder="Contoh: Gedung Kesenian Jakarta"
                                className={errors.location ? 'border-red-500' : ''}
                            />
                            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Deskripsi singkat tentang event..."
                                className={errors.description ? 'border-red-500' : ''}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="upcoming">Akan Datang</SelectItem>
                                        <SelectItem value="ongoing">Berlangsung</SelectItem>
                                        <SelectItem value="completed">Selesai</SelectItem>
                                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="max_participants">Maks. Peserta</Label>
                                <Input
                                    id="max_participants"
                                    type="number"
                                    value={data.max_participants}
                                    onChange={(e) => setData('max_participants', e.target.value)}
                                    placeholder="500"
                                    className={errors.max_participants ? 'border-red-500' : ''}
                                />
                                {errors.max_participants && <p className="text-sm text-red-500">{errors.max_participants}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Harga</Label>
                            <Input
                                id="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                placeholder="Contoh: Rp 50.000 atau Gratis"
                                className={errors.price ? 'border-red-500' : ''}
                            />
                            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Gambar Event</Label>
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
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => { onOpenChange(false); reset(); }} disabled={processing}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : isEdit ? 'Update Event' : 'Buat Event'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
