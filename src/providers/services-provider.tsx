import React, { createContext } from 'react';

import { TServices } from '@/services';

const ServicesContext = createContext<TServices | null>(null);

const ServicesProvider: React.FC<{
  children: React.ReactNode;
  services: TServices;
}> = ({ children, services }) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesProvider, ServicesContext };
