import TodoPage from '../../support/pages/todopages';

describe('Gestión de tareas con POM', () => {
  const todoPage = new TodoPage();

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/');
  });

  it('Debe permitir crear una tarea', () => {
    const taskName = 'Aprender Cypress';
    todoPage.addTodo(taskName);
    todoPage.validateTodoExists(taskName);
  });

  it('Debe permitir marcar una tarea como completada', () => {
    const taskName = 'Completar esta tarea';
    todoPage.addTodo(taskName);
    todoPage.checkTodo(taskName);
    todoPage.elements.todocheckItem(taskName).should('be.checked');
  });

  it('Debe permitir descarmar una tarea completada para pasarla a activa', () => {
    const taskName = 'Desmarcar esta tarea';
    todoPage.addTodo(taskName);
    todoPage.checkTodo(taskName);
    todoPage.elements.todocheckItem(taskName).uncheck();
    todoPage.elements.todocheckItem(taskName).should('not.be.checked');
  });

  it('Debe permitir editar el nombre de una tarea', () => {
    const taskName = 'Editar esta tarea';
    todoPage.addTodo(taskName);
    todoPage.editarTodo(taskName, 'Tarea editada');
    todoPage.validateTodoExists('Tarea editada');
  });

  it('Debe permitir borrar una tarea', () => {
    const taskName = 'Eliminar esta tarea';
    todoPage.addTodo(taskName);
    todoPage.deleteTodo(taskName);
    todoPage.elements.todoItems().should('not.exist');
  });

  it('Debe permitir filtrar tareas por estado', () => {
    const taskActive1 = 'Tarea activa 1';
    const taskActive2 = 'Tarea activa 2';
    const taskCompleted = 'Tarea completada';

    todoPage.addTodo(taskActive1);
    todoPage.addTodo(taskActive2);
    todoPage.addTodo(taskCompleted);
    todoPage.checkTodo(taskCompleted);

    todoPage.filtroAll();
    todoPage.elements.todoItems().should('have.length', 3);

    todoPage.filtroActive();
    todoPage.elements.todoItemLabel(taskActive1).should('exist');
    todoPage.elements.todoItemLabel(taskActive2).should('exist');
    todoPage.elements.todoItemLabel(taskCompleted).should('not.exist');

    todoPage.filtroCompleted();
    todoPage.elements.todoItemLabel(taskCompleted).should('exist');
    todoPage.elements.todoItemLabel(taskActive1).should('not.exist');
    todoPage.elements.todoItemLabel(taskActive2).should('not.exist');
  });



});