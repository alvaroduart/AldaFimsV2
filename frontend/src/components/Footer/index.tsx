import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FooterContainer, FooterSection, Logo, Description, LinksSection, SocialSection, SocialLink } from './styles';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <Link to="/">
          <Logo src="/img/logobranca.png" alt="Logo ALDA Films" />
        </Link>
        <Description>
          Sua plataforma de filmes online.<br />
          Assista filmes em qualquer lugar!
        </Description>
      </FooterSection>

      <LinksSection>
        <h4>Links Rápidos</h4>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/contato">Contato</Link>
      </LinksSection>

      <SocialSection>
        <h4>Redes Sociais</h4>
        <div>
          <SocialLink href="#" aria-label="Instagram">
            <FaInstagram />
          </SocialLink>
          <SocialLink href="#" aria-label="Facebook">
            <FaFacebookF />
          </SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">
            <FaLinkedinIn />
          </SocialLink>
        </div>
      </SocialSection>
    </FooterContainer>
  );
};

export default Footer;
