import { CustomWorld } from '../support/world';

export async function getAuthToken(world: CustomWorld): Promise<string> {
  return (await world.page.context().cookies())[0].value;
}
