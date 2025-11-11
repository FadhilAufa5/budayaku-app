import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface Culture {
    id: number;
    name: string;
}

interface DeleteCultureDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    culture: Culture | null;
}

export function DeleteCultureDialog({ open, onOpenChange, culture }: DeleteCultureDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (culture) {
            destroy(`/events/cultures/${culture.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Hapus Budaya</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus budaya{' '}
                        <span className="font-semibold text-foreground">
                            {culture?.name}
                        </span>
                        ? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={processing}
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? 'Menghapus...' : 'Hapus'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
