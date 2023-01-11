import * as React from 'react';
import { useState } from 'react';
import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import { Alert, AlertVariant, AlertGroup, Page, PageSection } from '@patternfly/react-core';
import { CreateResourceForm } from './CreateResourceForm';
import { useHistory } from 'react-router-dom';
import { GingersnapCache } from '../../../utils/models';

const CreateResource = () => {
  // const namespace = 'default';
  const defaultNotification = { title: '', variant: AlertVariant.default };
  const history = useHistory();

  const initialResourceYAML = {
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

  //states
  const [notification, setNotification] = useState(defaultNotification);

  const createK8SResource = (content) => {
    k8sCreate({ model: GingersnapCache, data: content })
      .then(() => {
        setNotification(defaultNotification);
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
        {notification.title && (
          <AlertGroup>
            <Alert title={notification.title} variant={notification.variant} isInline actionClose />
          </AlertGroup>
        )}
        <CreateResourceForm onCreate={createK8SResource} initialResourceYAML={initialResourceYAML} />
      </PageSection>
    </Page>
  );
};

export default CreateResource;
