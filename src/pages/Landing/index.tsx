import React, { useEffect, useState } from 'react';
import { Button, IconBadge, Icon, Title, FunctionBox, Input } from '../../components';
import './index.scss';
import FootballerOne from './../../assets/images/landing/footballer-left.png';
import FootballerTwo from './../../assets/images/landing/footballer-right.png';
import Footballer from './../../assets/images/landing/footballer.png';
import TennisPlayer from './../../assets/images/landing/tennis_player.png';
import FootballerBg from './../../assets/images/landing/footballer-bg.png';
import Circle from './../../assets/images/landing/circle.png';
import Cross from './../../assets/images/landing/cross.png';

import Macbook from './../../assets/images/landing/macbook.png';
import Fans from './../../assets/images/landing/fans.png';
import FansBg from './../../assets/images/landing/fans-bg-2.png';

import atp from './../../assets/images/leagues/atp.png';
import wta from './../../assets/images/leagues/wta.png';
import cl from './../../assets/images/leagues/cl.png';
import el from './../../assets/images/leagues/el.png';
import pl from './../../assets/images/leagues/pl.png';
import ll from './../../assets/images/leagues/ll.png';
import bl from './../../assets/images/leagues/bl.png';


import useWindowDimensions from './../../hooks/useWindowDimensions';

import { Label } from '../../components/Label';

import { Link, Element, animateScroll as scroll } from 'react-scroll'

import { ScrollRotate } from 'react-scroll-rotate';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export interface PageProps {

}

