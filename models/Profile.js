const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
   user: {
     type: Schema.Types.ObjectId,
     ref: 'users'
   },
   displaypic: {
     type: String
   },
   location: {
     latitude: {
       type: Number
     },
     longitude: {
       type: Number
     }
   },
   contact: {
     type: String,
     required: true
   },
   handle: {
     type: String,
     required: true,
     max: 40
   },
   role: {
     type: String
   },
   status: {
    type: String
   },
   skills: {
     type: [String],
     required: true
   },
   bio: {
     type: String
   },
   experience: [
     {
       title:{
        type: String,
        required: true
       },
       company: {
        type: String,
        required: true
       },
       location: {
        type: String,
       },
       from: {
        type: Date,
        required: true
       },
       to: {
        type: Date
       },
       current: {
         type: Boolean,
         default: false
       },
       description: {
         type: String
       }
     }
   ],
   music: [
     {
       title:{
        type: String,
        required: true
       },
       sound:{
         type: String
       }
     }
   ],
   education: [
     {
       college:{
        type: String,
        required: true
       },
       degree: {
        type: String,
        required: true
       },
       field: {
        type: String,
        required: true
       },
       from: {
        type: Date,
        required: true
       },
       to: {
        type: Date
       },
       current: {
         type: Boolean,
         default: false
       },
       description: {
         type: String
       }
     }
   ],
  social: {
    youtube: {
       type: String
     },
     twitter: {
       type: String
     },
     facebook: {
       type: String
     },
     instagram: {
       type: String
     },
    },
   date: {
     type: Date,
     default: Date.now
   }
});


module.exports = Profile = mongoose.model('profiles', ProfileSchema);