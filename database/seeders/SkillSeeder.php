<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            ['name' => 'Laravel', 'color' => 'group-hover:border-red-500/50 group-hover:bg-red-500/5', 'src' => '/skillslogo/laravel.png', 'src_light' => null],
            ['name' => 'Vue.js', 'color' => 'group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5', 'src' => '/skillslogo/vue.png', 'src_light' => null],
            ['name' => 'Firebase', 'color' => 'group-hover:border-orange-500/50 group-hover:bg-orange-500/5', 'src' => '/skillslogo/firebase.png', 'src_light' => null],
            ['name' => 'React', 'color' => 'group-hover:border-cyan-400/50 group-hover:bg-cyan-400/5', 'src' => '/skillslogo/react.png', 'src_light' => null],
            ['name' => 'Tailwind', 'color' => 'group-hover:border-sky-400/50 group-hover:bg-sky-400/5', 'src' => '/skillslogo/tailwindcsslogo.png', 'src_light' => null],
            ['name' => 'MySQL', 'color' => 'group-hover:border-blue-400/50 group-hover:bg-blue-400/5', 'src' => '/skillslogo/mysql.png', 'src_light' => null],
            ['name' => 'ASP.NET', 'color' => 'group-hover:border-purple-400/50 group-hover:bg-purple-400/5', 'src' => '/skillslogo/asp-net.png', 'src_light' => null],
            ['name' => 'Expo', 'color' => 'group-hover:border-slate-400/50 group-hover:bg-slate-400/5', 'src' => '/skillslogo/logo-expo-light.png', 'src_light' => '/skillslogo/logo-expo.png'],
        ];

        foreach ($skills as $i => $skill) {
            Skill::create(array_merge($skill, ['sort_order' => $i]));
        }
    }
}
