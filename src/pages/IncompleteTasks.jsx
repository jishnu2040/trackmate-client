import React from 'react';
import Card from '../components/Cards';

const IncompleteTasks = () => {
  return (
    <div className="px-2 py-16">
      {/* Pass `false` to the `filter` prop to show only incomplete tasks */}
      <Card filter={false} />
    </div>
  );
};

export default IncompleteTasks;
