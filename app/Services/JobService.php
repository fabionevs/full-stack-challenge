<?php

namespace App\Services;

use App\Repositories\JobRepository;
use App\Repositories\CompanyRepository;
use App\Models\Job;
use Illuminate\Http\Request;

class JobService
{
    public function __construct(
        private JobRepository $jobs,
        private CompanyRepository $companies,
    ) {}

    public function listJobsWithFilters(array $filters): array
    {
        return [
            'jobs' => $this->jobs->paginatePublishedWithFilters($filters, 10),
            'companies' => $this->companies->allForFilter(),
            'filters' => $filters,
        ];
    }

    public function getJobForPublicView(string $slug): ?Job
    {
        return $this->jobs->findPublishedBySlug($slug);
    }

    public function getBySlug(string $slug): Job
    {
        return $this->jobs->getBySlug($slug);
    }

    public function related(Job $job)
    {
        return $this->jobs->getRelatedJobsFromCompany($job);
    }

    public function getAvailableLocations(Request $request)
    {
        return $this->jobs->getAvailableLocations($request);
    }
}