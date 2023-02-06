import * as React from 'react';
import { useState, createContext } from 'react';

const ConnectionDetail: ConnectionDetail = {
  name: '',
  type: '',
  username: '',
  password: '',
  database: '',
  host: '',
  port: ''
};

const GettingStartedInitialState: GettingStartedState = {
  createMethod: undefined,
  connectionMethod: undefined,
  rhodaConnection: '',
  connectionDetail: ConnectionDetail,
  existingConnection: '',
  existingCache: ''
};

const LazyKeyFormatInitialState: LazyKeyFormat = {
  queryString: '',
  keyFormat: '',
  keySeperator: ''
};

const CacheDetailsInitialState: CacheDetails = {
  cacheName: '',
  dataSetSize: 0,
  diskTradeoff: 0,
  deploymentType: ''
};

const EagerKeyFormatInitialState: EagerKeyFormat = {
  table: ''
};

const wizardConfigurationInitialState: WizardConfiguration = {
  start: GettingStartedInitialState,
  dataCaptureMethod: undefined,
  lazyKeyFormat: LazyKeyFormatInitialState,
  cacheDetails: CacheDetailsInitialState,
  eagerKeyFormat: EagerKeyFormatInitialState
};

const initialContext = {
  configuration: wizardConfigurationInitialState,
  setConfiguration: (value: ((prevState: WizardConfiguration) => WizardConfiguration) | WizardConfiguration) => {}
};

export const CreateWizardContext = createContext(initialContext);

const CreateWizardProvider = ({ children }) => {
  const [configuration, setConfiguration] = useState<WizardConfiguration>(initialContext.configuration);
  const contextValue = {
    configuration: configuration,
    setConfiguration: setConfiguration
  };

  return <CreateWizardContext.Provider value={contextValue}>{children}</CreateWizardContext.Provider>;
};

export { CreateWizardProvider };
