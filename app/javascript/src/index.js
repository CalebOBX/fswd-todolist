import $ from 'jquery';

import {
  indexTasks,
  postTask,
  markTaskComplete,
  markTaskActive,
  deleteTask,
} from "./requests.js";

function renderTasks() {
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function (task) {
      if (!task.completed) {
        return "<div class='col-12 mb-3 p-0 task d-flex justify-content-between'>" + 
                "<div class='flex-grow-1'><input type='checkbox' class='btn-check' id='" + task.id + "' data-id='" + task.id + "' autocomplete='off' />" +
                "<label class='btn btn-outline-dark w-100 h-100' for='" + task.id + "'>" + task.content + "</label></div>" +
                "<div class='bg-danger'><button id='deleteTask' data-id='" + task.id + "' class='btn btn-danger float-end delete'>Delete</button></div>" +
                "</div>";
      }
      else if (task.completed) {
        return "<div class='col-12 mb-3 p-0 task d-flex justify-content-between'>" + 
                "<div class='flex-grow-1'><input type='checkbox' class='btn-check' id='" + task.id + "' data-id='" + task.id + "' checked autocomplete='off' />" +
                "<label class='btn btn-success text-decoration-line-through w-100 h-100' for='" + task.id + "'>" + task.content + "</label></div>" +
                "<div class='bg-danger'><button id='deleteTask' data-id='" + task.id + "' class='btn btn-danger float-end delete'>Delete</button></div>" +
                "</div>";
      };
    });
    $("#tasks").html(htmlString);
  });
}

$(() => {
  // update task for completed or active by checkbox status
  $(document).on('click', 'input[type=checkbox]', function (event) {
    let checkbox = $(event.target);
    if (checkbox.is(':checked')) {
      markTaskComplete(checkbox.attr('data-id'));
    }
    else {
      markTaskActive(checkbox.attr('data-id'));
    }
    renderTasks();
  });
  
  // create a new task
  $(document).on('submit', '#newTaskForm', function (event) {
    event.preventDefault();
    postTask($('#taskName').val());
    renderTasks();
  });
  
  // delete a task
  $(document).on('click', '#deleteTask', function (event) {
    let button = $(event.target);
    deleteTask(button.attr('data-id'));
    renderTasks();
  });

  renderTasks();
});
