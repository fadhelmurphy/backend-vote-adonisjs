"use strict";

// const User = use('App/Models/User')
const Post = use("App/Models/Post");
const Vote = use("App/Models/Vote");
const UsersVoted = use("App/Models/UsersVoted");
const { validate } = use("Validator");
const { nanoid } = use("nanoid");

class DashboardController {
  async index({ view, auth }) {
    const user = await auth.user.toJSON();
    // const vote = await Vote.query().where('id_vote', '886817').select('votename','kandidat').fetch();
    // console.log(vote.toJSON()[1].kandidat)
    var lookup = {};
    var items = await Vote.all();
    var items = items.toJSON();
    var result = [];
    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.votename;
      var vote = item.id_vote;

      if (!(name in lookup) && !(vote in lookup)) {
        lookup[name] = 1;
        lookup[vote] = 1;
        result.push({ id_vote: vote, name });
      }
    }
    const posts = await Post.all();
    return view.render("dashboard", {
      user: user,
      posts: posts.toJSON(),
      votes: result,
    });
  }
  async getAll({ response, auth }) {
    // const user = await auth.user.toJSON();
    // const vote = await Vote.query().where('id_vote', '886817').select('votename','kandidat').fetch();
    // console.log(vote.toJSON()[1].kandidat)
    
    const user = await auth.getUser()
    console.log(user.email)
    var lookup = {};
    var items = await Vote.all();
    var items = items.toJSON();
    var result = [];
    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.votename;
      var vote = item.id_vote;
      var creator = item.creator;

      if (!(name in lookup) && !(vote in lookup) && !(creator in lookup) && creator == user.email) {
        lookup[name] = 1;
        lookup[vote] = 1;
        lookup[creator] = 1;
        result.push({ id_vote: vote, name });
      }
    }
    console.log(result);
    return response.json({ votes: result });
  }

  async addvote({ auth,request }) {
    const user = await auth.getUser()
    const req = request.all();
    const id = nanoid(6);
    const results = await Vote.find(id);
    if (results == null)
      await Promise.all(
        req.data.map(async (element) => {
          try {
            var vote = new Vote();
            vote.id_vote = id;
            vote.creator = user.email
            vote.votename = req.votename;
            vote.kandidat = element.kandidat;
            await vote.save();
          } catch (error) {
            console.log(error);
          }
        })
      );
  }

  async update({ auth, request, response }) {
    const user = await auth.getUser()
    const req = request.all().Vote;
    console.log(req);
    await Promise.all(
      req.map(async (element) => {
        try {
          if (element.action == "tambah") {
            var vote = new Vote();
            vote.id_vote = element.id_vote;
            vote.creator = user.email
            vote.votename = element.votename;
            vote.kandidat = element.kandidat;
            await vote.save();
          } else if (element.action == "ubah") {
            await Vote.query()
              .where("id", element.id)
              .update({
                votename: element.votename,
                kandidat: element.kandidat,
              });
          } else {
            var id = element.id;
            var vote = await Vote.find(id);
            if (vote.creator == user.email) {
            await vote.delete();
            }
              
          }
        } catch (error) {
          console.log(error);
        }
      })
    );

    // return response.route("dashboard");
  }

  async getbyid({ request, response, view, params }) {
    const id = params.id;

    var vote = await Vote.query()
      .where("id_vote", id)
      .select("id", "id_vote", "votename", "kandidat")
      .fetch();
    vote = vote.toJSON();

    return response.json({ vote });
  }

  async sendvote({ request, response, auth, view, params }) {
    try {
      // const Vote = new Vote();
      const UV = new UsersVoted();
      const { id_vote, kandidat } = request.all();
      const name = "USERNAME";
      console.log(name);
      UV.name = name;
      UV.id_vote = id_vote;
      UV.candidate = kandidat;
      await UV.save();
      return response.json({ messages: "berhasil" });
      // return response.redirect('back')
    } catch (error) {
      console.log(error);
      // return response.route("dashboard");
    }
  }

  async delete({ request,auth, response, view, params }) {
    const user = await auth.getUser()
    const id = params.id;
    // console.log(id);
    // await Vote.query().where("id_vote", id).delete();
    var vote = await Vote.find(id);
    if (vote.creator == user.email) {
    await vote.delete();
    }
    // return response.route("dashboard");
  }

  async store({ request, response, view, session }) {
    // const file = request.file('img');
    try {
      /**
       * declaration validation
       */
      const rules = {
        title: "required",
        content: "required",
      };

      const messages = {
        "title.required": "Judul lengkap Tidak Boleh Kosong!",
        "content.required": "Konten Tidak Boleh Kosong!",
      };

      const validation = await validate(request.all(), rules, messages);

      /**
       * validation failed
       */
      if (validation.fails()) {
        session.withErrors(validation.messages());
        return response.redirect("back");
      }

      const post = new Post();

      post.title = request.input("title");
      post.content = request.input("content");

      // if (file !== null) {
      //   const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, {folder: 'postsapp'});
      //   todo.img = cloudinaryResponse.secure_url;
      // }
      console.log(post.content);
      await post.save();
      session.flash({ notification: "Konten Berhasil ditambahkan" });
      return response.redirect("back");
    } catch (error) {
      console.log(error);
      // return response.route("dashboard");
    }
  }
}

module.exports = DashboardController;
