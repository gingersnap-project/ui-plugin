import * as React from 'react';
import { useState } from 'react';
import { k8sCreate, useK8sModel } from '@openshift-console/dynamic-plugin-sdk';

import {
  Alert,
  AlertVariant,
  AlertGroup,
  Page,
  PageSection,
} from '@patternfly/react-core';
import { CreateResourceForm } from './CreateResourceForm';

const CreateResource = () => {
  const namespace = 'default';
  const defaultNotification = { title: '', variant: AlertVariant.default };
  const [model] = useK8sModel({ group: 'app', version: 'v1', kind: 'ConfigMap' });

  const initialResourceYAML = {
    apiVersion: 'v1',
    kind: 'ConfigMap',
    metadata: {
      name: 'configMapTest',
      namespace
    },
    data: {
      deploymentPlan: { 
        image: 'placeholder',
        requireLogin: 'false',
        size: '1'
      }
    }
  }

  //states
  const [notification, setNotification] = useState(defaultNotification);

  const createK8SResource = (content) => {
    k8sCreate({ model: model, data: content })
      .then(() => {
        setNotification(defaultNotification);
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
            <Alert
              title={notification.title}
              variant={notification.variant}
              isInline
              actionClose
            />
          </AlertGroup>
        )}
        <CreateResourceForm
          onCreate={createK8SResource}
          initialResourceYAML={initialResourceYAML}
        />
      </PageSection>
    </Page>
  );
};

export default CreateResource;
