// import { Movie } from '../types';
// import { User, Comment } from '../types';
//import type { MovieContextType } from '../types';
import type { User } from '../types';
import type { Comment } from '../types';
import type { Movie } from '../types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Spider Man',
    image: '/img/spiderman.png',
    rating: 4.8,
    description: 'Peter Parker é um jovem comum até ser picado por uma aranha radioativa e ganhar superpoderes. Agora ele deve aprender a usar suas habilidades para proteger Nova York como o Homem-Aranha.',
    year: 2002,
    genre: 'Ação, Aventura',
    duration: '121 min',
    director: 'Sam Raimi',
    cast: ['Tobey Maguire', 'Kirsten Dunst', 'Willem Dafoe']
  },
  {
    id: '2',
    title: 'Batman',
    image: '/img/Batman.png',
    rating: 3.7,
    description: 'Bruce Wayne luta contra o crime em Gotham City como o vigilante mascarado Batman, enfrentando vilões perigosos e protegendo os inocentes.',
    year: 2005,
    genre: 'Ação, Drama',
    duration: '140 min',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Michael Caine', 'Liam Neeson']
  },
  {
    id: '3',
    title: 'Justice League',
    image: '/img/Justice Ligue.png',
    rating: 2.3,
    description: 'Batman e Wonder Woman recrutam uma equipe de meta-humanos para proteger o mundo de uma ameaça catastrófica.',
    year: 2017,
    genre: 'Ação, Aventura, Fantasia',
    duration: '120 min',
    director: 'Zack Snyder',
    cast: ['Ben Affleck', 'Gal Gadot', 'Henry Cavill']
  },
  {
    id: '4',
    title: 'A Forja',
    image: '/img/forja.png',
    rating: 1.2,
    description: 'Um drama inspirador sobre fé, família e a importância de nunca desistir dos seus sonhos.',
    year: 2024,
    genre: 'Drama',
    duration: '123 min',
    director: 'Alex Kendrick',
    cast: ['Aspen Kennedy', 'Priscilla Shirer', 'Cameron Arnett']
  },
  {
    id: '5',
    title: 'Avengers: Endgame',
    image: '/img/avengers.png',
    rating: 4.9,
    description: 'Os Vingadores restantes devem encontrar uma maneira de reverter as ações de Thanos e restaurar o equilíbrio do universo.',
    year: 2019,
    genre: 'Ação, Aventura, Drama',
    duration: '181 min',
    director: 'Anthony Russo, Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo']
  },
  {
    id: '6',
    title: 'The Dark Knight',
    image: '/img/dark-knight.png',
    rating: 4.7,
    description: 'Batman enfrenta o Coringa, um criminoso psicopata que quer mergulhar Gotham City no caos.',
    year: 2008,
    genre: 'Ação, Crime, Drama',
    duration: '152 min',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    password: '123456',
    favoriteMovies: ['1', '2'],
    watchedMovies: ['1', '3', '4'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    password: 'senha123',
    favoriteMovies: ['5', '6'],
    watchedMovies: ['2', '5', '6'],
    createdAt: new Date('2024-02-20')
  },
  {
    id: '3',
    name: 'Usuário Teste',
    email: 'usuario@teste.com',
    password: 'teste123',
    favoriteMovies: ['1', '3'],
    watchedMovies: ['1', '2', '3'],
    createdAt: new Date('2024-03-01')
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    movieId: '1',
    userId: '1',
    userName: 'João Silva',
    content: 'Filme incrível! O Tobey Maguire é o melhor Homem-Aranha!',
    createdAt: new Date('2024-03-01')
  },
  {
    id: '2',
    movieId: '1',
    userId: '2',
    userName: 'Maria Santos',
    content: 'Clássico dos super-heróis. Nunca me canso de assistir.',
    createdAt: new Date('2024-03-02')
  },
  {
    id: '3',
    movieId: '2',
    userId: '1',
    userName: 'João Silva',
    content: 'Christopher Nolan revolucionou os filmes de super-herói.',
    createdAt: new Date('2024-03-03')
  }
];

// Função para simular delay de API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Funções mock para simular chamadas de API
export const mockAPI = {
  getMovies: async (): Promise<Movie[]> => {
    await delay(1000);
    return mockMovies;
  },

  getMovieById: async (id: string): Promise<Movie | undefined> => {
    await delay(500);
    return mockMovies.find(movie => movie.id === id);
  },

  getCommentsByMovieId: async (movieId: string): Promise<Comment[]> => {
    await delay(500);
    return mockComments.filter(comment => comment.movieId === movieId);
  },

  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    if (user.password !== password) {
      throw new Error('Senha incorreta');
    }
    return user;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay(1000);
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      favoriteMovies: [],
      watchedMovies: [],
      createdAt: new Date()
    };
    mockUsers.push(newUser);
    return newUser;
  }
};
