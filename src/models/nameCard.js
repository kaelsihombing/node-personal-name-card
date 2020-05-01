const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nameCardSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },

   email: {
      type: String,
      minlength: 5
   },

   username: {
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
},
   {
      versionKey: false,
      timestamps: true,
   }
)

class NameCard extends mongoose.model('NameCard', nameCardSchema) {
}

module.exports = NameCard;