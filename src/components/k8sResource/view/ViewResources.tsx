import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  ListPageHeader,
  ListPageBody,
  ListPageFilter,
  ListPageCreateLink,
  useListPageFilter,
  VirtualizedTable,
  useK8sModel,
  k8sListItems,
  TableData,
  Timestamp
} from '@openshift-console/dynamic-plugin-sdk';

const columns = [
  {
    title: 'Name',
    id: 'name'
  },
  {
    title: 'Create',
    id: 'created'
  }
];

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<any>();
  const [model] = useK8sModel({ group: 'app', version: 'v1', kind: 'ConfigMap' });
  const [data, filteredData, onFilterChange] = useListPageFilter(resources);

  useEffect(() => {
    setLoading(false);
    k8sListItems({
      model: model,
      queryParams: { ns: 'default' }
    })
      .then((resources) => {
        setResources(resources);
      })
      .catch((e) => {
        setLoadError(e.message);
        console.error('failed');
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return (
    <>
      <ListPageHeader title="k8s Resources">
        <ListPageCreateLink to={'create-resource'}>Create Resource</ListPageCreateLink>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter data={data} loaded={loading} onFilterChange={onFilterChange} />
        <VirtualizedTable
          data={filteredData}
          unfilteredData={data}
          columns={columns}
          loaded={loading}
          loadError={loadError}
          Row={({ obj, activeColumnIDs, rowData }) => (
            <>
              <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
                {obj.metadata.name}
              </TableData>
              <TableData id={columns[1].id} activeColumnIDs={activeColumnIDs}>
                <Timestamp timestamp={obj.metadata.creationTimestamp} />
              </TableData>
            </>
          )}
        />
      </ListPageBody>
    </>
  );
};

export default ViewResources;
