import React from 'react';
import './sportCard.css';

interface SportCardProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the sport card be?
   */
  size?: 'small' | 'large';

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const SportCard = ({
  primary = false,
  size = 'small',
  backgroundColor,
  ...props
}: SportCardProps) => {
  const mode = primary ? 'storybook-sportcard--primary' : 'storybook-sportcard--secondary';
  return (
    <div className={['storybook-sportcard', `storybook-sportcard--${size}`, mode].join(' ')} {...props}
      style={{ backgroundColor }}
    >
      <div className={['storybook-sportcard--fade'].join(' ')}>
      </div>
    </div>
  );
};
