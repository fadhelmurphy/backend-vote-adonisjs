'use strict'
const VoteLink = use("App/Models/VoteLink");
const { nanoid } = use("nanoid");
class GenerateController {
  async private({ view, auth, response, request }) {
    try{
      const user = await auth.getUser()
      var data = await request.all().result
      data = await data.filter((el)=>!el.isPublic&&el)

    const id = nanoid(6);
    const results = await VoteLink.find(id);
    if (results == null)
      await Promise.all(
        data.map(async (element) => {
          try {
            var vote = new VoteLink();
            vote.id_url = id;
            vote.email = user.email
            vote.id_vote = element.id_vote;
            vote.votename = element.name;
            vote.status = "private";
            await vote.save();
          } catch (error) {
            console.log(error);
          }
        })
      );
       return response.json(id)
    }catch(error){

      console.log(error)
    }
  }
  async public({ view, auth, response, request }) {
    try{
      const user = await auth.getUser()
      var data = await request.all().result
      data = await data.filter((el)=>el.isPublic&&el)

    const id = nanoid(6);
    const results = await VoteLink.find(id);
    if (results == null)
      await Promise.all(
        data.map(async (element) => {
          try {
            var vote = new VoteLink();
            vote.id_url = id;
            vote.email = user.email
            vote.id_vote = element.id_vote;
            vote.votename = element.name;
            vote.status = "public";
            await vote.save();
          } catch (error) {
            console.log(error);
          }
        })
      );
       return response.json(id)
    }catch(error){
      console.log(error)
    }
  }
  async showPriv8({ request, response, auth}) {
    try{

      const id = request.only(['code']).code
      console.log(id)
      const user = await auth.getUser()

      var vote = await VoteLink.query()
        .where("id_url", id)
        .select("id", "id_vote", "votename")
        .fetch();
      vote = vote.toJSON();

      return response.json(vote);
    }
    catch(e){
      console.log(e)
    }
  }
}

module.exports = GenerateController
