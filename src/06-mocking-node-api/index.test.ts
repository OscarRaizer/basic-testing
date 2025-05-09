import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'node:path';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timerCallback = () => 'hi';
    const timeoutObject = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(timerCallback, 1000);
    expect(timeoutObject).toHaveBeenCalledWith(timerCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const spyObject = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(spyObject).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'hii.txt';
  test('should call join with pathToFile', async () => {
    const joinObject = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinObject).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockResolvedValue('hii');
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe('hii');
  });
});
