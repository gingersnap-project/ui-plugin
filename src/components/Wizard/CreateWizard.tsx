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
import { createConfigFromData } from '../../utils/crConfig';
import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import { useHistory } from 'react-router-dom';
import { load } from 'js-yaml';
import { GingersnapCache, GingersnapEagerCacheRule, GingersnapLazyCacheRule } from '../../utils/models';
import { CRType } from '../../utils/gingersnapRefData';
import GettingStarted from './GettingStarted';
import CacheBasicInfo from './CacheBasicInfo';
import CacheRules from './CacheRules';
import Review from './Review';

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

  const stepCacheDetails = {
    id: 2,
    name: 'Cache details',
    component: <CacheBasicInfo />,
    enableNext: configuration.cacheDetails.valid
  };

  const stepCacheRules = {
    id: 3,
    name: 'Cache rules',
    component: <CacheRules />
  };

  const stepReview = {
    id: 4,
    name: 'Review',
    component: <Review />,
    canJumpTo: false
  };

  const steps = [
    stepGettingStarted,
    ...(configuration.start.valid ? [stepCacheDetails, stepCacheRules] : []),
    stepReview
  ];

  const getNextStep = (event, activeStep, callback) => {
    event.stopPropagation();
    if (activeStep.id === 2) {
      if (configuration.cacheRules.ruleType === CRType.Lazy) {
        setStateObj(
          {
            showLazyCache: true,
            showEagerCache: false
          },
          () => callback()
        );
      } else if (configuration.cacheRules.ruleType === CRType.Eager) {
        setStateObj(
          {
            showLazyCache: false,
            showEagerCache: true
          },
          () => callback()
        );
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  const getPreviousStep = (event, activeStep, callback) => {
    event.stopPropagation();
    if (configuration.cacheRules.ruleType === CRType.Lazy) {
      setStateObj(
        {
          ...stateObj,
          showEagerCache: false
        },
        () => callback()
      );
    } else if (configuration.cacheRules.ruleType === CRType.Eager) {
      setStateObj(
        {
          ...stateObj,
          showLazyCache: false
        },
        () => callback()
      );
    } else {
      callback();
    }
  };

  const isButtonNextDisabled = (activeStepId: number): boolean => {
    let activeButton = true;
    switch (activeStepId) {
      case 1:
        activeButton = configuration.start.valid;
        break;
      case 2:
        activeButton = configuration.cacheDetails.valid;
        break;
      default:
    }

    return !activeButton;
  };

  const nextOrCreateToolbarItem = (activeStep, onNext) => {
    const activeStepId = activeStep.id;
    const buttonId = activeStepId === 4 ? 'create-cache' : 'next-step';
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
          {activeStepId === 4 ? 'Create' : 'Next'}
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
    k8sCreate({ model: model, data: content })
      .then((e) => {
        history.push(`resources`);
        const actionResponse = {
          message: 'Cache created successfully',
          success: true,
          data: e.metadata.name
        };
        return actionResponse;
      })
      .then((actionResponse) => {
        console.log('actionResponse', actionResponse);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onSave = () => {
    const config = createConfigFromData(configuration);
    const cacheConfig = load(config.cache);
    const eagerConfigs = config.eagerCacheRules.map((e) => load(e));
    const lazyConfigs = config.lazyCacheRules.map((e) => load(e));

    createK8SResource(cacheConfig, GingersnapCache);
    eagerConfigs.forEach((e) => createK8SResource(e, GingersnapEagerCacheRule));
    lazyConfigs.forEach((e) => createK8SResource(e, GingersnapLazyCacheRule));
  };

  const closeWizard = () => {
    history.push('resources');
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
      onClose={closeWizard}
      onSave={onSave}
      steps={steps}
      footer={CustomFooter}
    />
  );
};

export default CreateWizard;
