'use-strict';
const inputBar = document.querySelector('.search--bar');
const todoTabs = document.getElementsByClassName('movements--tab');
const todosContainer = document.querySelector('.movements--container');
const chekcboxes = document.getElementsByClassName('checkbox');
const sortTaskContainer = document.querySelector('.sort--tasks');
let taskNo = 0;
let allTasks;
inputBar.addEventListener('click', function (e) {
  const input = this.querySelector('.search--input');
  const taskEntered = input.value;
  const target = e.target.closest('.checkbox');
  if (!target || !input.value) return;
  target.classList.add('checked');

  const html = `<div class="movements--tab" data-task-no = ${++taskNo}>
          <div class="checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path
                fill="none"
                stroke="#FFF"
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
        // this.classList.remove('hover');
      });
    todosContainer
      .querySelector('#cross--btn')
      .addEventListener('click', function () {
        this.closest('.movements--tab').remove();
      });
  }, 500);
  allTasks = Array.from(document.querySelectorAll('.movements--tab'));
  console.log(allTasks);
});

todosContainer.addEventListener('click', function (e) {
  const target = e.target.closest('.checkbox');
  if (!target) return;
  console.log(this);
  const currentMov = target.closest('.movements--tab');
  // const checkbox = this.querySelector('.checkbox');
  // setTimeout(() => {
  //   todosContainer.append(currentMov);
  // }, 500);
  target.classList.toggle('checked');
  currentMov.classList.toggle('checked');
  currentMov.querySelector('.strike--line').classList.toggle('visible');
  currentMov.querySelector('#cross--btn').classList.toggle('hidden');
  // this.querySelector('.movements--tab').classList.toggle('checked')
});

// todosContainer.closest('').addEventListener('mouseenter', function () {
//   if (!this.querySelector('.movements--tab')) return;
// });
// todosContainer.addEventListener('mouseleave', function () {
//   if (!this.querySelector('.movements--tab')) return;
//   this.querySelector('#cross--btn').classList.remove('hidden');
//   console.log(this.querySelector('#cross--btn'));
// });

const completedTasks = [];
const activeTasks = [];

sortTaskContainer.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('sort--task')) return;

  this.querySelectorAll('.sort--task').forEach(btn => {
    btn.classList.remove('active');
    console.log(btn);
  });

  target.classList.add('active');

  allTasks.forEach(tab => {
    if (tab.classList.contains('checked')) completedTasks.push(tab);
    else activeTasks.push(tab);
  });

  console.log(completedTasks, activeTasks);

  if (target.classList.contains('sort--tasks--completed')) {
    todosContainer.textContent = '';
    completedTasks.forEach(elem => {
      console.log(elem);
      todosContainer.append(elem);
    });
  } else if (target.classList.contains('sort--tasks--active')) {
    todosContainer.textContent = '';
    activeTasks.forEach(elem => {
      todosContainer.append(elem);
    });
  } else {
    allTasks.forEach(elem => {
      todosContainer.append(elem);
    });
  }
});
