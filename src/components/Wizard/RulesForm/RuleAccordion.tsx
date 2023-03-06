import * as React from 'react';
import { useState, useEffect } from 'react';
import { AccordionItem, AccordionContent, AccordionToggle } from '@patternfly/react-core';
import LazyRuleForm from './LazyRuleForm';
import EagerRuleForm from './EagerRuleForm';

const RuleAccordion = (props: { keyAccordian?; rule?; expanded?; setExpanded?; setRules?; ruleType? }) => {
  const key = props.keyAccordian;
  const [rule, setRule] = useState(props.rule);

  useEffect(() => {
    props.setRules((prevState) => {
      const newState = prevState.map((item) => {
        if (item.name === rule.name) {
          return rule;
        } else {
          return item;
        }
      });
      return newState;
    });
  }, [rule]);

  const onToggle = (id: string) => {
    if (id === props.expanded) {
      props.setExpanded('');
    } else {
      props.setExpanded(id);
    }
  };

  return (
    <AccordionItem key={key}>
      <AccordionToggle
        onClick={() => {
          onToggle(key);
        }}
        isExpanded={props.expanded === key}
        id={key}
      >
        {rule.name}
      </AccordionToggle>
      <AccordionContent isHidden={props.expanded !== key} id={key + '-content'}>
        {props.ruleType === 'eager' ? (
          <EagerRuleForm rule={rule} setRule={setRule} />
        ) : props.ruleType === 'lazy' ? (
          <LazyRuleForm rule={rule} setRule={setRule} />
        ) : (
          <></>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default RuleAccordion;
