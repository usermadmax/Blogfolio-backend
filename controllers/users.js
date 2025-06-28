const userRouter=require('express').Router()
const bcrypt=require('bcryptjs')
const User=require('../models/user')

userRouter.post('/',async (req,res)=>{
    const {username,name,password}=req.body
    if(!password || password.length < 3)
    {
         return res.status(400).json({
      error: 'Password must be at least 3 characters long',
    })
    }
     const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, shortDescription: 1,
    createdAt: 1, })
  response.json(users)
})
module.exports = userRouter