<!DOCTYPE html>
<html class="no-js" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <title>WiseJobs - Job Board</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="/imgs/theme/favicon.svg" />

    <!-- Template CSS -->
    <link rel="stylesheet" href="/css/plugins/animate.min.css" />
    <link rel="stylesheet" href="/css/main.css" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>
<body>
    {{-- Preloader pode ficar aqui ou virar componente React, por enquanto deixo aqui --}}
    <div id="preloader-active" style="display:none;">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="text-center">
                    <img src="/img/theme/loading.gif" alt="jobhub" />
                </div>
            </div>
        </div>
    </div>

    @inertia
</body>
</html>
