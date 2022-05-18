import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { getExaminations, Examination, ExaminationStatus } from '$frontend/features/examinations';


export const Page: React.FC = () => {
  const { t } = useTranslation();

  const [examinations, setExaminations] = useState<Examination[]>([]);

  const getStatus = (examination: Examination): ExaminationStatus => {
    switch (true) {
      case (!!examination.answeredAt):
        return 'done';
      case (!!examination.rememberedAt):
        return 'wait_for_answers';
      default:
        return 'memorizing';
    }
  }

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
          const statusText = t(getStatus(examination));
          return <li key={i}>{`${examination.createdAt} ${statusText}`}</li>
        })}
      </ul>
      <Link to="/examination/take">{t('take_examination')}</Link>
    </>
  )
}
