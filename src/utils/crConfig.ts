import { CRType } from '../utils/gingersnapRefData';

export const createConfigFromData = (data: WizardConfiguration) => {
  const config = (kind: string, name: string) => {
    return {
      apiVersion: 'gingersnap-project.io/v1alpha1',
      kind: kind,
      metadata: {
        name: name,
        namespace: 'openshift-operators'
      },
      spec: {}
    };
  };

  const cacheDetails = {
    dataSource: {
      dbType: data.cacheDetails.dbType,
      secretRef: {
        name: data.cacheDetails.secretRef
      }
    }
  };

  const lazyCacheConfig = (format: string, keySeperator: string, query: string) => {
    return {
      cacheRef: {
        name: data.cacheDetails.cacheName,
        namespace: 'openshift-operators'
      },
      key: {
        format: format,
        keySeparator: keySeperator
      },
      query: query
    };
  };

  const eagerCacheConfig = (format: string, keySeperator: string, keys: string[], values: string[], table: string) => {
    return {
      cacheRef: {
        name: data.cacheDetails.cacheName,
        namespace: 'openshift-operators'
      },
      key: {
        format: format,

        keySeparator: keySeperator,
        keyColumns: keys
      },
      value: {
        valueColumns: values
      },
      tableName: table
    };
  };

  const cache = config('Cache', data.cacheDetails.cacheName);
  cache['spec'] = Object.assign(cache['spec'], cacheDetails);

  const eagerCacheRules = data.cacheRules.eagerCacheRules.map((rule) => {
    const eagerCache = config('EagerCacheRule', rule.name);
    eagerCache['spec'] = Object.assign(
      eagerCache['spec'],
      eagerCacheConfig(rule.keyFormat, rule.keySeperator, rule.keys, rule.values, rule.table)
    );
    return JSON.stringify(eagerCache, null, 2);
  });

  const lazyCacheRules = data.cacheRules.lazyCacheRules.map((rule) => {
    const lazyCache = config('LazyCacheRule', rule.name);
    lazyCache['spec'] = Object.assign(
      lazyCache['spec'],
      lazyCacheConfig(rule.keyFormat, rule.keySeperator, rule.queryString)
    );
    return JSON.stringify(lazyCache, null, 2);
  });

  const result = {
    cache: JSON.stringify(cache, null, 2),
    eagerCacheRules: eagerCacheRules,
    lazyCacheRules: lazyCacheRules
  };

  return result;
};
