import { Path } from './Path';

describe('Path', () => {
  let type: Path;

  describe('value folder', () => {
    it('folder', () => {
      type = new Path('user');
      expect(type.value).toEqual('user');
      expect(type.before).toEqual('');
    });
    it('folder complete', () => {
      type = new Path('user/demo/awd');
      expect(type.value).toEqual('user/demo/awd');
      expect(type.before).toEqual('');
    });
  });

  describe('value prefix', () => {
    it('folder', () => {
      type = new Path('render.user');
      expect(type.value).toEqual('user');
      expect(type.before).toEqual('render');
    });
    it('folder complete', () => {
      type = new Path('render.user/demo/awd');
      expect(type.value).toEqual('user/demo/awd');
      expect(type.before).toEqual('render');
    });
  });
});
