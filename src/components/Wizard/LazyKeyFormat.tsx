import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormSection,
  Flex,
  FlexItem,
  Page,
  PageSection,
  Radio,
  Select,
  SelectVariant,
  SelectOption,
  TextContent,
  Text,
  TextInput
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';

const LazyKeyFormat = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [queryString, setQueryString] = useState(configuration.lazyKeyFormat.queryString);
  const [keyFormat, setKeyFormat] = useState(configuration.lazyKeyFormat.keyFormat);
  const [keySeperator, setKeySeperator] = useState(configuration.lazyKeyFormat.keySeperator);
  const [key, setKey] = useState('');

  useEffect(() => {
    setKey(queryString.concat(' : ', keyFormat, ' : ', keySeperator));
    setConfiguration((prevState) => {
      return {
        ...prevState,
        lazyKeyFormat: {
          queryString: queryString,
          keyFormat: keyFormat,
          keySeperator: keySeperator
        }
      };
    });
  }, [queryString, keyFormat, keySeperator]);

  const keyValue = queryString && keyFormat && keySeperator ? key : '';

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Type of data capture" titleElement="h3">
        <Flex>
          <FlexItem>
            <Text component="h3">Your key will look like:</Text>
          </FlexItem>
          <FlexItem>
            <TextInput value={keyValue} type="text" isReadOnly />
          </FlexItem>
        </Flex>
        <FormGroup label="Query string" fieldId="query-string" isInline>
          <TextInput type="text" value={queryString} onChange={setQueryString} />
        </FormGroup>
        <FormGroup label="Key format" fieldId="key-format" isInline>
          <TextInput type="text" value={keyFormat} onChange={setKeyFormat} />
        </FormGroup>
        <FormGroup label="Key seperator" fieldId="key-seperator" isInline>
          <TextInput type="text" value={keySeperator} onChange={setKeySeperator} />
        </FormGroup>
      </FormSection>
    </Form>
  );
};

export default LazyKeyFormat;
