import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExaminations, Examination } from '$frontend/features/examinations';

type Props = {
  examination: Examination;
};

const Item: React.FC<Props> = ({ examination }) => {
  switch (true) {
    case (!!examination.answeredAt):
      return <li>{`${examination.answeredAt} 回答済み`}</li>
    case (!!examination.rememberedAt):
      return <li>{`${examination.rememberedAt} 未回答`}</li>
    default:
      return <li>{`${examination.createdAt} 記憶中`}</li>
  }
};

export const Page: React.FC = () => {
  const [examinations, setExaminations] = useState<Examination[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setExaminations(await getExaminations());
      } catch {
        alert('failed to fetch problems.');
      }
    })();
  }, []);

  return (
    <>
      <ul>
        {examinations.map((examination, i) => {
          return <li><Item examination={examination} /></li>
        })}
      </ul>
      <Link to="/examination/take">テストを実施</Link>
    </>
  )
}
