class TodoPage {
  // Selectores
elements = {
    todoNewInput: () => cy.get('.new-todo'),
    todoItems: () => cy.get('.todo-list li'),
    todoItemLabel: (itemText) => cy.contains('label', itemText),
        todoEditInput: (itemText) => this.elements.todoItemLabel(itemText).parent().find('[data-testid="text-input"]'),
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

    checkTodo(taskName) {
        this.elements.todocheckItem(taskName).check();
    }

    validateTodoExists(taskName) {
        this.elements.todoItemLabel(taskName).should('exist');
    }

    editarTodo(taskName, newTaskName) {
        this.elements.todoEditInput(taskName).clear().type(`${newTaskName}{enter}`);
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





//    this.web = 'https://www.todomvc.com/examples/react/dist/';
//    this.crearTarea = '.new-todo';
//  this.nombreTarea = '[data-testid="todo-item-label"]';
//  this.editarTarea = '[data-testid="text-input"]';
//    this.eliminarTarea = '[data-testid="todo-item-button"]';
//    this.filtroAll = '[data-testid="footer-navigation"] a:contains("All")';
//    this.filtroActive = '[data-testid="footer-navigation"] a:contains("Active")';
//    this.filtroCompleted = '[data-testid="footer-navigation"] a:contains("Completed")';
//    this.checkBoxTarea = '[data-testid="todo-item-toggle"]';


  


}

export default TodoPage;