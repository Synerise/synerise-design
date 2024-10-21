import { faker } from '@faker-js/faker';

export const companies = new Array(10).fill('').map(() => faker.company.name());

export const fakeData = new Array(50).fill({}).map((v, i) => ({
  id: String(i),
  name: faker.person.fullName(),
  company: companies[Math.floor(Math.random() * 10)],
  transactionValue: faker.finance.amount(),
  transactionType: faker.finance.transactionType(),
}));
