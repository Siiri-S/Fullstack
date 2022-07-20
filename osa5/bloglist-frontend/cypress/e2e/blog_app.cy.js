describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'nipsutin',
      name: 'Nipsu',
      password: '1q2w3e'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.contains('login')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('nipsutin')
      cy.get('#password').type('1q2w3e')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('logout').click()
      cy.contains('login').click()
      cy.get('#username').type('nipsutin')
      cy.get('#password').type('tonnikalaonparasta')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'nipsutin', password:'1q2w3e' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Best mug cakes')
      cy.get('#author-input').type('Rachel')
      cy.get('#url-input').type('www.rachh.com')
      cy.get('#create-button').click()
      cy.contains('a new blog Best mug cakes by Rachel added')
      cy.contains('Best mug cakes')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'a blog to be liked', author: 'Nipsu', url: 'www.nipsutin.fi' })
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.createBlog({ title: 'a blog to be removed', author: 'Nipsu', url: 'www.nipsutin.fi' })
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.get('.blog').should('not.exist')
    })

  })

  describe('When logged in with different user', function() {
    beforeEach(function() {
      cy.login({ username:'nipsutin', password:'1q2w3e' })
      cy.createBlog({ title: 'a blog to be removed', author: 'Nipsu', url: 'www.nipsutin.fi' })
      cy.contains('logout').click()
      const user = {
        username: 'testi',
        name: 'Testi',
        password: '1q2w3e'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username:'testi', password:'1q2w3e' })
    })

    it('A blog cannot be removed', function() {
      cy.get('#view-button').click()
      cy.get('#remove-button').should('not.exist')
    })
  })

  describe('When there are multiple blogs', function() {
    beforeEach(function() {
      cy.login({ username:'nipsutin', password:'1q2w3e' })
    })
    it('they are in correct order', function() {
      cy.createBlog({ title: 'a blog with 2 likes', author: 'Nipsu', url: 'www.nipsutin.fi' })
      cy.createBlog({ title: 'a blog with 5 likes', author: 'Nipsu', url: 'www.nipsutin.fi' })
      cy.createBlog({ title: 'a blog with 3 likes', author: 'Nipsu', url: 'www.nipsutin.fi' })
      cy.get('.viewButton').eq(0).click()
      cy.get('.likeButton').eq(0).click().click()

      cy.get('.viewButton').eq(1).click()
      cy.get('.likeButton').eq(1).click().click().click().click().click()

      cy.get('.viewButton').eq(2).click()
      cy.get('.likeButton').eq(2).click().click().click()

      cy.get('.blog').eq(0).should('contain', 'a blog with 5 likes')
      cy.get('.blog').eq(1).should('contain', 'a blog with 3 likes')
      cy.get('.blog').eq(2).should('contain', 'a blog with 2 likes')
    })
  })


})




