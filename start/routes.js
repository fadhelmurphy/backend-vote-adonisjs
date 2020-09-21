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
Route.get('login', 'Otentik/LoginController.index').as('login.index').middleware(['RedirectIfAuthenticated'])
Route.post('login', 'Otentik/LoginController.check').as('login.check').middleware(['RedirectIfAuthenticated'])
Route.get('logout', 'Otentik/LoginController.logout').as('logout').middleware(['Authenticate'])

/**
* dashboard
*/
Route.group(()=>{
    Route.get('dashboard', 'DashboardController.index').as('dashboard')
    Route.post('dashboard/update/:id', 'DashboardController.update')
    Route.get('dashboard/delete/:id', 'DashboardController.delete')
    Route.post('dashboard/add', 'DashboardController.store').as('dashboard.store')
}).middleware(['Authenticate'])