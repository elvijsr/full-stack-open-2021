import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const sortBlogs = (blogs) => {
    return blogs.sort((first, second) => second.likes - first.likes)
  }

  return (
    <div>
      {sortBlogs(blogs).map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </div>

  )

}

export default BlogList