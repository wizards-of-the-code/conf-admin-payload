import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { DefaultTemplate } from 'payload/components/templates';
import { Button, Eyebrow } from 'payload/components/elements';
import { AdminView } from 'payload/config';
import { useStepNav } from 'payload/components/hooks';
import { useConfig, Meta } from 'payload/components/utilities';

import CustomList from '../components/List/List';

const CustomDefaultRoute: AdminView = ({ user, canAccessAdmin }) => {
  const { routes: { admin: adminRoute } } = useConfig();
  const { setStepNav } = useStepNav();

  // This effect will only run one time and will allow us
  // to set the step nav to display our custom route name

  useEffect(() => {
    setStepNav([
      {
        label: 'Custom Route with Default Template',
      },
    ]);
  }, [setStepNav]);

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return (
      <Redirect to={`${adminRoute}/unauthorized`} />
    );
  }

  return (
    <DefaultTemplate>
      <Meta
        title="Custom Route with Default Template"
        description="Building custom routes into Payload is easy."
        keywords="Custom React Components, Payload, CMS"
      />
      <Eyebrow />
      <div className="gutter--left gutter--right collection-list__wrap">
        <h1>Custom Route</h1>
        <CustomList />
        <Button
          el="link"
          to={`${adminRoute}`}
          buttonStyle="secondary"
        >
          Go to Dashboard
        </Button>
      </div>
    </DefaultTemplate>
  );
};

export default CustomDefaultRoute;