import { FC, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const CloseBurgerOnNav: React.FC<RouteComponentProps & {closeNav: () => void}> = ({ history, closeNav }) => {
  useEffect(() => {
    const unlisten = history.listen(() => closeNav());
    return () => unlisten();
  });

  return null;
}

export default withRouter(CloseBurgerOnNav);
