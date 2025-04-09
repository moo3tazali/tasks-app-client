import React, { createContext } from 'react';
import { Services } from '.';

const ServicesContext = createContext<Services | null>(
  null
);

const ServicesProvider: React.FC<{
  children: React.ReactNode;
  services: Services;
}> = ({ children, services }) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesProvider, ServicesContext };
