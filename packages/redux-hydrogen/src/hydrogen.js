import { createService } from './service';

export class Hydrogen {
  constructor({ adapter } = {}) {
    this.services = {};
    this.adapter = adapter;
  }
  service(name) {
    const service = this.services[name];
    if (service) { return service; }
    this.services[name] = createService(name, this.adapter.service(name));
    return this.services[name];
  }
}

export default options => new Hydrogen(options);
