import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const setTarget = jest.fn()
  const component = render(
    <AddBlogForm addBlog={addBlog} setNewTitle={setTarget} setNewAuthor={setTarget} setNewUrl={setTarget}/>
  )

  const titleInput = component.container.querySelector('input[name="Title"]')
  const authorInput = component.container.querySelector('input[name="Author"]')
  const urlInput = component.container.querySelector('input[name="Url"]')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target : { value: 'testTitle' } })
  fireEvent.change(authorInput, { target : { value: 'testAuthor' } })
  fireEvent.change(urlInput, { target : { value: 'www.testUrl.com' } })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(setTarget.mock.calls).toHaveLength(3)
})