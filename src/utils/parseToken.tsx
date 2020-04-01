import queryString from 'query-string';

export default function parseToken(): string {
  const query = queryString.parse(window.location.search);
  if (!query.token || Array.isArray(query.token)) return '';
  return query.token;
}
