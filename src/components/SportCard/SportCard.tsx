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
import { hu } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'

export interface SportCardProps {
  primary?: boolean;
  size?: 'small' | 'large';
  daily: boolean,
  hazai?: string;
  vendeg?: string;
  sportType: 'football' | 'tennis' | 'basketball' | 'darts' | 'nfl' | 'f1',
  images: string[]
  colorScheme?: 'blue' | 'orange' | 'green' | 'yellow' | 'red' | 'purple',
  onClick?: () => void;
  date?: string
}

const LargeTeamsBar = (type: any, hazai: any, vendeg: any) => {
  const convertType = (['football', 'nfl', 'basketball'].includes(type)) ? 'teamSport' : ((type === 'f1') ? 'other' : 'individualSport')

  const variants = {
    teamSport: () => (
      <>
        <div className="hidden md:flex mt-[40px]">
          <div className="home-team flex flex-col md:flex-row self-center mr-auto">
            <div className="mr-[10px]"><img src={hazai.logo} className="w-[42px]" /></div>
            <div className="text-[14px] lg:text-[20px] font-[500] self-center">{hazai.name}</div>
          </div>
          <div className="away-team flex self-center">
            <div className="text-[14px] lg:text-[20px] font-[500] self-center">{vendeg.name}</div>
            <div className='ml-[10px]'><img src={vendeg.logo} className="w-[42px]" /></div>
          </div>
        </div>
        <div className='flex md:hidden relative z-[11]'>{smallTeamsBar(type, hazai, vendeg)}</div>
      </>
    ),
    individualSport: () => (
      <>
        <div className="hidden md:flex mt-[40px]">
          <div className="home-team flex self-center mr-auto">
            <div className="mr-[10px]"><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png" className="w-[42px]" /></div>
            <div className="text-[14px] lg:text-[20px] font-[500] self-center">Real Madrid</div>
          </div>
          <div className="away-team flex self-center">
            <div className="text-[14px] lg:text-[20px] font-[500] self-center">Liverpool</div>
            <div className='ml-[10px]'><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png" className="w-[42px]" /></div>
          </div>
        </div>
        <div className='flex md:hidden relative z-[11]'>{smallTeamsBar(type, hazai, vendeg)}</div>
      </>
    ),
    other: () => (
      <>
        <div className="hidden md:flex mt-[40px]">
          <div className="home-team flex self-center mr-auto">
            <div className="mr-[10px]"><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/real.png" className="w-[42px]" /></div>
            <div className="text-[14px] lg:text-[20px] font-[500] self-center">Real Madrid</div>
          </div>
          <div className="away-team flex self-center">
            <div className="text-[14px] lg:text-[20px] font-[500] self-center">Liverpool</div>
            <div className='ml-[10px]'><img src="https://w7tips.fra1.digitaloceanspaces.com/images/teams/liverpool.png" className="w-[42px]" /></div>
          </div>
        </div>
        <div className='flex md:hidden relative z-[11]'>{smallTeamsBar(type, hazai, vendeg)}</div>
      </>
    )
  }
  return variants[convertType]();

  return (
    <>

    </>
  );
}

const smallTeamsBar = (type: any, hazai: any, vendeg: any) => {

  const convertType = (['football', 'nfl', 'basketball'].includes(type)) ? 'teamSport' : ((type === 'f1') ? 'other' : 'individualSport')
  const variants = {
    teamSport: () => (
      <div className="flex mt-[30px] absolute z-[11] w-full px-[16px] bottom-[16px]">
          <div className="home-team flex flex-col md:flex-row self-center mr-auto">
          <div className="mr-[10px]"><img src={hazai.logo} className="w-[42px]" /></div>
          <div className="text-[12px] md:text-[16px] font-[500] self-center">{hazai.name}</div>
        </div>
        <div className="away-team flex flex-col md:flex-row self-center gap-[5px] md:gap-0 ">
          <div className="text-[12px] md:text-[16px] font-[500] self-center order-2 md:order-1">{vendeg.name}</div>
          <div className='ml-[10px] order-1 md:order-2'><img src={vendeg.logo} className="w-[42px]" /></div>
        </div>
      </div>
    ),
    individualSport: () => (
      <div className="flex mt-[30px] absolute z-[11] w-full px-[16px] bottom-[16px]">
        <div className="home-team flex flex-col self-center mr-auto">
          <div className="text-[14px] font-[500] leading-[8px]">{hazai.first_name}</div>
          <div className="text-[24px] font-[500]">{hazai.last_name}</div>
        </div>
        <div className="away-team flex flex-col self-center">
          <div className="text-[14px] text-right leading-[8px]	">{vendeg.first_name}</div>
          <div className="text-[24px] font-[500]">{vendeg.last_name}</div>
        </div>
      </div>
    ),
    other: () => (
      <div className="flex mt-[30px] absolute z-[11] w-full px-[16px] bottom-[16px]">
        <div className="home-team flex flex-col self-center mr-auto">
          <div className="mr-[10px]"><img src={hazai.logo} className="w-[42px]" /></div>
          <div className="text-[16px] font-[500] self-center">{hazai.name}</div>
        </div>
        <div className="away-team flex  flex-col self-center">
          <div className="text-[16px] font-[500] self-center">{vendeg.name}</div>
          <div className='ml-[10px]'><img src={vendeg.logo} className="w-[42px]" /></div>
        </div>
      </div>
    )
  }
  return variants[convertType]();
}

