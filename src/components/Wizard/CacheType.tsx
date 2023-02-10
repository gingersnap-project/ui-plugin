import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormSection,
  Page,
  PageSection,
  Radio,
  Select,
  SelectVariant,
  SelectOption,
  TextInput
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';

const CacheType = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [cacheType, setCacheType] = useState(configuration.dataCaptureMethod.cacheType);
  const [crName, setCRName] = useState(configuration.dataCaptureMethod.crName);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        dataCaptureMethod: {
          cacheType: cacheType,
          crName: crName,
          valid: crName.length > 0
        }
      };
    });
  }, [cacheType, crName]);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Type of data capture" titleElement="h3">
        <FormGroup fieldId="cache-type" isInline isRequired>
          <Radio
            name="cache-type-radio"
            id="lazy"
            onChange={() => {
              setCacheType('lazy');
            }}
            isChecked={cacheType === 'lazy'}
            label="Lazy"
            description={'Description'}
          />
          <Radio
            name="cache-type-radio"
            id="eager"
            onChange={() => {
              setCacheType('eager');
            }}
            isChecked={cacheType === 'eager'}
            label="Eager"
            description={'Description'}
          />
        </FormGroup>
      </FormSection>
      <FormSection title="CR info">
        <FormGroup fieldId="cr-name" label={'CR Name'} isInline isRequired>
          <TextInput value={crName} onChange={setCRName} type="text" />
        </FormGroup>
      </FormSection>
    </Form>
  );
};

export default CacheType;
