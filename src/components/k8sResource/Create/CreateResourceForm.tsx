import * as React from 'react';
import { Suspense } from 'react';
import { load } from 'js-yaml';
import { Page, Spinner } from '@patternfly/react-core';
import { ResourceYAMLEditor } from '@openshift-console/dynamic-plugin-sdk';

// eslint-disable-next-line react/prop-types
const CreateResourceForm = ({ onCreate, initialResourceYAML }) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    setData(initialResourceYAML);
  }, [initialResourceYAML]);

  const onSave = (content: string) => {
    setData(load(content));
    onCreate(load(content));
  };

  return (
    <Page>
      <Suspense fallback={<Spinner />}>
        <ResourceYAMLEditor initialResource={data} header="Create resource" onSave={onSave} />
      </Suspense>
    </Page>
  );
};

export { CreateResourceForm };
