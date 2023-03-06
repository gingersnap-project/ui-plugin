import * as React from 'react';
import { useState, useEffect } from 'react';
import { EmptyState, EmptyStateBody, EmptyStateIcon } from '@patternfly/react-core';
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
import { CubesIcon, SearchIcon } from '@patternfly/react-icons';
import { GingersnapCache, GingersnapEagerCacheRule, GingersnapLazyCacheRule } from '../../../utils/models';
import { useListResources } from '../../../services/resourcesHook';
import { useActiveNamespace, useDashboardResources } from '@openshift-console/dynamic-plugin-sdk-internal';

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
  const [activeNamespace] = useActiveNamespace();
  const [resources, setResources] = useState([]);
  const [data, filteredData, onFilterChange] = useListPageFilter(resources);

  useEffect(() => {
    setResources([...caches, ...eagerCacheRule, ...lazyCacheRule]);
  }, [cacheLoading, eagerLoading, lazyLoading]);

  const NoDataEmptyMsg = () => {
    return (
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <EmptyStateBody>No data available</EmptyStateBody>
      </EmptyState>
    );
  };

  const EmptyMsg = () => {
    return (
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <EmptyStateBody>No data found for applied filter</EmptyStateBody>
      </EmptyState>
    );
  };

  return (
    <>
      <ListPageHeader title="Gingersnap k8s Resources">
        <ListPageCreateLink to={'create-cache'}>Create Resource</ListPageCreateLink>
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
          NoDataEmptyMsg={NoDataEmptyMsg}
          EmptyMsg={EmptyMsg}
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
      </ListPageBody>
    </>
  );
};

export default ViewResources;
