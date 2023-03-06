import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormSection,
  Select,
  SelectVariant,
  SelectOption,
  Slider,
  TextInput
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';
import { DBType } from '../../utils/gingersnapRefData';

const CacheBasicInfo = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [cacheName, setCacheName] = useState(configuration.cacheDetails.cacheName);
  const [dbType, setDBType] = useState(configuration.cacheDetails.dbType);
  const [secretRef, setSecretRef] = useState(configuration.cacheDetails.secretRef);
  const [dataSetSize, setDataSetSize] = useState(configuration.cacheDetails.dataSetSize);
  const [diskTradeoff, setDiskTradeoff] = useState(configuration.cacheDetails.diskTradeoff);
  const [deploymentType, setDeploymentType] = useState(configuration.cacheDetails.deploymentType);

  const [isOpenDBType, setIsOpenDBType] = useState(false);
  const [isOpenDeploymentType, setIsOpenDeploymentType] = useState(false);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        cacheDetails: {
          ...prevState.cacheDetails,
          cacheName: cacheName,
          dbType: dbType,
          secretRef: secretRef,
          dataSetSize: dataSetSize,
          diskTradeoff: diskTradeoff,
          deploymentType: deploymentType,
          valid: validate()
        }
      };
    });
  }, [cacheName, dbType, secretRef, dataSetSize, diskTradeoff, deploymentType]);

  const validate = () => {
    let valid = true;
    valid = valid && cacheName.length > 0;
    valid = valid && dbType.length > 0;
    valid = valid && secretRef.length > 0;

    return valid;
  };

  const onSelectDeploymentType = (event, selection, placeholder) => {
    setDeploymentType(selection);
    setIsOpenDeploymentType(false);
  };

  const dbTypeOptions = () => {
    return Object.keys(DBType).map((key) => {
      return <SelectOption key={key} value={DBType[key]} />;
    });
  };

  const onSelectDBType = (event, selection, placeholder) => {
    setDBType(selection);
    setIsOpenDBType(false);
  };

  const formCacheDetails = () => {
    return (
      <FormSection title={'Cache Details'} titleElement="h3">
        <FormGroup fieldId="cache-name" label={'Cache name'} isInline isRequired>
          <TextInput value={cacheName} onChange={setCacheName} type="text" />
        </FormGroup>
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
      </FormSection>
    );
  };

  const formDeploymentSettings = () => {
    return (
      <FormSection title={'Deployment Settings'} titleElement="h3">
        <FormGroup label={'Estimated data set size'} fieldId="data-set-size" isInline>
          <TextInput type="text" value={dataSetSize} onChange={(e) => setDataSetSize(parseInt(e))} />
        </FormGroup>
        <FormGroup label={'RAM/Disk Tradeoff'} fieldId="disk-tradeoff">
          <Slider hasTooltipOverThumb value={diskTradeoff} onChange={setDiskTradeoff} />
        </FormGroup>
        <FormGroup label={'Deployment Type'} fieldId="deployment-type" isInline>
          <Select
            placeholderText="Deployment Type"
            variant={SelectVariant.single}
            onToggle={() => setIsOpenDeploymentType(!isOpenDeploymentType)}
            onSelect={onSelectDeploymentType}
            selections={deploymentType}
            isOpen={isOpenDeploymentType}
          >
            <SelectOption key={0} value="Deployment Type"></SelectOption>
            <SelectOption key={1} value="Deployment Type 2"></SelectOption>
            <SelectOption key={2} value="Deployment Type 3"></SelectOption>
          </Select>
        </FormGroup>
      </FormSection>
    );
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      {formCacheDetails()}
      {formDeploymentSettings()}
    </Form>
  );
};

export default CacheBasicInfo;
