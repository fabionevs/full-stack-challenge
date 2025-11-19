<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $companies = Company::all();

        if ($companies->isEmpty()) {
            $this->command->warn('❗ Nenhuma company encontrada. Rode o CompanySeeder primeiro.');
            return;
        }

        foreach ($companies as $company) {

            // quantidade variável de jobs por empresa
            $totalJobs = rand(3, 10);

            for ($i = 0; $i < $totalJobs; $i++) {
                $title = $faker->jobTitle();
                $slug = Str::slug($title . '-' . Str::random(6));

                $salaryMin = $faker->numberBetween(3000, 8000);
                $salaryMax = $salaryMin + rand(1000, 8000);

                Job::create([
                    'company_id'        => $company->id,
                    'title'             => $title,
                    'slug'              => $slug,
                    'description'       => $faker->paragraphs(4, true),
                    'short_description' => $faker->sentence(),
                    'location'          => $faker->city() . ', ' . $faker->country(),
                    'type'              => $faker->randomElement(['full-time', 'part-time', 'contract', 'remote']),
                    'is_remote'         => $faker->boolean(40),
                    'salary_min'        => $salaryMin,
                    'salary_max'        => $salaryMax,
                    'created_at'        => now()->subDays(rand(0, 30)),
                    'published_at' => $faker->boolean(50) ? now()->subDays(rand(0, 30)) : null,
                ]);
            }
        }

        $this->command->info('✔ JobSeeder executado com sucesso.');
    }
}
