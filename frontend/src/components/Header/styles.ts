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
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 15px 20px;
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

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #333;
  border-radius: 8px;
  padding: 10px;
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1001;

  div {
    padding: 8px 12px;
    border-bottom: 1px solid #555;
    margin-bottom: 8px;
    font-weight: bold;
  }

  a, button {
    display: block;
    width: 100%;
    padding: 8px 12px;
    color: #fff;
    text-decoration: none;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #555;
    }

    svg {
      margin-right: 8px;
    }
  }
`;