export const SportCard = ({
  primary = false,
  size = 'small',
  hazai = 'Real Madrid',
  vendeg = 'Barcelona',
  sportType,
  images,
  daily = false,
  colorScheme,
  date = '2022-06-01 20:00',
  ...props
}: SportCardProps) => {
  console.log(sportType);
  const players = [{ image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }, { image: "https://fra1.digitaloceanspaces.com/w7tips/placeholders/stock_sample.png" }];

  const mode = primary ? 'w7-sportcard--primary' : 'w7-sportcard--secondary';
  return (
    <div className={twMerge(`sportcard sportcard-${size} relative overflow-hidden ${size === 'small' ? 'h-[426px]' : 'h-full'} md:h-[296px]`)}>
      <div className={twMerge(`${size === 'small' ? 'sportcard-background' : 'sportcard-background-large'} ${colorScheme}-scheme md:mt-[16px]`)}>
        <div className={twMerge(`flex relative flex-col md:flex-row ${size === 'small' ? ' md:h-full' : ''}`)}>
          <div className="flex-1 relative overflow-hidden flex md:top-[-16px] md:mb-[-16px] order-2 md:order-1">
            {
              size === 'large' ? (
                <>
                  <div className='flex-1 flex justify-end relative z-[10]'><img src={images[0]} className=" w-[199px]" /></div>
                  <div className='flex-1 flex justify-start  z-[10]' ><img src={images[1]} className=" w-[199px]" /></div>
                </>
              ) : (
                <>
                  <div className='self-end relative z-[10] md:z-[2]'><img src={images[0]} className="w-[195px]" /></div>
                </>
              )
            }
          </div>
          <div className="flex-1 px-[15px] md:p-[15px] relative z-[10] order-1 md:order-2">
            {daily && (<div className=" md:hidden daily-match">A nap tippje</div>)}
            {daily && (<div className="hidden md:block absolute right-[15px] top-[15px] daily-match-large">A nap tippje</div>)}
            {/* Info block */}
            <div className={twMerge(`info-block flex ${size === 'large' ? 'flex-col md:flex-row' : ''} mt-[25px]`)}>
              <div className={twMerge(`mr-[11px] ${size === 'large' ? 'self-center md:self-start md:mr-[11px]' : ''}`)}><img src="https://w7tips.fra1.digitaloceanspaces.com/ll.png" /></div>
              <div className="date-holder self-center">
                <div className='text-white text-[16px] font-[600]'>{format(parseISO(date), 'yyyy. MMMM dd.',  {locale: hu})}</div>
                <div className={twMerge(`text-[20px] text-rgba-grey-08 ${size === 'large' ? 'text-center md:text-left' : ''}`)}>{format(parseISO(date), 'HH:mm',  {locale: hu})}</div>
              </div>
            </div>
            {/* Info block */}
            {/* Played */}
            <div className="mt-[39px]">
              <div className={twMerge(`flex min-w-[130px] order-1 xl:order-2 ${size === 'large' ? 'place-content-center md:place-content-start' : 'place-content-start'} mb-[10px] xl:mb-0`)}>
                <>
                  {_.sampleSize(players, 4).map((item, key) => {
                    return <div className="relative" style={{ left: -(key * 10) }} ><img src={players[0].image} className="rounded-full w-[26px] h-[26px] border-[1px] border-white" /></div>
                  })}
                  {players.length > 4 && (
                    <div className="relative left-[-40px]"><div className="more rounded-full w-[26px] h-[26px] border-[2px] border-white text-[11px] bg-black text-white flex flex-col justify-center text-center font-[600]">+8</div></div>
                  )}
                </>
              </div>
              <div className={twMerge(`text-[12px] text-rgba-grey-08 font-[500] mt-[10px] ${size === 'large' ? 'text-center md:text-left' : ''}`)}>{players.length} tagunk fogadott a meccsre</div>
            </div>
            {/* Played */}

            {/* match teams */}
            <div className="hidden md:block">
              {size === 'large' && LargeTeamsBar(sportType, hazai, vendeg)}
            </div>
            {/* match teams */}
          </div>
        </div>
      </div>
      {size === 'small' && (<div className='relative z-[11]'>{smallTeamsBar(sportType, hazai, vendeg)}</div>)}
      <div className="block md:hidden">
        {size === 'large' && LargeTeamsBar(sportType, hazai, vendeg)}
      </div>

      <div className="h-[100px] w-full absolute bottom-0 left-0 z-[1] bg-gradient-to-t from-black/50 bottom-[-16px]"></div>
      <div className=" mobile-shadow"></div>
      <div className="mobile-shadow h-full w-full absolute bottom-0 left-0 z-[1] bg-gradient-to-t from-black/50 md:bottom-[-16px]"></div>
      <div className="h-full w-full absolute bottom-0 left-0 z-[1] bg-gradient-to-l from-black/50 md:bottom-[-16px]"></div>
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