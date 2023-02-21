import * as React from 'react';
import { useState, createContext } from 'react';

const ConnectionDetail: ConnectionDetail = {};

const GettingStartedInitialState: GettingStartedState = {
  createMethod: undefined,
  valid: false
};

const DataCaptureMethodInitialState: DataCaptureMethod = {
  cacheType: '',
  crName: '',
  valid: false
};

const LazyKeyFormatInitialState: LazyKeyFormat = {
  queryString: '',
  valid: false
};

const CacheDetailsInitialState: CacheDetails = {
  cacheName: '',
  valid: false
};

const EagerKeyFormatInitialState: EagerKeyFormat = {
  table: '',
  keys: [],
  values: [],
  valid: false
};

const CacheCRInfoInitialState: CacheCRInfo = {
  dbType: '',
  secretRef: '',
  valid: false
};

const wizardConfigurationInitialState: WizardConfiguration = {
  start: GettingStartedInitialState,
  dataCaptureMethod: DataCaptureMethodInitialState,
  cacheCRInfo: CacheCRInfoInitialState,
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
