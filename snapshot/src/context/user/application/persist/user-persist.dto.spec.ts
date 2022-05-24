import { validate } from 'class-validator';
import { UserPersistDto } from './user-persist.dto';

describe('UserPersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new UserPersistDto();
      dto.id = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.name = 'name';
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new UserPersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(2);
      //console.log(errors);
    });
  });
});
