'use strict'

// const User = use('App/Models/User')
const Post = use('App/Models/Post')
const { validate } = use('Validator')

class DashboardController {

  async index({ view, auth }) {
    const user = await auth.user.toJSON()
    const posts = await Post.all()
    return view.render('dashboard', { user: user,posts:posts.toJSON()})
  }

  async update({ request, response, view, params }) {
    const id    = params.id
    const posts  = await Post.find(id)

    posts.title    = request.input('title')
    posts.content  = request.input('content')
    console.log(posts.name)
    await user.save()

    return response.route('dashboard')
  }

  async delete({request, response, view, params}){
    const id = params.id;
    const posts = await Post.find(id);
    await posts.delete();

    return response.route('dashboard')
}

async store({request, response, view, session}){

  // const file = request.file('img');
  try {
    /**
     * declaration validation
     */
    const rules = {
      title: 'required',
      content: 'required'
    }

    const messages = {
      'title.required': 'Judul lengkap Tidak Boleh Kosong!',
      'content.required': 'Konten Tidak Boleh Kosong!',
    }

    const validation = await validate(request.all(), rules, messages)

    /**
     * validation failed
     */
    if(validation.fails()) {
      session.withErrors(validation.messages())
      return response.redirect('back')
    }


    const post = new Post();

    post.title = request.input('title');
    post.content = request.input('content');

    // if (file !== null) {
    //   const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, {folder: 'postsapp'});
    //   todo.img = cloudinaryResponse.secure_url;
    // }
    console.log(post.content)
    await post.save();
    session.flash({ notification: 'Konten Berhasil ditambahkan' })
    return response.redirect('back')

  } catch (error) {
    console.log(error)
    return response.route('dashboard')
  }
}

}

module.exports = DashboardController