import React from 'react'
import './SportCard.css';
import image from './../../assets/images/player.png';
import tennis from './../../assets/images/tenis.png';
import large from './../../assets/images/large_players.png';
import Team1 from './../../assets/images/team_1.png';
import Team2 from './../../assets/images/team_2.png';
import LigaLogo from './../../assets/images/liga_logo.png';
import Group from './../../assets/images/group.png';
import { twMerge } from 'tailwind-merge';

export interface SportCardProps {
  primary?: boolean;
  size?: 'small' | 'large';
  daily: true,
  hazai?: string;
  vendeg?: string;
  colorScheme?: 'blue' | 'orange' | 'green' | 'yellow' | 'red' | 'purple',
  onClick?: () => void;
}

export const SportCard = ({
  primary = false,
  size = 'small',
  hazai = 'Real Madrid',
  vendeg = 'Barcelona',
  daily = true,
  colorScheme,
  ...props
}: SportCardProps) => {
  const mode = primary ? 'w7-sportcard--primary' : 'w7-sportcard--secondary';
  return (
    <div className={twMerge(`sportcard w7-sportcard-${size}`)}>
      <div className={twMerge(`sportcard-background ${colorScheme}-scheme`)}>
        asd
      </div>
    </div>

    /*<div className={['w7-sportcard', `w7-sportcard--${size}`, mode].join(' ')}>
      <div className={'w7-sportcard-image-holder'}>
        <img src={size === 'small' ? (primary ? image : tennis) : (primary ? large : large)} />
      </div>
      <div className={twMerge(`w7-sportcard-background ${colorScheme}-scheme`)}>
        <div className={['w7-sportcard--fade'].join(' ')}> </div>
        <div className={['w7-sportcard--fade-secondary'].join(' ')}> </div>
      </div>
      {size === 'small' ? (
        <>
          <div className={'w7-sportcard-event-holder'}>
            <div className={'w7-sportcard-subparts'}>
              <div className={'w7-sportcard-event'}>
                <div className={'w7-sportcard-event-logo'}><img src={LigaLogo} /></div>
                <div className={'w7-sportcard-event-datas'}>
                  <div>2022. szeptember 30.</div>
                  <div>20:30</div>
                </div>
              </div>
              <div className={'w7-sportcard-sum'}>
                <div><img src={Group} /></div>
                <div>27 tagunk fogadott erre a meccsre</div>
              </div>
            </div>
            {
              primary ? (
                <div className={'w7-sportcard-teams'}>
                  <div className={'w7-sportcard-teams-item'}>
                    <div className={'w7-sportcard-teams-item-logo first'}><img src={Team1} /></div>
                    <div className={'w7-sportcard-teams-item-name'}>{hazai}</div>
                  </div>
                  <div className={'w7-sportcard-teams-item'}>
                    <div className={'w7-sportcard-teams-item-name'}>{vendeg}</div>
                    <div className={'w7-sportcard-teams-item-logo second'}><img src={Team2} /></div>
                  </div>
                </div>
              ) : (
                <div className={'w7-sportcard-players'}>
                  <div className={'w7-sportcard-players-item'}>
                    <div className={'w7-sportcard-players-item-first-name'}>Rafael</div>
                    <div className={'w7-sportcard-players-item-last-name'}>Nadal</div>
                  </div>
                  <div className={'w7-sportcard-players-item'}>
                    <div className={'w7-sportcard-players-item-first-name'}>Novak</div>
                    <div className={'w7-sportcard-players-item-last-name'}>Djokovic</div>
                  </div>
                </div>
              )
            }
          </div>

        </>
      ) : (
        <>
           <div className={'w7-sportcard-event-holder'}>
            asd
          </div>

        </>
      )}

    </div>*/
  );
};