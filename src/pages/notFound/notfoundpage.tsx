import { Link } from 'react-router-dom';
const Notfound = () => {
  return (
    <div>
      <h1>Page not Found</h1>
      This page doesn`t exist. Go <Link to="/">home</Link>
    </div>
  );
};
export { Notfound };
