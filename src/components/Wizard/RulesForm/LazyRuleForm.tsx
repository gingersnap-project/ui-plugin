import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Select, SelectVariant, SelectOption, TextInput } from '@patternfly/react-core';

const LazyRuleForm = (props: { rule; setRule }) => {
  const [queryString, setQueryString] = useState(props.rule.queryString);
  const [keyFormat, setKeyFormat] = useState(props.rule.keyFormat);
  const [keySeperator, setKeySeperator] = useState(props.rule.keySeperator);

  const [isKeyFormatOpen, setIsKeyFormatOpen] = useState(false);

  useEffect(() => {
    props.setRule({ ...props.rule, queryString, keyFormat, keySeperator });
  }, [queryString, keyFormat, keySeperator]);

  const onSelectKeyFormat = (event, selection, placeholder) => {
    setKeyFormat(selection);
    setIsKeyFormatOpen(false);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormGroup isRequired label="Query string" fieldId="query-string" isInline>
        <TextInput type="text" value={queryString} onChange={setQueryString} />
      </FormGroup>
      <FormGroup label="Key format" fieldId="key-format" isInline>
        <Select
          placeholderText="Choose format"
          variant={SelectVariant.single}
          onToggle={() => setIsKeyFormatOpen(!isKeyFormatOpen)}
          onSelect={onSelectKeyFormat}
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
    </Form>
  );
};

export default LazyRuleForm;
