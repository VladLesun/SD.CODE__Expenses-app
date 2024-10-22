//! общие константы
const CURRENCY = 'руб.',
	STATUS_IN_LIMIT = 'все хорошо',
	STATUS_OUT_LIMIT = 'все плохо',
	STATUS_OUT_LIMIT_CLASS_NAME = 'status_red',
	POPUP_OPENED_CLASS_NAME = 'popup_open',
	BODY_FIXED_CLASS_NAME = 'body_fixed';

let LIMIT = 10000;

//! константы HTML
const inputNode = document.getElementById('js-input'),
	selectNode = document.getElementById('js-select'),
	buttonAddNode = document.getElementById('js-btn'),
	limitNode = document.getElementById('js-limit'),
	sumNode = document.getElementById('js-sum'),
	statusNode = document.getElementById('js-status'),
	historyNode = document.getElementById('js-history'),
	changeLimitBtn = document.getElementById('js-change-limit'),
	resetExpensesBtn = document.getElementById('js-reset-expenses');

//! popup константы
const popupNode = document.getElementById('js-popup'),
	popupContentNode = document.getElementById('js-popup-content'),
	popupInputNode = document.getElementById('js-popup-input'),
	popupLimitNode = document.getElementById('js-popup-limit'),
	popupCloseNode = document.getElementById('js-popup-close'),
	bodyNode = document.getElementById('js-body');

//! массив
let expenses = [];

//! функция инициализации приложения
const init = () => {
	limitNode.textContent = `${LIMIT} ${CURRENCY}`;
	sumNode.textContent = `0 ${CURRENCY}`;
	statusNode.textContent = STATUS_IN_LIMIT;
};

//! функция закрытия/закрытия popup's
const popupToggle = () => {
	popupNode.classList.toggle(POPUP_OPENED_CLASS_NAME);
	bodyNode.classList.toggle(BODY_FIXED_CLASS_NAME);
};

//! функция очищения поля ввода
const clearInput = input => {
	input.value = '';
};

//! функция изменения лимита
const changeLimit = newLimit => {
	LIMIT = newLimit;
};

//! функция добавления элементов в массив
const trackExpense = ({ expenseCount, expenseCategory }) => {
	const expense = {
		count: expenseCount,
		category: expenseCategory,
	};
	expenses.push(expense);
};

//! функции получения
const getExpenseFromUser = () => {
	if (!inputNode.value) return null;
	const expenseCount = parseInt(inputNode.value),
		expenseCategory = selectNode.value;
	return { expenseCount, expenseCategory };
};
const getNewLimitFromUser = () => {
	if (!popupInputNode.value) return null;
	const inputLimit = parseInt(popupInputNode.value);
	return inputLimit;
};
const getHistoryExpense = expenses => {
	let elementListHTML = '';
	expenses.forEach(element => {
		elementListHTML += `
			<li class="history__item">${element.count} ${CURRENCY} - ${element.category}</li>
		`;
	});
	return elementListHTML;
};
const getSumExpenses = expenses => {
	let sum = 0;
	expenses.forEach(element => {
		sum += element.count;
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
		statusNode.textContent = `${STATUS_OUT_LIMIT} (${
			LIMIT - getSumExpenses(expenses)
		} ${CURRENCY})`;
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

//! действия по клику
//! 1. Добавление расходов
buttonAddNode.addEventListener('click', () => {
	//! получаем трату от пользователя
	const expense = getExpenseFromUser();
	//! проверка на пустое поле ввода
	if (!getExpenseFromUser()) return;

	//! добавляем трату в массив
	trackExpense(expense);
	//! очищаем поле ввода
	clearInput(inputNode);

	//! общая отрисовка приложения
	render(expenses);
});
//! 2. Сброс истории расходов
resetExpensesBtn.addEventListener('click', () => {
	expenses = [];
	render(expenses);
});
//! 3. Открыть/закрыть popup
changeLimitBtn.addEventListener('click', popupToggle);
popupCloseNode.addEventListener('click', popupToggle);
popupNode.addEventListener('click', event => {
	const isClickOutsideContent = !event
		.composedPath()
		.includes(popupContentNode);

	if (isClickOutsideContent) popupToggle();
});
//! 4. Изменение лимита
popupLimitNode.addEventListener('click', e => {
	e.preventDefault();
	if (!getNewLimitFromUser()) return;
	const newLimit = getNewLimitFromUser();

	changeLimit(newLimit);

	clearInput(popupInputNode);

	popupToggle();
	init();
	render(expenses);
});
