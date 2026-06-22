import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Experience {
    id: number;
    role: string;
    company: string | null;
    years: string | null;
}

interface Props {
    experiences: Experience[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Experience', href: '/admin/experiences' }];

export default function ExperiencesIndex({ experiences }: Props) {
    const remove = (experience: Experience) => {
        if (confirm(`Delete "${experience.role}"?`)) {
            router.delete(`/admin/experiences/${experience.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experience" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Experience</h1>
                    <Button asChild>
                        <Link href="/admin/experiences/create">Add experience</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 text-xs uppercase text-muted-foreground dark:border-sidebar-border">
                            <tr>
                                <th className="p-3">Role</th>
                                <th className="p-3">Company</th>
                                <th className="p-3">Years</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                        No experience yet.
                                    </td>
                                </tr>
                            )}
                            {experiences.map((experience) => (
                                <tr key={experience.id} className="border-b border-sidebar-border/40 last:border-0">
                                    <td className="p-3 font-medium">{experience.role}</td>
                                    <td className="p-3">{experience.company}</td>
                                    <td className="p-3">{experience.years}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/experiences/${experience.id}/edit`}>Edit</Link>
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => remove(experience)}>
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
