import * as React from 'react';
import Helmet from 'react-helmet';
import {
  Page,
  PageSection,
  Text,
  TextContent,
  Title,
  Button,
} from '@patternfly/react-core';
import './example.css';
import CreateResource from './k8sResource/Create/CreateResource';

export default function GingersnapPage() {
  const [openCreateCounterForm, setOpenCreateCounterForm] =
    React.useState(false);
  return (
    <>
      <Helmet>
        <title>Gingersnap</title>
      </Helmet>
      <Page>
        <PageSection variant="light">
          <Title headingLevel="h1">Gingersnap</Title>
        </PageSection>
        <PageSection variant="light">
          <TextContent>
            <Text component="h4">
              <span className="console-plugin-template__nice">Nice!!</span> Your
              plugin is working.
            </Text>
            <Button variant="primary" onClick={()=> setOpenCreateCounterForm(!openCreateCounterForm)}>Create Resource</Button>
          </TextContent>
        </PageSection>

        {openCreateCounterForm && (
          <PageSection variant="light">
            <CreateResource />
          </PageSection>
        )}
      </Page>
    </>
  );
}
