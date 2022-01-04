/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/testing/reset',
      failOnStatusCode: false,
    });
    const user = {
      username: 'luongkill1234567890',
      password: 'luong12345',
    };
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/users/',
      body: user,
      failOnStatusCode: false,
    }).then((response) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body));
      cy.visit('http://localhost:3000');
    });
  });

  it('Login', function () {
    cy.contains('login').click();
    cy.get('#username').type('luongkill1234567890');
    cy.get('#password').type('luong12345');
    cy.get('#login-button').click();
    cy.contains('luongkill1234567890 logged in');
  });

  describe('when logged in ', function () {
    beforeEach(function () {
      cy.login({ username: 'luongkill1234567890', password: 'luong12345' });
    });
    it('Create new blog', function () {
      cy.contains('Create new blog').click();
      //   cy.get('#title').type('a note created by cypress');
      //   cy.get('#author').type('author created by cypress');
      //   cy.get('#url').type('https://www.youtube.com/watch?v=fI9FM_unXaE');
      //   cy.get('#likes').type('111');
      //   cy.contains('add').click();
      //   cy.contains('new note added');
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'author created by cypress',
        url: 'https://www.youtube.com/watch?v=fI9FM_unXaE',
        like: '111',
      });
    });

    describe('and a blog exists', function () {
      describe('and several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'add 1',
            author: 'author cypress',
            url: 'https://www.youtube.com/watch?v=fI9FM_unXaE',
            like: 222,
          });
          cy.createBlog({
            title: 'add 2',
            author: 'author cypress',
            url: 'https://www.youtube.com/watch?v=fI9FM_unXaE',
            like: 222,
          });
        });

        it.only('one of those can be click like', function () {
          cy.contains('add 1').parent().find('button').as('theButton');
          cy.get('@theButton').first().click();
          cy.contains('add 1').parent().find('button').as('likeButon');
          //cy.get('@likeButon').contains('like').click();
        });
      });
    });
  });
});

describe('log out and create new user', function () {
  beforeEach(function () {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/testing/reset',
      failOnStatusCode: false,
    });
    const user = {
      username: 'luongkill123456789012',
      password: 'luong12345',
    };
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/users/',
      body: user,
      failOnStatusCode: false,
    });
    cy.visit('http://localhost:3000');
  });
  describe('when luongkill123456789012 login', function () {
    beforeEach(function () {
      cy.login({ username: 'cuccut', password: 'anhhaibede1994' });
    });
    it('a new note can be created by luongkill123456789012', function () {
      cy.contains('Create new blog').click();
      cy.createBlog({
        title: 'a blog created by luongkill123456789012',
        author: 'author created by luongkill123456789012',
        url: 'https://www.youtube.com/watch?v=fI9FM_unXaE',
        like: '111',
      });
      cy.contains('a blog created by luongkill123456789012');
    });
    it('user can delete their blogs', function () {
      cy.contains('a blog created by luongkill123456789012')
        .parent()
        .find('button')
        .as('theButton');
      cy.get('@theButton').contains('view').click();
      cy.get('@theButton').contains('remove').click();
    });
    it('user cannot delete their blogs', function () {
      cy.contains('a blog created by cypress')
        .parent()
        .find('button')
        .as('theButton');
      cy.get('@theButton').contains('view').click();
      cy.get('@theButton').contains('remove').should('not.visible');
    });
  });
});
