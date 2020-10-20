'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrivateVoteSchema extends Schema {
  up () {
    this.create('vote_links', (table) => {
      table.increments()
      table.string('id_url', 6).notNullable()
      table.string('email', 254).notNullable()
      table.string('id_vote', 6).notNullable()
      table.string('votename', 30)
      table.string('status', 7)
      table.timestamps()
    })
  }

  down () {
    this.drop('vote_links')
  }
}

module.exports = PrivateVoteSchema
