import { menuAggregate, MenuPropertie, run } from './load-cmd';

const MENU_USER = menuAggregate(MenuPropertie.USER);
const MENU_PRODUCT = menuAggregate(MenuPropertie.PRODUCT);

describe('select first aggregate', () => {
  it('ENTER', async () => {
    const result = await run(MENU_PRODUCT);
    expect(result).toMatch(/Select aggregate Product/);
    expect(result).toMatch(/What do you want to generate in Product/);
  });
});

describe('select second aggregate', () => {
  test('DOWN, ENTER', async () => {
    const result = await run(MENU_USER);
    expect(result).toMatch(/Select aggregate User/);
    expect(result).toMatch(/What do you want to generate in User/);
  });
});
