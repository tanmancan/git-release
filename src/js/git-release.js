export default class GitRelease {
  constructor(endpoint = '', body = {}) {
    this.endpoint = endpoint;
    this.headers = new Headers();
    this.body = body;

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/vnd.github.v3+json');
  }

  addHeader(name = '', value = '') {
    if ((name || value) && !this.headers.get(name)) {
      this.headers.append(name, value);
    }
  }

  addAccessToken(token = '') {
    if (token && !this.headers.get('Authorization')) {
      this.headers.append('Authorization', `token ${token}`);
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
