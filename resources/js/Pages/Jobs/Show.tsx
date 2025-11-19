import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Company {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    website?: string | null;
    industry?: string | null;
    location?: string | null;
    logo_url?: string | null;
    created_at: string;
    jobs_count?: number;
}

interface Job {
    id: number;
    company_id: number;
    title: string;
    slug: string;
    description: string;
    short_description?: string | null;
    location: string;
    type: string; // "full-time" | "part-time" | "contract" | "remote" | etc
    is_remote?: boolean;
    salary_min?: number | null;
    salary_max?: number | null;
    created_at: string;
    published_at?: string | null;
    company: Company;
}

type RelatedJob = Omit<Job, 'company'>;

interface JobShowProps {
    job: Job;
    company: Company;
    relatedJobs: RelatedJob[];
}

const JobShow: React.FC<JobShowProps> = ({ job, company, relatedJobs }) => {
    const createdYear = (() => {
        const d = new Date(company.created_at);
        return Number.isNaN(d.getTime()) ? '' : d.getFullYear();
    })();

    const salaryLabel = (() => {
        if (job.salary_min == null && job.salary_max == null) return 'Not informed';

        if (job.salary_min != null && job.salary_max != null) {
            return `$${job.salary_min} – $${job.salary_max}`;
        }

        if (job.salary_min != null) {
            return `From $${job.salary_min}`;
        }

        return `Up to $${job.salary_max}`;
    })();

    return (
        <>
            <Head title={job.title} />

            <main className="main">
                {/* HEADER DA EMPRESA / VAGA */}
                <section className="section-box">
                    <div className="box-head-single box-head-single-candidate">
                        <div className="container">
                            <div className="heading-image-rd online">
                                <figure>
                                    <img
                                        src={company.logo_url ? `${company.logo_url}` : '/assets/imgs/page/employers/employer-1.png'}
                                        alt={company.name}
                                    />
                                </figure>
                            </div>

                            <div className="heading-main-info">
                                <h4>{company.name}</h4>

                                <div className="head-info-profile">
                                    {company.location && (
                                        <span className="text-small mr-20">
                                            <i className="fi-rr-marker text-mutted" /> {company.location}
                                        </span>
                                    )}

                                    {company.industry && (
                                        <span className="text-small mr-20">
                                            <i className="fi-rr-briefcase text-mutted" /> {company.industry}
                                        </span>
                                    )}

                                    {createdYear && (
                                        <span className="text-small">
                                            <i className="fi-rr-clock text-mutted" /> Since {createdYear}
                                        </span>
                                    )}
                                </div>

                                <div className="row align-items-end mt-20">
                                    <div className="col-lg-6">
                                        <span className="btn btn-tags-sm mb-10 mr-5">
                                            {(company.jobs_count ?? 0)} open jobs
                                        </span>
                                        {job.is_remote && (
                                            <span className="btn btn-tags-sm mb-10 mr-5">Remote</span>
                                        )}
                                    </div>

                                    <div className="col-lg-3">
                                        <a className="btn btn-default" href="#">
                                            Apply For Job
                                        </a>
                                    </div>

                                    <div className="col-lg-3 text-lg-end">
                                        <ul className="breadcrumbs mt-10">
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link href="/jobs">Jobs listing</Link>
                                            </li>
                                            <li>{job.title}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTEÚDO PRINCIPAL */}
                <section className="section-box mt-50">
                    <div className="container">
                        <div className="row">
                            {/* COL ESQUERDA */}
                            <div className="col-lg-8">
                                <div className="content-single">
                                    <h3 className="mb-20">{job.title}</h3>

                                    <div className="row mb-20">
                                        <div className="col-md-4 mb-10">
                                            <span className="text-description">Location</span>
                                            <div className="text-bold">{job.location}</div>
                                        </div>
                                        <div className="col-md-4 mb-10">
                                            <span className="text-description">Job type</span>
                                            <div className="text-bold text-capitalize">
                                                {job.type.replace('-', ' ')}
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-10">
                                            <span className="text-description">Posted at</span>
                                            <div className="text-bold">
                                                {job.published_at
                                                    ? new Date(job.published_at).toLocaleDateString()
                                                    : 'Draft'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="divider" />

                                    <div className="mt-20">
                                        {/* Se description vier como HTML, usamos dangerouslySetInnerHTML.
                                            Se for só texto puro, você pode trocar por <p>{job.description}</p> */}
                                        <div
                                            className="text-body"
                                            dangerouslySetInnerHTML={{
                                                __html: job.description ?? '',
                                            }}
                                        />
                                    </div>


                                    {/* APPLY + SHARE */}
                                    <div className="single-apply-jobs mt-40">
                                        <div className="row align-items-center">
                                            <div className="col-md-5 mb-3 mb-md-0">
                                                <a href="#" className="btn btn-default mr-15">
                                                    Apply Now
                                                </a>
                                                <a href="#" className="btn btn-border">
                                                    Save
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* OUTROS JOBS DA EMPRESA */}
                                    {relatedJobs.length > 0 && (
                                        <div className="single-recent-jobs mt-50">
                                            <h4 className="heading-border">
                                                <span>Other Jobs from {company.name}</span>
                                            </h4>
                                            <div className="list-recent-jobs">
                                                {relatedJobs.map((rj) => (
                                                    <div
                                                        className="card-job hover-up mt-20"
                                                        key={rj.id}
                                                    >
                                                        <div className="card-job-top">
                                                            <div className="card-job-top--info">
                                                                <h6 className="card-job-top--info-heading">
                                                                    <Link href={`/jobs/${rj.slug}`}>
                                                                        {rj.title}
                                                                    </Link>
                                                                </h6>
                                                                <div className="text-muted">
                                                                    {rj.location} —{' '}
                                                                    {rj.type.replace('-', ' ')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {rj.short_description && (
                                                            <div className="card-job-description mt-10">
                                                                {rj.short_description}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* COL DIREITA / SIDEBAR */}
                            <div className="col-lg-4 pl-40 mt-lg-30">
                                <div className="sidebar-shadow">
                                    <h5 className="font-bold mb-20">Overview</h5>
                                    <ul className="sidebar-list-job">
                                        {company.industry && (
                                            <li>
                                                <div className="sidebar-text-info mt-3">
                                                    <span className="text-description">
                                                        <i className="fi-rr-briefcase" /> Company field
                                                    </span>
                                                    <strong>{company.industry}</strong>
                                                </div>
                                            </li>
                                        )}
                                        <li>
                                            <div className="sidebar-text-info mt-3">
                                                <span className="text-description"><i className="fi-rr-marker" /> Location</span>
                                                <strong>{job.location}</strong>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar-text-info mt-3">
                                                <span className="text-description"><i className="fi-rr-dollar" /> Salary</span>
                                                <strong>{salaryLabel}</strong>
                                            </div>
                                        </li>
                                        {company.website && (
                                            <li>
                                                <div className="sidebar-text-info mt-3">
                                                    <span className="text-description"><i className="fi-rr-globe" /> Website</span>
                                                    <strong>
                                                        <a
                                                            href={company.website}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {company.website}
                                                        </a>
                                                    </strong>
                                                </div>
                                            </li>
                                        )}
                                    </ul>

                                    <div className="sidebar-list-job mt-20">
                                        <a className="btn btn-default mr-10" href="#">
                                            Contact
                                        </a>
                                        <a className="btn btn-border" href="#">
                                            Message
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default JobShow;
