// resources/js/Pages/Jobs/Index.tsx
import React, { ChangeEvent } from "react";
import { Head, Link, router } from "@inertiajs/react";

interface Company {
    id: number;
    name: string;
    jobs_count?: number;
}

interface Job {
    id: number;
    title: string;
    slug: string;
    location: string;
    is_remote: boolean;
    salary_min: number | null;
    salary_max: number | null;
    type: "full-time" | "part-time" | "contract" | string;
    short_description: string;
    company: Company;
    // opcional, se você quiser mandar já formatado:
    human_published_at?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface JobsIndexProps {
    jobs: {
        data: Job[];
        links: PaginationLink[];
        total: number;
    };
    companies: Company[];
    filters: {
        company_id?: string;
        location?: string;
        position_type?: string;
        salary_min?: string;
        search?: string;
    };
}

export default function Index({ jobs, companies, filters }: JobsIndexProps) {
    const applyFilter = (key: string, value: string) => {
        router.get(
            route("jobs.index"),
            { ...filters, [key]: value || undefined },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handleChange =
        (key: keyof JobsIndexProps["filters"]) =>
            (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                applyFilter(key, e.target.value);
            };

    return (
        <>
            <Head title="WiseJobs - Jobs listing" />

            {/* main vem do template (classe main) */}
            <main className="main">
                {/* Hero/topo da página de jobs (adaptado de job-grid.html) */}
                <section className="section-box-2">
                    <div className="box-head-single none-bg">
                        <div className="container">
                            <h4>
                                There Are {jobs.total} Jobs
                                <br />
                                Here For you!
                            </h4>
                            <div className="row mt-15 mb-40">
                                <div className="col-lg-7 col-md-9">
                                    <span className="text-mutted">
                                        Discover your next career move, freelance gig, or internship.
                                    </span>
                                </div>
                                <div className="col-lg-5 col-md-3 text-lg-end text-start">
                                    <ul className="breadcrumbs mt-sm-15">
                                        <li>
                                            <Link href={route("jobs.index")}>Home</Link>
                                        </li>
                                        <li>Jobs listing</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Filtros principais - baseado em box-filters do template */}
                            <div className="box-shadow-bdrd-15 box-filters">
                                <div className="row">
                                    {/* Busca por título / texto */}
                                    <div className="col-lg-5">
                                        <div className="box-search-job">
                                            <form
                                                className="form-search-job"
                                                onSubmit={(e) => e.preventDefault()}
                                            >
                                                <input
                                                    type="text"
                                                    className="input-search-job"
                                                    placeholder="Search job title, keywords..."
                                                    value={filters.search || ""}
                                                    onChange={handleChange("search")}
                                                />
                                            </form>
                                        </div>
                                        {/* tags de filtros aplicados (opcional) */}
                                        <div className="list-tags-job">
                                            {filters.position_type && (
                                                <button
                                                    type="button"
                                                    className="text-normal job-tag"
                                                    onClick={() => applyFilter("position_type", "")}
                                                >
                                                    {filters.position_type === "remote"
                                                        ? "Remote"
                                                        : "In-person"}
                                                    <span className="remove-tags-job" />
                                                </button>
                                            )}
                                            {filters.company_id && (
                                                <button
                                                    type="button"
                                                    className="text-normal job-tag"
                                                    onClick={() => applyFilter("company_id", "")}
                                                >
                                                    {
                                                        companies.find(
                                                            (c) =>
                                                                String(c.id) ===
                                                                String(filters.company_id)
                                                        )?.name
                                                    }
                                                    <span className="remove-tags-job" />
                                                </button>
                                            )}
                                            {filters.location && (
                                                <button
                                                    type="button"
                                                    className="text-normal job-tag"
                                                    onClick={() => applyFilter("location", "")}
                                                >
                                                    {filters.location}
                                                    <span className="remove-tags-job" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Filtros secundários à direita */}
                                    <div className="col-lg-7">
                                        <div className="d-flex job-fillter">
                                            <div className="d-block d-lg-flex">
                                                {/* Filtro tipo de vaga */}
                                                <div className="dropdown job-type me-2 mb-2 mb-lg-0">
                                                    <select
                                                        className="form-select"
                                                        value={filters.position_type || ""}
                                                        onChange={handleChange("position_type")}
                                                    >
                                                        <option value="">All job types</option>
                                                        <option value="remote">Remote</option>
                                                        <option value="in-person">In-person</option>
                                                    </select>
                                                </div>

                                                {/* Filtro company */}
                                                <div className="dropdown me-2 mb-2 mb-lg-0">
                                                    <select
                                                        className="form-select"
                                                        value={filters.company_id || ""}
                                                        onChange={handleChange("company_id")}
                                                    >
                                                        <option value="">All companies</option>
                                                        {companies.map((c) => (
                                                            <option key={c.id} value={c.id}>
                                                                {c.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Filtro location */}
                                                <div className="dropdown me-2 mb-2 mb-lg-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Location"
                                                        value={filters.location || ""}
                                                        onChange={handleChange("location")}
                                                    />
                                                </div>

                                                {/* Filtro salary mínimo */}
                                                <div className="dropdown mb-2 mb-lg-0">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Min salary"
                                                        value={filters.salary_min || ""}
                                                        onChange={handleChange("salary_min")}
                                                    />
                                                </div>
                                            </div>
                                            {/* contador de resultados */}
                                            <div className="ml-auto d-none d-lg-block">
                                                <span className="text-sm-muted">
                                                    {jobs.total} job(s) found
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* fim filtros */}
                        </div>
                    </div>
                </section>

                {/* Seção com grid de jobs (cards) */}
                <section className="section-box">
                    <div className="container">
                        <div className="row">
                            {/* Lista de vagas */}
                            <div className="col-lg-12">
                                <div className="row">
                                    {jobs.data.length === 0 && (
                                        <div className="col-12">
                                            <div className="text-center py-5 text-muted">
                                                No jobs found with these filters.
                                            </div>
                                        </div>
                                    )}

                                    {jobs.data.map((job) => (
                                        <div key={job.id} className="col-lg-4 col-md-6 mb-4">
                                            <div className="card-grid-2 hover-up">
                                                <div className="text-center card-grid-2-image">
                                                    <Link
                                                        href={route("jobs.show", job.slug)}
                                                    >
                                                        <figure>
                                                            {/* aqui você pode trocar por logo da company se tiver */}
                                                            <img
                                                                alt={job.title}
                                                                src="/bootstrap-template/imgs/jobs/job-1.png"
                                                            />
                                                        </figure>
                                                    </Link>
                                                    {job.is_remote && (
                                                        <label className="btn-urgent">
                                                            Remote
                                                        </label>
                                                    )}
                                                </div>
                                                <div className="card-block-info">
                                                    <div className="row">
                                                        <div className="col-lg-7 col-6">
                                                            <div className="card-2-img-text">
                                                                <span>
                                                                    <img
                                                                        alt={job.company.name}
                                                                        src="/bootstrap-template/imgs/jobs/logos/logo-1.svg"
                                                                    />
                                                                </span>
                                                                <span>{job.company.name}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-5 col-6 text-end">
                                                            <span className="btn btn-grey-small">
                                                                {job.type === "full-time"
                                                                    ? "Full time"
                                                                    : job.type === "part-time"
                                                                        ? "Part time"
                                                                        : "Contract"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mt-20">
                                                        <Link href={route("jobs.show", job.slug)}>
                                                            {job.title}
                                                        </Link>
                                                    </h5>
                                                    <div className="mt-15">
                                                        <span className="card-time me-2">
                                                            {job.human_published_at ||
                                                                "Recently posted"}
                                                        </span>
                                                        <span className="card-location">
                                                            {job.location}
                                                        </span>
                                                    </div>
                                                    <p className="font-sm color-text-paragraph mt-15">
                                                        {job.short_description}
                                                    </p>
                                                    <div className="card-2-bottom mt-30">
                                                        <div className="row">
                                                            <div className="col-lg-7 col-8">
                                                                {job.salary_min && (
                                                                    <span className="card-text-price">
                                                                        {job.salary_max
                                                                            ? `${job.salary_min} - ${job.salary_max}`
                                                                            : `From ${job.salary_min}`}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="col-lg-5 col-4 text-end">
                                                                <Link
                                                                    href={route(
                                                                        "jobs.show",
                                                                        job.slug
                                                                    )}
                                                                    className="btn btn-apply-now"
                                                                >
                                                                    View details
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Paginação estilo bootstrap */}
                                <div className="paginations mt-30">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination">
                                            {jobs.links.map((link, i) => {
                                                // o label vem com HTML (&laquo; etc)
                                                const isDisabled = !link.url;
                                                return (
                                                    <li
                                                        key={i}
                                                        className={`page-item ${link.active ? "active" : ""
                                                            } ${isDisabled ? "disabled" : ""}`}
                                                    >
                                                        {isDisabled ? (
                                                            <span
                                                                className="page-link"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        ) : (
                                                            <button
                                                                className="page-link"
                                                                onClick={() =>
                                                                    link.url &&
                                                                    router.visit(link.url, {
                                                                        preserveScroll: true,
                                                                        preserveState: true,
                                                                    })
                                                                }
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
