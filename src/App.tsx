import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Card from './components/Card';

export interface ITodo {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}

function App() {
  let nextId = useRef(0);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const onAdd = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const title = titleRef.current ? titleRef.current.value : '';
    const content = contentRef.current ? contentRef.current.value : '';

    if (title === '' || content === '') return;

    const newTodo: ITodo = {
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

      <Form>
        <InputWrap>
          <label htmlFor="inputTitle">제목</label>
          <Input id="inputTitle" ref={titleRef}></Input>
          <label htmlFor="inputContent">내용</label>
          <Input id="inputContent" ref={contentRef}></Input>
        </InputWrap>
        <Button onClick={onAdd}>추가하기</Button>
      </Form>

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
const Form = styled.form`
  background-color: lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-bottom: 30px;
`;

const InputWrap = styled.div`
  margin-left: 100px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 250px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-right: 100px;
  background-color: green;
  width: 100px;
  border: none;
  height: 30px;
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
