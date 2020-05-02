const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Imagekit = require('imagekit')
const imagekit = new Imagekit({
   publicKey: process.env.publicKey,
   privateKey: process.env.privateKey,
   urlEndpoint: process.env.urlEndpoint
})

const nameCardSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },

   relation: {
      type: String,
      enum: ["works", "family", "friend"]
   },

   email: {
      type: String,
   },

   image: {
      type: String
   },

   fullname: {
      type: String,
   },

   job_title: {
      type: String,
   },

   company_name: {
      type: String,
   },

   website: {
      type: String,
   },

   phone_number: {
      type: String,
   },

   address: {
      type: String,
   },
},
   {
      versionKey: false,
      timestamps: true,
   }
)

class NameCard extends mongoose.model('NameCard', nameCardSchema) {

   static async createNameCard(body, owner, req) {
      let params = {
         userId: owner,
         email: body.title,
         image: body.importanceLevel,
         fullname: body.fullname,
         job_title: body.job_title,
         company_name: body.company_name,
         website: body.website,
         phone_number: body.phone_number,
         address: body.address,
         relation: body.relation
      }

      for (let prop in params) if (!params[prop]) delete params[prop];

      if (req.file) {
         let url = await imagekit.upload({ file: req.file.buffer.toString('base64'), fileName: `IMG-${Date.now()}` })
         params.image = url.url
      }

      return new Promise((resolve, reject) => {
         this.create(params)
            .then(data => {
               resolve({ data: data, message: "Name card has been added to your bucket" })
            })
            .catch(err => {
               reject(err)
            })
      })
   }

   static getNameCards(owner) {

      return new Promise((resolve, reject) => {

         this.find({ userId: owner })
            .then(result => {
               console.log(result);
               resolve({ data: result })
            })
            .catch(error => {
               reject(error.message)
            })
      })
   }

   static deleteNameCard(id) {
      return new Promise((resolve, reject) => {
         this.deleteOne({ _id: id })
            .then(result => {
               resolve({ data: result, message: "Name card has been deleted" })
            })
            .catch(error => {
               reject(error.message)
            })
      })
   }
}

module.exports = NameCard;