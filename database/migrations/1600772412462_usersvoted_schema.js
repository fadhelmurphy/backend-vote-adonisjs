'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersvotedSchema extends Schema {
  up () {
    this.create('usersvoteds', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      table.string('id_vote', 6).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('usersvoteds')
  }
}

module.exports = UsersvotedSchema
