const { populate } = require("../models/ratings-schema");
const Rating = require("../models/ratings-schema");
class RatingUser {
  create(request, response) {
    const rating = Rating(request.body);
    rating.save((error, res) => {
      if (error) {
        response.send(error);
      }
      if (res) {
        response.json(res);
      }
    });
  }

  get(req, res) {
    // console.log('******',req)
    // Rating.find()
    Rating.find()
      .populate("user")
      .populate("movie")
      .then((resp) => res.send(resp))
      .catch((err) => res.send(err));
    console.log(req.body);
  }

  getbyid(req, res) {
    const id = req.params.id;
    Rating.find({ movie: id })
      .populate("user", "user")
      .then((respond) => {
        if (respond) {
          res.send(respond);
        } else {
          res.send("Rating not found.");
        }
      })
      .catch((error) => res.send(error));
  }

  //

  update(req, res) {
    console.log(req.params);
    Rating.findByIdAndUpdate(req.body._id, req.body)
      .then((resp) => res.send(resp))
      .catch((err) => res.send(err));
    console.log(req.body);
  }
  delete(req, res) {
    console.log(req.params);
    Rating.findByIdAndDelete(req.params.id)
      .then((resp) => res.send(resp))
      .catch((err) => res.send(err));
    console.log(req.body);
  }
}

module.exports = RatingUser;
