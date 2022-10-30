import { linearGradientDef } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line'
import React, { useEffect, useState } from 'react';
import { BlackBox, Container } from '../../components';


export interface PageProps {

}

export default ({ }: PageProps) => {

  const data = [
    {
      "id": "test",
      "color": "hsl(214, 70%, 50%)",
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
        <div className="flex gap-[40px] flex-row">
          <div className="flex-4">
            <BlackBox>
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
          <div className="flex-2">
            <BlackBox>asd</BlackBox>
          </div>
        </div>
      </Container>
    </>
  )
}