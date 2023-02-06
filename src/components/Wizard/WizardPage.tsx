import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Alert,
  AlertVariant,
  AlertGroup,
  Button,
  Page,
  PageSection,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Wizard,
  WizardFooter,
  WizardContextConsumer
} from '@patternfly/react-core';
import { CreateWizardProvider } from '../../providers/CreateWizardProvider';
import CreateWizard from './CreateWizard';

const WizardPage = () => {
  return (
    <>
      <PageSection>
        <TextContent>
          <Text component={'h1'}>Create cache wizard</Text>
          <Text>Create by completing form</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <CreateWizardProvider>
          <CreateWizard />
        </CreateWizardProvider>
      </PageSection>
    </>
  );
};

export default WizardPage;
