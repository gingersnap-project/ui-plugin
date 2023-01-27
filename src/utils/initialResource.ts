export const cache = {
  apiVersion: 'gingersnap-project.io/v1alpha1',
  kind: 'Cache',
  metadata: {
    name: 'cache-sample',
    namespace: 'openshift-operators'
  },
  spec: {
    dataSource: {
      dbType: 'MYSQL_8',
      secretRef: {
        name: 'db-credential-secret'
      }
    }
  }
};

export const eager = {
  apiVersion: 'gingersnap-project.io/v1alpha1',
  kind: 'EagerCacheRule',
  metadata: {
    name: 'eagercacherule-sample',
    namespace: 'openshift-operators'
  },
  spec: {
    cacheRef: {
      name: 'cache-sample',
      namespace: 'default',
      key: {
        keyColumns: '- col1'
      },
      tableName: 'table'
    }
  }
};

export const lazy = {
  apiVersion: 'gingersnap-project.io/v1alpha1',
  kind: 'LazyCacheRule',
  metadata: {
    name: 'caclazycacherulehe-sample',
    namespace: 'openshift-operators'
  },
  spec: {
    cacheRef: { name: 'cache-sample', namespace: 'default' },
    query: 'Select * FROM table'
  }
};
