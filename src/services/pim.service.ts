import { pimEmployeeCreate } from '../test-data/apiTestData';
import { CustomWorld } from '../support/world';
import { getAuthToken } from './auth.service';
import { getJobTitileId } from './admin.service';
import { expect } from 'playwright/test';

export async function createEmployee(world: CustomWorld, empName: string): Promise<void> {
  const [first, last] = empName.split(' ');
  const response = await world.apiContext.post('pim/employees', {
    data: JSON.stringify({
      firstName: first,
      lastName: last,
      ...pimEmployeeCreate,
    }),
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(response.ok()).toBeTruthy();
}

export async function mapEmployeeWithJobTitle(
  world: CustomWorld,
  empName: string,
  jobTitle: string
): Promise<void> {
  const id = await getJobTitileId(world, jobTitle);
  const employeeNumber = await getEmployeeNumber(world, empName);
  const response = await world.apiContext.put(`pim/employees/${employeeNumber}/job-details`, {
    data: { joinedDate: null, jobTitleId: id },
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(response.ok()).toBeTruthy();
}

export async function deleteEmployee(world: CustomWorld, empName: string): Promise<void> {
  const empNumber = await getEmployeeNumber(world, empName);
  const response = await world.apiContext.delete('pim/employees', {
    data: { ids: [empNumber] },
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(response.ok()).toBeTruthy();
}

export async function getEmployeeNumber(world: CustomWorld, empName: string): Promise<number> {
  const [first, last] = empName.split(' ');
  const getResponse = await world.apiContext.get(
    `pim/employees?nameOrId=${empName}&includeEmployees=onlyCurrent`,
    {
      headers: {
        Cookie: `orangehrm=${await getAuthToken(world)}`,
      },
    }
  );
  expect.soft(getResponse.ok()).toBeTruthy();
  const json = await getResponse.json();
  const id = json.data.find(
    (obj: { firstName: string; lastName: string }) =>
      obj.firstName === first && obj.lastName === last
  ).empNumber;
  return id;
}
