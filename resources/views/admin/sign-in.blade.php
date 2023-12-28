<!DOCTYPE html>

<html lang="en">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->

<head>
    <title>Apni Dukan | Online Shopping Site for Lifestyle &amp; More. Best Offers!</title>
    <meta charset="utf-8" />
    <meta name="description"
        content="Craft admin dashboard live demo. Check out all the features of the admin panel. A large number of settings, additional services and widgets." />
    <meta name="keywords"
        content="Craft, bootstrap, bootstrap 5, admin themes, dark mode, free admin themes, bootstrap admin, bootstrap dashboard" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Craft - Bootstrap 5 HTML Admin Dashboard Theme" />
    <meta property="og:url" content="https://themes.getbootstrap.com/product/craft-bootstrap-5-admin-dashboard-theme" />
    <meta property="og:site_name" content="Keenthemes | Craft" />
    <link rel="canonical" href="https://preview.keenthemes.com/craft" />
    <link rel="shortcut icon" href="{{ asset('assets/media/logos/favicon.ico') }}" />


    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700" /> <!--end::Fonts-->



    <link href="{{ asset('assets/plugins/global/plugins.bundle.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/style.bundle.css') }}" rel="stylesheet" type="text/css" />

    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                '../../../../www.googletagmanager.com/gtm5445.html?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-5FS8GGP');
    </script>


    <script>
        if (window.top != window.self) {
            window.top.location.replace(window.self.location.href);
        }
    </script>
</head>




<body id="kt_body" class="auth-bg">

    <script>
        var defaultThemeMode = "light";
        var themeMode;

        if (document.documentElement) {
            if (document.documentElement.hasAttribute("data-bs-theme-mode")) {
                themeMode = document.documentElement.getAttribute("data-bs-theme-mode");
            } else {
                if (localStorage.getItem("data-bs-theme") !== null) {
                    themeMode = localStorage.getItem("data-bs-theme");
                } else {
                    themeMode = defaultThemeMode;
                }
            }

            if (themeMode === "system") {
                themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            }

            document.documentElement.setAttribute("data-bs-theme", themeMode);
        }
    </script>

    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5FS8GGP" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>

    <div class="d-flex flex-column flex-root">

        <div class="d-flex flex-column flex-lg-row flex-column-fluid">

            <div class="d-flex flex-column flex-lg-row-auto bg-primary w-xl-600px positon-xl-relative">

                <div class="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">

                    <div class="d-flex flex-row-fluid flex-column text-center p-5 p-lg-10 pt-lg-20">

                        <a href="../../index.html" class="py-2 py-lg-20">
                            <img alt="Logo" src="../../assets/media/logos/logo-ellipse.svg"
                                class="h-60px h-lg-70px" />
                        </a>

                        <h1 class="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-10">
                            Welcome to Apni Dukan
                        </h1>

                        <p class="d-none d-lg-block fw-semibold fs-2 text-white">
                            Get access to your Orders, Wishlist and Recommendations <br />

                        </p>

                    </div>

                    <div class="d-none d-lg-block d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px"
                        style="background-image: url(../../assets/media/illustrations/sigma-1/17.png)">
                    </div>

                </div>

            </div>

            <div class="d-flex flex-column flex-lg-row-fluid py-10">

                <div class="d-flex flex-center flex-column flex-column-fluid">

                    <div class="w-lg-500px p-10 p-lg-15 mx-auto">


                        <form class="form w-100" novalidate="novalidate" id="kt_sign_in_form"
                            action="{{ route('admin.auth') }}" method="post">
                            @csrf

                            <div class="text-center mb-10">

                                <h1 class="text-dark mb-3">
                                    Sign In to Apni Dukan </h1>

                                <div class="text-gray-400 fw-semibold fs-4">
                                    New Here?

                                    <a href="{{ url('sign-up') }}" class="link-primary fw-bold">
                                        Create an Account
                                    </a>
                                </div>
                                <div class="text-danger">
                                    {{ session('error') }}
                                </div>

                            </div>

                            <div class="fv-row mb-10">

                                <label class="form-label fs-6 fw-bold text-dark">Email</label>

                                <input class="form-control form-control-lg form-control-solid" type="text"
                                    name="email" autocomplete="off" />

                            </div>

                            <div class="fv-row mb-10">

                                <div class="d-flex flex-stack mb-2">

                                    <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>



                                    <a href="{{ url('password-reset') }}" class="link-primary fs-6 fw-bold">
                                        Forgot Password ?
                                    </a>

                                </div>

                                <input class="form-control form-control-lg form-control-solid" type="password"
                                    name="password" autocomplete="off" />

                            </div>

                            <div class="text-center">

                                <button type="submit" class="btn btn-lg btn-primary w-100 mb-5">
                                    <span class="indicator-label">
                                        Continue
                                    </span>

                                    <span class="indicator-progress">
                                        Please wait... <span
                                            class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </span>
                                </button>

                                <div class="text-center text-muted text-uppercase fw-bold mb-5">or</div>

                                <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
                                    <img alt="Logo" src="../../assets/media/svg/brand-logos/google-icon.svg"
                                        class="h-20px me-3" />
                                    Continue with Google
                                </a>

                                <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
                                    <img alt="Logo" src="../../assets/media/svg/brand-logos/facebook-4.svg"
                                        class="h-20px me-3" />
                                    Continue with Facebook
                                </a>

                                <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100">
                                    <img alt="Logo" src="../../assets/media/svg/brand-logos/apple-black.svg"
                                        class="theme-light-show h-20px me-3" />
                                    <img alt="Logo" src="../../assets/media/svg/brand-logos/apple-black-dark.svg"
                                        class="theme-dark-show h-20px me-3" />
                                    Continue with Apple
                                </a>

                            </div>

                        </form>

                    </div>

                </div>

                <div class="d-flex flex-center flex-wrap fs-6 p-5 pb-0">

                    <div class="d-flex flex-center fw-semibold fs-6">
                        <a href="https://keenthemes.com/" class="text-muted text-hover-primary px-2"
                            target="_blank">About</a>

                        <a href="https://devs.keenthemes.com/" class="text-muted text-hover-primary px-2"
                            target="_blank">Support</a>

                        <a href="https://themes.getbootstrap.com/product/craft-bootstrap-5-admin-dashboard-theme"
                            class="text-muted text-hover-primary px-2" target="_blank">Purchase</a>
                    </div>

                </div>

            </div>

        </div>

    </div>

    <script>
        var hostUrl = "{{ asset('assets/index.html') }}";
    </script>
    <script src="{{ asset('assets/plugins/global/plugins.bundle.js') }}"></script>
    <script src="{{ asset('assets/js/scripts.bundle.js') }}"></script>
    <script src="{{ asset('assets/js/custom/authentication/sign-in/general.js') }}"></script>


</body>

</html>
