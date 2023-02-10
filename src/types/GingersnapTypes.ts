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
  connectionMethod?: 'rhoda' | 'define' | 'existing';
  rhodaConnection?: string;
  connectionDetail?: ConnectionDetail;
  existingConnection?: string;
  existingCache?: string;
  valid: boolean;
}

interface DataCaptureMethod {
  cacheType: 'lazy' | 'eager';
  crName: string;
  valid: boolean;
}

interface LazyKeyFormat {
  queryString: string;
  keyFormat?: string;
  keySeperator?: string;
  valid: boolean;
}

interface CacheDetails {
  cacheName: string;
  dataSetSize?: number;
  diskTradeoff?: number;
  deploymentType?: string;
  valid: boolean;
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
  dataCaptureMethod: DataCaptureMethod;
  lazyKeyFormat?: LazyKeyFormat;
  eagerKeyFormat?: EagerKeyFormat;
  cacheDetails?: CacheDetails;
}
