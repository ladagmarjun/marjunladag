<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/experiences/index', [
            'experiences' => Experience::orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/experiences/form');
    }

    public function store(Request $request): RedirectResponse
    {
        Experience::create($this->validated($request));

        return redirect()->route('admin.experiences.index')->with('success', 'Experience created.');
    }

    public function edit(Experience $experience): Response
    {
        return Inertia::render('admin/experiences/form', [
            'experience' => $experience,
        ]);
    }

    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $experience->update($this->validated($request));

        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'role' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'years' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.*' => ['string'],
            'tech' => ['nullable', 'array'],
            'tech.*' => ['string'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $data;
    }
}
