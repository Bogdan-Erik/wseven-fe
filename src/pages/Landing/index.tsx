import React, { useEffect, useState } from 'react';
import { Button, IconBadge, Icon } from '../../components';
import './index.scss';
import FootballerOne from './../../assets/images/landing/footballer-left.png';
import FootballerTwo from './../../assets/images/landing/footballer-right.png';
import Circle from './../../assets/images/landing/circle.png';
import Cross from './../../assets/images/landing/cross.png';
import { off } from 'process';
import { ScrollRotate } from 'react-scroll-rotate';

export interface PageProps {

}

export default ({ }: PageProps) => {
  const [offset, setOffset] = useState(0);
  const [offsetTransform, setOffsetTransform] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      setOffset(1 + (window.pageYOffset * 0.0009))
      setOpacity((window.pageYOffset * 0.0009))
      setOffsetTransform(1 + (window.pageYOffset * 0.0004))
    };
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  ///transform: `scale(${offset < 1 ? 1 : (offset > 2 ? 2 : offset)})`, 
  useEffect(() => { console.log(offset) }, [offset])
  return (
    <div className="hero-bg text-white">
      <div className="grid md:flex flex-col md:flex-row gradient-cover">
        <div className="flex flex-1 justify-start  order-2 relative mt-[110px] md:mt-0 md:order-1 left-player">
          <div className="relative " >
            <div className="  will-change-auto" style={{ transform: `scale(${offsetTransform < 1 ? 1 : (offsetTransform > 1.3 ? 1.3 : offsetTransform)})`, transition: 'transform 150ms ease' }}>
              <img src={FootballerOne} className="player" />

            </div>
            <div className={`absolute top-[0px] right-[80px]  lg:top-0 lg:right-[160px] will-change-transform`}> <ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Circle} className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate></div>
            <div className="absolute top-[90px] right-[00px] lg:top-[200px] lg:right-[30px]  will-change-auto"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
            <div className="absolute top-[160px] right-[60px] lg:top-[330px] lg:right-[160px] will-change-auto z-[-1] blur-[2px]"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Circle} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
            <div className="absolute top-[250px] right-[40px] lg:top-[500px] lg:right-[80px] will-change-auto"  ><ScrollRotate method={"perc"} loops={2} from={300} to={100} animationDuration={0.3}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
            <div className="absolute top-[250px] right-[190px] lg:top-[520px] lg:right-[390px] will-change-auto rotate-[240deg]"  ><ScrollRotate method={"perc"} loops={1} from={300} to={100} animationDuration={0.3}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>


            <div className="absolute top-[30px] right-[200px] lg:top-[90px] lg:right-[370px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'blur-[1px] backdrop-blur-[2px]'}><Icon icon="military" size="3xl" color={"#ffffff"} /></IconBadge> </div>
            <div className="absolute top-[70px] right-[60px] lg:top-[170px] lg:right-[140px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="house" size="3xl" color={"#ffffff"} /></IconBadge> </div>
            <div className="absolute top-[170px] right-[10px]  lg:top-[330px] lg:right-[60px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="money" size="3xl" color={"#ffffff"} /></IconBadge> </div>
            <div className="absolute top-[290px] right-[90px] lg:top-[560px] lg:right-[180px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}><IconBadge classes={'backdrop-blur-[10px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="calendar" size="3xl" color={"#ffffff"} /></IconBadge> </div>

          </div>
        </div>
        <div className="flex flex-col self-center flex-1 order-1 mt-[60px] md:order-2 md:mt-0">
          <div className="text-2_5xl text-center text-whitesmoke md:text-5_2xl md:leading-[70px] ">Hamarosan megérkezik a <span className="font-bold text-white">sportfogadási</span> <span className="font-bold text-gradient">tippek</span> új generációja!</div>
          <div className="flex-1 mt-[30px] text-center">
            <Button size={"large"} primary={true}>Kérek értesítést</Button>
          </div>
        </div>
        <div className="flex flex-1 order-3 mt-[-470px] justify-end md:mt-0 right-player">
          <div className="relative " >
            <div className="  will-change-auto" style={{ transform: `scale(${offsetTransform < 1 ? 1 : (offsetTransform > 1.3 ? 1.3 : offsetTransform)})`, transition: 'transform 150ms ease' }}>
              <img src={FootballerTwo} className="player" />

            </div>
            <div className={`absolute top-[0px] right-[20px] lg:top-[30px] lg:right-[80px] will-change-transform`}> <ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate></div>
            <div className="absolute top-[130px] z-[-1] right-[0px] lg:top-[270px] lg:right-[10px] will-change-auto"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
            <div className="absolute top-[310px] right-[10px] lg:top-[560px] lg:right-[30px] will-change-auto blur-[2px]"  ><ScrollRotate method={"perc"} loops={2} from={300} to={100} animationDuration={0.3}><img src={Circle} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
            <div className="absolute top-[140px] right-[140px]  lg:top-[360px] lg:right-[220px] will-change-auto rotate-[240deg]"  ><ScrollRotate method={"perc"} loops={1} from={300} to={100} animationDuration={0.3}><img src={Cross} className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>


            <div className="absolute top-[30px] right-[150px] lg:top-[90px] lg:right-[280px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="stat-bordered" size="3xl" color={"#ffffff"} /></IconBadge> </div>
            <div className="absolute top-[170px] right-[120px] lg:top-[390px] lg:right-[190px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'blur-[1px] backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="sign" size="3xl" color={"#ffffff"} /></IconBadge> </div>
            <div className="absolute top-[230px] right-[10px] lg:top-[460px] lg:right-[40px] will-change-auto  z-[-1]" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}><IconBadge classes={'blur-[2px] backdrop-blur-[10px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="donut" size="3xl" color={"#ffffff"} /></IconBadge> </div>
            <div className="absolute top-[270px] right-[170px] lg:top-[570px] lg:right-[300px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}><IconBadge classes={'blur-[1px] backdrop-blur-[10px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="settings" size="3xl" color={"#ffffff"} /></IconBadge> </div>

          </div>
        </div>
      </div>
      <div className="h-[1700px]"></div>
    </div >
  )
}