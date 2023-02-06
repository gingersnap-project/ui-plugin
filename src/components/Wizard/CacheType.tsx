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

  const [dataCaptureMethod, setDataCaptureMethod] = useState(configuration.dataCaptureMethod);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        dataCaptureMethod: dataCaptureMethod
      };
    });
  }, [dataCaptureMethod]);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Type of data capture" titleElement="h3">
        <FormGroup fieldId="data-capture" isInline isRequired>
          <Radio
            name="data-capture-radio"
            id="lazy"
            onChange={() => {
              setDataCaptureMethod('lazy');
            }}
            isChecked={dataCaptureMethod === 'lazy'}
            label="Lazy"
            description={'Description'}
          />
          <Radio
            name="data-capture-radio"
            id="eager"
            onChange={() => {
              setDataCaptureMethod('eager');
            }}
            isChecked={dataCaptureMethod === 'eager'}
            label="Eager"
            description={'Description'}
          />
        </FormGroup>
      </FormSection>
    </Form>
  );
};

export default CacheType;
