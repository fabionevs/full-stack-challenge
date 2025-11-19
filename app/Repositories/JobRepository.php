<?php

namespace App\Repositories;

use App\Models\Job;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class JobRepository
{
    public function paginatePublishedWithFilters(array $filters, int $perPage = 10): LengthAwarePaginator
    {
        $query = Job::query()
            ->with('company')
            ->published()
            ->latest('published_at');

        if (!empty($filters['company_id'])) {
            $query->where('company_id', $filters['company_id']);
        }

        if (!empty($filters['location'])) {
            $query->where('location', 'like', '%' . $filters['location'] . '%');
        }

        if (!empty($filters['position_type'])) {
            if ($filters['position_type'] === 'remote') {
                $query->where('is_remote', true);
            } elseif ($filters['position_type'] === 'in-person') {
                $query->where('is_remote', false);
            }
        }

        if (!empty($filters['salary_min'])) {
            $min = (int) $filters['salary_min'];

            $query->where(function ($q) use ($min) {
                $q->where('salary_min', '>=', $min)
                  ->orWhere('salary_max', '>=', $min);
            });
        }

        return $query->paginate($perPage)->withQueryString();
    }

    public function findPublishedBySlug(string $slug): ?Job
    {
        return Job::query()
            ->with('company')
            ->published()
            ->where('slug', $slug)
            ->first();
    }
}
