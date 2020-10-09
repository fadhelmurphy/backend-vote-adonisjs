'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class RedirectIfAuthenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next) {
    // call next to advance the request
    try {
      await auth.check()
      console.log(auth.user.id)
      return response.json({auth})
      // return response.route('dashboard')
    } catch (error) {
      await next()
    }
  }
}

module.exports = RedirectIfAuthenticated