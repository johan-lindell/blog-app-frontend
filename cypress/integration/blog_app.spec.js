describe('blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Johan Lindell',
      username: 'johanlindell',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('johanlindell')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Johan Lindell logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('johanlindell')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.get('.errorMessage')
        .contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'johanlindell', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('my blog')
      cy.get('input[name="Author"]').type('Johan Lindell')
      cy.get('input[name="Url"]').type('www.myblog.com')
      cy.get('#submit-blog-button').click()

      cy.contains('my blog Johan Lindell')
    })
  })

  describe('when a blog is added', function() {
    beforeEach(function() {
      cy.login({ username: 'johanlindell', password: 'salasana' })
      cy.addBlog({
        title: 'my blog',
        author: 'Johan Lindell',
        url: 'www.blog.com',
        likes: 0
      })
    })
    it('a blog can be liked', function() {
      cy.contains('view').click()
      cy.get('#like-button').click()

      cy.contains('Likes: 0')
    })

    it('a blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.should('not.contain', 'my blog Johan Lindell')
    })
  })

  describe.only('when multiple blogs are added', function() {
    beforeEach(function() {
      cy.login({ username: 'johanlindell', password: 'salasana' })
      cy.addBlog({
        title: 'blog with 3 likes',
        author: 'Johan Lindell',
        url: 'www.blog.com',
        likes: 3
      })
      cy.addBlog({
        title: 'blog with 1 likes',
        author: 'Johan Lindell',
        url: 'www.blog.com',
        likes: 1
      })
      cy.addBlog({
        title: 'blog with 2 likes',
        author: 'Johan Lindell',
        url: 'www.blog.com',
        likes: 2
      })
    })

    it('blogs are ordered from most to least likes', function() {
      cy.get('#blogLikes').then(likes => {
        cy.wrap(likes[0]).contains('3')
        cy.wrap(likes[1]).contains('2')
        cy.wrap(likes[2]).contains('1')
      })
    })
  })
})