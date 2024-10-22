//! общие константы
const LIMIT = 10000,
	CURRENCY = 'руб.',
	STATUS_IN_LIMIT = 'все хорошо',
	STATUS_OUT_LIMIT = 'все плохо',
	STATUS_OUT_LIMIT_CLASS_NAME = 'status_red';

//! константы HTML
const inputNode = document.getElementById('js-input'),
	buttonAddNode = document.getElementById('js-btn'),
	limitNode = document.getElementById('js-limit'),
	sumNode = document.getElementById('js-sum'),
	statusNode = document.getElementById('js-status'),
	historyNode = document.getElementById('js-history');

//! массив
const expenses = [];

//! функция инициализации приложения
const init = () => {
	limitNode.textContent = `${LIMIT} ${CURRENCY}`;
	sumNode.textContent = `0 ${CURRENCY}`;
	statusNode.textContent = STATUS_IN_LIMIT;
};

//! функция очищения поля ввода
const clearInput = () => {
	inputNode.value = '';
};

//! функция добавления элементов в массив
const trackExpense = expense => {
	expenses.push(expense);
};

//! функции получения
const getExpenseFromUser = () => {
	if (!inputNode.value) return null;
	const expense = parseInt(inputNode.value);
	return expense;
};
const getHistoryExpense = expenses => {
	let elementListHTML = '';
	expenses.forEach(element => {
		elementListHTML += `
			<li class="history__item">${element} ${CURRENCY}</li>
		`;
	});
	return elementListHTML;
};
const getSumExpenses = expenses => {
	let sum = 0;
	expenses.forEach(element => {
		sum += element;
	});
	return sum;
};
//! функции отрисовки
const renderHistory = expenses => {
	historyNode.innerHTML = getHistoryExpense(expenses);
};
const renderSum = sum => {
	sumNode.innerHTML = `${sum} ${CURRENCY}`;
};
const renderStatus = sum => {
	if (sum <= LIMIT) {
		statusNode.textContent = STATUS_IN_LIMIT;
		statusNode.classList.remove(STATUS_OUT_LIMIT_CLASS_NAME);
	} else {
		statusNode.textContent = STATUS_OUT_LIMIT;
		statusNode.classList.add(STATUS_OUT_LIMIT_CLASS_NAME);
	}
};
const render = expenses => {
	const sum = getSumExpenses(expenses);

	renderHistory(expenses);
	renderSum(sum);
	renderStatus(sum);
};

//! инициализируем приложение
init();

//! действие по клику
buttonAddNode.addEventListener('click', () => {
	//! получаем трату от пользователя
	const expense = getExpenseFromUser();
	//! проверка на пустое поле ввода
	if (!getExpenseFromUser()) return;

	//! добавляем трату в массив
	trackExpense(expense);
	//! очищаем поле ввода
	clearInput();

	//! общая отрисовка приложения
	render(expenses);
});
