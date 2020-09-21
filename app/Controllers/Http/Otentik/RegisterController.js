'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class RegisterController {

  index({ view }) {
    return view.render('otentik.register')
  }

  async store({ request, session, response }) {

    /**
     * declaration validation
     */
    const rules = {
      name: 'required',
      email: 'required|unique:users,email',
      password: 'required'
    }

    const messages = {
      'name.required': 'Nama lengkap Tidak Boleh Kosong!',
      'email.required': 'Alamat Email Tidak Boleh Kosong!',
      'email.unique': 'Alamat Email Sudah Terdaftar!',
      'password.required': 'Password Tidak Boleh Kosong!',
    }

    const validation = await validate(request.all(), rules, messages)

    /**
     * validation failed
     */
    if(validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])
      return response.redirect('back')
    }

    /**
     * create user
     */
    const user = await User.create({
      name: request.input('name'),
      email: request.input('email'),
      password: request.input('password')
    })

    /**
     * display success message
     */
    session.flash({ notification: 'Register Berhasil!' })
    return response.redirect('back')

  }

}

module.exports = RegisterController