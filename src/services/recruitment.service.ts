import { CustomWorld } from '../support/world';
import { getAuthToken } from './auth.service';
import { getJobTitileId } from './admin.service';
import { createAndMapVacancy } from '../test-data/apiTestData';
import { getEmployeeNumber } from './pim.service';
import { expect } from 'playwright/test';

export async function createVacancyWithManager(
  world: CustomWorld,
  vacancyName: string,
  jobTitle: string,
  managerName: string
): Promise<void> {
  const id = await getEmployeeNumber(world, managerName);
  const jobId = await getJobTitileId(world, jobTitle);
  const response = await world.apiContext.post(`recruitment/vacancies`, {
    data: JSON.stringify({
      ...createAndMapVacancy,
      name: vacancyName,
      jobTitleId: jobId,
      employeeId: id,
    }),
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(response.ok()).toBeTruthy();
}

export async function deleteVacancy(world: CustomWorld, vacancyName: string): Promise<void> {
  const id = await getVacancyID(world, vacancyName);
  const deleteRespone = await world.apiContext.delete('recruitment/vacancies', {
    data: { ids: [id] },
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(deleteRespone.ok()).toBeTruthy();
}

export async function getVacancyID(world: CustomWorld, vacancyName: string): Promise<number> {
  const getResponse = await world.apiContext.get(`recruitment/vacancies`, {
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect.soft(getResponse.ok()).toBeTruthy();
  const json = await getResponse.json();
  const id = json.data.find((obj: { name: string }) => obj.name === vacancyName).id;
  return id;
}

export async function getCandidateID(world: CustomWorld, candidateName: string): Promise<number> {
  const [first, last] = candidateName.split(' ');
  const getResponse = await world.apiContext.get(`recruitment/candidates?candidateName=${first}`, {
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect.soft(getResponse.ok()).toBeTruthy();
  const json = await getResponse.json();
  const id = json.data.find(
    (obj: { firstName: string; lastName: string }) =>
      obj.firstName === first && obj.lastName === last
  ).id;
  return id;
}

export async function deleteCandidate(world: CustomWorld, candidateName: string): Promise<void> {
  const id = await getCandidateID(world, candidateName);
  const deleteRespone = await world.apiContext.delete('recruitment/candidates', {
    data: { ids: [id] },
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(deleteRespone.ok()).toBeTruthy();
}

export async function createCandidate(
  world: CustomWorld,
  candidateName: string,
  emailID: string,
  vacancyName: string
): Promise<void> {
  const [first, last] = candidateName.split(' ');
  const id = await getVacancyID(world, vacancyName);
  const response = await world.apiContext.post(`recruitment/candidates`, {
    data: JSON.stringify({
      ...createCandidate,
      firstName: first,
      lastName: last,
      email: emailID,
      vacancyId: id,
    }),
    headers: {
      Cookie: `orangehrm=${await getAuthToken(world)}`,
    },
  });
  expect(response.ok()).toBeTruthy();
}
