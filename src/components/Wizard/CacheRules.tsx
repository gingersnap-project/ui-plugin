import * as React from 'react';
import { useState, useEffect } from 'react';
import { Accordion, Form, FormGroup, FormSection, Radio, TextInput } from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';
import { Button } from '@patternfly/react-core';
import EagerRuleForm from './RulesForm/EagerRuleForm';
import LazyRuleForm from './RulesForm/LazyRuleForm';
import RuleAccordion from './RulesForm/RuleAccordion';

const CacheBasicInfo = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [eagerCacheRules, setEagerCacheRules] = useState<EagerCacheRule[]>(configuration.cacheRules.eagerCacheRules);
  const [lazyCacheRules, setLazyCacheRules] = useState<LazyCacheRule[]>(configuration.cacheRules.lazyCacheRules);

  const [expanded, setExpanded] = useState('');

  const [ruleType, setRuleType] = useState(configuration.cacheRules.ruleType);
  const [lazyRule, setLazyRule] = useState<LazyCacheRule>(configuration.cacheRules.lazyRule);
  const [eagerRule, setEagerRule] = useState<EagerCacheRule>(configuration.cacheRules.eagerRule);

  const [lazyName, setLazyName] = useState('');
  const [eagerName, setEagerName] = useState('');

  useEffect(() => {
    setLazyRule((prevState) => {
      return {
        ...prevState,
        name: lazyName
      };
    });
    setEagerRule((prevState) => {
      return {
        ...prevState,
        name: eagerName
      };
    });
  }, [lazyName, eagerName]);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        cacheRules: {
          ...prevState.cacheRules,
          ruleType: ruleType,
          eagerCacheRules: eagerCacheRules,
          lazyCacheRules: lazyCacheRules,
          eagerRule: eagerRule,
          lazyRule: lazyRule
        }
      };
    });
  }, [ruleType, eagerCacheRules, lazyCacheRules, eagerRule, lazyRule]);

  const addRule = () => {
    if (ruleType === 'eager' && !eagerCacheRules.find((r) => r.name === eagerRule.name))
      setEagerCacheRules([...eagerCacheRules, eagerRule]);
    else if (ruleType === 'lazy' && !lazyCacheRules.find((r) => r.name === lazyRule.name))
      setLazyCacheRules([...lazyCacheRules, lazyRule]);

    setLazyName('');
    setEagerName('');
    // setEagerRule(EagerRuleInitialState);
    // setLazyRule(LazyRuleInitialState);
  };

  const formEagerCacheRules = () => {
    return (
      <FormSection title={'Eager cache rules'} titleElement={'h3'}>
        {eagerCacheRules?.length > 0 && (
          <Accordion asDefinitionList={false}>
            {eagerCacheRules.map((rule, id) => {
              const keyAccordian = 'eager-' + id;
              return (
                <RuleAccordion
                  key={keyAccordian}
                  rule={rule}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  setRules={setEagerCacheRules}
                  ruleType={'eager'}
                />
              );
            })}
          </Accordion>
        )}
      </FormSection>
    );
  };

  const formLazyCacheRules = () => {
    return (
      <FormSection title={'Lazy cache rules'} titleElement={'h3'}>
        {lazyCacheRules?.length > 0 && (
          <Accordion asDefinitionList={false}>
            {lazyCacheRules.map((rule, id) => {
              const keyAccordian = 'lazy-' + id;
              return (
                <RuleAccordion
                  key={keyAccordian}
                  rule={rule}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  setRules={setLazyCacheRules}
                  ruleType={'lazy'}
                />
              );
            })}
          </Accordion>
        )}
      </FormSection>
    );
  };

  const formCreateRules = () => {
    return (
      <FormSection title="Cache rules" titleElement="h3">
        <FormGroup label={'Type of rule'} fieldId="rule-type" isInline>
          <Radio
            name="rule-type-radio"
            id="lazy"
            onChange={() => {
              setRuleType('lazy');
            }}
            isChecked={ruleType === 'lazy'}
            label="Lazy cache rule"
          />
          <Radio
            name="rule-type-radio"
            id="eager"
            onChange={() => {
              setRuleType('eager');
            }}
            isChecked={ruleType === 'eager'}
            label="Eager cache rule"
          />
        </FormGroup>
        {ruleType === 'lazy' ? (
          <>
            <FormGroup fieldId="lazy-name" label={'Name'} isInline isRequired>
              <TextInput value={lazyName} onChange={setLazyName} type="text" />
            </FormGroup>

            <LazyRuleForm rule={lazyRule} setRule={setLazyRule} />
          </>
        ) : ruleType === 'eager' ? (
          <>
            <FormGroup fieldId="eager-name" label={'Name'} isInline isRequired>
              <TextInput value={eagerName} onChange={setEagerName} type="text" />
            </FormGroup>
            <EagerRuleForm rule={eagerRule} setRule={setEagerRule} />
          </>
        ) : (
          <></>
        )}

        {ruleType !== '' && (
          <Button variant="primary" onClick={addRule}>
            Add rule
          </Button>
        )}
      </FormSection>
    );
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      {formCreateRules()}
      {lazyCacheRules.length > 0 && formLazyCacheRules()}
      {eagerCacheRules.length > 0 && formEagerCacheRules()}
    </Form>
  );
};

export default CacheBasicInfo;
