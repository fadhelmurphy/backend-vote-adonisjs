'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VotesSchema extends Schema {
  up () {
    this.create('votes', (table) => {
      table.increments()
      table.string('id_vote', 6).notNullable()
      table.string('votename', 30)
      table.string('kandidat', 30).notNullable()
      table.string('creator', 30)
      table.timestamps()
    })
  }

  down () {
    this.drop('votes')
  }
}

module.exports = VotesSchema
