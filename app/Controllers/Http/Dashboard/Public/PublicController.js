"use strict";

// const User = use('App/Models/User')
// const Post = use("App/Models/Post");
const Vote = use("App/Models/Vote");
const UsersVoted = use("App/Models/UsersVoted");
const { validate } = use("Validator");
const { nanoid } = use("nanoid");

class PublicController {
  async generate({ view, auth, response, request }) {
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
    return view.render("dashboard", {
      user: user,
      votes: result,
    });
  }
}

module.exports = PublicController
