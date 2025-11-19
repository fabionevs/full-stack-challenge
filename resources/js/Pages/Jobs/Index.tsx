import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface Job {
    id: number;
    title: string;
    slug: string;
    location: string;
    type: string; // "full-time" | "part-time" | ...
    is_remote: boolean;
    short_description?: string;
    company: {
        id: number;
        name: string;
        logo_url?: string | null;
        location?: string | null;
        industry?: string | null;
        jobs_count?: number;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface JobsIndexProps {
    jobs: {
        data: Job[];
        total: number;
        from: number | null;
        to: number | null;
        links: PaginationLink[];
    };
    filters: {
        search?: string;
        type?: string;          // full-time | part-time | contract...
        location?: string;
        salary_min?: string;
    };
}

interface JobIndexProps {
    jobs: any;
    filters: Record<string, any>;
    locations?: string[]; // pode vir undefined
}

export default function Index({ jobs, filters, locations = [] }: JobIndexProps) {

    const [locationSearch, setLocationSearch] = useState('');
    const safeLocations = locations ?? [];
    const filteredLocations = safeLocations.filter((loc) =>
        loc.toLowerCase().includes(locationSearch.toLowerCase())
    );
    // Aplica filtros via Inertia (GET /jobs)
    const applyFilter = (extra: Partial<JobsIndexProps['filters']> = {}) => {
        router.get(
            '/jobs',
            {
                ...filters,
                ...extra,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        applyFilter({ search: e.target.value || undefined });
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        applyFilter({ location: e.target.value || undefined });
    };

    // Só pra mostrar labels dos filtros (pode refinar depois)
    const jobTypeLabel = (() => {
        switch (filters.type) {
            case 'part-time':
                return 'Part time';
            case 'contract':
                return 'Freelancer';
            case 'remote':
                return 'Remote';
            default:
                return 'Full time';
        }
    })();

    const locationLabel = filters.location && filters.location.trim().length
        ? filters.location
        : 'Any location';

    const salaryRangeLabel = (() => {
        if (!filters.salary_min) return 'Salary Range';
        return `From $${filters.salary_min}`;
    })();

    return (
        <main className="main">
            <Head title="Jobs listing" />

            {/* TOP + FILTROS PRINCIPAIS */}
            <section className="section-box-2">
                <div className="box-head-single none-bg">
                    <div className="container">
                        <h4>
                            There Are {jobs.jobs.total} Jobs
                            <br />
                            Here For you!
                        </h4>
                        <div className="row mt-15 mb-40">
                            <div className="col-lg-7 col-md-9">
                                <span className="text-mutted">
                                    Discover your next career move, freelance gig, or internship
                                </span>
                            </div>
                            <div className="col-lg-5 col-md-3 text-lg-end text-start">
                                <ul className="breadcrumbs mt-sm-15">
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>Jobs listing</li>
                                </ul>
                            </div>
                        </div>
                        <div className="box-shadow-bdrd-15 box-filters">
                            <div className="row">
                                {/* Busca principal */}
                                <div className="col-lg-5">
                                    <div className="box-search-job">
                                        <form
                                            className="form-search-job"
                                            onSubmit={(e) => e.preventDefault()}
                                        >
                                            <input
                                                type="text"
                                                className="input-search-job"
                                                placeholder="Search by title, keyword..."
                                                value={filters.search}
                                                onChange={handleSearchChange}
                                            />
                                        </form>
                                    </div>
                                    <div className="list-tags-job">
                                        {filters.search && (
                                            <button
                                                type="button"
                                                className="text-normal job-tag"
                                                onClick={() => applyFilter({ search: undefined })}
                                            >
                                                {filters.search}{' '}
                                                <span className="remove-tags-job" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Dropdowns de tipo / localização / salário (visuais + filtros básicos) */}
                                <div className="col-lg-7">
                                    <div className="d-flex job-fillter">
                                        <div className="d-block d-lg-flex">
                                            {/* Job type */}
                                            <div className="dropdown job-type">
                                                <button
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    id="dropdownJobType"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    aria-haspopup="true"
                                                    data-bs-display="static"
                                                >
                                                    <i className="fi-rr-briefcase" />
                                                    <span>{jobTypeLabel}</span>{' '}
                                                    <i className="fi-rr-angle-small-down" />
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownJobType"
                                                >
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className={`dropdown-item ${!filters.type ? 'active' : ''
                                                                }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({ type: undefined });
                                                            }}
                                                        >
                                                            Full time
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className={`dropdown-item ${filters.type === 'part-time'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({ type: 'part-time' });
                                                            }}
                                                        >
                                                            Part time
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className={`dropdown-item ${filters.type === 'contract'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({ type: 'contract' });
                                                            }}
                                                        >
                                                            Freelancer
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className={`dropdown-item ${filters.type === 'remote'
                                                                ? 'active'
                                                                : ''
                                                                }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({ type: 'remote' });
                                                            }}
                                                        >
                                                            Remote
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Location */}
                                            <div className="dropdown">
                                                <button
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    id="dropdownLocation"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    data-bs-display="static"
                                                >
                                                    <i className="fi-rr-marker" />{' '}
                                                    <span>{locationLabel}</span>{' '}
                                                    <i className="fi-rr-angle-small-down" />
                                                </button>

                                                <ul
                                                    className="dropdown-menu p-2"
                                                    aria-labelledby="dropdownLocation"
                                                    style={{ minWidth: 260 }}
                                                >
                                                    {/* Barra de busca dentro do dropdown */}
                                                    <li className="mb-2">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="Search location..."
                                                            value={locationSearch}
                                                            onChange={(e) => setLocationSearch(e.target.value)}
                                                            onClick={(e) => e.stopPropagation()} // não fechar o dropdown ao clicar
                                                        />
                                                    </li>

                                                    {/* Option: Any location */}
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className={`dropdown-item ${!filters.location ? 'active' : ''}`}
                                                            onClick={() => {
                                                                applyFilter({ location: undefined });
                                                                setLocationSearch('');
                                                            }}
                                                        >
                                                            Any location
                                                        </button>
                                                    </li>

                                                    {/* Lista filtrada */}
                                                    {filteredLocations.map((loc) => (
                                                        <li key={loc}>
                                                            <button
                                                                type="button"
                                                                className={`dropdown-item ${filters.location === loc ? 'active' : ''
                                                                    }`}
                                                                onClick={() => {
                                                                    applyFilter({ location: loc });
                                                                    setLocationSearch('');
                                                                }}
                                                            >
                                                                {loc}
                                                            </button>
                                                        </li>
                                                    ))}

                                                    {/* Caso não encontre nenhuma */}
                                                    {filteredLocations.length === 0 && (
                                                        <li className="text-muted px-3 py-1">
                                                            No locations found
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>


                                            {/* Salary range básico (só usa salary_min por enquanto) */}
                                            <div className="dropdown">
                                                <button
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    id="dropdownLocation2"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    data-bs-display="static"
                                                >
                                                    <i className="fi-rr-dollar" />{' '}
                                                    <span>{salaryRangeLabel}</span>{' '}
                                                    <i className="fi-rr-angle-small-down" />
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownLocation2"
                                                >
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className={`dropdown-item ${!filters.salary_min ? 'active' : ''
                                                                }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({
                                                                    salary_min: undefined,
                                                                });
                                                            }}
                                                        >
                                                            Any salary
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="dropdown-item"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({
                                                                    salary_min: '100',
                                                                });
                                                            }}
                                                        >
                                                            $100 - $500
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="dropdown-item"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({
                                                                    salary_min: '500',
                                                                });
                                                            }}
                                                        >
                                                            $500 - $1000
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="dropdown-item"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                applyFilter({
                                                                    salary_min: '1000',
                                                                });
                                                            }}
                                                        >
                                                            $1000 - $1500
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="box-button-find">
                                            <button
                                                className="btn btn-default float-right"
                                                type="button"
                                                onClick={() => applyFilter({})}
                                            >
                                                Find Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LISTAGEM + SIDEBAR */}
            <section className="section-box mt-80">
                <div className="container">
                    <div className="row flex-row-reverse">
                        {/* COLUNA LISTA */}
                        <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
                            <div className="content-page">
                                <div className="box-filters-job mt-15 mb-10">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <span className="text-small">
                                                Showing{' '}
                                                <strong>
                                                    {jobs.jobs.from ?? 0}-{jobs.jobs.to ?? 0}{' '}
                                                </strong>
                                                of <strong>{jobs.jobs.total}</strong> Jobs
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* LISTA DE JOBS - adaptando o card-employers */}
                                <div className="employers-list">
                                    {jobs.jobs.data.length === 0 && (
                                        <div className="text-center py-5 text-muted">
                                            No jobs found with these filters.
                                        </div>
                                    )}

                                    {jobs.jobs.data.map((job: any) => {
                                        const company = job.company;
                                        const logo =
                                            company.logo_url ||
                                            '/assets/imgs/page/employers/employer-1.png';

                                        return (
                                            <div
                                                key={job.id}
                                                className="card-employers hover-up wow animate__animated animate__fadeIn"
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col-lg-5 col-md-6 d-flex">
                                                        <div className="employers-logo online mr-15">
                                                            <Link href={`/jobs/${job.slug}`}>
                                                                <figure>
                                                                    <img alt={company.name} src={logo} />
                                                                </figure>
                                                            </Link>
                                                        </div>
                                                        <div className="employers-name">
                                                            <h5>
                                                                <Link href={`/jobs/${job.slug}`}>
                                                                    <strong>{company.name}</strong>
                                                                </Link>
                                                            </h5>
                                                            <span className="text-sm text-muted">
                                                                {job.title}
                                                            </span>
                                                            <div className="d-flex mt-15">
                                                                {/* rating fake só pra manter layout */}
                                                                <div className="rate small float-start">
                                                                    <span className="text-small text-muted">
                                                                        {job.type}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="employers-info d-flex align-items-center">
                                                            <span className="d-flex align-items-center">
                                                                <i className="fi-rr-marker mr-5 ml-0" />{' '}
                                                                {job.location}
                                                            </span>
                                                            {job.is_remote && (
                                                                <span className="d-flex align-items-center ml-25">
                                                                    <i className="fi-rr-briefcase mr-5" />
                                                                    Remote
                                                                </span>
                                                            )}
                                                        </div>
                                                        {job.short_description && (
                                                            <div className="job-tags mt-25">
                                                                <span className="text-muted text-small">
                                                                    {job.short_description}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="col-lg-3 text-lg-end d-lg-block d-none">
                                                        <div className="card-grid-2-link">
                                                            {/* Ícones de ação opcionais */}
                                                            <a href="#">
                                                                <i className="fi-rr-shield-check" />
                                                            </a>
                                                            <a href="#">
                                                                <i className="fi-rr-bookmark" />
                                                            </a>
                                                        </div>
                                                        <div className="mt-25">
                                                            <Link
                                                                href={`/jobs/${job.slug}`}
                                                                className="btn btn-border btn-brand-hover"
                                                            >
                                                                View Job
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {jobs.jobs.links && jobs.jobs.links.length > 0 && (
                                        <nav aria-label="Jobs pagination" className="mt-50">
                                            <ul className="pagination justify-content-center">
                                                {jobs.jobs.links.map((link: any, idx: any) => {
                                                    const isDisabled = link.url === null;
                                                    const isActive = link.active;

                                                    return (
                                                        <li
                                                            key={idx}
                                                            className={[
                                                                'page-item',
                                                                isActive ? 'active' : '',
                                                                isDisabled ? 'disabled' : '',
                                                            ]
                                                                .join(' ')
                                                                .trim()}
                                                        >
                                                            {isDisabled ? (
                                                                <span
                                                                    className="page-link"
                                                                    // Laravel manda &laquo; &raquo; etc, então deixo como HTML
                                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                                />
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="page-link"
                                                                    onClick={() =>
                                                                        router.visit(link.url as string, {
                                                                            preserveScroll: true,
                                                                            preserveState: true,
                                                                        })
                                                                    }
                                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                                />
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </nav>
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* SIDEBAR (por enquanto estático, só layout) */}
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="sidebar-with-bg">
                                <h5 className="font-semibold mb-10">Set job reminder</h5>
                                <p className="text-body-999">
                                    Enter your email address and get job notifications.
                                </p>
                                <div className="box-email-reminder">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <div className="form-group mt-15">
                                            <input
                                                type="text"
                                                className="form-control input-bg-white form-icons"
                                                placeholder="Enter email address"
                                            />
                                            <i className="fi-rr-envelope" />
                                        </div>
                                        <div className="form-group mt-25 mb-5">
                                            <button className="btn btn-default btn-md" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="sidebar-with-bg background-primary bg-sidebar pb-80">
                                <h5 className="medium-heading text-white mb-20 mt-20">
                                    Recruiting?
                                </h5>
                                <p className="text-body-999 text-white mb-30">
                                    Advertise your jobs to thousands of users.
                                </p>
                                <a
                                    href="#"
                                    className="btn btn-border icon-chevron-right btn-white-sm"
                                >
                                    Post a Job
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="section-box mt-50 mb-60">
                <div className="container">
                    <div className="box-newsletter">
                        <h5 className="text-md-newsletter">Sign up to get</h5>
                        <h6 className="text-lg-newsletter">the latest jobs</h6>
                        <div className="box-form-newsletter mt-30">
                            <form
                                className="form-newsletter"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    type="text"
                                    className="input-newsletter"
                                    placeholder="you@email.com"
                                />
                                <button className="btn btn-default font-heading icon-send-letter">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="box-newsletter-bottom">
                        <div className="newsletter-bottom" />
                    </div>
                </div>
            </section>
        </main>
    );
}
