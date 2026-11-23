import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const translations = {
  en: {
    navAbout: 'About',
    navContact: 'Contact',
    resume: 'Resume',
    resumeUrl: '/CVTatianaDelgadillo_EN.pdf',
    menu: 'Menu',
    language: 'ES',
    switchLanguage: 'Cambiar a español',
    skipToContent: 'Skip to Content',
    heroIntro: 'Hi, my name is',
    heroRole: 'I turn data into impact.',
    heroDescription:
      'I’m a data lover focused on machine learning, data pipelines and visualization. Alongside my career, I help build and strengthen Python communities in Bolivia with',
    heroCommunity: 'creating spaces where collaboration, learning and innovation thrive.',
    getInTouch: 'Get in touch!',
    aboutTitle: 'About Me',
    aboutParagraphs: [
      [
        {
          text: 'Hello! I’m Tatiana, a ML and Data Engineer passionate about transforming complex data into meaningful insights and impactful solutions.',
        },
      ],
      [
        {
          text: 'Over the past 8 years, I’ve worked across data science, machine learning and software development, building data pipelines, analytical systems and visualizations for organizations in banking, retail, gaming and education.',
        },
      ],
      [
        {
          text: 'I’m proud to be a ',
        },
        {
          text: 'Python Software Foundation Fellow',
          href: 'https://pyfound.blogspot.com/2026/01/announcing-python-software-foundation.html',
        },
        { text: ' and a ' },
        {
          text: 'Women Techmakers Ambassador',
          href: 'https://www.technovation.org/women-techmakers',
        },
        {
          text: ', advocating for open source, knowledge sharing and more inclusive tech communities.',
        },
      ],
      [
        {
          text: 'As Community Lead at ',
        },
        { text: 'Python La Paz', href: 'https://pylapaz.org/' },
        { text: ' and lead organizer of ' },
        { text: 'PyDay La Paz', href: 'https://pyday.pylapaz.org/' },
        {
          text: ', I work to strengthen Bolivia’s tech ecosystem by creating opportunities for learning, collaboration and innovation. I believe technology is at its best when it creates opportunities and drives meaningful change.',
        },
      ],
    ],
    technologies: 'Here are a few technologies I’ve been working with recently:',
    headshotAlt: 'Headshot',
    contactOverline: 'What’s Next?',
    contactTitle: 'Get In Touch',
    contactDescription:
      'I’m currently open to new professional challenges. If you’d like to collaborate, share an idea or simply connect, my inbox is always open. I’ll try my best to get back to you!',
    sayHello: 'Say Hello',
    adaptedBy: 'Adapted from & Brittany Chiang’s portfolio',
  },
  es: {
    navAbout: 'Acerca de mí',
    navContact: 'Contacto',
    resume: 'CV',
    resumeUrl: '/CVTatianaDelgadillo_ES.pdf',
    menu: 'Menú',
    language: 'EN',
    switchLanguage: 'Switch to English',
    skipToContent: 'Ir al contenido',
    heroIntro: 'Hola, mi nombre es',
    heroRole: 'Convierto datos en impacto.',
    heroDescription:
      'Me apasionan los datos y me enfoco en aprendizaje automático, pipelines de datos y visualización. Además de mi carrera profesional, ayudo a fortalecer las comunidades de Python en Bolivia con',
    heroCommunity:
      'creando espacios donde la colaboración, el aprendizaje y la innovación prosperan.',
    getInTouch: '¡Contáctame!',
    aboutTitle: 'Acerca de mí',
    aboutParagraphs: [
      [
        {
          text: '¡Hola! Soy Tatiana, ML y Data Engineer apasionada por transformar datos complejos en conocimiento útil y soluciones de impacto.',
        },
      ],
      [
        {
          text: 'Durante los últimos 8 años, he trabajado en ciencia de datos, machine learning y desarrollo de software, creando pipelines de datos, sistemas analíticos y visualizaciones para organizaciones de los sectores bancario, retail, videojuegos y educación.',
        },
      ],
      [
        {
          text: 'Me enorgullece ser ',
        },
        {
          text: 'Python Software Foundation Fellow',
          href: 'https://pyfound.blogspot.com/2026/01/announcing-python-software-foundation.html',
        },
        { text: ' y ' },
        {
          text: 'Women Techmakers Ambassador',
          href: 'https://www.technovation.org/women-techmakers',
        },
        {
          text: ', promoviendo el software libre, el intercambio de conocimientos y comunidades tecnológicas más inclusivas.',
        },
      ],
      [
        {
          text: 'Como líder de comunidad en ',
        },
        { text: 'Python La Paz', href: 'https://pylapaz.org/' },
        { text: ' y organizadora principal de ' },
        { text: 'PyDay La Paz', href: 'https://pyday.pylapaz.org/' },
        {
          text: ' trabajo para fortalecer el ecosistema tecnológico de Bolivia, impulsando espacios de aprendizaje, colaboración e innovación. Creo que la tecnología alcanza su mayor potencial cuando genera oportunidades y cambios significativos.',
        },
      ],
    ],
    technologies: 'Estas son algunas tecnologías con las que he trabajado recientemente:',
    headshotAlt: 'Foto de Tatiana',
    contactOverline: '¿Qué sigue?',
    contactTitle: 'Contáctame',
    contactDescription:
      'Actualmente estoy abierta a nuevos retos profesionales. Si quieres colaborar, compartir una idea o simplemente conversar, mi bandeja siempre está abierta. ¡Haré todo lo posible por responderte!',
    sayHello: 'Saludar',
    adaptedBy: 'Adaptado del portafolio de Brittany Chiang',
  },
};

const LocaleContext = createContext({
  locale: 'en',
  setLocale: () => {},
  t: key => translations.en[key] || key,
});

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const savedLocale = window.localStorage.getItem('portfolio-language');
    const browserLocale =
      navigator.language && navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
    const initialLocale =
      savedLocale === 'es' || savedLocale === 'en' ? savedLocale : browserLocale;
    setLocale(initialLocale);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const changeLocale = nextLocale => {
    setLocale(nextLocale);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-language', nextLocale);
    }
  };

  const value = {
    locale,
    setLocale: changeLocale,
    t: key => translations[locale][key] || translations.en[key] || key,
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLocale = () => useContext(LocaleContext);
