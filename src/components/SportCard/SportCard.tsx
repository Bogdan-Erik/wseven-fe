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
import _ from 'lodash';

export interface SportCardProps {
  primary?: boolean;
  size?: 'small' | 'large';
  daily: true,
  hazai?: string;
  vendeg?: string;
  colorScheme?: 'blue' | 'orange' | 'green' | 'yellow' | 'red' | 'purple',
  onClick?: () => void;
}

const LargeTeamsBar = () => {
  return (
    <div className="flex mt-[40px]">
      <div className="home-team flex self-center mr-auto">
        <div className="mr-[10px]"><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png" className="w-[42px]" /></div>
        <div className="text-[20px] font-[500] self-center">Real Madrid</div>
      </div>
      <div className="away-team flex self-center">
        <div className="text-[20px] font-[500] self-center">Liverpool</div>
        <div className='ml-[10px]'><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png" className="w-[42px]" /></div>
      </div>
    </div>
  );
}

const SmallTeamsBar = () => {
  return (
    <div className="flex mt-[30px] absolute z-[3] w-full px-[16px] bottom-[16px]">
      <div className="home-team flex self-center mr-auto">
        <div className="mr-[10px]"><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png" className="w-[42px]" /></div>
        <div className="text-[16px] font-[500] self-center">Real Madrid</div>
      </div>
      <div className="away-team flex self-center">
        <div className="text-[16px] font-[500] self-center">Liverpool</div>
        <div className='ml-[10px]'><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png" className="w-[42px]" /></div>
      </div>
    </div>
  );
}

const TeamsBar = ({ size }: {size: 'small' | 'large'}) => {
  if (size === 'large') {
    return <LargeTeamsBar /> 
  } else if (size === 'small') {
    return <SmallTeamsBar /> 
  }

  return <></>
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
  const players = [{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }];

  const mode = primary ? 'w7-sportcard--primary' : 'w7-sportcard--secondary';
  return (
    <div className={twMerge(`sportcard sportcard-${size} relative`)}>
      <div className={twMerge(`sportcard-background ${colorScheme}-scheme`)}>
        <div className="flex relative z-[2]">
          <div className="flex-1">image</div>
          <div className="flex-1 p-[15px] relative">
            {/* Info block */}
            <div className="info-block flex mt-[25px]">
              <div className="mr-[11px]"><img src="https://w7tips.fra1.digitaloceanspaces.com/ll.png" /></div>
              <div className="date-holder self-center">
                <div className='text-white text-[16px] font-[600]'>2022. szeptember 30.</div>
                <div className="text-[20px] text-rgba-grey-08">20:30</div>
              </div>
            </div>
            {/* Info block */}
            {/* Played */}
            <div className="mt-[39px]">
              <div className="flex min-w-[130px] order-1 xl:order-2 place-content-center xl:place-content-start mb-[10px] xl:mb-0">
                <>
                  {_.sampleSize(players, 4).map((item, key) => {
                    return <div className="relative" style={{ left: -(key * 10) }} ><img src={item.image} className="rounded-full w-[26px] h-[26px] border-[1px] border-white" /></div>
                  })}
                  {players.length > 4 && (
                    <div className="relative left-[-40px]"><div className="more rounded-full w-[26px] h-[26px] border-[2px] border-white text-[11px] bg-black text-white flex flex-col justify-center text-center font-[600]">+8</div></div>
                  )}
                </>
              </div>
              <div className='text-[12px] text-rgba-grey-08 font-[500] mt-[10px]'>{players.length} tagunk fogadott a meccsre</div>
            </div>
            {/* Played */}

            {/* match teams */}
            {size === 'large' && (<LargeTeamsBar />)}
            {/* match teams */}
          </div>
        </div>
        {size === 'small' && (<SmallTeamsBar />)}
      </div>
      <div className="h-full w-full absolute bottom-0 left-0 z-[1] bg-gradient-to-t from-black/50"></div>
      <div className="h-full w-full absolute bottom-0 left-0 z-[1] bg-gradient-to-l from-black/50"></div>
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