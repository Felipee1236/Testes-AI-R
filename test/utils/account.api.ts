import type { User } from './user.factory'

interface ApiResponse {
  responseCode: number
  message: string
}

async function callApi(
  method: 'POST' | 'DELETE',
  endpoint: string,
  params: Record<string, string>,
  expectedCode: number,
) {
  const response = await fetch(new URL(`/api/${endpoint}`, process.env.BASE_URL), {
    method,
    body: new URLSearchParams(params),
  })
  if (!response.ok) {
    throw new Error(`${method} /api/${endpoint} respondeu HTTP ${response.status}`)
  }

  const { responseCode, message } = (await response.json()) as ApiResponse
  if (responseCode !== expectedCode) {
    throw new Error(`${method} /api/${endpoint} respondeu ${responseCode}: ${message}`)
  }
}

export async function createAccount(user: User) {
  await callApi(
    'POST',
    'createAccount',
    {
      name: user.name,
      email: user.email,
      password: user.password,
      title: 'Mr',
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address,
      address2: 'Apto 12',
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobile,
    },
    201,
  )
}

export async function deleteAccount(user: User) {
  try {
    await callApi('DELETE', 'deleteAccount', { email: user.email, password: user.password }, 200)
  } catch (error) {
    console.warn(`A conta ${user.email} não foi excluída: ${(error as Error).message}`)
  }
}
