<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'DMS Store',
                'company' => 'RackApp IT Solutions',
                'type' => 'Mobile App',
                'year' => 2025,
                'link' => '',
                'description' => 'View store orders, credit balance, and place orders.',
                'tech' => ['React Native', 'Expo Go', 'Firebase', 'JavaScript'],
                'featured' => true,
            ],
            [
                'title' => 'DMS Dealer',
                'company' => 'RackApp IT Solutions',
                'type' => 'Mobile App',
                'year' => 2025,
                'link' => 'https://play.google.com/store/apps/details?id=com.rackapp.dmsdealer',
                'description' => 'View sales, stock levels, and purchase records.',
                'tech' => ['React Native', 'Expo Go', 'Firebase', 'JavaScript'],
                'featured' => true,
            ],
            [
                'title' => 'DMS Stock',
                'company' => 'RackApp IT Solutions',
                'type' => 'Mobile App',
                'year' => 2025,
                'link' => 'https://play.google.com/store/apps/details?id=com.rackapp.dmsstock',
                'description' => 'Provides real-time visibility into stock levels and inventory status.',
                'tech' => ['React Native', 'Expo Go', 'Firebase', 'JavaScript'],
                'featured' => true,
            ],
            [
                'title' => 'DMS OPS',
                'company' => 'RackApp IT Solutions',
                'type' => 'Mobile App',
                'year' => 2025,
                'link' => 'https://play.google.com/store/apps/details?id=com.rackapp.dmsops',
                'description' => 'The Outlet Tagging feature ensures accurate association of sales agents, products, and transactions with specific outlets.',
                'tech' => ['React Native', 'Expo Go', 'Firebase', 'JavaScript'],
                'featured' => true,
            ],
            [
                'title' => 'Dealer Management System',
                'company' => 'RackApp IT Solutions',
                'type' => 'Web App',
                'year' => 2024,
                'link' => 'https://dmsbusinesscare.com/',
                'description' => 'Handles product tracking, sales and reports.',
                'tech' => ['Laravel', 'Vue.js', 'Inertia', 'Tailwind', 'MySQL', 'Firebase'],
                'featured' => true,
            ],
            [
                'title' => 'DMS POS',
                'company' => 'RackApp IT Solutions',
                'type' => 'Mobile App',
                'year' => 2024,
                'link' => 'https://play.google.com/store/apps/details?id=com.rackapp.dmsagent',
                'description' => 'Designed to help sales agents and simplify dealership operations, featuring daily route targets, live truck and inventory tracking, and merchandise issuance.',
                'tech' => ['React Native', 'Expo Go', 'Firebase', 'JavaScript'],
                'featured' => false,
            ],
            [
                'title' => 'RackMotors',
                'company' => 'RackApp IT Solutions',
                'type' => 'Web App',
                'year' => 2024,
                'link' => '',
                'description' => 'Manage sales, product tracking and generate sales records in real-time.',
                'tech' => ['Laravel', 'Vue.js', 'Inertia', 'Tailwind', 'MySQL'],
                'featured' => false,
            ],
            [
                'title' => 'RackPOS',
                'company' => 'RackApp IT Solutions',
                'type' => 'Web App',
                'year' => 2023,
                'link' => '',
                'description' => 'Manage sales, product tracking and generate sales records in real-time.',
                'tech' => ['Laravel', 'Vue.js', 'Inertia', 'Bootstrap', 'MySQL'],
                'featured' => false,
            ],
            [
                'title' => 'QCLI Sales and Inventory Management System',
                'company' => 'Quality Club Leather Inc',
                'type' => 'Web App',
                'year' => 2022,
                'link' => '',
                'description' => 'Streamlines store operations with purchase management, sales tracking, and inventory control.',
                'tech' => ['Laravel', 'Vue.js', 'Inertia', 'Tailwind', 'MySQL'],
                'featured' => false,
            ],
            [
                'title' => 'QCLI Sales and Inventory Management System',
                'company' => 'Quality Club Leather Inc',
                'type' => 'Windows App',
                'year' => 2021,
                'link' => '',
                'description' => 'Streamlines store operations with purchase management, product production, sales tracking, and inventory control.',
                'tech' => ['VB.NET', 'MySQL'],
                'featured' => false,
            ],
        ];

        foreach ($projects as $i => $project) {
            Project::create(array_merge($project, ['sort_order' => $i]));
        }
    }
}
