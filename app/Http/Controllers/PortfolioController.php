<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('portfolio', [
            'projects' => Project::where('featured', true)
                ->orderBy('sort_order')
                ->get(),
            'experience' => Experience::orderBy('sort_order')->get(),
            'skills' => Skill::orderBy('sort_order')->get(),
        ]);
    }

    public function projects(): Response
    {
        return Inertia::render('projects', [
            'projects' => Project::orderBy('sort_order')->get(),
        ]);
    }
}
