import React from "react";
import { Head } from "@inertiajs/react";

const HomeIndex: React.FC = () => {
  return (
    <>
      <Head title="WiseJobs - Home" />

      {/* HEADER */}

      {/* MOBILE HEADER – se quiser, pode manter igual ao HTML original */}
      <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        {/* ... copia o conteúdo do mobile header do HTML, trocando class -> className ... */}
      </div>

      {/* MAIN CONTENT – aqui é basicamente copy/paste do <main class="main"> do HTML */}
      <main className="main">
        {/* SECTION HERO */}
        <section className="section-box">
          <div className="banner-hero hero-1">
            <div className="banner-inner">
              <div className="row">
                <div className="col-lg-8">
                  <div className="block-banner">
                    <span className="text-small-primary text-small-primary--disk text-uppercase">
                      Best jobs place
                    </span>
                    <h1 className="heading-banner">
                      The Easiest Way to Get Your New Job
                    </h1>
                    <div className="banner-description mt-30">
                      Each month, more than 3 million job seekers turn to
                      website in their search for work, making over 140,000
                      applications every single day
                    </div>

                    <div className="form-find mt-60">
                      <form>
                        <input
                          type="text"
                          className="form-input input-keysearch mr-10"
                          placeholder="Job title, Company..."
                        />
                        <select className="form-input mr-10 select-active">
                          <option value="">Location</option>
                          <option value="BR">Brazil</option>
                          <option value="US">USA</option>
                          {/* ... (pode copiar todas as options do HTML se quiser) */}
                        </select>
                        <button className="btn btn-default btn-find">
                          Find now
                        </button>
                      </form>
                    </div>

                    <div className="list-tags-banner mt-60">
                      <strong>Popular Searches:</strong>{" "}
                      <a href="#">Designer</a>,{" "}
                      <a href="#">Developer</a>,{" "}
                      <a href="#">Web</a>,{" "}
                      <a href="#">Engineer</a>,{" "}
                      <a href="#">Senior</a>
                    </div>
                  </div>
                </div>

                {/* BANNER IMAGE RIGHT */}
                <div className="col-lg-4 col-md-6">
                  <div className="banner-imgs">
                    <img
                      alt="jobhub"
                      src="/imgs/banner/banner.png"
                      className="img-responsive shape-1"
                    />
                    <span className="union-icon">
                      <img
                        alt="jobhub"
                        src="/imgs/banner/union.svg"
                        className="img-responsive shape-3"
                      />
                    </span>
                    {/* ... demais spans com ícones */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAROUSEL DE LOGOS – pode copiar o HTML do template, só mudando class -> className */}
        {/* SECTION "Browse by category" */}
        {/* SECTION "Recent Jobs" – por enquanto estático igual o template*/}

      </main>

      {/* FOOTER – se tiver no HTML, você copia aqui também */}
    </>
  );
};

export default HomeIndex;
