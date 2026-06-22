import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Skill {
    id: number;
    name: string;
    src: string | null;
    color: string | null;
}

interface Props {
    skills: Skill[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Skills', href: '/admin/skills' }];

export default function SkillsIndex({ skills }: Props) {
    const remove = (skill: Skill) => {
        if (confirm(`Delete "${skill.name}"?`)) {
            router.delete(`/admin/skills/${skill.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skills" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Skills</h1>
                    <Button asChild>
                        <Link href="/admin/skills/create">Add skill</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 text-xs uppercase text-muted-foreground dark:border-sidebar-border">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Image</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                        No skills yet.
                                    </td>
                                </tr>
                            )}
                            {skills.map((skill) => (
                                <tr key={skill.id} className="border-b border-sidebar-border/40 last:border-0">
                                    <td className="p-3 font-medium">{skill.name}</td>
                                    <td className="p-3 text-muted-foreground">{skill.src}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/skills/${skill.id}/edit`}>Edit</Link>
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => remove(skill)}>
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
