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
  },
  {
    id: '7',
    title: 'Inception',
    image: '/img/inception.png',
    rating: 4.8,
    description: 'Um ladrão que invade os sonhos das pessoas recebe a missão de implantar uma ideia na mente de um alvo.',
    year: 2010,
    genre: 'Ação, Ficção Científica, Suspense',
    duration: '148 min',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']
},
{
  id: '8',
  title: 'Interstellar',
  image: '/img/interstellar.png',
  rating: 4.6,
  description: 'Um grupo de exploradores viaja por um buraco de minhoca no espaço em busca de um novo lar para a humanidade.',
  year: 2014,
  genre: 'Aventura, Drama, Ficção Científica',
  duration: '169 min',
  director: 'Christopher Nolan',
  cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']
}

];

export const mockUsers: User[] = [
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
  },
  {
    id: '4',
    movieId: '2',
    userId: '3',
    userName: 'Usuário Teste',
    content: 'Batman Begins é uma obra-prima! A origem do Batman nunca foi tão bem contada.',
    createdAt: new Date('2024-03-04')
  },
  {
    id: '5',
    movieId: '3',
    userId: '2',
    userName: 'Maria Santos',
    content: 'Liga da Justiça tem seus momentos, mas poderia ser melhor.',
    createdAt: new Date('2024-03-05')
  },
  {
    id: '6',
    movieId: '4',
    userId: '1',
    userName: 'João Silva',
    content: 'Um filme inspirador sobre fé e perseverança. Recomendo!',
    createdAt: new Date('2024-03-06')
  },
  {
    id: '7',
    movieId: '1',
    userId: '3',
    userName: 'Usuário Teste',
    content: 'Filme incrível! Uma das melhores adaptações de super-herói que já vi.',
    createdAt: new Date('2024-06-08')
  },
  {
    id: '8',
    movieId: '2',
    userId: '2',
    userName: 'Maria Santos',
    content: 'Gostei muito da atuação do protagonista. História envolvente!',
    createdAt: new Date('2024-06-07')
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

  login: async (email: string, password: string): Promise<User> => { // Removendo _ do password
    await delay(1000);
    const user = mockUsers.find(u => u.email === email && u.password === password); // Verificando senha
    if (!user) {
      throw new Error('Usuário ou senha inválidos'); // Mensagem de erro mais genérica
    }
    return user;
  },

  register: async (name: string, email: string, _password: string): Promise<User> => {
    await delay(1000);
    
    // Verificar se o email já existe
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: _password,
      favoriteMovies: [],
      watchedMovies: [],
      createdAt: new Date()
    };
    mockUsers.push(newUser);
    return newUser;
  }
};


