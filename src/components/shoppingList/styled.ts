import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  margin: auto;
  border-radius: 5px;
  padding: 1rem;
  border: 2px solid #ccc;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Header = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const AddButton = styled.button`
  height: 50px;
  padding: 0 10px;
  background-color: #0957ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
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

// export const Container = styled.div`
//   background-color: #fff;
//   padding: 16px;
//   border-radius: 4px;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
//   max-width: 600px;
//   margin: 0 auto;
// `;

// export const Title = styled.h2`
//   font-size: 24px;
//   margin-bottom: 16px;
// `;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ShoppingListItem = styled.li`
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

export const Button = styled.button`
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

export const InputContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;
