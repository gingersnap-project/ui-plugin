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

interface EagerCacheRule {
  name: string;
  table?: string;
  keys?: string[];
  values?: string[];
  keyFormat?: string;
  keySeperator?: string;
}

interface LazyCacheRule {
  name: string;
  queryString?: string;
  keyFormat?: string;
  keySeperator?: string;
}

interface CacheDetails {
  cacheName: string;
  dbType: string;
  secretRef: string;
  dataSetSize?: number;
  diskTradeoff?: number;
  deploymentType?: string;
  valid: boolean;
}

interface CacheRules {
  ruleType?: string;
  ruleName?: string;
  eagerCacheRules?: EagerCacheRule[];
  lazyCacheRules?: LazyCacheRule[];
  eagerRule?: EagerCacheRule;
  lazyRule?: LazyCacheRule;
  valid: boolean;
}

interface WizardConfiguration {
  start: GettingStartedState;
  cacheDetails?: CacheDetails;
  cacheRules?: CacheRules;
}
