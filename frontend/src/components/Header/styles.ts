import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: #000;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Logo = styled.img`
  max-width: 150px;
  height: auto;
  z-index: 1;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  z-index: 2;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 20px;
  align-items: center;

  a {
    color: #fff;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #DAA520;
    }
  }

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: #000;
    padding: 20px;
    border-top: 1px solid #333;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #333;
  padding: 8px 12px;
  border-radius: 25px;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 100%;
    margin-top: 10px;
  }
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  color: #fff;
  flex: 1;
  padding: 5px;
  outline: none;

  &::placeholder {
    color: #ccc;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  transition: color 0.3s ease;

  &:hover {
    color: #DAA520;
  }

  svg {
    font-size: 1rem;
  }
`;
