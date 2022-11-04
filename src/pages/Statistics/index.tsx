import { linearGradientDef } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line'
import React, { useEffect, useState } from 'react';
import { BlackBox, Container, Icon, PageTitle } from '../../components';
import { format, parseISO } from 'date-fns'
import huLocale from 'date-fns/locale/hu';
import { twMerge } from 'tailwind-merge';
import { SmallItemBox } from '../../components/Statistics/SmallItemBox';
import { ResponsiveBar } from '@nivo/bar'
import * as helpers from 'chart.js/helpers';
import { Chart } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export interface PageProps {

}
const labels = ['', '', '', '', '', ''];
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
  "icomoon",
  // pass the url to the file in CSS url() notation
  "url(http://localhost:3001/src/assets/fonts/icomoon/icomoon.woff)"
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

export const dataSet = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
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

  const parseVirtualBankChart = () => {

  }

  const CustomBarComponent = ({ bar: { x, y, width, height, color } }) => (
    //<circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />
    // <rect x={x} y={y} width={width} height={height} fill={color} rx="6" />
    <path d={`M${x},${y}
       v-${height} 
       q${width / 2}, 0 ${width / 2}, ${width / 2},
       h${width}
       q0,${width / 2} -${width / 2}, ${width / 2}
       v${height} 
       z
       `} fill={color} x={x} y={y} />
  )

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


  return (
    <>
      <Container className="container 2xl:mx-auto max-w-[100%] 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto" padding={true}>
        <PageTitle title="Statisztikák" icon="donut" />
        <div className="flex gap-[40px] flex-row">
          <div className="flex-[8]">
            <BlackBox>
              <div className="text-[16px]"><strong>Virtuális bank</strong>od alakulása az elmúlt 10 napban</div>
              <div className="h-[400px] w-[100%]">
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
                  }}
                  colors="#9c5df299"

                  margin={{ top: 30, right: 30, bottom: 30, left: 100 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    stacked: true,
                    reverse: false
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 15,
                    tickRotation: 0,
                    legendPosition: 'middle'
                  }}
                  axisLeft={{
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
          <div className="flex-[4]">
            <BlackBox extraClass="h-full px-0">
              <div className="px-[24px]">
                <div className="text-[14px] font-[600] text-rgba-grey-06">Aktuális havi profitod/veszteséged</div>
                <div className="text-white font-[600] text-[40px]">+ 520 400 HUF</div>
              </div>
              <div className="view-table mt-[8px] max-h-[330px] h-auto overflow-auto px-[24px]">
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
        <div className="flex flex-row gap-[40px] my-[40px]">
          <div className="flex-[2]">
            <SmallItemBox value={'72'} title={'megjátszott tipp'} subTitle={'a hónapban'} />
          </div>
          <div className="flex-[2]">
            <SmallItemBox value={'56'} title={'nyertes tipp'} subTitle={'a hónapban'} />
          </div>
          <div className="flex-[2]">
            <SmallItemBox value={'6'} title={'vesztes tipp'} subTitle={'a hónapban'} />
          </div>
          <div className="flex-[2]">
            <SmallItemBox value={'10'} title={'push'} subTitle={'a hónapban'} />
          </div>
          <div className="flex-[2]">
            <SmallItemBox value={'72'} title={'átlag odds'} subTitle={'a hónapban'} />
          </div>
          <div className="flex-[2]">
            <SmallItemBox value={parseInt('17000').toLocaleString('hu-HU')} title={'HUF átlagtét'} subTitle={'a hónapban'} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-[40px]">
          <div className="flex-1">
            <BlackBox>
              <div className="text-[16px] mb-[25px]">Ezekre a ligákra fogadtál</div>
              <div className="h-[400px] w-auto">
                <Bar
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                     /* labels: {
                        render: 'image',
                        overlap: true,
                        position: 'outside',
                        outsidePadding: 4,
                        fontColor: '#fff',
                        images: [{
                          src: 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_book_48px-256.png',
                          height: 25,
                          width: 25
                        },
                        {
                          src: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/pen-checkbox-256.png',
                          height: 25,
                          width: 25
                        },
                        {
                          src: 'https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Home-House--256.png',
                          height: 25,
                          width: 25
                        },
                        {
                          src: 'https://cdn1.iconfinder.com/data/icons/social-media-vol-3/24/_google_chrome-256.png',
                          height: 25,
                          width: 25
                        },
                        {
                          src: 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_book_48px-256.png',
                          height: 25,
                          width: 25
                        },
                        {
                          src: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/pen-checkbox-256.png',
                          height: 25,
                          width: 25
                        },
                        {
                          src: 'https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Home-House--256.png',
                          height: 25,
                          width: 25
                        },
                        {
                          src: 'https://cdn1.iconfinder.com/data/icons/social-media-vol-3/24/_google_chrome-256.png',
                          height: 25,
                          width: 25
                        },
                        ]
                      }*/
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
                          tickLength: 20,
                        },
                        ticks: {
                          // font: 'WComic Sans MS"',
                          color: 'rgba(255, 255, 255, 0.8)',
                          font: {
                            family: 'icomoon',
                            size: 40,
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
          <div className="flex-1"><BlackBox>sad</BlackBox></div>
        </div>
      </Container>
    </>
  )
}