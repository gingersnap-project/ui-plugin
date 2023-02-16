import * as React from 'react';
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Stack,
  StackItem,
  Text,
  TextContent
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';

const ReviewSummary = () => {
  const { configuration } = useCreateWizard();

  return (
    <>
      <Stack>
        <StackItem>
          <TextContent>
            <Text component="small">Name</Text>
          </TextContent>
        </StackItem>
        <StackItem>
          <TextContent>
            <Text component="h2">{configuration.dataCaptureMethod.crName}</Text>
          </TextContent>
        </StackItem>
      </Stack>
      <DescriptionList
        isCompact
        isHorizontal
        horizontalTermWidthModifier={{
          default: '12ch',
          sm: '15ch',
          md: '20ch',
          lg: '28ch',
          xl: '30ch',
          '2xl': '35ch'
        }}
      >
        <TextContent>
          <Text component="small">Cache details</Text>
        </TextContent>
        <DescriptionListGroup>
          <DescriptionListTerm>Name</DescriptionListTerm>
          <DescriptionListDescription>{configuration.cacheDetails.cacheName}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Namespace</DescriptionListTerm>
          <DescriptionListDescription>{'openshift-operators'}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Deployment type</DescriptionListTerm>
          <DescriptionListDescription>{configuration.cacheDetails.deploymentType || '-'}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>DB vendor</DescriptionListTerm>
          <DescriptionListDescription>{'MySQl'}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Connection type</DescriptionListTerm>
          <DescriptionListDescription>{configuration.start.connectionMethod || '-'}</DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
      <DescriptionList
        isCompact
        isHorizontal
        horizontalTermWidthModifier={{
          default: '12ch',
          sm: '15ch',
          md: '20ch',
          lg: '28ch',
          xl: '30ch',
          '2xl': '35ch'
        }}
      >
        <TextContent>
          <Text component="small">Rules</Text>
        </TextContent>
        <DescriptionListGroup>
          <DescriptionListTerm>Name</DescriptionListTerm>
          <DescriptionListDescription>Example</DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </>
  );
};

export default ReviewSummary;
