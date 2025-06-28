const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true // this ensures the uniqueness of username
          },
          name: String,
          passwordHash: {
            type:String,
            required:true
          },  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NewBlog'
    }
  ]
          
    },
    { collection: 'blogUsers' }
)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // do not reveal password hash
  },
})
module.exports = mongoose.model('BlogUser', userSchema)