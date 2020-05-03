const User = require('../models/user.js');
const {
   success,
   error,
} = require('../helpers/response.js')

exports.create = async (req, res) => {
   try {
      let result = await User.register(req.body)

      success(res, result.data, 201, result.message)
   }
   catch (err) {
      error(res, err, 422)
   }
}

exports.auth = async (req, res) => {
   try {
      let result = await User.auth(req)
      success(res, result.data, 200, result.message)
   }
   catch (err) {
      error(res, err, 422)
   }
}

exports.update = async (req, res) => {
   try {
      let result = await User.dataUpdate(req.user._id, req)
      success(res, result.data, 201, result.message)
   }
   catch (err) {
      error(res, err, 422)
   }
}

exports.getMyData = async (req, res) => {
   try {
      let result = await User.getMyData(req.user._id)
      success(res, result.data, 201, result.message)
   }
   catch (err) {
      error(res, err, 422)
   }
}