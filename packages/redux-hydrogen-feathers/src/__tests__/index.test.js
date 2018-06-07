describe('index', () => {
  let exported;
  let adapter;
  let feathers;
  let feathersService;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    exported = require('../index');
    feathersService = {
      get: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      patch: jest.fn(),
      remove: jest.fn()
    };
    feathers = { service: jest.fn(() => feathersService) };
    adapter = exported.default(feathers);
  });

  test('exports default feathers adapter', () => {
    expect(adapter).toBeInstanceOf(exported.FeathersAdapter);
    expect(adapter).toHaveProperty('feathers', feathers);
  });

  test('returns service', () => {
    const adapted = adapter.service('expect me');

    expect(adapted).toBeInstanceOf(exported.FeathersServiceAdapter);
    expect(adapted.service).toBe(feathersService);
    expect(feathers.service).toHaveBeenCalledWith('expect me');
  });

  test('get', () => {
    adapter.service('expect me').get(1, { name: 'McPhearson' });
    expect(feathersService.get).toHaveBeenCalledWith(1, { query: { name: 'McPhearson' } });
  });

  test('find', () => {
    adapter.service('expect me').find({ name: 'McPhearson' });
    expect(feathersService.find).toHaveBeenCalledWith({ query: { name: 'McPhearson' } });
  });

  test('first', () => {
    adapter.service('expect me').first({ name: 'McPhearson' });
    expect(feathersService.find).toHaveBeenCalledWith({ query: { name: 'McPhearson' }, $limit: 1 });
  });

  test('create', () => {
    adapter.service('expect me').create({ name: 'McPhearson' }, { job: 'hydrogen' });
    expect(feathersService.create).toHaveBeenCalledWith({ name: 'McPhearson' }, { query: { job: 'hydrogen' } });
  });

  test('update', () => {
    adapter.service('expect me').update(1, { name: 'McPhearson' }, { job: 'hydrogen' });
    expect(feathersService.update).toHaveBeenCalledWith(1, { name: 'McPhearson' }, { query: { job: 'hydrogen' } });
  });

  test('patch', () => {
    adapter.service('expect me').patch(1, { name: 'McPhearson' }, { job: 'hydrogen' });
    expect(feathersService.patch).toHaveBeenCalledWith(1, { name: 'McPhearson' }, { query: { job: 'hydrogen' } });
  });

  test('remove', () => {
    adapter.service('expect me').remove(1, { job: 'hydrogen' });
    expect(feathersService.remove).toHaveBeenCalledWith(1, { query: { job: 'hydrogen' } });
  });
});
