const blogRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')
const { tokenExtractor, userExtractor } = require('../utils/middleware')


blogRouter.get('/',async (req,res)=>{
   const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(blogs)
})




blogRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
  const { title, author, shortDescription, fullDescription } = req.body
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title,
    author,
   shortDescription, 
   fullDescription,
    user: user._id // 👈 assign user from token
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
//  const populatedBlog = await savedBlog.populate('user', {
//     username: 1,
//     name: 1,
//   });

//   res.status(201).json(populatedBlog);
  res.status(201).json(savedBlog)
})
blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  // Check if the user owns the blog
  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'unauthorized: not the blog creator' })
  }

  // ✅ Remove blog reference from the user's blogs array
  await User.findByIdAndUpdate(blog.user, {
    $pull: { blogs: blog._id }
  })

  // ✅ Delete the blog
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

// update

blogRouter.put('/:id', async (request, response) => {
  const { title, author, shortDescription, fullDescription, user } = request.body

  const updatedBlog = {
    title,
    author,
  shortDescription, 
  fullDescription,
    user, // Should be user ID (String)
  }

  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', {
    username: 1,
    name: 1
  })

  if (!result) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(result)
})

module.exports = blogRouter