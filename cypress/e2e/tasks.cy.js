describe('tarefas', () => {

  context('Cadastro', () => {

    it('Deve cadastrar uma tarefa', () => {

      const taskText = 'Ir a academia!'

      cy.deleteTask(taskText)

      cy.createTask(taskText)
      cy.contains('main div p', taskText)
    })

    it('Não deve permitir uma tarefa duplicada', () => {

      const task = {
        name: 'Ler algumas páginas de um livro',
        is_done: false
      }

      cy.deleteTask(task.name)
      cy.postTask(task)
      cy.createTask(task.name)

      cy.get('#swal2-html-container')
        .should('be.visible').should('have.text','Task already exists!')
    })

    it('Campo obrigatório', ()=>{
      cy.createTask()
      cy.isRequired('This is a required field')
    })

  })

  context('Atualização', () => {

    it('Deve concluir uma tarefa', () => {
      const task = {
        name: 'Ler algumas páginas de um livro',
        is_done: false
      }

      cy.deleteTask(task.name)
      cy.postTask(task)

      cy.visit('http://localhost:8080')
      cy.contains('p',task.name)
        .parent().find('button[class*=listItemToggle]').click()

        cy.contains('p',task.name)
          .should('have.css', 'text-decoration-line', 'line-through')

    })
  })

  context('Exclusão', () => {

    it('Deve excluir uma tarefa', () => {
      const task = {
        name: 'Fazer prancha',
        is_done: false
      }

      // cy.deleteTask(task.name)
      cy.postTask(task)

      cy.visit('http://localhost:8080')
      cy.contains('p',task.name)
        .parent().find('button[class*=listItemDelete]').click()

        cy.contains('p',task.name)
          .should('not.exist')

    })
  })
})