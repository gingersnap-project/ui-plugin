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

  const [isKeyFormatOpen, setIsKeyFormatOpen] = useState(false);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        lazyKeyFormat: {
          queryString: queryString,
          keyFormat: keyFormat,
          keySeperator: keySeperator,
          valid: queryString.length > 0
        }
      };
    });
  }, [queryString, keyFormat, keySeperator]);

  const keyValue = keySeperator && `<key1> ${keySeperator} <key2>`;

  const onSelectTable = (event, selection, placeholder) => {
    setKeyFormat(selection);
    setIsKeyFormatOpen(false);
  };

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
        <FormGroup isRequired label="Query string" fieldId="query-string" isInline>
          <TextInput type="text" value={queryString} onChange={setQueryString} />
        </FormGroup>
        <FormGroup label="Key format" fieldId="key-format" isInline>
          <Select
            placeholderText="Choose format"
            variant={SelectVariant.single}
            onToggle={() => setIsKeyFormatOpen(!isKeyFormatOpen)}
            onSelect={onSelectTable}
            selections={keyFormat}
            isOpen={isKeyFormatOpen}
          >
            <SelectOption key={0} value="Text"></SelectOption>
            <SelectOption key={1} value="JSON"></SelectOption>
          </Select>
        </FormGroup>
        <FormGroup label="Key seperator" fieldId="key-seperator" isInline>
          <TextInput type="text" value={keySeperator} onChange={setKeySeperator} />
        </FormGroup>
      </FormSection>
    </Form>
  );
};

export default LazyKeyFormat;