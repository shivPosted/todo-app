'use-strict';
const inputBar = document.querySelector('.search--bar');
const todoTabs = document.getElementsByClassName('movements--tab');
const todosContainer = document.querySelector('.movements--container');
const chekcboxes = document.getElementsByClassName('checkbox');
const sortTaskContainer = document.querySelector('.sort--tasks');
const closeCompleteTask = document.querySelector('.close--completed');
const labelItemsLeft = document.querySelector('.items--left');
const colorModeToggle = document.querySelector('.app--name--div img');

let taskNo = 0;
let allTasks = [];
let completedTasks = [];
let activeTasks = [];
let noOfCompletedTasks = 0;
let isDarkModeOn = false;

let noTasksText = `<div class="no--tasks--found">No tasks found</div>`;

const displayMov = function (completed = false, active = false) {
  todosContainer.textContent = '';

  if (completed) {
    if (completedTasks.length === 0) {
      todosContainer.insertAdjacentHTML('afterbegin', noTasksText);
      return;
    }
    completedTasks.forEach(elem => {
      todosContainer.append(elem);
    });
  } else if (active) {
    if (activeTasks.length === 0) {
      todosContainer.insertAdjacentHTML('afterbegin', noTasksText);
      return;
    }
    activeTasks.forEach(elem => {
      todosContainer.append(elem);
    });
  } else {
    if (allTasks.length === 0) {
      todosContainer.insertAdjacentHTML('afterbegin', noTasksText);
      return;
    }
    allTasks.forEach(elem => {
      todosContainer.append(elem);
    });
  }
};
const handleTasksArr = function () {
  completedTasks = [];
  activeTasks = [];
  allTasks.forEach(tab => {
    if (tab.classList.contains('checked')) completedTasks.push(tab);
    else activeTasks.push(tab);
  });
};

inputBar.addEventListener('click', function (e) {
  const input = this.querySelector('.search--input');
  const taskEntered = input.value;
  const target = e.target.closest('.checkbox');
  if (!target || !input.value) return;
  target.classList.add('checked');

  const html = `<div class="movements--tab" data-task-no = ${++taskNo}>
          <div class="checkbox ">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path
                fill="none"
                stroke= ${isDarkModeOn ? 'hsl(235, 19%, 35%)' : '#fff'}
                stroke-width="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </div>
          <div class="task--info">
            ${taskEntered}
            <div class="strike--line"></div>
          </div>
          <img src="/images/icon-cross.svg" alt="" id="cross--btn" class= "hidden" />
        </div>`;

  setTimeout(() => {
    target.classList.remove('checked');
    todosContainer.insertAdjacentHTML('afterbegin', html);

    allTasks.push(document.querySelector('.movements--tab'));

    labelItemsLeft.textContent = +labelItemsLeft.textContent + 1;

    input.value = '';
    todosContainer
      .querySelector('.movements--tab')
      .addEventListener('mouseenter', function () {
        this.querySelector('#cross--btn').classList.remove('hidden');
        // this.classList.add('hover');
      });
    todosContainer
      .querySelector('.movements--tab')
      .addEventListener('mouseleave', function () {
        this.querySelector('#cross--btn').classList.add('hidden');
      });
    todosContainer
      .querySelector('#cross--btn')
      .addEventListener('click', function () {
        const elem = this.closest('.movements--tab');
        const index = allTasks.findIndex(
          el => el.dataset.taskNo === elem.dataset.taskNo
        );
        allTasks.splice(index, index + 1);
        elem.remove();
        labelItemsLeft.textContent = +labelItemsLeft.textContent - 1;
      });
  }, 500);
});

todosContainer.addEventListener('click', function (e) {
  const target = e.target.closest('.checkbox');
  if (!target) return;
  console.log(this);
  const currentMov = target.closest('.movements--tab');

  target.classList.toggle('checked');

  if (target.classList.contains('checked'))
    labelItemsLeft.textContent = +labelItemsLeft.textContent - 1;
  else labelItemsLeft.textContent = +labelItemsLeft.textContent + 1;
  currentMov.classList.toggle('checked');
  currentMov.querySelector('.strike--line').classList.toggle('visible');
  currentMov.querySelector('#cross--btn').classList.toggle('hidden');
});

sortTaskContainer.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('sort--task')) return;

  this.querySelectorAll('.sort--task').forEach(btn => {
    btn.classList.remove('active');
  });

  target.classList.add('active');

  handleTasksArr();

  if (target.classList.contains('sort--tasks--completed')) {
    displayMov(true);
  } else if (target.classList.contains('sort--tasks--active')) {
    displayMov(undefined, true, undefined);
  } else displayMov(undefined, undefined, true);
});

closeCompleteTask.addEventListener('click', function () {
  //activetasks.length = remain
  const filteredTasks = allTasks.filter(
    elem => !elem.classList.contains('checked')
  );

  allTasks = [];
  filteredTasks.forEach(elem => allTasks.push(elem));
  sortTaskContainer.querySelector('.sort--tasks--all').classList.add('active');
  handleTasksArr();
  displayMov();
  // labelItemsLeft.textContent = activeTasks.length;
});

const handleCheckboxColor = function () {
  if (chekcboxes.length > 1)
    [...chekcboxes].forEach(elem =>
      elem
        .querySelector('path')
        .setAttribute('stroke', isDarkModeOn ? 'hsl(235, 19%, 35%)' : '#fff')
    );
};

colorModeToggle.addEventListener('click', function (e) {
  isDarkModeOn = !isDarkModeOn;
  document.body.classList.toggle('dark');
  todosContainer.classList.toggle('dark');
  sortTaskContainer.closest('.tasks--manager').classList.toggle('dark');
  closeCompleteTask.classList.toggle('dark');
  sortTaskContainer.classList.toggle('dark');
  inputBar.classList.toggle('dark');
  handleCheckboxColor();
  isDarkModeOn
    ? inputBar
        .querySelector('.checkbox path')
        .setAttribute('stroke', 'hsl(235, 24%, 19%)')
    : inputBar.querySelector('.checkbox path').setAttribute('stroke', '#fff');
  inputBar.querySelector('.search--input').classList.toggle('dark');
  document.querySelector('header').classList.toggle('dark');
});
