const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (likeSum, blog) => {
    return likeSum + blog.likes
  }

  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce(reducer, 0)
  }
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => (prev.likes > current.likes) ? prev : current

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}