import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnalysesHeader, BetRow, Container, CountdownTimer, IconBadge, Icon, SmallTitle, StatisticsChart, Button, Modal, PlayersGame, Input, Loader } from '../../components';
import './index.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useGetMatchQuery } from '../../redux/MatchSlice';
import MatchDataGetter from '../../utils/MatchDataGetter';
import BetModal from './BetModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNotification } from '../../hooks/useNotification'
import { toast } from 'react-toastify';
import BetHelper from '../../utils/BetHelper';

export interface PageProps {

}

export default ({ }: PageProps) => {
  let { id } = useParams();
  const { isLoading, data, refetch } = useGetMatchQuery({ id });
  const customer = useSelector((state: RootState) => state.customer)
  const bank = useSelector((state: RootState) => state.bank)
  const { newSuccessToast, newErrorToast } = useNotification({
    theme: 'colored',
  })
  const [show, setShow] = useState(false);

  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  if (!data) {
    return (<></>);
  }

  const onSave = () => {
    refetch();
  }
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const homeObject = {
    participantName: data.home?.name ?? `${data.home?.first_name} ${data.home?.last_name}`,
    isIndividual: data.home?.first_name ? true : false,
    logo: data.home?.logo ?? data.home?.image,
    isFullImageLogo: false,
    playerImage: data.homeImage,
    shape: MatchDataGetter(data.matchDatas, 'form', 'home'),
    lastMatch: MatchDataGetter(data.matchDatas, 'last_result', 'home'),
    ranking: MatchDataGetter(data.matchDatas, 'ranking', 'home'),
    missings: MatchDataGetter(data.matchDatas, 'missings', 'home'),
  }

  const awayObject = {
    participantName: data.away?.name ?? `${data.away?.first_name} ${data.away?.last_name}`,
    logo: data.away?.logo ?? data.away?.image,
    isIndividual: data.away?.first_name ? true : false,
    isFullImageLogo: false,
    playerImage: data.awayImage,
    shape: MatchDataGetter(data.matchDatas, 'form', 'away'),
    lastMatch: MatchDataGetter(data.matchDatas, 'last_result', 'away'),
    ranking: MatchDataGetter(data.matchDatas, 'ranking', 'away'),
    missings: MatchDataGetter(data.matchDatas, 'missings', 'away'),
  }

  return (
    <Container className="analyses-container container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={false}>
      {isLoading ? (
        <div className="text-center text-[26px] text-rgba-grey-08 flex justify-center"><div className="flex items-center mr-[10px]"><Loader size={"30"} /></div><div>Betöltés...</div></div>
      ) : (
        <div className="analyses">
          <AnalysesHeader isClosed={data.isClosed} showDatas={data?.analyses.length === 0 ? false : true} sport={data.sport} isDaily={data.isDaily} type={''} background={data.image} homeObject={homeObject} awayObject={awayObject} matchLogo={data.league.image ? (import.meta.env.VITE_DO_IMAGE_HOST + data?.league?.image) : "https://w7tips.fra1.digitaloceanspaces.com/images/leagues/cl.png"} matchDate={{ date: data.dateStart }} locationDatas={{
            weather: data.weather?.icon,
            location: data.location
          }}
          fieldType={data?.fieldType}
          tv={data.tv}
          />


          <div className='relative py-[20px] overflow-hidden'>
            {data?.analyses?.length === 0 && (<div className="absolute top-0 left-0 w-full h-full backdrop-blur-md	"></div>)}
            {data?.analyses?.length === 0 && (<div className="absolute pt-[40px] flex flex-col items-center  top-0 left-0 w-full h-full">
              <div>
                <IconBadge classes={''}><Icon icon="info" size="text-3xl" isGradient /></IconBadge>
              </div>
              <div className="relative text-[24px] font-[600] text-center mt-[24px]">
                Ezt az elemzést kizárólag premium csomagunkkal vagy<br />
                5 kreditért cserébe tekintheted meg.
              </div>
              <div className='flex mt-[24px] gap-[30px]'>
                <div>
                  <Button primary size='small'>
                    <><Icon icon="success" iconClasses='mr-[5px] relative top-[1px]' size="text-sm"></Icon> Prémium előfizetés</></Button>
                </div>
                <div>
                  <Button size='small' customClasses={'text-white  bg-gradient-to-r from-rgba-grey-02 to-rgba-grey-01'}>
                    <><Icon icon="coin" iconClasses='mr-[5px] relative top-[1px]' size="text-sm"></Icon> 5 tokenért megveszem</></Button>
                </div>
              </div>
            </div>)}
            <div>
              <div className="analyses-block mb-[15px]">
                <SmallTitle>Elemzés</SmallTitle>
                <div className="content analyze-content text-[16px]" dangerouslySetInnerHTML={{ __html: data?.analyses?.analyses }}>
                </div>
              </div>

              {data?.analyses?.length === 0 && (
                <div className="analyses-block text-[16px]  mb-[60px]">
                  <p className="mb-[10px]">Örülünk, hogy eggyel okosabb vagy mint az átlag, de akkor tudhatod hogy mi sem ma jöttünk le a falvédőről. Ha szeretnél pénzt keresni ne a kiskapukat keresd, hanem fizess elő Premium szolgáltatásunkra.</p>
                  <p className="mb-[10px]">
                    Te is tudod, hogy ezt a rész ki kell töltenünk valami szöveggel szóval olvasd el az egri csillagok bekezdését
                  </p>
                  <div className="mb-[10px]">
                    <p>A patakban két gyermek fürdik: egy fiú meg egy leány. Nem illik tán, hogy együtt fürödnek, de ők ezt nem tudják: a fiú alig hétesztendős, a leány két évvel fiatalabb.</p>
                    <p>Az erdőben jártak, patakra találtak. A nap tüzesen sütött. A víz tetszett nekik.</p>
                    <p>Először csak a lábukat mártogatták bele, azután beleereszkedtek térdig. Gergelynek megvizesedett a gatyácskája, hát ledobta. Aztán az ingét is ledobta. Egyszer csak ott lubickol meztelenen mind a kettő.</p>
                    <p>Fürödhetnek: nem látja ott őket senki. A pécsi út jó messze van oda, s az erdő végtelen. Ha valaki meglátná őket, lenne is nemulass! Mert a fiúcska csak hagyján - az nem úrfi; de a leányka az a tekintetes Cecey Péter úr leánykája - kisasszony -, és úgy illant el hazulról, hogy senki se látta.</p>
                    <p>Még így csupaszon is látszik rajta, hogy úrileány: kövér, mint a galamb, és fehér, mint a tej. Ahogy ugrándozik a vízben, a két kis szöszke hajfonat ide-oda röppen a hátán.</p>
                    <p>- Derdő - mondja a fiúnak -, uttyunk.</p>
                    <p>A Gergőnek nevezett, soványka, barna fiú háttal fordul. A leányka belekapaszkodik a nyakába. Gergő megindul a part felé, a leányka meg a víz színén lebeg és rugódozik.</p>
                    <p>Azonban hogy a parthoz érnek, Gergő belefogódzik a kákabokor zöld üstökébe, és aggodalmasan néz körül.</p>
                    <p>- Jaj, a szürke!</p>
                    <p>Kilép a vízből, és ide-oda futkos, vizsgálódik a fák között.</p>
                    <p>- Várjon, Vicuska - kiáltja a leánynak -, várjon, mindjárt jövök!</p>
                    <p>S azon meztelenen elnyargal.</p>
                  </div>
                </div>
              )}

              <div className="bets-block mb-[80px]">
                <SmallTitle>Tippek</SmallTitle>
                {data?.analyses.length !== 0 && data?.analyses?.tips.map((item: any) => {
                  return (
                    <div className="mb-[15px]">
                      <BetRow dateStart={data.dateStart} result={item.result} isClosed={data.isClosed} playersNumber={item?.customer_tips_aggregate?.aggregate?.count ?? 0} played={item.customer_tips?.length > 0 ? true : false} playedAmount={item.customer_tips[0]} disabled={(item.customer_tips?.length > 0 || isLoading || data.isClosed) ? true : false} action={() => { setSelectedBet(item); setShowTipModal(true) }} odds={item.odds} title={item.name} strength={item.rating} suggestedBet={(BetHelper(customer?.playingType ?? '', bank?.balance ?? 0, item.tet ?? 0) + ' Ft').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} players={['','', '', '', '']} />
                    </div>
                  )
                })}

              </div>
            </div>

          </div>

        </div>
      )}

     <BetModal confirmAction={() => onSave()}  selectedBet={selectedBet} showTipModal={showTipModal} setShowTipModal={setShowTipModal} />
    </Container>
  )
}