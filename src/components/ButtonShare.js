import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareButton from '../images/shareIcon.svg';

function ButtonShare({ history, id, index, type, dataTestId }) {
  const [copied, setCopied] = useState(false);
  const idtoTest = (typeof index === 'number') ? (`${index}${dataTestId}`) : (dataTestId);

  const handleClickShare = async () => {
    const { location: { pathname } } = history;
    const url = (pathname.includes('meals') || type === 'meal')
      ? `meals/${id}` : `drinks/${id}`;
    await navigator.clipboard.writeText(`http://localhost:3000/${url}`);
    setCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickShare }
      >
        <img
          data-testid={ idtoTest }
          src={ shareButton }
          alt="Share Button"
        />
      </button>
      { copied && <span>Link copied!</span> }
    </div>
  );
}

ButtonShare.propTypes = {
  history: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

// ButtonShare.defaultProps = {
//   index: 0,
//   type: '',
// };

export default ButtonShare;
