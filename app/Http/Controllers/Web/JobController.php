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

        $data = $this->jobService->listJobsWithFilters($filters);

        return Inertia::render('Jobs/Index', $data);
    }

    public function show(string $slug)
    {
        $job = $this->jobService->getJobForPublicView($slug);

        abort_if(!$job, 404);

        return Inertia::render('Jobs/Show', [
            'job' => $job,
        ]);
    }
}
