import React, { useEffect, useState } from 'react';
import Message from './Message';

export default function MultiMessage({
  conversation,
  messagesTree,
  scrollToBottom,
  currentEditId,
  setCurrentEditId,
  isSearchView
}) {
  const [siblingIdx, setSiblingIdx] = useState(0);

  const setSiblingIdxRev = value => {
    setSiblingIdx(messagesTree?.length - value - 1);
  };

  useEffect(() => {
    // reset siblingIdx when changes, mostly a new message is submitting.
    setSiblingIdx(0);
  }, [messagesTree?.length]);

  // if (!messageList?.length) return null;
  if (!(messagesTree && messagesTree.length)) {
    return null;
  }

  if (siblingIdx >= messagesTree?.length) {
    setSiblingIdx(0);
    return null;
  }

  const message = messagesTree[messagesTree.length - siblingIdx - 1];
  if (isSearchView)
    return (
      <>
        {messagesTree
          ? messagesTree.map(message => (
              <Message
                key={message.messageId}
                conversation={conversation}
                message={message}
                scrollToBottom={scrollToBottom}
                currentEditId={currentEditId}
                setCurrentEditId={null}
                siblingIdx={1}
                siblingCount={1}
                setSiblingIdx={null}
              />
            ))
          : null}
      </>
    );
  return (
    <Message
      key={message.messageId}
      conversation={conversation}
      message={message}
      scrollToBottom={scrollToBottom}
      currentEditId={currentEditId}
      setCurrentEditId={setCurrentEditId}
      siblingIdx={messagesTree.length - siblingIdx - 1}
      siblingCount={messagesTree.length}
      setSiblingIdx={setSiblingIdxRev}
    />
  );
}
