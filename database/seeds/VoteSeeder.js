'use strict'

/*
|--------------------------------------------------------------------------
| VoteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class VoteSeeder {
  async run () {
    await Factory.model('App/Models/Vote').createMany(5)
  }
}

module.exports = VoteSeeder
