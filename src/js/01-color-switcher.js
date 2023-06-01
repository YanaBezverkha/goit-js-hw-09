const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

startBtnEl.addEventListener('click', onStart);
stopBtnEl.setAttribute('disabled', 'true');

function onStart() {
  changeBgc();
  changeActiveBtn(stopBtnEl, startBtnEl);
  const change = setInterval(changeBgc, 1000);

  stopBtnEl.addEventListener('click', onStop);
  function onStop() {
    clearInterval(change);
    changeActiveBtn(startBtnEl, stopBtnEl);
  }
}

function changeActiveBtn(active, inactive) {
  active.removeAttribute('disabled');
  inactive.setAttribute('disabled', 'true');
}

function changeBgc() {
  const bodyEl = document.body;
  bodyEl.style.backgroundColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
