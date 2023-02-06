import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormSection,
  Tabs,
  Tab,
  TabTitleText,
  TabTitleIcon,
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
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);

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
      <Tabs
        isFilled
        activeKey={activeTabKey}
        onSelect={(event, tabIndex) => setActiveTabKey(tabIndex)}
        aria-label="Tabs in the filled with icons example"
        role="region"
      >
        <Tab
          eventKey={0}
          title={
            <>
              {/* <TabTitleIcon></TabTitleIcon> */}
              <TabTitleText>Summary</TabTitleText>
            </>
          }
          aria-label="filled tabs with icons content users"
        >
          <FormSection title="Cache details" titleElement="h3">
            <FormGroup fieldId="data-capture" isInline isRequired></FormGroup>
          </FormSection>
        </Tab>
        <Tab
          eventKey={1}
          title={
            <>
              {/* <TabTitleIcon></TabTitleIcon> */}
              <TabTitleText>Configuration</TabTitleText>
            </>
          }
        >
          <FormSection title="Configuration" titleElement="h3">
            <FormGroup fieldId="data-capture" isInline isRequired></FormGroup>
          </FormSection>
        </Tab>
      </Tabs>
    </Form>
  );
};

export default CacheType;
