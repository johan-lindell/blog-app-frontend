import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog component test', () => {
  const user = {
    username: 'testing user',
    name: 'Johan Lindell',
    id: 'testid'
  }

  const blog = {
    title: 'jest test',
    author: 'tester man',
    likes: 0,
    url: 'testingurl',
    user: user
  }
  let component
  const likeMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={likeMockHandler} deleteBlog={deleteMockHandler} userId={user.id}/>
    )
  })


  test('initially renders only title and author', () => {
    const div = component.container.querySelector('.extraInfo')

    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )

    expect(div).toHaveStyle('display: none')
  })

  test('when viewv is pressed displays url, likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.extraInfo')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      `${blog.url} Likes: ${blog.likes}`
    )
  })

  test('clicking like twice calls event handler twice', async () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeMockHandler.mock.calls.length).toBe(2)
  })
})