import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Alert,
  AlertVariant,
  AlertGroup,
  Button,
  Page,
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Wizard,
  WizardFooter,
  WizardContextConsumer
} from '@patternfly/react-core';
import { useStateCallback } from '../../services/stateCallbackHook';
import { useCreateWizard } from '../../services/createWizardHook';
import { CreateWizardProvider } from '../../providers/CreateWizardProvider';
import GettingStarted from './GettingStarted';
import CacheType from './CacheType';
import LazyKeyFormat from './LazyKeyFormat';
import CacheDetails from './CacheDetails';
import EagerKeyFormat from './EagerKeyFormat';
import Review from './Review';

const CreateWizard = () => {
  const { configuration } = useCreateWizard();

  const [stepIdReached, setStepIdReached] = useState(1);
  const [stateObj, setStateObj] = useStateCallback({
    showLazyCache: false,
    showEagerCache: false
  });

  // Steps
  const stepGettingStarted = {
    id: 1,
    name: 'Getting started',
    component: <GettingStarted />,
    enableNext: true,
    canJumpTo: stepIdReached >= 1,
    hideBackButton: true
  };

  const stepDataCapture = {
    id: 2,
    name: 'Data capture',
    component: <CacheType />
  };

  const stepLazyKeyFormat = {
    id: 3,
    name: 'Key format',
    component: <LazyKeyFormat />
  };

  const stepCacheDetails = {
    id: 4,
    name: 'Cache details',
    component: <CacheDetails />
  };

  const stepEagerKeyFormat = {
    id: 5,
    name: 'Key format',
    component: <EagerKeyFormat />
  };

  const stepReview = {
    id: 6,
    name: 'Review',
    component: <Review />
  };

  const steps = [
    stepGettingStarted,
    stepDataCapture,
    ...(stateObj.showLazyCache ? [stepLazyKeyFormat, stepCacheDetails] : []),
    ...(stateObj.showEagerCache ? [stepEagerKeyFormat] : []),
    stepReview
  ];

  const getNextStep = (event, activeStep, callback) => {
    event.stopPropagation();
    if (activeStep.id === 2) {
      if (configuration.dataCaptureMethod === 'lazy') {
        setStateObj(
          {
            showLazyCache: true,
            showEagerCache: false
          },
          () => callback()
        );
      } else if (configuration.dataCaptureMethod === 'eager') {
        setStateObj(
          {
            showLazyCache: false,
            showEagerCache: true
          },
          () => callback()
        );
      }
    } else {
      callback();
    }
  };

  const getPreviousStep = (event, activeStep, callback) => {
    event.stopPropagation();
    if (configuration.dataCaptureMethod === 'lazy') {
      setStateObj(
        {
          ...stateObj,
          showEagerCache: false
        },
        () => callback()
      );
    } else if (configuration.dataCaptureMethod === 'eager') {
      setStateObj(
        {
          ...stateObj,
          showLazyCache: false
        },
        () => callback()
      );
    }
  };

  const nextOrCreateToolbarItem = (activeStep, onNext) => {
    const activeStepId = activeStep.id;
    return (
      <ToolbarItem>
        <Button
          id={'create-cache'}
          name={'create-cache'}
          variant="primary"
          type="submit"
          onClick={(event) => getNextStep(event, activeStep, onNext)}
          data-cy="wizardNextButton"
        >
          Next
        </Button>
      </ToolbarItem>
    );
  };

  const backToolbarItem = (activeStep, onBack) => {
    if (activeStep.id === 1) {
      return '';
    }

    return (
      <ToolbarItem>
        <Button
          variant="secondary"
          onClick={(event) => getPreviousStep(event, activeStep, onBack)}
          data-cy="wizardBackButton"
        >
          Back
        </Button>
      </ToolbarItem>
    );
  };

  const cancelToolbarItem = (onClose) => {
    return (
      <ToolbarItem>
        <Button variant="link" onClick={onClose} data-cy="cancelWizard">
          Cancel
        </Button>
      </ToolbarItem>
    );
  };

  const CustomFooter = (
    <WizardFooter>
      <WizardContextConsumer>
        {({ activeStep, goToStepByName, goToStepById, onNext, onBack, onClose }) => {
          return (
            <>
              <Toolbar id="create-cache-wizard-toolbar">
                <ToolbarContent>
                  {nextOrCreateToolbarItem(activeStep, onNext)}
                  {backToolbarItem(activeStep, onBack)}
                  {cancelToolbarItem(onClose)}
                </ToolbarContent>
              </Toolbar>
            </>
          );
        }}
      </WizardContextConsumer>
    </WizardFooter>
  );

  return (
    <Wizard
      navAriaLabel={`steps`}
      mainAriaLabel={`content`}
      onClose={() => console.log('close')}
      // onSave={onSave}
      steps={steps}
      footer={CustomFooter}
    />
  );
};

export default CreateWizard;
