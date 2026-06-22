import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    company: string | null;
    type: string | null;
    year: number | null;
    featured: boolean;
}

interface Props {
    projects: Project[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Projects', href: '/admin/projects' },
];

export default function ProjectsIndex({ projects }: Props) {
    const remove = (project: Project) => {
        if (confirm(`Delete "${project.title}"?`)) {
            router.delete(`/admin/projects/${project.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Projects</h1>
                    <Button asChild>
                        <Link href="/admin/projects/create">Add project</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 text-xs uppercase text-muted-foreground dark:border-sidebar-border">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Company</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Year</th>
                                <th className="p-3">Featured</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                        No projects yet.
                                    </td>
                                </tr>
                            )}
                            {projects.map((project) => (
                                <tr key={project.id} className="border-b border-sidebar-border/40 last:border-0">
                                    <td className="p-3 font-medium">{project.title}</td>
                                    <td className="p-3">{project.company}</td>
                                    <td className="p-3">{project.type}</td>
                                    <td className="p-3">{project.year}</td>
                                    <td className="p-3">{project.featured ? 'Yes' : 'No'}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => remove(project)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
