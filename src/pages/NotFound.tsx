import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { EmptyState } from '../components/ui/EmptyState';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageContainer className="py-16">
      <EmptyState
        title="Page not found (404)"
        description="The hardware configuration or route you requested does not exist."
        actionLabel="Return to Showroom"
        onAction={() => navigate('/')}
      />
    </PageContainer>
  );
};

export default NotFound;
