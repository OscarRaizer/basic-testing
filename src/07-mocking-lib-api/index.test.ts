// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const endpoint = '/posts/1';
  afterEach(() => {
    throttledGetDataFromApi.cancel();
  });

  const endpointResponse = {
    iuserId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  };

  test('should create instance with provided base url', async () => {
    const spyAxios = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(endpoint);
    expect(spyAxios).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spyAxiosGet = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(endpoint);
    expect(spyAxiosGet).toHaveBeenCalledWith(endpoint);
  });

  test('should return response data', async () => {
    expect(throttledGetDataFromApi(endpoint)).resolves.toStrictEqual(
      endpointResponse,
    );
  });
});
