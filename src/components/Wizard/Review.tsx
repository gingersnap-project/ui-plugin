import * as React from 'react';
import { useState } from 'react';
import {
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  ClipboardCopyButton,
  Form,
  FormGroup,
  FormSection,
  Tabs,
  Tab,
  TabTitleText,
  TabTitleIcon
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';
import { createConfigFromData } from '../../utils/crConfig';
import YAML from 'yaml';
import { load } from 'js-yaml';

const Review = () => {
  const { configuration } = useCreateWizard();
  const yamlConfig = YAML.stringify(load(createConfigFromData(configuration)));
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
  const [copied, setCopied] = React.useState(false);

  const clipboardCopyFunc = (event, text) => {
    navigator.clipboard.writeText(text.toString());
  };

  const onClick = (event, text) => {
    clipboardCopyFunc(event, text);
    setCopied(true);
  };

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
          <CodeBlock
            actions={
              <CodeBlockAction>
                <ClipboardCopyButton
                  id="basic-copy-button"
                  textId="code-content"
                  aria-label="Copy to clipboard"
                  onClick={(e) => onClick(e, yamlConfig)}
                  exitDelay={copied ? 1500 : 600}
                  maxWidth="110px"
                  variant="plain"
                >
                  {copied ? 'Successfully copied to clipboard!' : 'Copy to clipboard'}
                </ClipboardCopyButton>
              </CodeBlockAction>
            }
          >
            <CodeBlockCode id="code-content">{yamlConfig}</CodeBlockCode>
          </CodeBlock>
        </Tab>
      </Tabs>
    </Form>
  );
};

export default Review;
