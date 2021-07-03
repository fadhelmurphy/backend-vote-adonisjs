'use strict'
const User = use('App/Models/User');
class LoginController {

  // index({ view }) {
  //   return view.render('otentik.login')
  // }

  async check({ request, auth, session, response }) {

    /**
     * get data from form
     */
    const { email, password } = request.all()

    /**
     * attemp auth
     */
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
      return response.json({message: 'You are not registered!'})
    }

  }

  async logout({ auth, response }) {
    await auth.logout()
    return response.route('login.index')
  }

    async show ({ auth,params, response }) {
      const user = await auth.getUser()
      // const userid = await auth.user.id;
      // console.log(user)
        // const user = await User.find(userid)
        // const user = getUser
        // console.log(user.name)
        const res = {
            name: user.name,
            email: user.email
        }
        return response.json(res)
    }

}

module.exports = LoginController
