import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';

export const GingersnapCache: K8sModel = {
  apiGroup: 'gingersnap-project.io',
  apiVersion: 'v1alpha1',
  kind: 'Cache',
  label: 'Cache',
  labelPlural: 'Caches',
  plural: 'caches',
  abbr: 'C',
  namespaced: true
};

export const GingersnapEagerCacheRule: K8sModel = {
  apiGroup: 'gingersnap-project.io',
  apiVersion: 'v1alpha1',
  kind: 'EagerCacheRule',
  label: 'EagerCacheRule',
  labelPlural: 'EagerCacheRules',
  plural: 'eagercacherules',
  abbr: 'E',
  namespaced: true
};

export const GingersnapLazyCacheRule: K8sModel = {
  apiGroup: 'gingersnap-project.io',
  apiVersion: 'v1alpha1',
  kind: 'LazyCacheRule',
  label: 'LazyCacheRule',
  labelPlural: 'LazyCacheRules',
  plural: 'lazycacherules',
  abbr: 'L',
  namespaced: true
};
