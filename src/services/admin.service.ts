import { adminJobTitleCreate } from '../test-data/apiTestData';
import { CustomWorld } from '../support/world';
import { getAuthToken } from './auth.service';
import { expect } from 'playwright/test';

export async function createJobTitle(world: CustomWorld, jobTitle: string): Promise<void> {
  const response = await world.apiContext.post('admin/job-titles', {
    data: JSON.stringify({
      title: jobTitle,
      ...adminJobTitleCreate,
    }),
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(response.ok()).toBeTruthy();
}

export async function deleteJobTitle(world: CustomWorld, jobTitle: string): Promise<void> {
  const id = await getJobTitileId(world, jobTitle);
  const deleteRespone = await world.apiContext.delete('admin/job-titles', {
    data: { ids: [id] },
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(deleteRespone.ok()).toBeTruthy();
}

export async function getJobTitileId(world: CustomWorld, jobTitle: string): Promise<number> {
  const getResponse = await world.apiContext.get('admin/job-titles', {
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect.soft(getResponse.ok()).toBeTruthy();
  const json = await getResponse.json();
  const id = json.data.find((obj: { title: string }) => obj.title === jobTitle).id;
  return id;
}
