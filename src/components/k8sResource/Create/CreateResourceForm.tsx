import * as React from 'react';
import { Suspense } from 'react';
import { load } from 'js-yaml';
import { Flex, Page, PageSection, Spinner, TextContent, Text } from '@patternfly/react-core';
import { ResourceYAMLEditor } from '@openshift-console/dynamic-plugin-sdk';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

// eslint-disable-next-line react/prop-types
const CreateResourceForm = ({ onCreate, initialResourceYAML, setModelType }) => {
  const [data, setData] = React.useState();
  const [select, setSelect] = React.useState<string>('Cache');
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);

  React.useEffect(() => {
    setModelType(select);
  }, [select]);

  React.useEffect(() => {
    setData(initialResourceYAML);
  }, [initialResourceYAML]);

  const onSave = (content: string) => {
    setData(load(content));
    onCreate(load(content));
  };

  return (
    <>
      <TextContent>
        <Text component="h1">Create Resource</Text>
        <Text component="p">
          Create by completing the form. Default values may be provided by the Operator authors.
        </Text>
      </TextContent>
      <Page>
        <Select
          variant={SelectVariant.single}
          aria-label="Select Input"
          onToggle={() => setIsSelectOpen(!isSelectOpen)}
          onSelect={(event, selection) => setSelect(selection.toString())}
          selections={select}
          isOpen={isSelectOpen}
          width={'10%'}
        >
          <SelectOption key={0} value="Cache" />
          <SelectOption key={1} value="Lazy" />
          <SelectOption key={2} value="Eager" />
        </Select>
        <Suspense fallback={<Spinner />}>
          <ResourceYAMLEditor initialResource={data} header="Create resource" onSave={onSave} />
        </Suspense>
      </Page>
    </>
  );
};

export { CreateResourceForm };
