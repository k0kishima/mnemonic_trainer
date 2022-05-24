import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { parse } from "query-string";
import { getExaminations, Examination } from '$frontend/features/examinations';
import { pages } from '$frontend/paths';

export const Page: React.FC = () => {
  const { t } = useTranslation();

  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [requestParams, setRequestParams] = useState({});

  const location = useLocation()
  useEffect(() => {
    const query = parse(window.location.search)
    switch (query.status) {
      case 'wait_for_answers':
        setRequestParams({ rememberedDate: '0000-01-01' });
        break;
      case 'done':
        setRequestParams({ answeredDate: '0000-01-01' });
        break;
      default:
        setRequestParams({});
        break;
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      try {
        setExaminations(await getExaminations(requestParams));
      } catch {
        alert('failed to fetch problems.');
      }
    })();
  }, [requestParams]);

  return (
    <>
      <ul>
        <li><Link to={ { pathname: pages.examination.index, search: 'status=memorizing' } }>{t('memorizing')}</Link></li>
        <li><Link to={ { pathname: pages.examination.index, search: 'status=wait_for_answers' } }>{t('wait_for_answers')}</Link></li>
        <li><Link to={ { pathname: pages.examination.index, search: 'status=done' } }>{t('done')}</Link></li>
      </ul>
      <ul>
        {examinations.map((examination, i) => {
          return <li key={i}>{`${examination.createdAt} ${t(examination.status)}`}</li>
        })}
      </ul>
      <Link to={pages.examination.take}>{t('take_examination')}</Link>
    </>
  )
}
