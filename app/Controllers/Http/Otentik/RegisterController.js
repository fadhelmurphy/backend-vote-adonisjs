'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class RegisterController {

  index({ view }) {
    return view.render('otentik.register')
  }

  async storeFront({ request, auth, response }) {
    const { name, email, password } = request.all()
    /**
     * create user
     */
    console.log({ name, email, password })
    const user = await User.create({
      name,
      email,
      password
    }).then(async(res)=>{

      const token = await auth.attempt(email, password)
      console.log(token)
      try {
        if (token) {
          let user = await User.findBy('email', email)
          // let token = await auth.generate(user)

          // Object.assign(user, token)
          console.log(token)
          return response.json(token)
        }
      }
      catch (e) {
        console.log(e)
        return response.json({message: 'Gagal membuat token'})
      }
    })
    .catch(async (err) => {
      return response.status(401).json({message: 'Anda sudah melakukan registrasi'})
    });

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
