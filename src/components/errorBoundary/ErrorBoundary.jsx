import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'semantic-ui-react';

import styles from './ErrorBoundary.module.css';

const CustomErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary, error }) => (
        <div className={styles.container}>
          <pre>Oh no! There was an error!</pre>
          <pre>{error.message}</pre>
          <Button color="red" onClick={() => resetErrorBoundary()}>
            Try again
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
