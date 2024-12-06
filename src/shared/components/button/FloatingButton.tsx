import React, { useState } from 'react';
import { faPlus, faPaperPlane, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';

function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const mainButtonStyle = {
    position: 'absolute' as const,
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    transition: 'transform 0.3s',
    transform: isOpen ? 'rotate(45deg)' : 'none'
  };

  const subButtonStyle = {
    ...mainButtonStyle,
    width: 42,
    height: 42,
    border: 'none',
    borderRadius: 21,
    transition: 'transform 0.3s, opacity 0.3s',
    transform: isOpen ? 'none' : 'scale(0)',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? ('auto' as const) : ('none' as const)
  };

  const subButton1Style = {
    ...subButtonStyle,
    right: 80,
    bottom: 70
  };

  const subButton2Style = {
    ...subButtonStyle,
    bottom: 100
  };

  const handleMainButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        css={subButton2Style}
        onClick={() => {
          Router.push('/post/new');
          setIsOpen(false);
        }}
        type='button'
        aria-label='Create new post'
      >
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <button css={subButton1Style} type='button' aria-label='Send'>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
      <button css={mainButtonStyle} onClick={handleMainButtonClick} type='button' aria-label='Main menu'>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </>
  );
}

export default FloatingButton;
