import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormSection,
  Page,
  PageSection,
  Radio,
  Select,
  SelectVariant,
  SelectOption,
  TextInput
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';

const GettingStarted = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [createMethod, setCreateMethod] = useState(configuration.start.createMethod);
  const [connectionMethod, setConnectionMethod] = useState(configuration.start.connectionMethod);

  const [rhodaConnection, setRhodaConnection] = useState<string>(configuration.start.rhodaConnection);
  const [isOpenRhodaConnection, setIsOpenRhodaConnection] = useState(false);

  const [connectionName, setConnectionName] = useState(configuration.start.connectionDetail?.name);
  const [connectionType, setConnectionType] = useState(configuration.start.connectionDetail?.type);
  const [connectionUsername, setConnectionUsername] = useState(configuration.start.connectionDetail?.username);
  const [connectionPassword, setConnectionPassword] = useState(configuration.start.connectionDetail?.password);
  const [connectionDatabase, setConnectionDatabase] = useState(configuration.start.connectionDetail?.database);
  const [connectionHost, setConnectionHost] = useState(configuration.start.connectionDetail?.host);
  const [connectionPort, setConnectionPort] = useState(configuration.start.connectionDetail?.port);

  const [existingConnection, setExistingConnection] = useState(configuration.start.existingConnection);
  const [isOpenExistingConnection, setIsOpenExistingConnection] = useState(false);

  const [existingCache, setExistingCache] = useState(configuration.start.existingCache);
  const [isOpenExistingCache, setIsOpenExistingCache] = useState(false);

  useEffect(() => {
    setConfiguration((prevState) => {
      return {
        ...prevState,
        start: {
          createMethod: createMethod,
          connectionMethod: connectionMethod,
          rhodaConnection: rhodaConnection,
          connectionDetail: {
            name: connectionName,
            type: connectionType,
            username: connectionUsername,
            password: connectionPassword,
            database: connectionDatabase,
            host: connectionHost,
            port: connectionPort
          },
          existingConnection: existingConnection,
          existingCache: existingCache,
          valid: createMethod !== undefined
        }
      };
    });
  }, [
    createMethod,
    connectionMethod,
    rhodaConnection,
    connectionName,
    connectionType,
    connectionUsername,
    connectionPassword,
    connectionDatabase,
    connectionHost,
    connectionPort,
    existingConnection,
    existingCache
  ]);

  const onSelectRhodaConnection = (event, selection, placeholder) => {
    setRhodaConnection(selection);
    setIsOpenRhodaConnection(false);
  };

  const formRhodaConnection = () => {
    return (
      <FormSection title="Select RHODA connection">
        <FormGroup fieldId="rhoda-connection" isInline isRequired>
          <Select
            placeholderText="Select a connection of RHODA"
            variant={SelectVariant.single}
            onToggle={() => setIsOpenRhodaConnection(!isOpenRhodaConnection)}
            onSelect={onSelectRhodaConnection}
            selections={rhodaConnection}
            isOpen={isOpenRhodaConnection}
          >
            <SelectOption key={0} value="RHODA Connection"></SelectOption>
            <SelectOption key={1} value="RHODA Connection 2"></SelectOption>
            <SelectOption key={2} value="RHODA Connection 3"></SelectOption>
          </Select>
        </FormGroup>
      </FormSection>
    );
  };

  const formDefineConnection = () => {
    return (
      <FormSection title="Connection details" titleElement="h3">
        <Form onSubmit={(e) => e.preventDefault()} isHorizontal>
          <FormGroup fieldId="connection-name" isInline label="Name">
            <TextInput
              type="text"
              value={connectionName}
              onChange={setConnectionName}
              aria-label="connection-name-input"
            />
          </FormGroup>
          <FormGroup fieldId="connection-type" isInline label="Type">
            <TextInput value={connectionType} onChange={setConnectionType} aria-label="connection-type-input" />
          </FormGroup>
          <FormGroup fieldId="connection-username" isInline label="Username">
            <TextInput
              type="text"
              value={connectionUsername}
              onChange={setConnectionUsername}
              aria-label="connection-username-input"
            />
          </FormGroup>
          <FormGroup fieldId="connection-password" isInline label="Password">
            <TextInput
              type="text"
              value={connectionPassword}
              onChange={setConnectionPassword}
              aria-label="connection-password-input"
            />
          </FormGroup>
          <FormGroup fieldId="connection-database" isInline label="Database">
            <TextInput
              type="text"
              value={connectionDatabase}
              onChange={setConnectionDatabase}
              aria-label="connection-database-input"
            />
          </FormGroup>
          <FormGroup fieldId="connection-host" isInline label="Host">
            <TextInput value={connectionHost} onChange={setConnectionHost} aria-label="connection-host-input" />
          </FormGroup>
          <FormGroup fieldId="connection-port" isInline label="Port">
            <TextInput value={connectionPort} onChange={setConnectionPort} aria-label="connection-port-input" />
          </FormGroup>
        </Form>
      </FormSection>
    );
  };

  const onSelectExistingConnection = (event, selection, placeholder) => {
    setExistingConnection(selection);
    setIsOpenExistingConnection(false);
  };

  const formExistingConnection = () => {
    return (
      <FormGroup fieldId="existing-connection" isInline isRequired>
        <Select
          placeholderText="Select an existing secret"
          variant={SelectVariant.single}
          onToggle={() => setIsOpenExistingConnection(!isOpenExistingConnection)}
          onSelect={onSelectExistingConnection}
          selections={existingConnection}
          isOpen={isOpenExistingConnection}
        >
          <SelectOption key={0} value="Existing Connection"></SelectOption>
          <SelectOption key={1} value="Existing Connection 2"></SelectOption>
          <SelectOption key={2} value="Existing Connection 3"></SelectOption>
        </Select>
      </FormGroup>
    );
  };

  const formConnection = () => {
    return (
      <>
        <FormSection title="How do you want to connect?" titleElement="h3">
          <FormGroup fieldId="connection-type" isInline isRequired>
            <Radio
              name="connection-type-radio"
              id="rhoda"
              onChange={() => {
                setConnectionMethod('rhoda');
              }}
              isChecked={connectionMethod === 'rhoda'}
              label="RHODA connection"
              description={'Description'}
            />
            <Radio
              name="connection-type-radio"
              id="define"
              onChange={() => {
                setConnectionMethod('define');
              }}
              isChecked={connectionMethod === 'define'}
              label="Define a connection"
              description={'Description'}
            />
            <Radio
              name="connection-type-radio"
              id="existing-secret"
              onChange={() => {
                setConnectionMethod('existing');
              }}
              isChecked={connectionMethod === 'existing'}
              label="Select an existing secret"
              description={'Description'}
            />
          </FormGroup>
        </FormSection>
        {connectionMethod === 'rhoda' ? (
          formRhodaConnection()
        ) : connectionMethod === 'define' ? (
          formDefineConnection()
        ) : connectionMethod === 'existing' ? (
          formExistingConnection()
        ) : (
          <></>
        )}
      </>
    );
  };

  const onSelectExistingCache = (event, selection, placeholder) => {
    setExistingCache(selection);
    setIsOpenExistingCache(false);
  };

  const formExistingCache = () => {
    return (
      <FormSection>
        <FormGroup fieldId="existing-cache" isInline isRequired>
          <Select
            placeholderText="Select existing cache"
            variant={SelectVariant.single}
            onToggle={() => setIsOpenExistingCache(!isOpenExistingCache)}
            onSelect={onSelectExistingCache}
            selections={existingCache}
            isOpen={isOpenExistingCache}
          >
            <SelectOption key={0} value="Existing cache"></SelectOption>
            <SelectOption key={1} value="Existing cache 2"></SelectOption>
            <SelectOption key={2} value="Existing cache 3"></SelectOption>
          </Select>
        </FormGroup>
      </FormSection>
    );
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Choose cache and connection type" titleElement="h3">
        <FormGroup fieldId="create-method" isInline isRequired>
          <Radio
            name="create-method-radio"
            id="create"
            onChange={() => {
              setCreateMethod('create');
            }}
            isChecked={createMethod === 'create'}
            label="Create Cache"
            description={'Description'}
          />
          <Radio
            isDisabled
            name="create-method-radio"
            id="existing-cache"
            onChange={() => {
              setCreateMethod('existing');
            }}
            isChecked={createMethod === 'existing'}
            label="Choose from existing cache"
            description={'Description'}
          />
        </FormGroup>
      </FormSection>
      {createMethod === 'create' ? formConnection() : createMethod === 'existing' ? formExistingCache() : <></>}
    </Form>
  );
};

export default GettingStarted;
