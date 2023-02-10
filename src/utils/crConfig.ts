export const createConfigFromData = (data: WizardConfiguration) => {
  const kind = data.dataCaptureMethod.cacheType === 'lazy' ? 'LazyCacheRule' : 'EagerCacheRule';
  const config = {
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
      },
      key: {
        format: data.lazyKeyFormat.keyFormat,
        keySeparator: data.lazyKeyFormat.keySeperator
      },
      query: data.lazyKeyFormat.queryString
    }
  };
  return JSON.stringify(config, null, 2);
};
