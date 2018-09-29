export default class GitRelease {
  constructor(endpoint = '', body = {}) {
    this.endpoint = endpoint;
    this.headers = new Headers();
    this.body = body;
  }

  addHeader(name = '', value = '') {
    console.log(this.headers.get(name));
    if ((name || value) && !this.headers.get(name)) {
      this.headers.append(name, value);
    }
  }

  updateEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  updateBody(body = {}) {
    this.body = JSON.stringify(body);
  }

  send() {
    return fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: this.body,
    });
  }
}
