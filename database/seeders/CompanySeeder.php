<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Logos do template
        $logos = [
            '/imgs/page/employers/employer-1.png',
            '/imgs/page/employers/employer-2.png',
            '/imgs/page/employers/employer-3.png',
            '/imgs/page/employers/employer-4.png',
            '/imgs/page/employers/employer-5.png',
            '/imgs/page/employers/employer-6.png',
            '/imgs/page/employers/employer-7.png',
            '/imgs/page/employers/employer-8.png',
        ];

        $industries = [
            'Technology', 'Software', 'Finance', 'Marketing', 'Design',
            'Healthcare', 'E-commerce', 'Education', 'Manufacturing'
        ];

        $totalCompanies = rand(15, 25);

        for ($i = 0; $i < $totalCompanies; $i++) {

            $name = $faker->company();
            $slug = Str::slug($name . '-' . Str::random(4));

            Company::create([
                'name'        => $name,
                'slug'        => $slug,
                'description' => $faker->paragraphs(3, true),
                'website'     => $faker->url(),
                'industry'    => $faker->randomElement($industries),
                'location'    => $faker->city() . ', ' . $faker->country(),
                'logo_url'    => $faker->randomElement($logos),
                'created_at'  => now()->subDays(rand(0, 15)),
            ]);
        }

        $this->command->info("✔ CompanySeeder executado com sucesso.");
    }
}
