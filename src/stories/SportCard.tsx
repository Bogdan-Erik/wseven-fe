import React from 'react';
import './sportCard.css';
import image from './../assets/images/player.png';
import tennis from './../assets/images/tenis.png';
import large from './../assets/images/large_players.png';
import Team1 from './../assets/images/team_1.png';
import Team2 from './../assets/images/team_2.png';
import LigaLogo from './../assets/images/liga_logo.png';
import Group from './../assets/images/group.png';

interface SportCardProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the sport card be?
   */
  size?: 'small' | 'large';
  hazai?: string;
  vendeg?: string;
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
  hazai = 'Real Madrid',
  vendeg = 'Barcelona',
  ...props
}: SportCardProps) => {
  const mode = primary ? 'storybook-sportcard--primary' : 'storybook-sportcard--secondary';
  return (
    <div className={['storybook-sportcard', `storybook-sportcard--${size}`, mode].join(' ')}>
      <div className={'storybook-sportcard-image-holder'}>
        <img src={size === 'small' ? (primary ? image : tennis) : (primary ? large : large)} />
      </div>
      <div className={'storybook-sportcard-background'}>
        <div className={['storybook-sportcard--fade'].join(' ')}> </div>
      </div>
      {size === 'small' ? (
        <>
          <div className={'storybook-sportcard-event'}>
            <div className={'storybook-sportcard-event-logo'}><img src={LigaLogo} /></div>
            <div className={'storybook-sportcard-event-datas'}>
              <div>2022. szeptember 30.</div>
              <div>20:30</div>
            </div>
          </div>
          <div className={'storybook-sportcard-sum'}>
            <div><img src={Group} /></div>
            <div>27 tagunk fogadott erre a meccsre</div>
          </div>
          {
            primary ? (
              <div className={'storybook-sportcard-teams'}>
                <div className={'storybook-sportcard-teams-item'}>
                  <div className={'storybook-sportcard-teams-item-logo first'}><img src={Team1} /></div>
                  <div className={'storybook-sportcard-teams-item-name'}>{hazai}</div>
                </div>
                <div className={'storybook-sportcard-teams-item'}>
                  <div className={'storybook-sportcard-teams-item-name'}>{vendeg}</div>
                  <div className={'storybook-sportcard-teams-item-logo second'}><img src={Team2} /></div>
                </div>
              </div>
            ) : (
              <div className={'storybook-sportcard-players'}>
                <div className={'storybook-sportcard-players-item'}>
                  <div className={'storybook-sportcard-players-item-first-name'}>Rafael</div>
                  <div className={'storybook-sportcard-players-item-last-name'}>Nadal</div>
                </div>
                <div className={'storybook-sportcard-players-item'}>
                  <div className={'storybook-sportcard-players-item-first-name'}>Novak</div>
                  <div className={'storybook-sportcard-players-item-last-name'}>Djokovic</div>
                </div>
              </div>
            )
          }
        </>
      ) : (
        <>
          <div className={'storybook-sportcard-large-content'}>
            <div className={'storybook-sportcard-large-content-event'}>
              <div className={'storybook-sportcard-large-content-event-logo'}><img src={LigaLogo} /></div>
              <div className={'storybook-sportcard-large-content-event-datas'}>
                <div>2022. szeptember 30.</div>
                <div>20:30</div>
              </div>
            </div>
            <div className={'storybook-sportcard-large-content-sum'}>
              <div><img src={Group} /></div>
              <div>27 tagunk fogadott erre a meccsre</div>
            </div>
            {primary ? (
              <div className={'storybook-sportcard-large-content-teams'}>
                <div className={'storybook-sportcard-large-teams-item'}>
                  <div className={'storybook-sportcard-large-teams-item-logo first'}><img src={Team1} /></div>
                  <div className={'storybook-sportcard-large-teams-item-name first'}>{hazai}</div>
                </div>
                <div className={'storybook-sportcard-large-teams-item'}>
                  <div className={'storybook-sportcard-large-teams-item-name second'}>{vendeg}</div>
                  <div className={'storybook-sportcard-large-teams-item-logo second'}><img src={Team2} /></div>
                </div>
              </div>
            ) : (
              <div className={'storybook-sportcard-large-content-players'}>
                <div className={'storybook-sportcard-large-players-item'}>
                  <div className={'storybook-sportcard-large-players-item-first-name'}>Rafael</div>
                  <div className={'storybook-sportcard-large-players-item-last-name'}>Nadal</div>
                </div>
                <div className={'storybook-sportcard-large-players-item'}>
                  <div className={'storybook-sportcard-large-players-item-first-name'}>Novak</div>
                  <div className={'storybook-sportcard-large-players-item-last-name'}>Djokovic</div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

    </div>


  );
};

/*

    <div className={['storybook-sportcard', `storybook-sportcard--${size}`, mode].join(' ')} {...props}
      style={{ backgroundColor }}
    >
      <div className={['storybook-sportcard--fade'].join(' ')}>
        <img src={image} />
      </div>
    </div>
*/