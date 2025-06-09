import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaMoon, FaSun } from 'react-icons/fa';
import { HeaderContainer, Logo, MenuButton, Navigation, SearchForm, SearchInput, IconButton } from './styles';

interface HeaderProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode = false, onToggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Buscar por:', searchTerm);
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src="/img/logobranca.png" alt="Logo ALDA Films" />
      </Link>

      <MenuButton onClick={toggleMenu} aria-label="Abrir menu">
        ☰
      </MenuButton>

      <Navigation isOpen={isMenuOpen}>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/contato">Contato</Link>
      </Navigation>

      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" aria-label="Pesquisar">
          <FaSearch />
        </IconButton>
        <IconButton type="button" aria-label="Filtros">
          <FaFilter />
        </IconButton>
        <IconButton 
          type="button" 
          aria-label="Alternar tema"
          onClick={onToggleDarkMode}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </IconButton>
      </SearchForm>
    </HeaderContainer>
  );
};

export default Header;
