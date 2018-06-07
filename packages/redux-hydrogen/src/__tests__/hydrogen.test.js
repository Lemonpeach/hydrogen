describe('hydrogen', () => {
  let exported;
  let adapter;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.mock('../service', () => ({
      createService: jest.fn((name, service) => ({ name, service }))
    }));
    exported = require('../hydrogen');
    adapter = { service: jest.fn(() => 'Expect me.') };
  });

  test('factory function', () => {
    expect(exported.default()).toBeInstanceOf(exported.Hydrogen);
  });

  test('constructs correctly', () => {
    const hydrogen = exported.default({ adapter });
    expect(hydrogen).toHaveProperty('adapter', adapter);
    expect(hydrogen).toHaveProperty('services', {});
  });

  test('service', () => {
    const hydrogen = exported.default({ adapter });
    expect(hydrogen.service('hydro')).toEqual({
      name: 'hydro',
      service: 'Expect me.'
    });
    expect(adapter.service).toHaveBeenCalledTimes(1);
    expect(adapter.service).toHaveBeenCalledWith('hydro');
    expect(require('../service').createService).toHaveBeenCalledWith('hydro', 'Expect me.');

    expect(hydrogen.service('hydro')).toEqual({
      name: 'hydro',
      service: 'Expect me.'
    });
    expect(adapter.service).toHaveBeenCalledTimes(1);

    expect(hydrogen.service('water')).toEqual({
      name: 'water',
      service: 'Expect me.'
    });
    expect(adapter.service).toHaveBeenCalledTimes(2);
  });
});
