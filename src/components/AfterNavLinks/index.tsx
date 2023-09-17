import React from 'react';
import { NavLink } from 'react-router-dom';

import { Chevron } from 'payload/components';
import { useConfig } from 'payload/components/utilities';

const baseClass = 'after-nav-links';

const AfterNavLinks: React.FC = () => {
  const { routes: { admin: adminRoute } } = useConfig();

  return (
    <div className={baseClass}>
      <span className="nav__label">Custom Routes</span>
      <nav>
        <NavLink
          className="nav__link"
          activeClassName="active"
          to={`${adminRoute}/custom-default-route`}
        >
          <Chevron />
          Default Template
        </NavLink>
      </nav>
    </div>
  );
};

export default AfterNavLinks;