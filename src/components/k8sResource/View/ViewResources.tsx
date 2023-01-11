import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  ListPageHeader,
  ListPageBody,
  ListPageFilter,
  ListPageCreateLink,
  useListPageFilter,
  VirtualizedTable,
  TableData,
  Timestamp
} from '@openshift-console/dynamic-plugin-sdk';
import { GingersnapCache, GingersnapEagerCacheRule, GingersnapLazyCacheRule } from '../../../utils/models';
import { useListResources } from '../../../services/resourcesHook';

const columns = [
  {
    title: 'Name',
    id: 'name'
  },
  {
    title: 'Kind',
    id: 'kind'
  },
  {
    title: 'Namespace',
    id: 'namespace'
  },
  {
    title: 'Create',
    id: 'created'
  }
];

const ViewResources = () => {
  const [caches, cacheLoadError, cacheLoading] = useListResources({ model: GingersnapCache });
  const [eagerCacheRule, eagerLoadError, eagerLoading] = useListResources({ model: GingersnapEagerCacheRule });
  const [lazyCacheRule, lazyLoadError, lazyLoading] = useListResources({ model: GingersnapLazyCacheRule });

  const [resources, setResources] = useState([]);
  const [data, filteredData, onFilterChange] = useListPageFilter(resources);

  useEffect(() => {
    setResources([...caches, ...eagerCacheRule, ...lazyCacheRule]);
  }, [cacheLoading, eagerLoading, lazyLoading]);

  return (
    <>
      <ListPageHeader title="Gingersnap k8s Resources">
        <ListPageCreateLink to={'create-resource'}>Create Resource</ListPageCreateLink>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter
          data={data}
          loaded={cacheLoading || eagerLoading || lazyLoading}
          onFilterChange={onFilterChange}
        />
        <VirtualizedTable
          data={filteredData}
          unfilteredData={data}
          columns={columns}
          loaded={cacheLoading || eagerLoading || lazyLoading}
          loadError={cacheLoadError}
          Row={({ obj, activeColumnIDs, rowData }) => (
            <>
              <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
                {obj['metadata']['name']}
              </TableData>
              <TableData id={columns[1].id} activeColumnIDs={activeColumnIDs}>
                {obj['kind']}
              </TableData>
              <TableData id={columns[2].id} activeColumnIDs={activeColumnIDs}>
                {obj['metadata']['namespace']}
              </TableData>
              <TableData id={columns[3].id} activeColumnIDs={activeColumnIDs}>
                <Timestamp timestamp={obj['metadata']['creationTimestamp']} />
              </TableData>
            </>
          )}
        />
        {console.log('caches', caches)}
        {console.log('eagerCacheRule', eagerCacheRule)}
        {console.log('resources', resources)}
        {console.log('eagerLoadError', eagerLoadError)}
        {console.log('lazyLoadError', lazyLoadError)}
      </ListPageBody>
    </>
  );
};

export default ViewResources;
