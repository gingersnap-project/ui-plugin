import { CRType } from '../utils/gingersnapRefData';

export const createConfigFromData = (data: WizardConfiguration) => {
  const kind =
    data.dataCaptureMethod.cacheType === CRType.Cache ? 'Cache' : CRType.Eager ? 'EagerCacheRule' : 'LazyCacheRule';

  const config = {
    apiVersion: 'gingersnap-project.io/v1alpha1',
    kind: kind,
    metadata: {
      name: data.dataCaptureMethod.crName,
      namespace: 'openshift-operators'
    },
    spec: {}
  };

  const cache = {
    dataSource: {
      dbType: data.cacheCRInfo.dbType,
      secretRef: {
        name: data.cacheCRInfo.secretRef
      }
    }
  };

  const lazyCache = {
    cacheRef: {
      name: data.cacheDetails.cacheName,
      namespace: 'openshift-operators'
    },
    key: {
      format: data.lazyKeyFormat.keyFormat,
      keySeparator: data.lazyKeyFormat.keySeperator
    },
    query: data.lazyKeyFormat.queryString
  };

  const eagerCache = {
    cacheRef: {
      name: data.cacheDetails.cacheName,
      namespace: 'openshift-operators'
    },
    key: {
      format: data.eagerKeyFormat.keyFormat,
      keySeperator: data.eagerKeyFormat.keySeperator,
      keyColumns: data.eagerKeyFormat.keys
    },
    value: {
      valueColumns: data.eagerKeyFormat.values
    },
    tableName: data.eagerKeyFormat.table
  };

  data.dataCaptureMethod.cacheType === CRType.Lazy
    ? (config['spec'] = Object.assign(config['spec'], lazyCache))
    : data.dataCaptureMethod.cacheType === CRType.Eager
    ? (config['spec'] = Object.assign(config['spec'], eagerCache))
    : (config['spec'] = Object.assign(config['spec'], cache));

  return JSON.stringify(config, null, 2);
};
