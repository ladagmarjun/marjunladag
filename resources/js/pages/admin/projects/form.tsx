import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    company: string | null;
    type: string | null;
    year: number | null;
    link: string | null;
    images: string[] | null;
    description: string | null;
    tech: string[] | null;
    featured: boolean;
    sort_order: number;
}

interface Props {
    project?: Project;
}

export default function ProjectForm({ project }: Props) {
    const isEdit = !!project;

    const { data, setData, post, processing, errors, transform } = useForm<{
        title: string;
        company: string;
        type: string;
        year: number | string;
        link: string;
        description: string;
        tech: string;
        featured: boolean;
        sort_order: number;
        images: File[];
        existing_images: string[];
    }>({
        title: project?.title ?? '',
        company: project?.company ?? '',
        type: project?.type ?? '',
        year: project?.year ?? '',
        link: project?.link ?? '',
        description: project?.description ?? '',
        tech: (project?.tech ?? []).join(', '),
        featured: project?.featured ?? false,
        sort_order: project?.sort_order ?? 0,
        images: [],
        existing_images: project?.images ?? [],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/admin/projects' },
        { title: isEdit ? 'Edit' : 'Create', href: '#' },
    ];

    const addFiles = (files: FileList | null) => {
        if (!files) return;
        setData('images', [...data.images, ...Array.from(files)]);
    };

    const removeNewImage = (index: number) => {
        setData('images', data.images.filter((_, i) => i !== index));
    };

    const removeExistingImage = (url: string) => {
        setData('existing_images', data.existing_images.filter((u) => u !== url));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        transform((form) => ({
            ...form,
            tech: form.tech
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            // Method spoofing so file uploads work on update (multipart PUT).
            ...(isEdit ? { _method: 'put' } : {}),
        }));

        // Always POST; Inertia auto-uses multipart FormData when files are present.
        post(isEdit ? `/admin/projects/${project!.id}` : '/admin/projects');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit project' : 'Add project'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">{isEdit ? 'Edit project' : 'Add project'}</h1>

                <form onSubmit={submit} className="max-w-2xl space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
                        <InputError message={errors.company} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Input id="type" value={data.type} onChange={(e) => setData('type', e.target.value)} placeholder="Web App / Mobile App" />
                            <InputError message={errors.type} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="year">Year</Label>
                            <Input id="year" type="number" value={data.year} onChange={(e) => setData('year', e.target.value)} />
                            <InputError message={errors.year} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="link">Link</Label>
                        <Input id="link" value={data.link} onChange={(e) => setData('link', e.target.value)} placeholder="https://..." />
                        <InputError message={errors.link} />
                        <p className="text-xs text-muted-foreground">If left empty, the project card shows a "View Images" gallery instead of an external link.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="images">Images</Label>
                        <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                addFiles(e.target.files);
                                e.target.value = '';
                            }}
                        />
                        <InputError message={errors.images} />

                        {(data.existing_images.length > 0 || data.images.length > 0) && (
                            <div className="mt-2 flex flex-wrap gap-3">
                                {data.existing_images.map((url) => (
                                    <div key={url} className="group relative h-24 w-24 overflow-hidden rounded-md border border-input">
                                        <img src={url} alt="" className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(url)}
                                            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
                                            aria-label="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {data.images.map((file, i) => (
                                    <div key={i} className="group relative h-24 w-24 overflow-hidden rounded-md border border-dashed border-input">
                                        <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(i)}
                                            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
                                            aria-label="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tech">Tech (comma separated)</Label>
                        <Input id="tech" value={data.tech} onChange={(e) => setData('tech', e.target.value)} placeholder="Laravel, React, MySQL" />
                        <InputError message={errors.tech} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="sort_order">Sort order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', Number(e.target.value))} />
                            <InputError message={errors.sort_order} />
                        </div>
                        <div className="flex items-center gap-2 pt-7">
                            <Checkbox id="featured" checked={data.featured} onCheckedChange={(v) => setData('featured', !!v)} />
                            <Label htmlFor="featured">Featured on home page</Label>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/projects">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
