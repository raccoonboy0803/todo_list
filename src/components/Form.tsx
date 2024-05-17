import React, { useRef } from 'react';
import styled from 'styled-components';
import { onAddProps } from '../App';

interface FormProps {
  onAdd: ({ e, titleRef, contentRef }: onAddProps) => void;
}

function Form({ onAdd }: FormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  return (
    <FormWrap>
      <InputWrap>
        <label htmlFor="inputTitle">제목</label>
        <Input id="inputTitle" ref={titleRef}></Input>
        <label htmlFor="inputContent">내용</label>
        <Input id="inputContent" ref={contentRef}></Input>
      </InputWrap>
      <Button
        onClick={(e: React.FormEvent<HTMLButtonElement>) =>
          onAdd({ e, titleRef, contentRef })
        }
      >
        추가하기
      </Button>
    </FormWrap>
  );
}

export default Form;

const FormWrap = styled.form`
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