export default ({ }: PageProps) => {
  const { height, width } = useWindowDimensions();


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
  useEffect(() => { console.log(width) }, [width])
  return (
    <>
      <div className="block fixed z-[10] bottom-0 left-0 w-full h-[45px] bg-rgba-grey-dark-08 text-center md:hidden uppercase text-white leading-[44px] tracking-[0.05em] backdrop-blur-[6px] font-bold"><Link activeClass="active" className="subscribe" to="subscribe" spy={true} smooth={true} duration={500} >feliratkozom</Link></div>
      <div className="hero-bg absolute top-[-80px] left-0 w-full h-[2100px] z-[0]"></div>

      <div className="hero-bg-secondary text-white">
        <div className="relative">
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


                <div className="absolute top-[30px] right-[200px] lg:top-[90px] lg:right-[370px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'blur-[1px] backdrop-blur-[2px]'}><Icon icon="military" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>
                <div className="absolute top-[70px] right-[60px] lg:top-[170px] lg:right-[140px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="house" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>
                <div className="absolute top-[170px] right-[10px]  lg:top-[330px] lg:right-[60px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="money" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>
                <div className="absolute top-[290px] right-[90px] lg:top-[560px] lg:right-[180px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}><IconBadge classes={'backdrop-blur-[10px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="calendar" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>

              </div>
            </div>
            <div className="flex flex-col self-center flex-3 order-1 mt-[60px] md:order-2 md:mt-0">
              <div className="text-2_5xl text-center text-whitesmoke md:text-3xl lg:text-5_2xl lg:leading-[70px] ">Hamarosan megérkezik a <br />

                <span className="words">
                  <b><span className="font-bold text-white">sportfogadási</span> <span className="font-bold text-gradient">tippek</span></b>
                  <div><span className="font-bold text-white">sportfogadási</span> <span className="font-bold text-gradient">tanácsadás</span></div>
                  <div><span className="font-bold text-white">sportfogadási</span> <span className="font-bold text-gradient">tippek</span></div>
                  <div><span className="font-bold text-white">sportfogadási</span> <span className="font-bold text-gradient">tanácsadás</span></div>
                  <div><span className="font-bold text-white">sportfogadási</span> <span className="font-bold text-gradient">tippek</span></div>
                </span>




                <br /> új generációja!</div>
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


                <div className="absolute top-[30px] right-[150px] lg:top-[90px] lg:right-[280px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="stat-bordered" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>
                <div className="absolute top-[170px] right-[120px] lg:top-[390px] lg:right-[190px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}  ><IconBadge classes={'blur-[1px] backdrop-blur-[6px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="sign" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>
                <div className="absolute top-[230px] right-[10px] lg:top-[460px] lg:right-[40px] will-change-auto  z-[-1]" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}><IconBadge classes={'blur-[2px] backdrop-blur-[10px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="donut" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>
                <div className="absolute top-[270px] right-[170px] lg:top-[570px] lg:right-[300px] will-change-auto" style={{ transform: `translateX(${(offset === 0 ? 30 : offset * 30)}px)`, transition: 'all 0.1s' }}><IconBadge classes={'blur-[1px] backdrop-blur-[10px]'} width="w-[64px] lg:w-[84px]" height="h-[64px] lg:h-[84px]"><Icon icon="settings" size="text-3xl" color={"#ffffff"} /></IconBadge> </div>

              </div>
            </div>
          </div>
          <div className=" mx-auto container mt-[130px] md:mt-0">
            <Title
              title={(<div className="text-center text-rgba-grey-08"><span className="font-bold text-white">Ligák</span> amikkel találkozhatsz nálunk</div>)}
              subTitle={(
                <div className="text-center">
                  Az atp és wta tornákkal kiemelten foglalkozunk, így egész évben minden napos fogadási opciókat <br /> kínálunk majd. E mellett nagyobb ligák focimeccsei is terítékünkre kerülnek.
                </div>
              )}
            ></Title>
            <div className="mt-[76px]  px-[15px]">
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, A11y, Autoplay]}
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                autoplay
                centeredSlides={true}

                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 100,
                  },
                  1024: {
                    slidesPerView: 7,
                    spaceBetween: 50,
                  },
                }}
              >
                <SwiperSlide ><div className="h-[90px] flex flex-col justify-center items-center"><img src={wta} className="h-fit" width={107} height={84} /></div></SwiperSlide>
                <SwiperSlide ><div className="h-[90px] flex flex-col justify-center items-center"><img src={atp} className="h-fit" width={107} height={84} /></div></SwiperSlide>
                <SwiperSlide ><div className="h-[90px] flex flex-col justify-center items-center"><img src={cl} className="h-fit" width={107} height={84} /></div></SwiperSlide>
                <SwiperSlide ><div className="h-[90px] flex flex-col justify-center items-center"><img src={el} className="h-fit" width={107} height={84} /></div></SwiperSlide>
                <SwiperSlide ><div className="h-[90px] flex flex-col justify-center items-center"><img src={pl} className="h-fit" width={107} height={84} /></div></SwiperSlide>
                <SwiperSlide ><div className="h-[90px] flex flex-col justify-center items-center"><img src={ll} className="h-fit" width={107} height={84} /></div></SwiperSlide>
                <SwiperSlide ><div className="h-[90px] flex flex-col justify-center items-center"><img src={bl} className="h-fit" width={107} height={84} /></div></SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className=" functions-section">
            <div className=" mt-[200px] mx-auto container px-[15px]">
              <Title
                title={(<div className="text-center text-rgba-grey-08"><span className="font-bold text-white">Funkciók</span>, amik új szintet nyitnak előtted a <br /> sportfogadásban</div>)}
              ></Title>

              <div className="flex flex-col lg:flex-row mt-6">
                <div className="mt-[10px] flex-1 flex flex-col justify-center md:mt-[95px]">
                  <FunctionBox
                    title={'Részletes elemzések'}
                    description={'Profi csapatunk részletesen elemez minden mérközést és pontosan megfogalmazva láthatod mire és miért fogadunk.'}
                    icon={'stat-bordered'}
                  />
                  <FunctionBox
                    title={'Statisztika'}
                    description={'Személyre szabott statisztikát vezetünk fogadásaidról.'}
                    icon={'donut'}
                    customIconSize={"text-[40px]"}

                  />
                  <FunctionBox
                    title={'Fogadási Naptár'}
                    description={'Tervezd meg napjaid és heteid, tekintsd át könnyen és kényelmesen mikor kezdődnek megfogadott meccseid.'}
                    icon={'calendar'}
                  />
                  <FunctionBox
                    title={'Jutalmak'}
                    description={'Mi díjazzuk a hűséget és azt is, ha ajánlasz minket. Jutalomprogramunktól garantáltan eldobod az agyad.'}
                    icon={'military'}
                    customIconSize={"text-4xl"}
                  />
                  <FunctionBox
                    title={'Challengek'}
                    description={'Profi csapatunk részletesen elemez minden mérközést és pontosan megfogalmazva láthatod mire és miért fogadunk.'}
                    icon={'sign'}
                  />
                  <FunctionBox
                    title={'Napi szelvény ajánló'}
                    description={'Szereted a nagyobb szorzójú szelvényeket? Ezzel is kiszolgálunk majd.'}
                    icon={'ticket'}
                    customIconSize={"text-[23px]"}
                  />
                  <FunctionBox
                    title={'Bank funkció'}
                    description={'Virtuális egyenlegedből pontosan kiszámoljuk, hogy egy-egy mérkőzésre mennyi összeget kockáztass.'}
                    icon={'money'}
                    customIconSize={"text-[27px]"}
                  />
                  <FunctionBox
                    title={'Kreditek'}
                    description={'Profi sportelemzés mindösszesen egy gyors menü áráért? Nálunk nem csak csomagokra tudtok majd előfizetni, hanem akár egy-egy elemzést is könnyen megvásárolhattok.'}
                    icon={'coin'}
                    customIconSize={"text-[34px]"}
                  />

                </div>
                <div className="flex-1 flex justify-center items-center lg:justify-end ">
                  <div className="relative">
                    <div className="translate-x-0 will-change-auto relative z-[1]" style={{ transform: `translate(${width > 1024 ? (0 + (offset * 50)) : 0}px, 0px)`, transition: 'transform 150ms ease' }}>
                      <img src={Footballer} className="player object-contain" />
                    </div>
                    <div className="absolute w-[500px] lg:w-auto top-0 z-0 ">
                      <img src={FootballerBg} className="player object-contain" />

                    </div>
                    <div className={`absolute z-[-1] top-[60px] right-[190px] md:top-[80px] md:right-[400px] lg:top-[30px] lg:right-[420px] will-change-transform`}> <ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate></div>
                    <div className="absolute  z-[-1]  top-[130px] right-[50px] md:top-[290px] md:right-[180px] lg:top-[270px] lg:right-[130px] will-change-auto"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
                    <div className="absolute  z-[-1] top-[270px] right-[130px] md:top-[590px] md:right-[300px] lg:top-[560px] lg:right-[340px]"  ><ScrollRotate method={"perc"} loops={2} from={300} to={100} animationDuration={0.3}><img src={Circle} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate> </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Fans section */}
          <div className="fans-section relative">
            <div className="hidden absolute bottom-0 lg:block">
              <div className="relative">
                <div className={`absolute z-[-1] top-[60px] right-[190px] md:top-[80px] md:right-[400px] lg:top-[90px] lg:right-[540px] will-change-transform`}> <ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.3}><img src={Circle} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate></div>
                <div className="absolute  z-[-1]  top-[130px] right-[50px] md:top-[290px] md:right-[180px] lg:top-[280px] lg:right-[640px] will-change-auto"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
                <div className="absolute  z-[-1] top-[270px] right-[130px] md:top-[590px] md:right-[300px] lg:top-[470px] lg:right-[190px]"  ><ScrollRotate method={"perc"} loops={2} from={300} to={100} animationDuration={0.3}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate> </div>

                <img src={Fans} className="player object-contain max-w-[720px]" style={{ width: `${width / 2}px` }} />
              </div>
              <div className="absolute top-[0] z-[-1]">
                <img src={FansBg} className="player object-contain" />
              </div>
            </div>
            <div className="mt-[159px] md:mt-[200px] mx-auto container px-[15px]  md:pb-[150px]">
              <div className="flex flex-col lg:flex-row mt-6">
                <div className="flex-1 order-2 md:order-1 ">
                  <div className="mt-[62px] relative left-[-70px] md:hidden md:mt-[0px]">
                    <img src={Fans} className="player object-contain max-w-[850px]" />

                    <div className={`absolute z-[-1] top-[30px] right-[280px] md:top-[80px] md:right-[400px] lg:top-[30px] lg:right-[420px] will-change-transform`}> <ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Circle} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate></div>
                    <div className="absolute  z-[-1]  top-[130px] right-[50px] md:top-[290px] md:right-[180px] lg:top-[270px] lg:right-[130px] will-change-auto"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
                    <div className="absolute  z-[-1] top-[270px] right-[110px] md:top-[590px] md:right-[300px] lg:top-[560px] lg:right-[340px]"  ><ScrollRotate method={"perc"} loops={2} from={300} to={100} animationDuration={0.3}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate> </div>

                    <div className="absolute top-0 z-[-1]">
                      <img src={FansBg} className="player object-contain" />
                    </div>
                  </div>

                </div>
                <div className="flex-1 order-1 md:order-2">
                  <div>
                    <img src={Macbook} className="player object-contain" />
                  </div>
                  <div className="mt-[10px] md:mt-[63px]">
                    <Title
                      title={(<div className="text-center lg:text-left text-rgba-grey-08"><span className="font-bold text-white">Minden platformon</span> maximális élményben lesz részed</div>)}
                    ></Title>
                    <div className="mt-[30px] text-center lg:text-left">
                      <Button size={"large"} primary={true}>Érdekel</Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* Fans section */}

          {/* Subscribe section */}
          <div className="signup-section relative">
            <div className="hidden absolute lg:block right-[150px]">
              <div className="relative">
                <div className="absolute  z-[-1]  top-[130px] right-[50px] md:top-[290px] md:right-[180px] lg:top-[10px] lg:right-[230px] will-change-auto"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
                <div className={`absolute z-[-1] top-[60px] right-[190px] md:top-[80px] md:right-[400px] lg:top-[330px] lg:right-[420px] will-change-transform`}> <ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.3}><img src={Circle} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.1 ? 1.1 : offset)})` }} /></ScrollRotate></div>
                <div className="absolute  z-[-1] top-[270px] right-[130px] md:top-[590px] md:right-[300px] lg:top-[390px] lg:right-[20px]"  ><ScrollRotate method={"perc"} loops={2} from={300} to={100} animationDuration={0.3}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate> </div>

                <img src={TennisPlayer} className="player object-contain max-w-[850px]" style={{ width: `${width / 2}px`, transform: `translate(${width > 1024 ? (0 + (offset * 50)) : 0}px, 0px)`, transition: 'transform 150ms ease' }} />
              </div>
              <div className="absolute top-[-180px] right-[-100px] z-[-1]">
                <img src={FootballerBg} className="player object-contain" />
              </div>
            </div>
            <div className="mt-[140px] md:mt-[200px] mx-auto container px-[15px]  pb-[150px]">
              <div className="flex flex-col lg:flex-row mt-6">

                <div className="flex-1 ">
                  <Element name="subscribe" className="subscribe">

                    <div>
                      <Title
                        title={(<div className="text-center lg:text-left text-rgba-grey-08"><span className="font-bold text-gradient">Iratkozz fel </span>és csapj le 90%-os early bird kedvezményünkre</div>)}
                      ></Title>

                      <div className="mt-[30px] text-left text-rgba-grey-08">
                        Az indulást követő, első hónapra megajándékozunk egy <span className="text-white font-bold">90%-os kupon</span>nal, így minimális költségen próbálhatod ki szolgáltatásunkat.
                      </div>
                      <div className="mt-[30px] text-left text-rgba-grey-08">
                        Továbbá <span className="text-white font-bold">feliratkozásoddal részt veszel egy sorsoláson is</span>, ahol, ha nyersz, az indulás előtt teljesen ingyenesen tesztelheted honlapunkat és applikációnkat. Nincs más dolgod, csak add meg az e-mail címed és értesíteni fogunk a fejleményekről.
                      </div>
                      <div className="mt-[30px] text-left text-rgba-grey-08">
                        A feliratkozás semmilyen kötelezettséggel nem jár és harmadik félnek nem szolgáltatjuk ki az adataidat.
                      </div>

                      <div className="mt-[30px] text-left">
                        <div className="mb-[30px]">
                          <Label children={'Email cím'} required={false} />
                          <Input placeholder="Add meg az e-mail címed" name={''} type={''} error={''} disabled={false} />
                        </div>
                        <Button size={"large"} primary={true} customClasses={'w-full md:w-[initial]'}>Feliratkozom</Button>
                      </div>
                    </div>
                  </Element>

                </div>
                <div className="flex-1 ">
                  <div className="mt-[62px] relative right-[40px] md:hidden md:mt-[0px]">
                    <img src={TennisPlayer} className="player object-contain max-w-[850px]" />
                    <div className={`absolute z-[-1] top-[0px] right-[30px] md:top-[80px] md:right-[400px] lg:top-[30px] lg:right-[420px] will-change-transform`}> <ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate></div>
                    <div className="absolute  z-[-1]  top-[130px] right-[50px] md:top-[290px] md:right-[180px] lg:top-[270px] lg:right-[130px] will-change-auto"  ><ScrollRotate method={"perc"} loops={1} from={0} to={200} animationDuration={0.1}><img src={Cross} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})`, opacity: ((1 - (opacity * 1.5)) < 0 ? 1 : (1 - (opacity * 1.5))), }} /></ScrollRotate> </div>
                    <div className="absolute  z-[-1] top-[310px] right-[190px] md:top-[590px] md:right-[300px] lg:top-[560px] lg:right-[340px]"  ><ScrollRotate method={"perc"} loops={2} from={300} to={100} animationDuration={0.3}><img src={Circle} className="w-[30px] h-[30px]" style={{ transform: `scale(${offset < 1 ? 1 : (offset > 1.3 ? 1.3 : offset)})` }} /></ScrollRotate> </div>

                    <div className="absolute top-0 right-[-40px] z-[-1]">
                      <img src={FootballerBg} className="player object-contain" />
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
          {/* Subscribe section */}
        </div >
      </div >
    </>
  )
}