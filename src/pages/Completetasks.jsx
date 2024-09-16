import React from 'react';
import Card from '../components/Cards';

const Completetasks = () => {
  return (
    <div className="px-2 py-16">
      {/* Pass `true` to the `filter` prop to show only completed tasks */}
      <Card filter={true} />
    </div>
  );
};

export default Completetasks;
