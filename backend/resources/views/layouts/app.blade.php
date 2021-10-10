<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title') | {{ config('app.name', 'Laravel') }}</title>

    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <!-- Styles -->
    <link href="{{ mix('assets/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/fonts/fontawesome.pro.min.css') }}" rel="stylesheet">
    @yield('style')
</head>
<body class="custom-scrollbar">
<div class="custom-wrapper">
    @if (auth()->check())
        <div class="section">
            <div class="top_navbar d-flex justify-content-between align-items-center">
                <div style="position: relative;top: 2px">
                    <button class="hamburger hamburger--slider" type="button">
                          <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                          </span>
                    </button>
                </div>
                @include('components.navbar')
            </div>
        </div>
        <div class="sidebar custom-scrollbar">
            <div class="profile-container">
                <img src="{{image(auth()->user()->getAttribute('avatar'))}}" alt="profile_picture">
                <h4>{{auth()->user()->getAttribute('name')}}</h4>
            </div>
            <x-sidebar />
        </div>
    @endif
    <main class="py-4">
        <div class="container-fluid">
            @yield('content')
        </div>
    </main>
</div>

<!-- Scripts -->
<script src="{{ mix('assets/js/app.js') }}" ></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

@stack('scripts')

@yield('scripts')

<x-notify/>

<script>
    $(document).ready(function (){
        $(function () {
            $('[data-toggle="tooltip"]').tooltip({
                content: function(){
                    return $(this).attr('title');
                }
            })
        });

        const body = $('body');
        const hamburger = document.querySelector(".hamburger");

        body.addClass(sidebarStatus(checkWindowWidth()));

        if(!body.hasClass('active')){
            hamburger.classList.add('is-active');
        }

        hamburger.addEventListener("click", function(){
            if(body.hasClass('active')){
                hamburger.classList.add('is-active');
                body.removeClass('active');
                body.addClass('inactive');
                localStorage.setItem("navbar", 'inactive');
            }else{
                hamburger.classList.remove('is-active');
                body.removeClass('inactive');
                body.addClass('active');
                localStorage.setItem("navbar", 'active');
            }
        });

        function checkWindowWidth(){
            if($(window).width() < 576){
                return 'active';
            }else{
                return 'inactive';
            }
        }

        function sidebarStatus(status){
            if($(window).width() < 576){
                return 'active';
            }
            if(localStorage.getItem("navbar") !== null){
                return localStorage.getItem("navbar");
            }else{
                localStorage.setItem("navbar", status);
                return localStorage.getItem("navbar");
            }
        }
    });
</script>
</body>
</html>
