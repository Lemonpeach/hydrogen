import cloneDeep from 'lodash/cloneDeep';

export class FeathersServiceAdapter {
  constructor(service) {
    this.service = service;
  }
  get(id, query) {
    return this.service.get(id, { query: cloneDeep(query) });
  }
  find(query) {
    return this.service.find({ query: cloneDeep(query) });
  }
  first(query) {
    return this.service.find({ query: cloneDeep(query), $limit: 1 });
  }
  create(data, query) {
    return this.service.create(data, { query: cloneDeep(query) });
  }
  update(id, data, query) {
    return this.service.update(id, data, { query: cloneDeep(query) });
  }
  patch(id, data, query) {
    return this.service.patch(id, data, { query: cloneDeep(query) });
  }
  remove(id, query) {
    return this.service.remove(id, { query: cloneDeep(query) });
  }
}

export class FeathersAdapter {
  constructor(feathers) {
    this.feathers = feathers;
  }
  service(name) {
    return new FeathersServiceAdapter(this.feathers.service(name));
  }
}

export default feathers => new FeathersAdapter(feathers);
