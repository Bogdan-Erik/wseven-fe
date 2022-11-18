// @ts-nocheck
import { linearGradientDef } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line'
import React, { useEffect, useState } from 'react';
import { BlackBox, Container, Icon, MatchItem, PageTitle } from '../../components';
import { format, parseISO } from 'date-fns'
import huLocale from 'date-fns/locale/hu';
import { twMerge } from 'tailwind-merge';
import { SmallItemBox } from '../../components/Statistics/SmallItemBox';
import { ResponsiveBar } from '@nivo/bar'
import * as helpers from 'chart.js/helpers';
import { Chart } from 'chart.js';
import './index.scss';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';


import { Bar, Pie } from 'react-chartjs-2';
import useWindowDimensions from '../../hooks/useWindowDimensions';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export interface PageProps {

}
const labels = ['LaLiga', 'League 1', 'NBA', 'WTA', 'Bundesliga', 'PDC'];
const iconLabels = ['', '', '', '', '', ''];
const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'purple',
];

const font = new FontFace(
  "league-font",
  // pass the url to the file in CSS url() notation
  // "url(https://dev-beta.w7tips.com/src/assets/fonts/icomoon/icomoon.woff)"
  "url(https://w7tips.fra1.digitaloceanspaces.com/league-font/icomoon.woff)"
);

// Add to the document.fonts (FontFaceSet)
document.fonts.add(font);

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = 'rgba(68, 135, 207, 0.7)';
  const colorMid = 'rgba(158, 67, 238, 0.7)';
  const colorEnd = 'rgba(158, 67, 238, 0.7)';

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

function createGradientBorder(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = 'rgba(68, 135, 207, 0.5)';
  const colorMid = 'rgba(158, 67, 238, 0.5)';
  const colorEnd = 'rgba(158, 67, 238, 0.5)';

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorEnd);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorStart);

  return gradient;
}

function createGradientRadial(ctx: CanvasRenderingContext2D, area: ChartArea, index) {


  const colorStart = index === 1 ? 'rgba(68, 135, 207, 0.5)' : 'rgba(255, 255, 255, 0.2)';
  const colorMid = index === 1 ? 'rgba(158, 67, 238, 0.5)' : 'rgba(255, 255, 255, 0.2)';
  const colorEnd = index === 1 ? 'rgba(158, 67, 238, 0.5)' : 'rgba(255, 255, 255, 0.2)';

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorEnd);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorStart);

  return gradient;
}


export const dataSet = {
  labels,
  datasets: [
    {
      label: 'Fogadások',
      data: [22, 20, 17, 13, 9, 5],
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          // This case happens on initial chart load
          return;
        }
        return createGradient(ctx, chartArea);
      },
      borderWidth: 1,
      borderRadius: 6,
      barPercentage: 0.5,
      borderColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          // This case happens on initial chart load
          return;
        }
        return createGradient(ctx, chartArea);
      },
    },
  ],
};


