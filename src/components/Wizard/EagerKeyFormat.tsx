import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Flex,
  FlexItem,
  Form,
  FormGroup,
  FormSection,
  TextInput,
  Select,
  SelectVariant,
  SelectOption
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';

const EagerKeyFormat = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [table, setTable] = useState(configuration.eagerKeyFormat.table);
  const [isOpenTable, setIsOpenTable] = useState(false);

  const [keys, setKeys] = useState<string[]>(configuration.eagerKeyFormat.keys);
  const [isOpenKeys, setIsOpenKeys] = useState(false);

  const [values, setValues] = useState<string[]>(configuration.eagerKeyFormat.values);
  const [isOpenValues, setIsOpenValues] = useState(false);

  const [keySeperator, setKeySeperator] = useState(configuration.eagerKeyFormat.keySeperator);
  const [keyFormat, setKeyFormat] = useState(configuration.eagerKeyFormat.keyFormat);
  const [isOpenKeyFormat, setIsOpenKeyFormat] = useState(false);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        eagerKeyFormat: {
          table: table,
          keys: keys,
          values: values,
          keyFormat: keyFormat,
          keySeperator: keySeperator,
          valid: table.length > 0 && keys.length > 0
        }
      };
    });
  }, [table, keys, values, keyFormat, keySeperator]);

  const fields = [
    'Field 1',
    'Field 2',
    'Field 3',
    'Field 4',
    'Field 5',
    'Field 6',
    'Field 7',
    'Field 8',
    'Field 9',
    'Field 10',
    'Field 11'
  ];

  const onSelectTable = (event, selection, placeholder) => {
    setTable(selection);
    setIsOpenTable(false);
  };

  const onSelectKey = (event, selection, placeholder) => {
    let actualSelection;

    if (keys.includes(selection)) {
      actualSelection = keys.filter((item) => item !== selection);
    } else {
      actualSelection = [...keys, selection];
    }
    setKeys(actualSelection);
  };

  const onSelectValue = (event, selection, placeholder) => {
    let actualSelection;

    if (values.includes(selection)) {
      actualSelection = values.filter((item) => item !== selection);
    } else {
      actualSelection = [...values, selection];
    }
    setValues(actualSelection);
  };

  const fieldOptions = () => {
    return fields.map((field) => <SelectOption id={field} key={field} value={field} />);
  };

  const onSelectKeyFormat = (event, selection, placeholder) => {
    setKeyFormat(selection);
    setIsOpenKeyFormat(false);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Eager" titleElement="h3">
        <FormGroup isRequired label="Table" fieldId="table" isInline>
          <Select
            placeholderText="Choose table"
            variant={SelectVariant.single}
            onToggle={() => setIsOpenTable(!isOpenTable)}
            onSelect={onSelectTable}
            selections={table}
            isOpen={isOpenTable}
          >
            <SelectOption key={0} value="Table 1" />
            <SelectOption key={1} value="Table 2" />
            <SelectOption key={2} value="Table 3" />
          </Select>
        </FormGroup>
      </FormSection>
      <FormSection title={'Fields'}>
        <Flex fullWidth={{ default: 'fullWidth' }}>
          <FlexItem style={{ width: '15rem' }}>
            <FormGroup isRequired label={'Keys'} fieldId="key" isInline>
              <Select
                placeholderText="Choose keys"
                variant={SelectVariant.checkbox}
                onToggle={() => setIsOpenKeys(!isOpenKeys)}
                onSelect={onSelectKey}
                selections={keys}
                isOpen={isOpenKeys}
                maxHeight={200}
              >
                {fieldOptions()}
              </Select>
            </FormGroup>
          </FlexItem>
          <FlexItem style={{ width: '15rem' }}>
            <FormGroup label={'Values'} fieldId="value" isInline>
              <Select
                placeholderText="Choose values"
                variant={SelectVariant.checkbox}
                onToggle={() => setIsOpenValues(!isOpenValues)}
                onSelect={onSelectValue}
                selections={values}
                isOpen={isOpenValues}
                maxHeight={200}
              >
                {fieldOptions()}
              </Select>
            </FormGroup>
          </FlexItem>
        </Flex>
      </FormSection>
      <FormSection>
        <FormGroup label={'Key seperator'} fieldId="key-seperator">
          <TextInput aria-label="key-seperator" value={keySeperator} type="text" onChange={setKeySeperator} />
        </FormGroup>
        <FormGroup label={'Key format'} fieldId="key-format">
          <Select
            placeholderText="Choose format"
            variant={SelectVariant.single}
            onToggle={() => setIsOpenKeyFormat(!isOpenKeyFormat)}
            onSelect={onSelectKeyFormat}
            selections={keyFormat}
            isOpen={isOpenKeyFormat}
          >
            <SelectOption key={0} value="Text"></SelectOption>
            <SelectOption key={1} value="JSON"></SelectOption>
          </Select>
        </FormGroup>
      </FormSection>
    </Form>
  );
};

export default EagerKeyFormat;
