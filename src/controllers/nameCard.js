const nameCard = require('../models/nameCard');
const {
   success,
   error,
} = require('../helpers/response.js');

exports.createNameCard = async (req, res) => {
   try {
      let result = await nameCard.createNameCard(req.body, req.user._id, req)
      success(res, result.data, 201, result.message)
   }
   catch (err) {
      error(res, err, 422)
   }
}

exports.getNameCard = async (req, res) => {
   try {
      let result = await nameCard.getNameCards(req.user._id)
      success(res, result.data, 201, result.message)
   }
   catch (err) {
      error(res, err, 422)
   }
}

exports.deleteNameCard = async (req, res) => {
   try {
      let result = await nameCard.deleteNameCard(req.query.id)
      success(res, result.data, 201, result.message)
   }
   catch (err) {
      error(res, err, 422)
   }
}