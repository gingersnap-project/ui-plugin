import * as React from 'react';
import { useState, createContext } from 'react';

const LazyRuleInitialState: LazyCacheRule = {
  name: '',
  queryString: '',
  keyFormat: '',
  keySeperator: ''
};

const EagerRuleInitialState: EagerCacheRule = {
  name: '',
  table: '',
  keys: [],
  values: [],
  keyFormat: '',
  keySeperator: ''
};

const CacheRulesInitialState: CacheRules = {
  ruleType: '',
  ruleName: '',
  eagerCacheRules: [],
  lazyCacheRules: [],
  eagerRule: EagerRuleInitialState,
  lazyRule: LazyRuleInitialState,
  valid: false
};

const CacheDetailsInitialState: CacheDetails = {
  cacheName: '',
  dbType: '',
  secretRef: '',
  valid: false
};

const GettingStartedInitialState: GettingStartedState = {
  createMethod: undefined,
  valid: false
};

const wizardConfigurationInitialState: WizardConfiguration = {
  start: GettingStartedInitialState,
  cacheDetails: CacheDetailsInitialState,
  cacheRules: CacheRulesInitialState
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
