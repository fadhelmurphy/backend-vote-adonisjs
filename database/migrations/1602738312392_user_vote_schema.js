'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserVotedSchema extends Schema {
  up () {
    this.create('user_votes', (table) => {
      table.increments()
      table.string('email', 254).notNullable()
      table.string('candidate', 30).notNullable()
      table.string('id_vote', 6).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_votes')
  }
}

module.exports = UserVotedSchema
