import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: #000;
  color: #fff;
  padding: 40px 20px 20px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-top: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Logo = styled.img`
  max-width: 150px;
  height: auto;
`;

export const Description = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin: 0;
`;

export const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h4 {
    color: #DAA520;
    margin: 0 0 10px 0;
    font-size: 1.1rem;
  }

  a {
    color: #ccc;
    text-decoration: none;
    padding: 5px 0;
    transition: color 0.3s ease;

    &:hover {
      color: #DAA520;
    }
  }
`;

export const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h4 {
    color: #DAA520;
    margin: 0 0 10px 0;
    font-size: 1.1rem;
  }

  > div {
    display: flex;
    gap: 15px;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }
`;

export const SocialLink = styled.a`
  color: #ccc;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #DAA520;
  }

  svg {
    display: block;
  }
`;
