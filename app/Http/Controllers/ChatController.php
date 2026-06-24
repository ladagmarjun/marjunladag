<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'history' => 'array|max:20',
            'history.*.role' => 'required|in:user,assistant',
            'history.*.content' => 'required|string|max:2000',
        ]);

        $projects = Project::orderBy('sort_order')->get(['title', 'type', 'tech', 'description', 'year']);
        $experiences = Experience::orderBy('sort_order')->get(['role', 'company', 'years']);
        $skills = Skill::orderBy('sort_order')->get(['name']);

        $projectList = $projects->map(fn($p) =>
            "- {$p->title} ({$p->type}, {$p->year}): {$p->description} [Stack: " . implode(', ', $p->tech ?? []) . "]"
        )->join("\n");

        $experienceList = $experiences->map(fn($e) =>
            "- {$e->role} at {$e->company} ({$e->years})"
        )->join("\n");

        $skillList = $skills->pluck('name')->join(', ');

        $systemPrompt = <<<PROMPT
You are an AI assistant on Marjun Ladag's personal portfolio website. Answer questions about Marjun in a friendly, concise, and professional tone. Speak in third person about Marjun or use "he/him".

ABOUT MARJUN:
Marjun Ladag is a Full Stack Developer with 5+ years of experience designing, developing, testing, and debugging end-to-end web and mobile applications. He has 4+ years of professional experience building scalable, secure, and high-performance software solutions. He is proficient in API integration, database management, and responsive UI development, and experienced in Agile environments.

CONTACT:
- Email: marjun.ladag@gmail.com
- Phone: +639358123724
- Website: https://www.marjunladag.com
- GitHub: https://github.com/ladagmarjun
- LinkedIn: https://www.linkedin.com/in/marjun-ladag-44a178182/
- Facebook: https://www.facebook.com/ladagmarjun/
- Address: 11B Manggahan St Bagumbayan Quezon City

PROFESSIONAL EXPERIENCE:
- Full Stack Web Developer at RackApp IT Solutions (06/2023 – 12/2025, Calbayog City)
  Stack: Laravel, Bootstrap, Tailwind, Vue.JS, React, React Native, REST APIs, Firebase, MySQL, Git
- Software Engineer at Quality Club Leather Inc. (06/2021 – 05/2023, Manila City)
  Stack: VB.NET, MySQL, Laravel, Tailwind, Vue.JS, Git
- IT Specialist at WeDo BPO Inc (03/2019 – 06/2021, Pasig City)
  Stack: WordPress, PHP, HTML5, JavaScript, jQuery, AJAX, CSS, Laravel
- Part-time Web Developer at Rootplus Technology Services (06/2015 – 03/2017, Calbayog City)
  Stack: WordPress, HTML5, JavaScript, jQuery, AJAX, CSS

EDUCATION:
- Bachelor of Science in Information Technology, NorthWest Samar State University (2012–2017, Calbayog City)

SKILLS:
- Languages: PHP, JavaScript, Python, VB.NET
- Frontend: HTML5, CSS3, Bootstrap, Tailwind CSS, jQuery, AJAX, React, Vue.js 3, TypeScript
- Backend: Laravel, ASP.NET, Node.js, Flask, Express.js
- Mobile: React Native (Expo)
- Databases: MySQL, PostgreSQL, SQLite
- Cloud Services: Firebase, Firestore
- API: REST, RESTful APIs, GraphQL, JSON, JWT, OAuth 2.0, Postman, Axios

Knowledge of DevOps, CI/CD, and version control with Git. Familiar with Agile methodologies and software development lifecycle (SDLC). Strong problem-solving skills and ability to work independently or in a team environment.
AWS Certified Cloud Practitioner with knowledge of AWS services, architecture, and best practices.

Seminar CERTIFICATES:
- Master Laravel & Create High Level Application w/ Laravel
- ASP Net Core Development w/ AZURE Devops for Beginners
- Python Web Development with Flask Framework
- AWS Training & Certification : AWS Technical Essentials

PROJECTS FROM DATABASE:
{$projectList}

ADDITIONAL SKILLS FROM DATABASE:
{$skillList}

RULES:
- Keep responses short and to the point (2-4 sentences max unless asked for detail)
- Only answer questions about Marjun's work, skills, and background
- If asked something unrelated to Marjun or software, politely redirect
- Never make up information not listed above
PROMPT;

        $messages = collect($request->input('history', []))
            ->map(fn($m) => ['role' => $m['role'], 'content' => $m['content']])
            ->push(['role' => 'user', 'content' => $request->input('message')])
            ->values()
            ->toArray();

        $response = Http::timeout(15)->withHeaders([
            'Authorization' => 'Bearer ' . config('services.groq.api_key'),
            'Content-Type' => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model' => 'llama-3.1-8b-instant',
            'max_tokens' => 512,
            'messages' => array_merge(
                [['role' => 'system', 'content' => $systemPrompt]],
                $messages
            ),
        ]);

        if ($response->failed()) {
            \Illuminate\Support\Facades\Log::error('Groq API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return response()->json(['error' => 'AI service unavailable. Please try again.'], 503);
        }

        $content = $response->json('choices.0.message.content', '');

        return response()->json(['reply' => $content]);
    }
}
