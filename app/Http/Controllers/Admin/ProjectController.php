<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/form');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['images'] = $this->persistImages($request);

        Project::create($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validated($request);
        $data['images'] = $this->persistImages($request, $project);

        $project->update($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        foreach ($project->images ?? [] as $url) {
            Storage::disk('public')->delete($this->pathFromUrl($url));
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'integer'],
            'link' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'tech' => ['nullable', 'array'],
            'tech.*' => ['string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:5120'],
            'existing_images' => ['nullable', 'array'],
            'existing_images.*' => ['string'],
            'featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        unset($data['images'], $data['existing_images']);

        $data['featured'] = $request->boolean('featured');
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['tech'] = $data['tech'] ?? [];

        return $data;
    }

    /**
     * Store newly uploaded images, keep the ones the user retained, and delete
     * any that were removed. Returns the final list of public image URLs.
     */
    private function persistImages(Request $request, ?Project $project = null): array
    {
        $kept = array_values(array_filter((array) $request->input('existing_images', []), 'is_string'));

        if ($project) {
            foreach (array_diff($project->images ?? [], $kept) as $removed) {
                Storage::disk('public')->delete($this->pathFromUrl($removed));
            }
        }

        $images = $kept;

        foreach ((array) $request->file('images', []) as $file) {
            // Store a root-relative path so images resolve on any domain
            // (an absolute URL would bake in the current host).
            $images[] = '/storage/'.$file->store('projects', 'public');
        }

        return $images;
    }

    private function pathFromUrl(string $url): string
    {
        // Handles both relative ("/storage/...") and legacy absolute
        // ("http://host/storage/...") values.
        $pos = strpos($url, '/storage/');

        return $pos === false ? ltrim($url, '/') : substr($url, $pos + strlen('/storage/'));
    }
}
