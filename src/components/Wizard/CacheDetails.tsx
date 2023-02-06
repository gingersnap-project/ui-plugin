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
  Slider,
  TextInput
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';

const CacheDetails = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [cacheName, setCacheName] = useState(configuration.cacheDetails.cacheName);
  const [dataSetSize, setDataSetSize] = useState(configuration.cacheDetails.dataSetSize);
  const [diskTradeoff, setDiskTradeoff] = useState(configuration.cacheDetails.diskTradeoff);
  const [deploymentType, setDeploymentType] = useState(configuration.cacheDetails.deploymentType);

  const [isOpenDeploymentType, setIsOpenDeploymentType] = useState(false);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        cacheDetails: {
          cacheName: cacheName,
          dataSetSize: dataSetSize,
          diskTradeoff: diskTradeoff,
          deploymentType: deploymentType
        }
      };
    });
  }, [cacheName, dataSetSize, diskTradeoff, deploymentType]);

  const onSelectDeploymentType = (event, selection, placeholder) => {
    setDeploymentType(selection);
    setIsOpenDeploymentType(false);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Cache details" titleElement="h3">
        <FormGroup label={'Cache name'} fieldId="cache-name" isInline>
          <TextInput type="text" value={cacheName} onChange={setCacheName} />
        </FormGroup>
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
    </Form>
  );
};

export default CacheDetails;
