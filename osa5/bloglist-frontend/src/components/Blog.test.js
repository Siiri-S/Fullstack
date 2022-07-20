import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Best mug cakes',
      author: 'Rachel',
      url: 'www.rachh.com',
      user: {
        username: 'rachh'
      }
    }

    const user = {
      username: 'rachh'
    }

    mockHandler = jest.fn()

    container = render(<Blog blog={blog} user={user} likeBlog={mockHandler}/>).container
  })

  test('renders title and author but do not display url and likes by default', () => {
    screen.findByText('Best mug cakes')
    screen.findByText('Rachel')
    const div = container.querySelector('.blogInfo')
    expect(div).toHaveStyle('display: none')
  })

  test('shows url and likes after clicking view button', async () => {
    const usertest = userEvent.setup()
    const button = screen.getByText('view')
    await usertest.click(button)
    const div = container.querySelector('.blogInfo')
    expect(div).toHaveStyle('display: block')
    screen.findByText('likes 2')
    screen.findByText('www.rachh.com')
  })

  test('clicking like button twice calls event handler twice', async () => {

    const usertest = userEvent.setup()
    const likeButton = screen.getByText('like')
    await usertest.click(likeButton)
    await usertest.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })


})





