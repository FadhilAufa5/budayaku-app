import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface Event {
    id: number;
    title: string;
}

interface DeleteEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: Event | null;
}

export function DeleteEventDialog({ open, onOpenChange, event }: DeleteEventDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (event) {
            destroy(`/events/list/${event.id}`, {
                preserveScroll: true,
                onSuccess: () => onOpenChange(false),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Hapus Event</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus event <span className="font-semibold text-foreground">{event?.title}</span>? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={processing}>Batal</Button>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={processing}>
                        {processing ? 'Menghapus...' : 'Hapus'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
