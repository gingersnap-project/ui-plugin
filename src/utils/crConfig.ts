export const createConfigFromData = (data: WizardConfiguration) => {
  const kind = data.dataCaptureMethod.cacheType === 'lazy' ? 'LazyCacheRule' : 'EagerCacheRule';
  let config = {
    apiVersion: 'gingersnap-project.io/v1alpha1',
    kind: kind,
    metadata: {
      name: data.dataCaptureMethod.crName,
      namespace: 'openshift-operators'
    },
    spec: {
      cacheRef: {
        name: data.cacheDetails.cacheName,
        namespace: 'openshift-operators'
      }
    }
  };

  const lazyCache = {
    key: {
      format: data.lazyKeyFormat.keyFormat,
      keySeparator: data.lazyKeyFormat.keySeperator
    },
    query: data.lazyKeyFormat.queryString
  };

  const eagerCache = {
    key: {
      format: data.eagerKeyFormat.keyFormat,
      keySeperator: data.eagerKeyFormat.keySeperator,
      keyColumns: data.eagerKeyFormat.keys
    },
    // value: {
    //   valueColumns: data.eagerKeyFormat.values
    // },
    tableName: data.eagerKeyFormat.table
  };

  data.dataCaptureMethod.cacheType === 'lazy'
    ? (config['spec'] = Object.assign(config['spec'], lazyCache))
    : (config['spec'] = Object.assign(config['spec'], eagerCache));

  return JSON.stringify(config, null, 2);
};
