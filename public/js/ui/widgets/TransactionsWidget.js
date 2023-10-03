/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element
      this.registerEvents()
    } else {
      throw new Error('Element is required')
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeBtn = document.querySelector('.create-income-button')
    incomeBtn.addEventListener('click', () => {
      const modalIncome = App.getModal('newIncome')
      if (modalIncome) {
        modalIncome.open()
        const activeAccount = document.querySelector('.active')
        if (activeAccount) {
          document.getElementById('income-accounts-list')
              .value = activeAccount.getAttribute('data-id')
        }

      }
    })

    const expenseBtn = document.querySelector('.create-expense-button')
    expenseBtn.addEventListener('click', () => {
    const modalExpense = App.getModal('newExpense')
      if (modalExpense) {
        modalExpense.open()
        const activeAccount = document.querySelector('.active')
        if (activeAccount) {
          document.getElementById('expense-accounts-list')
              .value = activeAccount.getAttribute('data-id')
        }
        }
    })
  }

}
