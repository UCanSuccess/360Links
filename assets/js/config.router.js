'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/login/signin");
    //
    // Set up the states
    // Front-Side
    $stateProvider.state('front', {
        url: "/front",
        templateUrl: "assets/views/front/front.html",
        resolve: loadSequence('chartjs', 'chart.js', 'chatCtrl'),
        abstract: true
    }).state('front.pages', {
        url: '/pages',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Pages',
        ncyBreadcrumb: {
            label: 'Pages'
        }
    }).state('front.pages.user', {
        url: '/user/:user_id',
        templateUrl: "assets/views/front/user_profile.html",
        title: 'User Profile',
        ncyBreadcrumb: {
            label: 'User Profile'
        },
        resolve: loadSequence('flow', 'angularFileUpload','userCtrl')
    }).state('front.pages.endorse', {
        url: '/endorse',
        templateUrl: "assets/views/front/endorse.html",
        title: 'Endorse Business',
        ncyBreadcrumb: {
            label: 'Endorse Business'
        },
        resolve: loadSequence('flow', 'endorseCtrl')
    }).state('front.pages.provider_profile', {
        url: '/provider_profile',
        templateUrl: "assets/views/front/provider_profile.html",
        title: 'Provider Profile',
        ncyBreadcrumb: {
            label: 'Provider Profile'
        },
        params: {
            'user_id': 0
        },
        resolve: loadSequence('providerCtrl')
    }).state('front.pages.friend_profile', {
        url: '/friend_profile',
        templateUrl: "assets/views/front/friend_profile.html",
        title: 'Friend Profile',
        ncyBreadcrumb: {
            label: 'Friend Profile'
        },
        params: {
            'user_id': 0
        },
        resolve: loadSequence('friendCtrl')
    }).state('error', {
        url: '/error',
        template: '<div ui-view class="fade-in-up"></div>'
    }).state('error.404', {
        url: '/404',
        templateUrl: "assets/views/utility_404.html",
    }).state('error.500', {
        url: '/500',
        templateUrl: "assets/views/utility_500.html",
    })

	// Login routes

	.state('login', {
	    url: '/login',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
        resolve: loadSequence('loginCtrl'),
	    abstract: true
	}).state('login.signin', {
	    url: '/signin',
	    templateUrl: "assets/views/auth/login_login.html"
	}).state('login.lockscreen', {
	    url: '/lock',
	    templateUrl: "assets/views/auth/login_lock_screen.html"
	})

    // Admin-side

    .state('admin', {
        url: "/admin",
        templateUrl: "assets/views/admin/admin.html",
        resolve: loadSequence('chartjs', 'chart.js', 'chatCtrl'),
        abstract: true
    }).state('admin.business', {
        url: '/business',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Pages',
        ncyBreadcrumb: {
            label: 'Pages'
        }
    }).state('admin.business.index', {
        url: '/index',
        templateUrl: "assets/views/admin/business.html",
        title: 'Business',
        ncyBreadcrumb: {
            label: 'Business'
        },
        resolve: loadSequence('businessCtrl')
    }).state('admin.business.detail_business', {
        url: '/detail_business',
        templateUrl: "assets/views/admin/detail_business.html",
        title: 'Detail Business',
        ncyBreadcrumb: {
            label: 'Detail Business'
        },
        resolve: loadSequence('detailCtrl'),
        params:{
            business_id:0
        }
    }).state('admin.business.verify', {
        url: '/verify',
        templateUrl: "assets/views/admin/verify_list.html",
        title: 'Verify List',
        ncyBreadcrumb: {
            label: 'Verify List'
        },
        resolve: loadSequence('verifyCtrl')
    }).state('admin.business.verify_detail', {
        url: '/verify_detail',
        templateUrl: "assets/views/admin/verify_detail.html",
        title: 'Verify Detail',
        ncyBreadcrumb: {
            label: 'Verify List'
        },
        resolve: loadSequence('verifyDetailCtrl'),
        params:{
            verify_id:0
        }
    })

	// Landing Page route
	.state('landing', {
	    url: '/landing-page',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	    abstract: true,
	    resolve: loadSequence('jquery-appear-plugin', 'ngAppear', 'countTo')
	}).state('landing.welcome', {
	    url: '/welcome',
	    templateUrl: "assets/views/landing_page.html"
	});
    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);
