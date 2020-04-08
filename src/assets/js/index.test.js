import Card from './index'

const card = new Card({});

const paymentMir = {
  name: 'mir',
  pattern: /^22\d*$/,
  codeName: 'CVC'
}

test('card payments', () => {
  expect(card.payments[0]).toEqual(paymentMir)
  expect(card.payments).toHaveLength(4)
})

test('card bins', () => {
  expect(card.binsCheck('427403')).toBe('sberbank')
  expect(card.binsCheck('220030')).toBe('raiffeisen')
  expect(card.binsCheck('526532')).toBe('vtb')
  expect(card.binsCheck('524468')).toBe('tinkoff')
  expect(card.binsCheck('469395')).toBe('qiwi')
  expect(card.binsCheck('123456')).toBe('default')
  expect(card.binsCheck('')).toBe('default')
})

test('payment validate', () => {
  card.numberValidate = "2244222"
  expect(card.paymentValidate()).toEqual(paymentMir)
  expect(card.paymentValidate().name).toBe('mir')
  expect(card.paymentValidate().codeName).toBe('CVC')
})

test('bank should be sberbank', () => {
  card.numberValidate = "2244222"
  expect(card.banks.sberbank.text).toBe('Сбербанк')
  expect(card.banks.sberbank.url).toBe('https://sberbank.ru')
})