import React, { useState, useEffect } from 'react';
import {Wrapper,Header, AddButton, ButtonContainer, List, ShoppingListItem, Input, InputContainer, Button} from './styled';

type ShoppingItem = {
  name: string;
  quantity: number;
};

const ShoppingListApp: React.FC<{ initialItems: ShoppingItem[] }> = ({
  initialItems,
}) => {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);

  // Save the draft items in the local storage
  useEffect(() => {
    localStorage.setItem('draftItems', JSON.stringify(items));
  }, [items]);

  const handleIncrement = (itemName: string) => {
    const updatedItems = items.map((item) =>
      item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  const handleDecrement = (itemName: string) => {
    const updatedItems = items
      .map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const handleAddItem = (itemName: string) => {
    const existingItem = items.find((item) => item.name === itemName);
    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      );
      setItems(updatedItems);
    } else {
      const newItem = { name: itemName, quantity: 1 };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Replace non-ASCII characters with appropriate ASCII characters
    const asciiName = event.target.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    setDraftName(asciiName);
  };

  const [draftName, setDraftName] = useState<string>('');

  // Load the draft items from the local storage
  useEffect(() => {
    const draftItems = localStorage.getItem('draftItems');
    if (draftItems) {
      setItems(JSON.parse(draftItems));
    }
  }, []);

  const sortedItems = [...items].sort((a, b) => b.quantity - a.quantity);

  const isInputEmpty = draftName.trim() === '';

  return (
    <Wrapper>
      <Header>Shopping List</Header>
      <List>
        {sortedItems.map((item) => (
          <ShoppingListItem key={item.name}>
            {item.name} - quantity: {item.quantity}{' '}
            <ButtonContainer>
              <Button onClick={() => handleIncrement(item.name)}>+</Button>{' '}
              <Button onClick={() => handleDecrement(item.name)}>-</Button>
            </ButtonContainer>
          </ShoppingListItem>
        ))}
      </List>
      <InputContainer>
        <Input
          type="text"
          value={draftName}
          onChange={handleNameChange}
          placeholder="Enter item name"
        />
        <AddButton disabled={isInputEmpty} onClick={() => {
          handleAddItem(draftName);
          setDraftName('');
        }}>Add item</AddButton>
      </InputContainer>
    </Wrapper>
  );
};


export default ShoppingListApp;
