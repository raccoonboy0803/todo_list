import styled from 'styled-components';

interface CardProps {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
  onDelete: (id: number) => void;
  onDone: (id: number, isDone: boolean) => void;
}

function Card({ id, title, content, isDone, onDelete, onDone }: CardProps) {
  return (
    <CardWrap>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
      <CardButton onClick={() => onDelete(id)}>삭제하기</CardButton>
      <CardButton onClick={() => onDone(id, !isDone)}>
        {isDone ? '취소' : '완료'}
      </CardButton>
    </CardWrap>
  );
}
export default Card;

const CardWrap = styled.div`
  width: 30%;
  height: 200px;
  border: 3px solid green;
  border-radius: 10px;
  padding: 20px;
`;
const CardTitle = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;
const CardContent = styled.p`
  font-size: 18px;
  margin-bottom: 50px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardButton = styled.button`
  margin-right: 10px;
  border: 2px solid green;
  border-radius: 5px;
  background-color: transparent;
  width: 45%;
  height: 30px;
`;
