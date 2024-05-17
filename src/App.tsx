import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Card from './components/Card';
import Form from './components/Form';

export interface TodoProps {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}

export interface onAddProps {
  e: React.FormEvent<HTMLButtonElement>;
  titleRef: React.RefObject<HTMLInputElement>;
  contentRef: React.RefObject<HTMLInputElement>;
}

function App() {
  let nextId = useRef(0);
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const onAdd = ({ e, titleRef, contentRef }: onAddProps) => {
    e.preventDefault();
    const title = titleRef.current ? titleRef.current.value : '';
    const content = contentRef.current ? contentRef.current.value : '';

    if (title === '' || content === '') {
      alert('제목과 내용을 모두 입력후 추가해주세요');
      return;
    }

    const newTodo: TodoProps = {
      id: ++nextId.current,
      title,
      content,
      isDone: false,
    };
    setTodos([...todos, newTodo]);

    if (titleRef.current) titleRef.current.value = '';
    if (contentRef.current) contentRef.current.value = '';
  };

  const onDelete = (id: number) => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  };

  const onDone = (id: number, isDone: boolean) => {
    const updateTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: isDone };
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  return (
    <Container>
      <Header>My Todo List</Header>

      <Form onAdd={onAdd} />

      <p>Working...🔥</p>
      <Working>
        {todos.map((todo) => {
          if (!todo.isDone) {
            return (
              <Card
                key={todo.id}
                {...todo}
                onDelete={onDelete}
                onDone={onDone}
              />
            );
          }
        })}
      </Working>

      <p>Done..!👍</p>
      <Done>
        {todos.map((todo) => {
          if (todo.isDone) {
            return (
              <Card
                key={todo.id}
                {...todo}
                onDelete={onDelete}
                onDone={onDone}
              />
            );
          }
        })}
      </Done>
    </Container>
  );
}

export default App;

const Container = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  vertical-align: center;
`;

const Working = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 100px;
`;

const Done = styled.div`
  width: 100%;
  display: flex;
`;
