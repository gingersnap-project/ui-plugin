import { useEffect, useState } from 'react';
import { k8sListItems, K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk-internal';

export function useListResources(props: { model: K8sModel }) {
  const [activeNamespace] = useActiveNamespace();
  const [resources, setResources] = useState([]);
  const [loadError, setLoadError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
    k8sListItems({
      model: props.model,
      queryParams: { ns: 'openshift-operators' }
    })
      .then((resources) => {
        setResources(resources);
      })
      .catch((e) => {
        setLoadError(e.message);
        console.error('failed', e);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return [resources, loadError, loading];
}
