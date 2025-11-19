<?php

namespace App\Repositories;

use App\Models\Company;
use Illuminate\Support\Collection;

class CompanyRepository
{
    public function paginateWithJobsCount(int $perPage = 15)
    {
        return Company::query()
            ->withCount('jobs')
            ->orderBy('name')
            ->paginate($perPage);
    }

    public function all(): Collection
    {
        return Company::query()
            ->orderBy('name')
            ->get();
    }

    public function allForFilter(): Collection
    {
        return Company::query()
            ->orderBy('name')
            ->withCount('jobs')
            ->get(['id', 'name']);
    }

    public function find(int $id): ?Company
    {
        return Company::query()->find($id);
    }

    public function create(array $data): Company
    {
        return Company::query()->create($data);
    }

    public function update(Company $company, array $data): Company
    {
        $company->update($data);
        return $company;
    }

    public function delete(Company $company): void
    {
        $company->delete();
    }
}
