export interface User {
  name: string
  email: string
  password: string
  birthDay: string
  birthMonth: string
  birthYear: string
  firstName: string
  lastName: string
  company: string
  address: string
  country: string
  state: string
  city: string
  zipcode: string
  mobile: string
}

export function createUser(): User {
  const id = Date.now()

  return {
    name: `QA ${id}`,
    email: `qa_${id}@teste.com`,
    password: `Senha@${id}`,
    birthDay: '10',
    birthMonth: 'May',
    birthYear: '1998',
    firstName: 'Felipe',
    lastName: 'Teste',
    company: 'QA Company',
    address: 'Rua das Flores, 100',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V 2T6',
    mobile: '11999999999',
  }
}