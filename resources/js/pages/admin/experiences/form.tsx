import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Experience {
    id: number;
    role: string;
    company: string | null;
    years: string | null;
    sort_order: number;
}

interface Props {
    experience?: Experience;
}

export default function ExperienceForm({ experience }: Props) {
    const isEdit = !!experience;

    const { data, setData, post, put, processing, errors } = useForm({
        role: experience?.role ?? '',
        company: experience?.company ?? '',
        years: experience?.years ?? '',
        sort_order: experience?.sort_order ?? 0,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Experience', href: '/admin/experiences' },
        { title: isEdit ? 'Edit' : 'Create', href: '#' },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/experiences/${experience!.id}`);
        } else {
            post('/admin/experiences');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit experience' : 'Add experience'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">{isEdit ? 'Edit experience' : 'Add experience'}</h1>

                <form onSubmit={submit} className="max-w-2xl space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" value={data.role} onChange={(e) => setData('role', e.target.value)} required />
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
                        <InputError message={errors.company} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="years">Years</Label>
                        <Input id="years" value={data.years} onChange={(e) => setData('years', e.target.value)} placeholder="2023 - 2025" />
                        <InputError message={errors.years} />
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
                            <Link href="/admin/experiences">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
