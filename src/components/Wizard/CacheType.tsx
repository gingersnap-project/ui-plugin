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
import { CRType } from '../../utils/gingersnapRefData';

const CacheType = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [cacheType, setCacheType] = useState(configuration.dataCaptureMethod.cacheType);
  const [crName, setCRName] = useState(configuration.dataCaptureMethod.crName);
  const [nameTitle, setNameTitle] = useState('');
  const [isOpenCacheType, setIsOpenCacheType] = useState(false);

  useEffect(() => {
    const name =
      cacheType === CRType.Cache
        ? 'Cache name'
        : cacheType === CRType.Eager
        ? 'Eager cache rule name'
        : cacheType === CRType.Lazy
        ? 'Lazy cache rule name'
        : '';

    setNameTitle(name);

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

  const onSelectCacheType = (event, selection, placeholder) => {
    setCacheType(selection);
    setIsOpenCacheType(false);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Type of data capture" titleElement="h3">
        <FormGroup fieldId="cache-type" isInline isRequired>
          <Select
            placeholderText="Select type of cache to create"
            variant={SelectVariant.single}
            onToggle={() => setIsOpenCacheType(!isOpenCacheType)}
            onSelect={onSelectCacheType}
            selections={cacheType}
            isOpen={isOpenCacheType}
          >
            <SelectOption key={0} value={CRType.Cache}></SelectOption>
            <SelectOption key={1} value={CRType.Lazy}></SelectOption>
            <SelectOption key={2} value={CRType.Eager}></SelectOption>
          </Select>
        </FormGroup>
      </FormSection>
      {cacheType !== '' && (
        <FormSection title={nameTitle}>
          <FormGroup fieldId="name" label={nameTitle} isInline isRequired>
            <TextInput value={crName} onChange={setCRName} type="text" />
          </FormGroup>
        </FormSection>
      )}
    </Form>
  );
};

export default CacheType;
