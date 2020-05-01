const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Imagekit = require('imagekit');
const imagekit = new Imagekit({
   publicKey: process.env.publicKey,
   privateKey: process.env.privateKey,
   urlEndpoint: process.env.urlEndpoint
});

const userSchema = new Schema({
   email: {
      type: String,
      required: true,
      minlength: 5
   },

   username: {
      type: String
   },

   encrypted_password: {
      type: String
   },

   image: {
      type: String
   },

   fullname: {
      type: String,
      minlength: 3
   },

   job_title: {
      type: String,
      minlength: 3
   },

   company_name: {
      type: String,
      minlength: 3
   },

   website: {
      type: String,
      minlength: 3
   },

   phone_number: {
      type: String,
      minlength: 3
   },

   address: {
      type: String,
      minlength: 3
   },

}, {
   versionKey: false,
   timestamps: true,
})

class User extends mongoose.model('user', userSchema) {

   static register(data) {
      // console.log(data);
      return new Promise((resolve, reject) => {

         let encrypted_password = bcrypt.hashSync(data.password, 10)

         this.create({
            email: data.email,
            username: data.username,
            encrypted_password: encrypted_password
         })
            .then(async data => {
               // console.log(data);
               let token = await jwt.sign({ _id: data._id }, process.env.JWT_SIGNATURE_KEY)
               resolve({
                  message: 'Thank You, your account has been created!',
                  data: {
                     _id: data._id,
                     email: data.email,
                     username: data.username,
                     token: token
                  }
               })
            })
            .catch(err => {
               reject({
                  message: err.message
               })
            })
      })
   }

   static auth(req) {
      return new Promise((resolve, reject) => {
         this.findOne({ username: req.body.username })
            .then(async data => {

               if (bcrypt.compareSync(req.body.password, data.encrypted_password)) {
                  let token = jwt.sign({ _id: data._id }, process.env.JWT_SIGNATURE_KEY)

                  return resolve({
                     data: {
                        id: data._id,
                        email: data.email,
                        username: data.username,
                        image: data.image,
                        token: token
                     },
                     message: `Welcome Back ${data.username}`
                  })
               } else {
                  return reject({
                     errors: 'Email or Password is wrong, please fill valid data.'
                  })
               }
            })
            .catch(error => {
               reject(error)
            })
      })
   }

   static async dataUpdate(user, req) {

      let params = {
         email: req.body.email,
         fullname: req.body.fullname,
         job_title: req.body.job_title,
         company_name: req.body.company_name,
         website: req.body.website,
         phone_number: req.body.phone_number,
         address: req.body.address
      }

      for (let prop in params) if (!params[prop]) delete params[prop];

      if (req.file) {
         let url = await imagekit.upload({ file: req.file.buffer.toString('base64'), fileName: `IMG-${Date.now()}` })
         params.image = url.url
      }

      return new Promise((resolve, reject) => {
         this.findOne({ _id: user._id })
            .then(user => {

               this.findByIdAndUpdate(user._id, params, { new: true })
                  .then(data => {
                     resolve({
                        data: {
                           id: data.id,
                           email: data.email,
                           username: data.username,
                           fullname: data.fullname,
                           image: data.image,
                           job_title: data.job_title,
                           company_name: data.company_name,
                           website: data.website,
                           phone_number: data.phone_number,
                           address: data.address
                        },
                        message: "Your data successfuly updated"
                     })
                  })

            })
            .catch(err => {
               reject(err)
            })
      })
   }

   // DONT CODE BELLOW HERE
}
module.exports = User;