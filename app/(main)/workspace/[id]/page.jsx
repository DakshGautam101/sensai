import React from 'react';
import ChatView from '@/components/ChatView';
import CodeView from '@/components/CodeView';

const Workspace = () => {
  return (
  <div className='p-2 -ml-[300px] h-[80vh] mt-16'>
    <div className='grid grid-cols-4 ' >
      <div className='col-span-1'>
        <ChatView />
      </div>
      <div className='col-span-3'>
        <CodeView />
      </div>
    </div>
  </div>
  );
};

export default Workspace;
