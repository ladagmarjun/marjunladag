import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Skill {
    id: number;
    name: string;
    color: string | null;
    src: string | null;
    src_light: string | null;
    sort_order: number;
}

interface Props {
    skill?: Skill;
}

export default function SkillForm({ skill }: Props) {
    const isEdit = !!skill;

    const { data, setData, post, put, processing, errors } = useForm({
        name: skill?.name ?? '',
        color: skill?.color ?? '',
        src: skill?.src ?? '',
        src_light: skill?.src_light ?? '',
        sort_order: skill?.sort_order ?? 0,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Skills', href: '/admin/skills' },
        { title: isEdit ? 'Edit' : 'Create', href: '#' },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/skills/${skill!.id}`);
        } else {
            post('/admin/skills');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit skill' : 'Add skill'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">{isEdit ? 'Edit skill' : 'Add skill'}</h1>

                <form onSubmit={submit} className="max-w-2xl space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="src">Image path</Label>
                        <Input id="src" value={data.src} onChange={(e) => setData('src', e.target.value)} placeholder="/skillslogo/laravel.png" />
                        <InputError message={errors.src} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="src_light">Light-mode image path (optional)</Label>
                        <Input id="src_light" value={data.src_light} onChange={(e) => setData('src_light', e.target.value)} placeholder="/skillslogo/logo-light.png" />
                        <InputError message={errors.src_light} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="color">Hover color classes (optional)</Label>
                        <Input id="color" value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="group-hover:border-red-500/50 group-hover:bg-red-500/5" />
                        <InputError message={errors.color} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="sort_order">Sort order</Label>
                        <Input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', Number(e.target.value))} />
                        <InputError message={errors.sort_order} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/skills">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
