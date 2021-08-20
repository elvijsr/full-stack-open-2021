describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Testo Userinnen',
      username: 'testo',
      password: 'password1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testo')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()

      cy.contains('Testo Userinnen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testo')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testo', password: 'password1' })
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('A new cool blog')
      cy.get('#author-input').type('John Cena')
      cy.get('#url-input').type('https://google.lv')
      cy.contains('save').click()
      cy.contains('A new cool blog')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Test Blog', author: 'Mister Proper', url: 'http://go.lv', likes: 10 })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Test Blog').should('not.exist')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Test Blog least', author: 'Mister Proper', url: 'http://go.lv', likes: 8 })
        cy.createBlog({ title: 'Test Blog', author: 'Mister Proper', url: 'http://go.lv', likes: 9 })
        cy.createBlog({ title: 'Test Blog most', author: 'Mister Proper', url: 'http://go.lv', likes: 10 })
      })

      it('they are ordered with most likes first', function () {
        cy.get('.blog:first').contains('likes 10')
        cy.get('.blog:last').contains('likes 8')
      })

    })

  })
})