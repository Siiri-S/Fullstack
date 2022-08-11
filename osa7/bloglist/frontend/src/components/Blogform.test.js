import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('BlogForm calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)


    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Best mug cakes')
    await user.type(authorInput, 'Rachel')
    await user.type(urlInput, 'www.rachh.com')

    await user.click(sendButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Best mug cakes')
    expect(createBlog.mock.calls[0][0].author).toBe('Rachel')
    expect(createBlog.mock.calls[0][0].url).toBe('www.rachh.com')
  })
})