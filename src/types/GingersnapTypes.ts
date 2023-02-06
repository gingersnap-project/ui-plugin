interface ConnectionDetail {
  name?: string;
  type?: string;
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: string;
}

interface GettingStartedState {
  createMethod: 'create' | 'existing';
  connectionMethod: 'rhoda' | 'define' | 'existing';
  rhodaConnection?: string;
  connectionDetail?: ConnectionDetail;
  existingConnection?: string;
  existingCache?: string;
}

interface LazyKeyFormat {
  queryString?: string;
  keyFormat?: string;
  keySeperator?: string;
}

interface CacheDetails {
  cacheName?: string;
  dataSetSize?: number;
  diskTradeoff?: number;
  deploymentType?: string;
}

interface EagerKeyFormat {
  table?: string;
  fields?: string;
  keys?: string;
  values?: string;
  keyFormat?: string;
  keySeperator?: string;
}

interface WizardConfiguration {
  start: GettingStartedState;
  dataCaptureMethod: 'lazy' | 'eager';
  lazyKeyFormat?: LazyKeyFormat;
  eagerKeyFormat?: EagerKeyFormat;
  cacheDetails?: CacheDetails;
}
