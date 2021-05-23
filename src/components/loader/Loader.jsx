import { Dimmer, Loader } from 'semantic-ui-react';
const CustomLoader = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
};

export default CustomLoader;
