import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  DragDrop,
  Draggable,
  Droppable,
  Split,
  SplitItem,
  Form,
  FormGroup,
  FormSection,
  Flex,
  FlexItem,
  Page,
  PageSection,
  Radio,
  Select,
  SelectVariant,
  SelectOption,
  TextContent,
  Text,
  TextInput
} from '@patternfly/react-core';
import { useCreateWizard } from '../../services/createWizardHook';

const getItems = (count: number, startIndex: number) =>
  Array.from({ length: count }, (_, idx) => idx + startIndex).map((idx) => ({
    id: `item-${idx}`,
    content: `item ${idx} `.repeat(idx === 4 ? 20 : 1)
  }));

const reorder = (list, startIndex: number, endIndex: number) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, sourceIndex: number, destIndex: number) => {
  const sourceClone = source;
  const destClone = destination;
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);
  return [sourceClone, destClone];
};

const EagerKeyFormat = () => {
  const { configuration, setConfiguration } = useCreateWizard();

  const [items, setItems] = React.useState({
    items1: getItems(10, 0),
    items2: getItems(5, 10)
  });

  const [table, setTable] = useState(configuration.eagerKeyFormat.table);
  const [isOpenTable, setIsOpenTable] = useState(false);

  const onSelectTable = (event, selection, placeholder) => {
    setTable(selection);
    setIsOpenTable(false);
  };

  const onDrop = (source, dest) => {
    // eslint-disable-next-line no-console
    console.log(source, dest);
    if (dest) {
      if (source.droppableId === dest.droppableId) {
        const newItems = reorder(
          source.droppableId === 'items1' ? items.items1 : items.items2,
          source.index,
          dest.index
        );
        if (source.droppableId === 'items1') {
          setItems({
            items1: newItems,
            items2: items.items2
          });
        } else {
          setItems({
            items1: items.items1,
            items2: newItems
          });
        }
      } else {
        const [newItems1, newItems2] = move(
          source.droppableId === 'items1' ? items.items1 : items.items2,
          dest.droppableId === 'items1' ? items.items1 : items.items2,
          source.index,
          dest.index
        );
        setItems({
          items1: source.droppableId === 'items1' ? newItems1 : newItems2,
          items2: dest.droppableId === 'items1' ? newItems1 : newItems2
        });
      }
      return true;
    }
    return false;
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormSection title="Eager" titleElement="h3">
        <FormGroup label="Table" fieldId="table" isInline>
          <Select
            placeholderText="Choose table"
            variant={SelectVariant.single}
            onToggle={() => setIsOpenTable(!isOpenTable)}
            onSelect={onSelectTable}
            selections={table}
            isOpen={isOpenTable}
          >
            <SelectOption key={0} value="Table 1"></SelectOption>
            <SelectOption key={1} value="Table 2"></SelectOption>
            <SelectOption key={2} value="Table 3"></SelectOption>
          </Select>
        </FormGroup>
      </FormSection>
      <FormSection title={'Fields'}>
        <DragDrop onDrop={onDrop}>
          <Split hasGutter>
            {Object.entries(items).map(([key, subitems]) => (
              <SplitItem key={key} style={{ flex: 1 }}>
                <Droppable zone="multizone" droppableId={key}>
                  {subitems.map(({ id, content }) => (
                    <Draggable key={id} style={{ padding: '8px' }}>
                      {content}
                    </Draggable>
                  ))}
                </Droppable>
              </SplitItem>
            ))}
          </Split>
        </DragDrop>
      </FormSection>
    </Form>
  );
};

export default EagerKeyFormat;
