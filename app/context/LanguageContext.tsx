'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sq';

interface Translations {
  nav: {
    home: string;
    projects: string;
    technology: string;
    about: string;
    contact: string;
    requestProposal: string;
  };
  hero: {
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    viewProjects: string;
    contactUs: string;
  };
  about: {
    heading1: string;
    heading2: string;
    paragraph1: string;
    paragraph2: string;
    stat1: string;
    stat2: string;
    stat3: string;
    stat4: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
  };
  services: {
    heading: string;
    subheading: string;
    service1Title: string;
    service1Desc: string;
    service2Title: string;
    service2Desc: string;
    service3Title: string;
    service3Desc: string;
    service4Title: string;
    service4Desc: string;
    service5Title: string;
    service5Desc: string;
    service6Title: string;
    service6Desc: string;
  };
  projectsSection: {
    heading: string;
    subheading: string;
    location: string;
    capacity: string;
    investment: string;
    completed: string;
  };
  technical: {
    heading: string;
    subheading: string;
    spec1Label: string;
    spec1Desc: string;
    spec2Label: string;
    spec2Desc: string;
    spec3Label: string;
    spec3Desc: string;
    spec4Label: string;
    spec4Desc: string;
    turbineTitle: string;
    turbine1: string;
    turbine2: string;
    turbine3: string;
    efficiencyTitle: string;
    efficiency1: string;
    efficiency2: string;
    efficiency3: string;
    environmentTitle: string;
    environment1: string;
    environment2: string;
    environment3: string;
  };
  whyChoose: {
    heading: string;
    subheading: string;
    reason1Stat: string;
    reason1Label: string;
    reason1Desc: string;
    reason2Stat: string;
    reason2Label: string;
    reason2Desc: string;
    reason3Stat: string;
    reason3Label: string;
    reason3Desc: string;
    reason4Stat: string;
    reason4Label: string;
    reason4Desc: string;
    certificationsTitle: string;
    warrantiesTitle: string;
    monitoringTitle: string;
  };
  contactSection: {
    heading1: string;
    heading2: string;
    subtitle: string;
    email: string;
    phone: string;
    headquarters: string;
    formHeading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    projectTypeLabel: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    mapHeading: string;
  };
  footer: {
    description: string;
    servicesTitle: string;
    companyTitle: string;
    connectTitle: string;
    copyright: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      technology: 'Technology',
      about: 'About Us',
      contact: 'Contact',
      requestProposal: 'Request Proposal',
    },
    hero: {
      title1: 'Powering the',
      title2: 'Future',
      title3: 'with Water',
      subtitle: 'Engineering excellence in hydrocentral design and turbine installation. Transforming water power into sustainable energy solutions.',
      viewProjects: 'View Projects',
      contactUs: 'Contact Us',
    },
    about: {
      heading1: '20+ Years of',
      heading2: 'Engineering Excellence',
      paragraph1: 'We are a premier hydrocentral engineering and turbine construction company, dedicated to delivering precision-engineered solutions that harness the power of water for sustainable energy generation.',
      paragraph2: 'Our commitment to innovation, precision, and environmental responsibility has made us leaders in the hydropower industry. Every project we undertake is a testament to our expertise and dedication to excellence.',
      stat1: '250+',
      stat2: '50+',
      stat3: '5000+',
      stat4: '99.8%',
      stat1Label: 'Projects Completed',
      stat2Label: 'Countries Worldwide',
      stat3Label: 'MW Installed',
      stat4Label: 'Uptime Rate',
    },
    services: {
      heading: 'Our Services',
      subheading: 'Comprehensive hydropower solutions from concept to completion',
      service1Title: 'Turbine Installation',
      service1Desc: 'State-of-the-art turbine systems designed for maximum efficiency and longevity.',
      service2Title: 'Hydrocentral Design',
      service2Desc: 'Custom-engineered hydropower plants optimized for your specific site conditions.',
      service3Title: 'River Flow Analysis',
      service3Desc: 'Advanced hydraulic modeling and flow optimization for peak performance.',
      service4Title: 'Monitoring Systems',
      service4Desc: '24/7 real-time monitoring with predictive maintenance capabilities.',
      service5Title: 'Electrical Planning',
      service5Desc: 'Complete power generation and grid integration solutions.',
      service6Title: 'Civil Engineering',
      service6Desc: 'Robust infrastructure design for dams, channels, and support structures.',
    },
    projectsSection: {
      heading: 'Completed Hydropower Projects',
      subheading: 'Powering nations with sustainable energy infrastructure',
      location: 'Location',
      capacity: 'Capacity',
      investment: 'Total Investment',
      completed: '✓ Completed',
    },
    technical: {
      heading: 'Technical Excellence',
      subheading: 'Industry-leading specifications and performance metrics',
      spec1Label: 'Turbine Models',
      spec1Desc: 'Francis, Kaplan, Pelton configurations',
      spec2Label: 'Avg. Efficiency',
      spec2Desc: 'Peak performance optimization',
      spec3Label: 'CO₂ Reduced',
      spec3Desc: 'Annual environmental impact',
      spec4Label: 'Flow Range',
      spec4Desc: 'Adaptable to any site',
      turbineTitle: 'Turbine Technology',
      turbine1: 'Advanced blade design for maximum energy capture',
      turbine2: 'Corrosion-resistant materials for extended lifespan',
      turbine3: 'Low-maintenance bearing systems',
      efficiencyTitle: 'Efficiency Metrics',
      efficiency1: 'Real-time performance monitoring',
      efficiency2: 'Adaptive flow optimization algorithms',
      efficiency3: 'Predictive maintenance scheduling',
      environmentTitle: 'Environmental Impact',
      environment1: 'Fish-friendly turbine designs',
      environment2: 'Minimal ecosystem disruption',
      environment3: 'Zero emissions operation',
    },
    whyChoose: {
      heading: 'Why Choose Us',
      subheading: 'Unmatched expertise and commitment to excellence',
      reason1Stat: '99.8%',
      reason1Label: 'Uptime Guarantee',
      reason1Desc: 'Industry-leading reliability with 24/7 monitoring',
      reason2Stat: 'ISO 9001',
      reason2Label: 'Quality Certified',
      reason2Desc: 'International standards compliance',
      reason3Stat: '24/7',
      reason3Label: 'Support Available',
      reason3Desc: 'Round-the-clock technical assistance',
      reason4Stat: '100%',
      reason4Label: 'Energy Output',
      reason4Desc: 'Guaranteed performance metrics',
      certificationsTitle: 'Certifications',
      warrantiesTitle: 'Warranties',
      monitoringTitle: 'Monitoring',
    },
    contactSection: {
      heading1: "Let's Power",
      heading2: 'the Future Together',
      subtitle: 'Ready to start your hydropower project? Our team of experts is here to help you harness the power of water for sustainable energy generation.',
      email: 'Email',
      phone: 'Phone',
      headquarters: 'Headquarters',
      formHeading: 'Send us a message',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      projectTypeLabel: 'Project Type',
      option1: 'New Installation',
      option2: 'Turbine Upgrade',
      option3: 'Maintenance',
      option4: 'Consultation',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your project...',
      sendButton: 'Send Message',
      mapHeading: 'Global Project Locations',
    },
    footer: {
      description: 'Leading the future of sustainable energy through innovative hydrocentral solutions.',
      servicesTitle: 'Services',
      companyTitle: 'Company',
      connectTitle: 'Connect',
      copyright: '© 2025 Hydropower Engineering. All rights reserved.',
    },
  },
  sq: {
    nav: {
      home: 'Kryefaqja',
      projects: 'Projektet',
      technology: 'Teknologjia',
      about: 'Rreth Nesh',
      contact: 'Kontakti',
      requestProposal: 'Kërko Propozim',
    },
    hero: {
      title1: 'Duke Fuqizuar',
      title2: 'të Ardhmen',
      title3: 'me Ujë',
      subtitle: 'Përsosmëri inxhinierike në projektimin e hidrocentraleve dhe instalimin e turbinave. Duke transformuar energjinë e ujit në zgjidhje të qëndrueshme energjitike.',
      viewProjects: 'Shiko Projektet',
      contactUs: 'Na Kontaktoni',
    },
    about: {
      heading1: '20+ Vjet',
      heading2: 'Përsosmëri Inxhinierike',
      paragraph1: 'Ne jemi një kompani kryesore e inxhinierisë së hidrocentraleve dhe ndërtimit të turbinave, e përkushtuar në ofrimin e zgjidhjeve të projektuara me precizion që shfrytëzojnë fuqinë e ujit për prodhim të qëndrueshëm të energjisë.',
      paragraph2: 'Angazhimi ynë për inovacionin, precizionin dhe përgjegjësinë mjedisore na ka bërë liderë në industrinë e energjisë hidrike. Çdo projekt që ndërmarrim është dëshmi e ekspertizës dhe përkushtimit tonë ndaj përsosmërisë.',
      stat1: '250+',
      stat2: '50+',
      stat3: '5000+',
      stat4: '99.8%',
      stat1Label: 'Projekte të Përfunduara',
      stat2Label: 'Vende në Botë',
      stat3Label: 'MW të Instaluara',
      stat4Label: 'Shkalla e Funksionimit',
    },
    services: {
      heading: 'Shërbimet Tona',
      subheading: 'Zgjidhje gjithëpërfshirëse hidroenergjetike nga koncepti deri te përfundimi',
      service1Title: 'Instalimi i Turbinave',
      service1Desc: 'Sisteme turbinash të teknologjisë së fundit të dizajnuara për efikasitet dhe jetëgjatësi maksimale.',
      service2Title: 'Dizajni i Hidrocentraleve',
      service2Desc: 'Centrale hidroenergjitike të projektuara sipas specifikave të optimizuara për kushtet tuaja specifike të vendndodhjes.',
      service3Title: 'Analiza e Rrjedhës së Lumit',
      service3Desc: 'Modelim hidraulik i avancuar dhe optimizim i rrjedhës për performancë maksimale.',
      service4Title: 'Sistemet e Monitorimit',
      service4Desc: 'Monitorim në kohë reale 24/7 me aftësi mirëmbajtjeje parashikuese.',
      service5Title: 'Planifikimi Elektrik',
      service5Desc: 'Zgjidhje të plota për prodhimin e energjisë dhe integrimin në rrjet.',
      service6Title: 'Inxhinieria Civile',
      service6Desc: 'Projektim i qëndrueshëm infrastrukture për digat, kanalet dhe strukturat mbështetëse.',
    },
    projectsSection: {
      heading: 'Projektet e Përfunduara Hidroenergjetike',
      subheading: 'Duke fuqizuar kombet me infrastrukturë energjitike të qëndrueshme',
      location: 'Vendndodhja',
      capacity: 'Kapaciteti',
      investment: 'Investimi Total',
      completed: '✓ E Përfunduar',
    },
    technical: {
      heading: 'Përsosmëri Teknike',
      subheading: 'Specifikimet dhe metrikat e performancës lider në industri',
      spec1Label: 'Modelet e Turbinave',
      spec1Desc: 'Konfigurime Francis, Kaplan, Pelton',
      spec2Label: 'Efikasiteti Mesatar',
      spec2Desc: 'Optimizimi i performancës maksimale',
      spec3Label: 'CO₂ të Reduktuar',
      spec3Desc: 'Ndikimi mjedisor vjetor',
      spec4Label: 'Diapazoni i Rrjedhës',
      spec4Desc: 'I përshtatshëm për çdo vend',
      turbineTitle: 'Teknologjia e Turbinave',
      turbine1: 'Dizajn i avancuar i tehut për kapmaxhien maksimale të energjisë',
      turbine2: 'Materiale rezistente ndaj korrozionit për jetëgjatësi të zgjatur',
      turbine3: 'Sisteme kushinetësh me mirëmbajtje të ulët',
      efficiencyTitle: 'Metrikat e Efikasitetit',
      efficiency1: 'Monitorim i performancës në kohë reale',
      efficiency2: 'Algoritme optimizimi të rrjedhës adaptive',
      efficiency3: 'Planifikim i mirëmbajtjes parashikuese',
      environmentTitle: 'Ndikimi Mjedisor',
      environment1: 'Dizajne turbinash miqësore me peshqit',
      environment2: 'Ndërprerje minimale e ekosistemit',
      environment3: 'Funksionim pa emetim',
    },
    whyChoose: {
      heading: 'Pse të Na Zgjidhni',
      subheading: 'Ekspertizë e pakrahasueshme dhe angazhim ndaj përsosmërisë',
      reason1Stat: '99.8%',
      reason1Label: 'Garanci Funksionimi',
      reason1Desc: 'Besueshmëri lider në industri me monitorim 24/7',
      reason2Stat: 'ISO 9001',
      reason2Label: 'Cilësi e Certifikuar',
      reason2Desc: 'Përputhshmëri me standardet ndërkombëtare',
      reason3Stat: '24/7',
      reason3Label: 'Mbështetje e Disponueshme',
      reason3Desc: 'Asistencë teknike 24 orë në ditë',
      reason4Stat: '100%',
      reason4Label: 'Prodhim Energjie',
      reason4Desc: 'Metrika të garantuara të performancës',
      certificationsTitle: 'Certifikimet',
      warrantiesTitle: 'Garancionet',
      monitoringTitle: 'Monitorimi',
    },
    contactSection: {
      heading1: 'Le të Fuqizojmë',
      heading2: 'të Ardhmen Së Bashku',
      subtitle: 'Gati të filloni projektin tuaj hidroenergjetik? Ekipi ynë i ekspertëve është këtu për t\'ju ndihmuar të shfrytëzoni fuqinë e ujit për prodhim të qëndrueshëm të energjisë.',
      email: 'Email',
      phone: 'Telefon',
      headquarters: 'Selia Kryesore',
      formHeading: 'Dërgoni një mesazh',
      nameLabel: 'Emri',
      namePlaceholder: 'Emri juaj',
      emailLabel: 'Email',
      emailPlaceholder: 'emaili@juaj.com',
      projectTypeLabel: 'Lloji i Projektit',
      option1: 'Instalim i Ri',
      option2: 'Përmirësim i Turbinës',
      option3: 'Mirëmbajtje',
      option4: 'Konsulencë',
      messageLabel: 'Mesazhi',
      messagePlaceholder: 'Na tregoni për projektin tuaj...',
      sendButton: 'Dërgo Mesazhin',
      mapHeading: 'Vendndodhjet Globale të Projekteve',
    },
    footer: {
      description: 'Duke udhëhequr të ardhmen e energjisë së qëndrueshme përmes zgjidhjeve inovative të hidrocentraleve.',
      servicesTitle: 'Shërbimet',
      companyTitle: 'Kompania',
      connectTitle: 'Lidhu',
      copyright: '© 2025 Inxhinieria Hidroenergjetike. Të gjitha të drejtat e rezervuara.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'sq' : 'en'));
  };

  const value = {
    language,
    toggleLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
