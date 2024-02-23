import $ from 'jquery';

import {
  indexTasks,
  postTask,
  markTaskComplete,
  markTaskActive,
  deleteTask,
} from "./requests.js";

indexTasks(function (response) {

  var htmlString = response.tasks.map(function (task) {
    if (!task.completed) {
      return "<div class='col-12 mb-3 p-2 border rounded task'>" + 
              "<input type='checkbox' data-id='" + task.id + "' />" +
              "<span>" + task.content + "</span>" +
              "<button id='deleteTask' data-id='" + task.id + "' class='btn btn-danger float-right delete'>Delete</button>" +
              "</div>";
    }
    else if (task.completed) {
      return "<div class='col-12 mb-3 p-2 border rounded task'>" + 
              "<input type='checkbox' data-id='" + task.id + "' checked />" +
              "<span>" + task.content + "</span>" +
              "<button id='deleteTask' data-id='" + task.id + "' class='btn btn-danger float-right delete'>Delete</button>" +
              "</div>";
    };
  });

  $("#tasks").html(htmlString);
});

// update task for completed or active by checkbox status
$(document).on('click', 'input[type=checkbox]', function (event) {
  let checkbox = $(event.target);
  if (checkbox.is(':checked')) {
    markTaskComplete(checkbox.attr('data-id'));
  }
  else {
    markTaskActive(checkbox.attr('data-id'));
  }
});