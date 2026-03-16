class TodoPage {
  // Selectores
elements = {
    todoNewInput: () => cy.get('.new-todo'),
    todoItems: () => cy.get('.todo-list li'),
    todoItemLabel: (itemText) => cy.contains('[data-testid="todo-item-label"]', itemText),
    todoItemByLabel: (itemText) => this.elements.todoItemLabel(itemText).closest('[data-testid="todo-item"]'),
    todoFirstItem: () => cy.get('[data-testid="todo-item"]').first(),
    todoEditInput: () => this.elements.todoFirstItem().find('[data-testid="text-input"]'),
    todocheckItem: (itemText) => this.elements.todoItemLabel(itemText).parent().find('[data-testid="todo-item-toggle"]'),
    deleteButton: (itemText) => this.elements.todoItemLabel(itemText).parent().find('button.destroy'),
    filtroAll: () => cy.contains('.filters a', 'All'),
    filtroActive: () => cy.contains('.filters a', 'Active'),
    filtroCompleted: () => cy.contains('.filters a', 'Completed'),

  };
    
    // Métodos
    addTodo(taskName) {
        this.elements.todoNewInput().type(`${taskName}{enter}`);
    }

    addTodos(taskNames) {
        taskNames.forEach((taskName) => {
            this.addTodo(taskName);
        });
    }

    checkTodo(taskName) {
        this.elements.todocheckItem(taskName).check();
    }

    validateTodoExists(taskName) {
        this.elements.todoItemLabel(taskName).should('exist');
    }

    editarTodo(taskName, newTaskName) {
        this.elements.todoItemLabel(taskName)
            .dblclick();

        this.elements.todoEditInput()
            .should('be.visible')
            .should('have.value', taskName)
            .clear({ force: true })
            .type(`${newTaskName}{enter}`, { force: true });
    }

    deleteTodo(taskName) {
        this.elements.deleteButton(taskName).click({ force: true });
    }

    filtroAll() {
        this.elements.filtroAll().click();
    }

    filtroActive() {
        this.elements.filtroActive().click();
    }

    filtroCompleted() {
        this.elements.filtroCompleted().click();
    }


}

export default TodoPage;