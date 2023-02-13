import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { HTTPTransport, METHOD } from './http-transport';

describe('HTTPTransport', () => {
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    sinon.useFakeXMLHttpRequest().onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('should send GET request', () => {
    HTTPTransport.get('/');

    const [request] = requests;

    expect(request.method).toEqual(METHOD.GET);
  });

  it('should send POST request', () => {
    HTTPTransport.post('/');

    const [request] = requests;

    expect(request.method).toEqual(METHOD.POST);
  });

  it('should send DELETE request', () => {
    HTTPTransport.delete('/');

    const [request] = requests;

    expect(request.method).toEqual(METHOD.DELETE);
  });

  it('should send PUT request', () => {
    HTTPTransport.put('/');

    const [request] = requests;

    expect(request.method).toEqual(METHOD.PUT);
  });

  it('should send PATCH request', () => {
    HTTPTransport.patch('/');

    const [request] = requests;

    expect(request.method).toEqual(METHOD.PATCH);
  });
});