export default ({ }: PageProps) => {
  const { height, width } = useWindowDimensions();

  const leagueChart = [
    {
      "country": "https://w7tips.com/assets/ll.5c9e94f0.png",
      "hot dog": 22,
      "hot dogColor": "hsl(42, 70%, 50%)",
    },
    {
      "country": "https://w7tips.com/assets/wta.2d10be1f.png",
      "hot dog": 20,
      "hot dogColor": "hsl(192, 70%, 50%)",
    },
    {
      "country": "https://w7tips.com/assets/cl.768b9360.png",
      "hot dog": 17,
      "hot dogColor": "hsl(197, 70%, 50%)",
    },
    {
      "country": "https://w7tips.com/assets/pl.a2c0bea3.png",
      "hot dog": 13,
      "hot dogColor": "hsl(303, 70%, 50%)",
    },
    {
      "country": "https://w7tips.com/assets/bl.6f2b5a25.png",
      "hot dog": 9,
      "hot dogColor": "hsl(247, 70%, 50%)",
    },
    {
      "country": "https://w7tips.com/assets/seriea.cfcc1f36.png",
      "hot dog": 5,
      "hot dogColor": "hsl(108, 70%, 50%)",
    }
  ];
  const profitData = [
    {
      date: '2021-12-01',
      value: '601500',
      type: 'plus',
    },
    {
      date: '2022-01-01',
      value: '101500',
      type: 'minus',
    },
    {
      date: '2022-02-01',
      value: '121500',
      type: 'plus',
    },
    {
      date: '2022-03-01',
      value: '410500',
      type: 'plus',
    },
    {
      date: '2022-04-01',
      value: '201500',
      type: 'plus',
    },
    {
      date: '2022-05-01',
      value: '156100',
      type: 'plus',
    },
    {
      date: '2022-06-01',
      value: '65400',
      type: 'minus',
    },
    {
      date: '2022-07-01',
      value: '165400',
      type: 'plus',
    },
    {
      date: '2022-08-01',
      value: '11500',
      type: 'minus',
    },
  ]
  const data = [
    {
      "id": "chart",
      "data": [
        {
          "x": "05.18.",
          "y": 210000
        },
        {
          "x": "05.19.",
          "y": 350000
        },
        {
          "x": "05.20.",
          "y": 490000
        },
        {
          "x": "05.21.",
          "y": 410000
        },
        {
          "x": "05.22.",
          "y": 560000
        },
        {
          "x": "05.23.",
          "y": 700000
        },
        {
          "x": "05.24.",
          "y": 500000
        },
        {
          "x": "05.25.",
          "y": 600000
        },
        {
          "x": "05.26.",
          "y": 600000
        },
        {
          "x": "05.27.",
          "y": 800000
        },
      ]
    },

  ]


  const pieData = {
    labels: ['Sikertelen részvétel', 'Sikeres részvétel'],
    datasets: [
      {
        label: '# of Votes',
        data: [8, 19],
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return createGradientRadial(ctx, chartArea, context.dataIndex);
        },
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return createGradientRadial(ctx, chartArea, context.dataIndex);
        },
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={true}>
        <PageTitle title="Statisztikák" icon="donut" />
        <div className="grid gap-[40px] grid-cols-1 2xl:grid-cols-12 ">
          <div className="2xl:col-start-1 2xl:col-span-8 ">
            <BlackBox>
              <div className="text-[16px]"><strong>Virtuális bank</strong>od alakulása az elmúlt 10 napban</div>
              <div className="h-[200px] sm:h-[300px] md:h-[400px] w-[100%]">
                <ResponsiveLine
                  data={data}
                  enableArea={true}
                  areaOpacity={0.6}
                  theme={{
                    "textColor": "#cccccc",
                    "grid": {
                      "line": {
                        "stroke": "#ffffff1a",
                        "strokeWidth": 1
                      }
                    },
                    "tooltip": {
                      "container": {
                        "background": "#000000",
                        "color": "#ffffff",
                        "fontSize": 12
                      },
                    }
                  }}
                  colors="#9c5df299"

                  margin={{ top: 30, right: width < 600 ? 0 : 30, bottom: width < 600 ? 0 : 30, left: width < 600 ? 0 : 100 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    stacked: true,
                    reverse: false
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={width < 600 ? null : {
                    tickSize: 5,
                    tickPadding: 15,
                    tickRotation: 0,
                    legendPosition: 'middle'
                  }}
                  axisLeft={width < 600 ? null : {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    format: value =>
                      `${Number(value).toLocaleString('hu-HU', {
                        minimumFractionDigits: 0,
                      })} HUF`,
                  }}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointSize={18}
                  pointColor={{ theme: 'grid.line.stroke' }}
                  pointLabelYOffset={-16}
                  enableCrosshair={false}
                  useMesh={true}
                  enableSlices="x"
                  sliceTooltip={({ slice }) => {
                    return (
                      <div
                        style={{
                          background: '#000000',
                          padding: '4px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {slice.points.map(point => (
                          <div
                            key={point.id}
                            style={{
                              fontSize: '12px'
                            }}
                          >
                            {`${Number(point.data.yFormatted).toLocaleString('hu-HU', {
                        minimumFractionDigits: 0,
                      })} HUF`}
                          </div>
                        ))}
                      </div>
                    )
                  }}
                  defs={[
                    linearGradientDef('gradientA', [
                      { offset: 0, color: '#9C5DF2', opacity: 60 },
                      { offset: 100, color: '#9C5DF2', opacity: 0 },
                    ]),
                  ]}
                  fill={[{ match: '*', id: 'gradientA' }]}
                />
              </div>
            </BlackBox>
          </div>
          <div className="2xl:col-start-9 2xl:col-span-4 ">
            <BlackBox extraClass="h-full px-0">
              <div className="px-[24px]">
                <div className="text-[14px] font-[600] text-rgba-grey-06">Aktuális havi profitod/veszteséged</div>
                <div className="text-white font-[600] text-[40px]">+ 520 400 HUF</div>
              </div>
              <div className="view-table mt-[8px] max-h-[330px] h-auto overflow-auto px-[24px] scrollable">
                {profitData?.map((item, key) => {
                  const holderClass = twMerge(`flex flex-row ${key !== profitData.length - 1 ? ' border-rgba-grey-01 border-b-[1px]' : ''} py-[12px]`)
                  return (
                    <div className={holderClass}>
                      <div className="mr-[12px] text-[14px] font-[500]"><Icon icon={'timer'} size={'text-[16px]'} /></div>
                      <div className="mr-auto text-[14px] font-[500]">{format(parseISO(item.date), 'yyyy. MMMM', { locale: huLocale })}</div>
                      <div>{item.type === 'plus' ? '+' : '-'} {parseInt(item.value).toLocaleString('hu-HU')} HUF</div>
                    </div>
                  )
                })}

              </div>
            </BlackBox>
          </div>
        </div>
        <div className="grid gap-[40px] my-[40px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 ">
          <div className="">
            <SmallItemBox value={'72'} title={'megjátszott tipp'} subTitle={'a hónapban'} />
          </div>
          <div className="">
            <SmallItemBox value={'56'} title={'nyertes tipp'} subTitle={'a hónapban'} />
          </div>
          <div className="">
            <SmallItemBox value={'6'} title={'vesztes tipp'} subTitle={'a hónapban'} />
          </div>
          <div className="">
            <SmallItemBox value={'10'} title={'push'} subTitle={'a hónapban'} />
          </div>
          <div className="">
            <SmallItemBox value={'72'} title={'átlag odds'} subTitle={'a hónapban'} />
          </div>
          <div className="">
            <SmallItemBox value={parseInt('17000').toLocaleString('hu-HU')} title={'HUF átlagtét'} subTitle={'a hónapban'} />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[40px]">
          <div className="flex-1">
            <BlackBox extraClass="h-full">
              <div className="text-[16px] mb-[25px]">Ezekre a ligákra fogadtál</div>
              <div className="h-[270px] w-auto">
                <Bar
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {

                      },
                    },

                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                          tickColor: '',
                          tickLength: 30,
                        },
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.8)'
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                          tickColor: '',
                        },
                        ticks: {
                          // font: 'WComic Sans MS"',
                          callback: function (label, index, labels) {
                            return iconLabels[index];

                            // return _label;
                          },
                          color: 'rgba(255, 255, 255, 0.6)',
                          font: {
                            family: 'league-font',
                            size: width / 30 > 30 ? 40 : width / 30,
                          }
                        }
                      }
                    }
                  }}
                  data={dataSet}
                />

              </div>
            </BlackBox>
          </div>
          <div className="flex-1">
            <BlackBox extraClass="h-full">
              <div className="flex flex-col h-full md:flex-row xl:flex-row">
                <div className="flex-1 pt-[24px]">
                  <div>
                    <div className="text-rgba-grey-06 font-[600] text-[14px]">Challenge részvétel</div>
                    <div className="text-white font-[600] text-[24px]">3 részvétel</div>
                  </div>
                  <div className="mt-[24px]">
                    <div className="text-rgba-grey-06 font-[600] text-[14px]">Sikeres challenge</div>
                    <div className="text-white font-[600] text-[24px]">2 sikeres</div>
                  </div>
                  <div className="mt-[24px]">
                    <div className="text-rgba-grey-06 font-[600] text-[14px]">Challenge profitod</div>
                    <div className="text-white font-[600] text-[24px]">+ 220 000 HUF</div>
                  </div>
                </div>
                <div className="flex-1  py-[40px] max-h-[300px]">
                  <Pie
                    data={pieData}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />

                </div>
              </div>
            </BlackBox>
          </div>
        </div>
        <div className="mt-[80px] mb-[80px]">
          <div><PageTitle title='Megjátszott tippjeid' /></div>
          <div className="mt-[15px] xl:mt-0">
            <MatchItem balance={'+30 000 HUF'} />
          </div>
          <div className="mt-[15px] xl:mt-0">
            <MatchItem balance={'+30 000 HUF'} isSecondary />
          </div>
          <div className="mt-[15px] xl:mt-0">
            <MatchItem balance={'+30 000 HUF'} />
          </div>
          <div className="mt-[15px] xl:mt-0">
            <MatchItem balance={'+30 000 HUF'} isSecondary />
          </div>
          <div className="mt-[15px] xl:mt-0">
            <MatchItem balance={'+30 000 HUF'} />
          </div>
          <div className="mt-[15px] xl:mt-0">
            <MatchItem balance={'+30 000 HUF'} isSecondary />
          </div>
          <div className="mt-[15px] xl:mt-0">
            <MatchItem balance={'+30 000 HUF'} />
          </div>
        </div>
      </Container>
    </>
  )
}