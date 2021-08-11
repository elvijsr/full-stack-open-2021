const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier property of the blog posts is named id', async () => {
  const blogs = await helper.blogsInDb()

  blogs.forEach(blog => {
    return expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog =   {
    id: '5a422a851b54a676234d17a1',
    title: 'New blog',
    author: 'John Deere',
    url: 'https://google.com/',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'New blog'
  )
})

test('blog without likes property defaults to 0 likes', async () => {

  await api
    .post('/api/blogs')
    .send(helper.blogWithoutLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const filtered = blogsAtEnd.filter(blog => blog.id === helper.blogWithoutLikes._id)
  expect(filtered[0].likes).toBe(0)
})

test('adding blog without title and url returns 400', async () => {

  await api
    .post('/api/blogs')
    .send(helper.blogWithoutTitleAndUrl)
    .expect(400)
})

test('deleting blog returns 204 and  total blog count reduces by 1', async () => {

  await api
    .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('a blog info can be updated', async () => {
  const updatedBlog =   {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10,
  }

  await api
    .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const filtered = blogsAtEnd.filter(blog => blog.id === helper.initialBlogs[0]._id)
  expect(filtered[0].likes).toBe(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})