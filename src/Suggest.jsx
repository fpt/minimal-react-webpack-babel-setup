import * as React from 'react';
import fetchJsonp from 'fetch-jsonp';

import { StateProvider, DebouncePropagator, AsyncResolver } from 'reenhance-components';


const queryToUrl =
  (query) =>
    `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${query}`;

const asyncFetch =
  ({ query }) =>
    fetchJsonp(queryToUrl(query))
      .then(res => res.json());

const SuggestAsyncResolver = AsyncResolver('query', []);

const Suggests = ({ query }: any) => (
  <SuggestAsyncResolver query={query} subject={asyncFetch}>
    {props => (
      <ul>
        {props[1] && props[1].length > 0 ? props[1].map((str: string) => (
          <li key={str}>{str}</li>
        )) : <li>No results</li>}
      </ul>
    )}
  </SuggestAsyncResolver>
);

const InputState = StateProvider('');
const SuggestDebounce = DebouncePropagator({ query: '' });

export const SuggestedInput = () => (
  <InputState>
    {({ state: query, setState: setQuery }) => (
      <div>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <SuggestDebounce
          time={200}
          query={query}
        >
          {({ query, state }: any) => (
            <div>
              {query && <Suggests query={query}/>}
            </div>
          )}
        </SuggestDebounce>
      </div>
    )}
  </InputState>
);
