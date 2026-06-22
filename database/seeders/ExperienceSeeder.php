<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            ['role' => 'FullStack Developer', 'company' => 'RackApp IT Solutions', 'years' => '2023 - 2025'],
            ['role' => 'Software Engineer', 'company' => 'Quality Club Leather Inc', 'years' => '2021 - 2023'],
            ['role' => 'IT Specialist', 'company' => 'WeDo Inc', 'years' => '2019 - 2021'],
            ['role' => 'Part-time Web Developer', 'company' => 'Rootplus Technology Services', 'years' => '2015 - 2017'],
        ];

        foreach ($experiences as $i => $experience) {
            Experience::create(array_merge($experience, ['sort_order' => $i]));
        }
    }
}
