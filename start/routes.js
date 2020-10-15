'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
/**
* register
*/
Route.get('register', 'Otentik/RegisterController.index').as('register.index').middleware(['RedirectIfAuthenticated'])
Route.post('register', 'Otentik/RegisterController.store').as('register.store').middleware(['RedirectIfAuthenticated'])

/**
* login
*/
// Route.get('login', 'Otentik/LoginController.index').as('login.index').middleware(['RedirectIfAuthenticated'])
// Route.post('login', 'Otentik/LoginController.check').as('login.check').middleware(['RedirectIfAuthenticated'])
// Route.get('logout', 'Otentik/LoginController.logout').as('logout').middleware(['Authenticate'])

/**
* dashboard
*/
// Route.group(()=>{
//     Route.get('/', 'DashboardController.index').as('dashboard'),
//     Route.post('update/:id', 'DashboardController.update').as('dashboard.update'),
//     Route.post('sendvote', 'DashboardController.sendvote').as('dashboard.sendvote'),
//     Route.get('delete/:id', 'DashboardController.delete'),
//     Route.get('get/:id', 'DashboardController.getbyid'),
//     Route.get('vote/add', 'DashboardController.addvote'),
//     Route.post('add', 'DashboardController.store').as('dashboard.store')
// }).prefix('dashboard').middleware(['Authenticate'])
Route.group(()=>{
    Route.get('/', 'Dashboard/DashboardController.getAll').as('dashboard')
    .middleware("auth");
    Route.post('update', 'Dashboard/DashboardController.update')
    .middleware("auth");
    Route.post('sendvote', 'Dashboard/DashboardController.sendvote')
    .middleware("auth");
    Route.get('delete/:id', 'Dashboard/DashboardController.delete')
    .middleware("auth");
    Route.get('get/:id', 'Dashboard/DashboardController.getbyid')
    .middleware("auth");
    Route.post('add', 'Dashboard/DashboardController.addvote')
    // Route.get('login', 'Otentik/LoginController.index')
    // .middleware(['RedirectIfAuthenticated'])
    Route.post('login', 'Otentik/LoginController.check')
    Route.get('getuser', 'Otentik/LoginController.show')
    .middleware("auth");
    // .middleware(['RedirectIfAuthenticated'])
    Route.get('logout', 'Otentik/LoginController.logout').as('logout')
    // .middleware(['Authenticate'])
}).prefix('v1/api')
// .middleware(['Authenticate'])
