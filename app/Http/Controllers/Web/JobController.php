<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\JobService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function __construct(
        private JobService $jobService
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only([
            'company_id',
            'location',
            'position_type',
            'salary_min',
        ]);

        $jobs = $this->jobService->listJobsWithFilters($filters);
        $locations = $this->jobService->getAvailableLocations($request);

        return inertia('Jobs/Index', [
        'jobs' => $jobs,
        'filters' => $request->all(),
        'locations' => $locations,
    ]);
    }

    public function show(string $slug)
    {
        $job = $this->jobService->getBySlug($slug);

        return inertia('Jobs/Show', [
            'job' => $job,
            'company' => $job->company,
            'relatedJobs' => $this->jobService->related($job),
        ]);
    }
}
