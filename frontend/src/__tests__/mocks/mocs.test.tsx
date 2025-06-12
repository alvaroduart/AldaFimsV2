import { vi } from "vitest";
import { mockMovies, mockUsers, mockComments, delay, mockAPI } from '../../mocks';

const initialMockUsersData = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'senha123',
    favoriteMovies: ['1', '2'],
    watchedMovies: ['1', '3', '4'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    password: 'maria123',
    favoriteMovies: ['5', '6'],
    watchedMovies: ['2', '5', '6'],
    createdAt: new Date('2024-02-20')
  },
  {
    id: '3',
    name: 'Usuário Teste',
    email: 'usuario@teste.com',
    password: '123456',
    favoriteMovies: ['1', '3'],
    watchedMovies: ['1', '2', '3'],
    createdAt: new Date('2024-03-01')
  }
];

describe('Mocks de Dados', () => {
  test('mockMovies deve conter filmes mockados', () => {
    expect(mockMovies).toBeInstanceOf(Array);
    expect(mockMovies.length).toBeGreaterThan(0);
    expect(mockMovies[0]).toHaveProperty('id');
    expect(mockMovies[0]).toHaveProperty('title');
    expect(mockMovies[0]).toHaveProperty('rating');
  });

  test('mockUsers deve conter usuários mockados', () => {
    expect(mockUsers).toBeInstanceOf(Array);
    expect(mockUsers.length).toBeGreaterThan(0);
    expect(mockUsers[0]).toHaveProperty('id');
    expect(mockUsers[0]).toHaveProperty('email');
    expect(mockUsers[0]).toHaveProperty('password');
  });

  test('mockComments deve conter comentários mockados', () => {
    expect(mockComments).toBeInstanceOf(Array);
    expect(mockComments.length).toBeGreaterThan(0);
    expect(mockComments[0]).toHaveProperty('id');
    expect(mockComments[0]).toHaveProperty('movieId');
    expect(mockComments[0]).toHaveProperty('content');
  });
});

describe('Mocks de Funções de API', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUsers.splice(0, mockUsers.length, ...initialMockUsersData);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers(); 
  });

  test('delay deve simular um atraso de tempo', async () => {
    const promise = delay(1000);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(1000);
    await promise;
    expect(vi.getTimerCount()).toBe(0);
  });

  test('mockAPI.getMovies deve retornar mockMovies após delay', async () => {
    const promise = mockAPI.getMovies();
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(1000);
    const movies = await promise;
    expect(movies).toEqual(mockMovies);
  });

  test('mockAPI.getMovieById deve retornar um filme por ID após delay', async () => {
    const movieId = '1';
    const expectedMovie = mockMovies.find(m => m.id === movieId);
    const promise = mockAPI.getMovieById(movieId);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(500);
    const movie = await promise;
    expect(movie).toEqual(expectedMovie);
  });

  test('mockAPI.getMovieById deve retornar undefined para ID inexistente', async () => {
    const movieId = '999';
    const promise = mockAPI.getMovieById(movieId);
    vi.advanceTimersByTime(500);
    const movie = await promise;
    expect(movie).toBeUndefined();
  });

  test('mockAPI.getCommentsByMovieId deve retornar comentários para um movie ID após delay', async () => {
    const movieId = '1';
    const expectedComments = mockComments.filter(c => c.movieId === movieId);
    const promise = mockAPI.getCommentsByMovieId(movieId);
    vi.advanceTimersByTime(500);
    const comments = await promise;
    expect(comments).toEqual(expectedComments);
  });

  test('mockAPI.login deve retornar usuário válido para credenciais corretas', async () => {
    const user = mockUsers[0];
    const promise = mockAPI.login(user.email as string, user.password as string);
    vi.advanceTimersByTime(1000);
    const loggedInUser = await promise;
    expect(loggedInUser).toEqual(user);
  });

  test('mockAPI.login deve lançar erro para credenciais inválidas', async () => {
    const promise = mockAPI.login('email@invalido.com', 'senhaerrada');
    vi.advanceTimersByTime(1000);
    await expect(promise).rejects.toThrow('Usuário ou senha inválidos');
  });

  test('mockAPI.register deve registrar um novo usuário', async () => {
    const initialUserCount = mockUsers.length;
    const newUserName = 'Novo Usuário';
    const newUserEmail = 'novo@email.com';
    const newUserPassword = 'senhaNova';
    const promise = mockAPI.register(newUserName, newUserEmail, newUserPassword);
    vi.advanceTimersByTime(1000);
    const registeredUser = await promise;
    expect(registeredUser.name).toBe(newUserName);
    expect(registeredUser.email).toBe(newUserEmail);
    expect(registeredUser.password).toBe(newUserPassword);
    expect(mockUsers.length).toBe(initialUserCount + 1);
    expect(mockUsers.some(u => u.email === newUserEmail)).toBe(true);
  });

  test('mockAPI.register deve lançar erro se o e-mail já existe', async () => {
    const existingUserEmail = mockUsers[0].email;
    const promise = mockAPI.register('Duplicado', existingUserEmail, 'outrasenha');
    vi.advanceTimersByTime(1000);
    await expect(promise).rejects.toThrow('Este e-mail já está cadastrado');
    expect(mockUsers.length).toBe(3);
  });
});
