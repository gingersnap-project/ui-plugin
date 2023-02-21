import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Select, SelectVariant, SelectOption, TextInput } from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';
import { DBType } from '../../utils/gingersnapRefData';

const CacheCRInfo = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [dbType, setDBType] = useState(configuration.cacheCRInfo.dbType);
  const [secretRef, setSecretRef] = useState(configuration.cacheCRInfo.secretRef);
  const [isOpenDBType, setIsOpenDBType] = useState(false);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        cacheCRInfo: {
          dbType: dbType,
          secretRef: secretRef,
          valid: secretRef.length > 0 && dbType.length > 0
        }
      };
    });
  }, [dbType, secretRef]);

  const dbTypeOptions = () => {
    return Object.keys(DBType).map((key) => {
      return <SelectOption key={key} value={DBType[key]} />;
    });
  };

  const onSelectDBType = (event, selection, placeholder) => {
    setDBType(selection);
    setIsOpenDBType(false);
  };
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormGroup isRequired fieldId="dbType" label="DB Type">
        <Select
          placeholderText="Select DB Type"
          variant={SelectVariant.single}
          onToggle={setIsOpenDBType}
          onSelect={onSelectDBType}
          selections={dbType}
          isOpen={isOpenDBType}
        >
          {dbTypeOptions()}
        </Select>
      </FormGroup>
      <FormGroup isRequired fieldId="secretRef" label="Secret Ref name">
        <TextInput value={secretRef} onChange={setSecretRef} type="text" id="secretRef" />
      </FormGroup>
    </Form>
  );
};

export default CacheCRInfo;
