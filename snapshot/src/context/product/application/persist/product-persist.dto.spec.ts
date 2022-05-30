import { validate } from 'class-validator';
import { ProductPersistDto } from './product-persist.dto';

describe('ProductPersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new ProductPersistDto();
      dto.id = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.name = 'name';
      dto.code = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.description = 'description';
      dto.createAt = '2018-03-23';
      dto.price = 12.5;
      dto.isActive = true;
      dto.category = 'books';
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new ProductPersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(8);
      //console.log(errors);
    });
  });
});
