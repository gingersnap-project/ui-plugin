import * as React from 'react';
import { useState, useEffect } from 'react';
import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import { Alert, AlertVariant, AlertGroup, Page, PageSection } from '@patternfly/react-core';
import { CreateResourceForm } from './CreateResourceForm';
import { useHistory } from 'react-router-dom';
import { GingersnapCache } from '../../../utils/models';
import { cache, eager, lazy } from '../../../utils/initialResource';

const CreateResource = () => {
  const defaultNotification = { title: '', variant: AlertVariant.default };
  const [modelType, setModelType] = useState('Cache');
  let initialResourceYAML: any = cache;
  const history = useHistory();

  useEffect(() => {
    if (modelType === 'Cache') initialResourceYAML = cache;
    else if (modelType === 'Eager') initialResourceYAML = eager;
    else if (modelType === 'Lazy') initialResourceYAML = lazy;
  }, [modelType]);

  const [notification, setNotification] = useState(defaultNotification);

  const createK8SResource = (content) => {
    k8sCreate({ model: GingersnapCache, data: content })
      .then((e) => {
        setNotification({
          title: `${e.metadata.name} is created`,
          variant: AlertVariant.success
        });
        history.push(`resources`);
      })
      .catch((e) => {
        setNotification({ title: e.message, variant: AlertVariant.danger });
        console.error(e);
      });
  };

  return (
    <Page>
      <PageSection>
        {notification.title !== '' && (
          <Alert title={notification.title} variant={notification.variant} isInline actionClose />
        )}
        <CreateResourceForm
          onCreate={createK8SResource}
          initialResourceYAML={initialResourceYAML}
          setModelType={setModelType}
        />
      </PageSection>
      {console.log('modelType', typeof modelType)}
      {console.log('intiial', initialResourceYAML)}
    </Page>
  );
};

export default CreateResource;
