/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsList = this.element.querySelector(".accounts-select")
    const user = User.current()
    if(user) {
      Account.list(user, (err, response) => {
        if (response && response.data) {
          accountsList.innerHTML = response.data.reduce((totalList, item) => {
            return totalList + `<option value="${item.id}">${item.name}</option>`
          }, '')
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log('CRTr_data', data)
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        App.getModal("newIncome").close()
        App.getModal("newExpense").close()
        const account = document.querySelector(`[data-id="${data.account_id}"]`)
        console.log("account", account)

        this.element.reset()
        // App.update()
        App.updateWidgets()
        App.updatePages()
        App.updateForms()

        if (account) {
          console.log("account", account)
          account.classList.add('active')
          console.log('account.classList', account.classList)
        }
      }
    })
  }
}