import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';

interface Props {
  peoples: Person[];
  selectedPersonSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({
  peoples,
  selectedPersonSlug,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            // className="has-background-warning"
            className={cn({
              'has-background-warning': selectedPersonSlug === person.slug,
            })}
          >
            <td>
              <PersonLink personName={person.name} allPeople={peoples} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink personName={person.motherName} allPeople={peoples} />
            </td>
            <td>
              <PersonLink personName={person.fatherName} allPeople={peoples} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
