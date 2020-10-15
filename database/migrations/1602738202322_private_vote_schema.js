'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrivateVoteSchema extends Schema {
  up () {
    this.create('private_votes', (table) => {
      table.increments()
      table.string('id_url', 6).notNullable()
      table.string('id_vote', 6).notNullable()
      table.string('votename', 30)
      table.timestamps()
    })
  }

  down () {
    this.drop('private_votes')
  }
}

module.exports = PrivateVoteSchema
