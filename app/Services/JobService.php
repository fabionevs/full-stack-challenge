<?php

namespace App\Services;

use App\Repositories\JobRepository;
use App\Models\Job;

class JobService
{
    public function __construct(
        private JobRepository $jobs,
    ) {}

    public function listJobsWithFilters(array $filters): array
    {
        return [
            'jobs' => $this->jobs->paginatePublishedWithFilters($filters, 10),
            'filters' => $filters,
        ];
    }

    public function getJobForPublicView(string $slug): ?Job
    {
        return $this->jobs->findPublishedBySlug($slug);
    }
}