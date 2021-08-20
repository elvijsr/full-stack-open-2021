import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const mockHandler = jest.fn()

  const blog = {
    likes: 1,
    title: 'A new Blog for Life',
    author: 'Jogn Hope',
    url: 'http://vobla.lv',
    user: { username: 'cigan' }
  }

  const user = {
    username: 'cigan',
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler}/>
    )
  })

  test('renders content', () => {

    expect(component.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    )

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })


  test('clicking the button opens additional info', () => {

    const button = component.getByText('view')
    fireEvent.click(button)


    expect(component.container).toHaveTextContent(
      `likes ${blog.likes}`
    )

    expect(component.container).toHaveTextContent(
      `${blog.url}`
    )

  })

  test('like button function called 2 times after clicking twice', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
