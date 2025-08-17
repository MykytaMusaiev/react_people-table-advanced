import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import NoPeopleOnServerError from '../NoPeopleOnServerError';
import SomethingWrongError from '../SomethingWrongError';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const loadPeoples = async () => {
      try {
        setIsLoading(true);
        const peoplesList = await getPeople();

        setPeoples(peoplesList);
        setHasError(false);
      } catch (err) {
        setHasError(true);

        setPeoples([]);
      } finally {
        setIsLoading(false);
        setIsFirstLoad(false);
      }
    };

    loadPeoples();
  }, []);

  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="box table-container">
            {isLoading && <Loader />}
            {!isLoading && hasError && <SomethingWrongError />}
            {!isLoading &&
              !hasError &&
              peoples.length === 0 &&
              !isFirstLoad && <NoPeopleOnServerError />}
            {!isLoading && !hasError && peoples.length > 0 && (
              <PeopleTable peoples={peoples} selectedPersonSlug={slug} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
