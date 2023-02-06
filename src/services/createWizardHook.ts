import { useContext } from 'react';
import { CreateWizardContext } from '../providers/CreateWizardProvider';

export function useCreateWizard() {
  const { configuration, setConfiguration } = useContext(CreateWizardContext);
  return {
    configuration,
    setConfiguration
  };
}
