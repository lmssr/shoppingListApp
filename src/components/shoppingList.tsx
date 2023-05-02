import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type ShoppingItem = {
  name: string;
  quantity: number;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: auto;
  padding: 1rem;
  border: 2px solid #ccc;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Header = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  height: 30px;
  padding: 0 10px;
  background-color: #0957ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 80px;

  & > button {
    margin: 0.5rem;
    background-color: #0957ff;
    border: none;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #0849c9;
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const Container = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ShoppingListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center; /* add vertical alignment */
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 1.5;

  button {
    padding: 5px 10px;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #0957ff; /* change button color */
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #0646d7;
    }
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #0957ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0066b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 16px;

  input[type='text'] {
    flex-grow: 1;
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    margin-right: 8px;
  }

  button[type='submit'] {
    font-size: 16px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 8px;
`;

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
        <AddButton onClick={() => {
          handleAddItem(draftName);
          setDraftName('');
        }}>Add item</AddButton>
      </InputContainer>
    </Wrapper>
  );
};


export default ShoppingListApp;
