import { expect } from 'playwright/test';
import { CustomWorld } from '../support/world';
import { createCustomerData } from '../test-data/apiTestData';
import { getAuthToken } from './auth.service';

export async function createCustomer(world: CustomWorld, customerName: string): Promise<void> {
  const response = await world.apiContext.post(`time/customers`, {
    data: JSON.stringify({
      ...createCustomerData,
      name: customerName,
    }),
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(response.ok()).toBeTruthy();
}

export async function getCustomerID(world: CustomWorld, customerName: string): Promise<number> {
  const getResponse = await world.apiContext.get(`time/customers`, {
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect.soft(getResponse.ok()).toBeTruthy();
  const json = await getResponse.json();
  const id = json.data.find((obj: { name: string }) => obj.name === customerName).id;
  return id;
}
//NOTE: deleteCustomer will also delete Project
export async function deleteCustomer(world: CustomWorld, candidateName: string): Promise<void> {
  const id = await getCustomerID(world, candidateName);
  const deleteRespone = await world.apiContext.delete('time/customers', {
    data: { ids: [id] },
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(deleteRespone.ok()).toBeTruthy();
}

export async function getProjectID(world: CustomWorld, projectName: string): Promise<number> {
  const getResponse = await world.apiContext.get(`time/projects`, {
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect.soft(getResponse.ok()).toBeTruthy();
  const json = await getResponse.json();
  console.log('JSON\n', json);
  const id = json.data.find((obj: { name: string }) => obj.name === projectName).id;
  return id;
}

export async function deleteProject(world: CustomWorld, projectName: string): Promise<void> {
  const id = await getProjectID(world, projectName);
  console.log('ID\n', id);
  const deleteRespone = await world.apiContext.delete('time/projects', {
    data: { ids: [id] },
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(deleteRespone.ok()).toBeTruthy();
}
