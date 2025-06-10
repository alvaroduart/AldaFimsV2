import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaMoon, FaSun, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { HeaderContainer, Logo, MenuButton, Navigation, SearchForm, SearchInput, IconButton, UserMenu, UserMenuDropdown } from './styles';

interface HeaderProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode = false, onToggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Buscar por:', searchTerm);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
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
        {isAuthenticated ? (
          <>
            <Link to="/favoritos">Favoritos</Link>
            <Link to="/historico">Histórico</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
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

      {isAuthenticated && (
        <UserMenu>
          <IconButton 
            type="button" 
            aria-label="Menu do usuário"
            onClick={toggleUserMenu}
          >
            <FaUser />
          </IconButton>
          {isUserMenuOpen && (
            <UserMenuDropdown>
              <div>Olá, {user?.name}</div>
              <Link to="/favoritos">Favoritos</Link>
              <Link to="/historico">Histórico</Link>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </button>
            </UserMenuDropdown>
          )}
        </UserMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
