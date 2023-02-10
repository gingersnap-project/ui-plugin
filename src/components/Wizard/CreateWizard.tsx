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
import GettingStarted from './GettingStarted';
import CacheType from './CacheType';
import LazyKeyFormat from './LazyKeyFormat';
import CacheDetails from './CacheDetails';
import EagerKeyFormat from './EagerKeyFormat';
import Review from './Review';
import { createConfigFromData } from '../../utils/crConfig';
import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import { useHistory } from 'react-router-dom';
import { load } from 'js-yaml';
import { GingersnapCache, GingersnapEagerCacheRule, GingersnapLazyCacheRule } from '../../utils/models';

const CreateWizard = () => {
  const { configuration } = useCreateWizard();
  const defaultNotification = { title: '', variant: AlertVariant.default };
  const [notification, setNotification] = useState(defaultNotification);
  const history = useHistory();

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
    enableNext: false,
    canJumpTo: stepIdReached >= 1,
    hideBackButton: true
  };

  const stepDataCapture = {
    id: 2,
    name: 'Data capture',
    component: <CacheType />,
    enableNext: configuration.dataCaptureMethod.valid
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
    component: <Review />,
    canJumpTo: false
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
      if (configuration.dataCaptureMethod.cacheType === 'lazy') {
        setStateObj(
          {
            showLazyCache: true,
            showEagerCache: false
          },
          () => callback()
        );
      } else if (configuration.dataCaptureMethod.cacheType === 'eager') {
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
    if (configuration.dataCaptureMethod.cacheType === 'lazy') {
      setStateObj(
        {
          ...stateObj,
          showEagerCache: false
        },
        () => callback()
      );
    } else if (configuration.dataCaptureMethod.cacheType === 'eager') {
      setStateObj(
        {
          ...stateObj,
          showLazyCache: false
        },
        () => callback()
      );
    }
  };

  const isButtonNextDisabled = (activeStepId: number): boolean => {
    let activeButton = true;
    switch (activeStepId) {
      case 1:
        activeButton = configuration.start.valid;
        break;
      case 2:
        activeButton = configuration.dataCaptureMethod.valid;
        break;
      case 3:
        activeButton = configuration.lazyKeyFormat.valid;
        break;
      case 4:
        activeButton = configuration.cacheDetails.valid;
        break;
      default:
    }

    return !activeButton;
  };

  const nextOrCreateToolbarItem = (activeStep, onNext) => {
    const activeStepId = activeStep.id;
    const buttonId = activeStepId === 6 ? 'create-cache' : 'next-step';
    return (
      <ToolbarItem>
        <Button
          id={buttonId}
          name={buttonId}
          variant="primary"
          type="submit"
          onClick={(event) => getNextStep(event, activeStep, onNext)}
          isDisabled={isButtonNextDisabled(activeStep.id)}
          data-cy="wizardNextButton"
        >
          {activeStepId === 6 ? 'Create' : 'Next'}
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

  const createK8SResource = (content, model) => {
    k8sCreate({ model: GingersnapLazyCacheRule, data: content })
      .then((e) => {
        setNotification({
          title: `${e.metadata.name} is created`,
          variant: AlertVariant.success
        });
        history.push(`resources`);
      })
      .catch((e) => {
        setNotification({ title: e.message, variant: AlertVariant.danger });
        console.error(e);
      });
  };

  const onSave = () => {
    const config = load(createConfigFromData(configuration));
    const model = configuration.dataCaptureMethod.cacheType === 'lazy' ? 'LazyCacheRule' : 'EagerCacheRule';

    createK8SResource(config, model);
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
    <>
      {notification.title !== '' && (
        <Alert title={notification.title} variant={notification.variant} isInline actionClose />
      )}
      <Wizard
        navAriaLabel={`steps`}
        mainAriaLabel={`content`}
        onClose={() => console.log('close')}
        onSave={onSave}
        steps={steps}
        footer={CustomFooter}
      />
    </>
  );
};

export default CreateWizard;