import React, { useEffect, createRef, useCallback } from 'react';
import axios from 'axios'
import * as d3 from 'd3'
function ResourceView() {

    const d3Ref = createRef();
    const d3RefLine = createRef();

    const getResourceData = useCallback(() => {
        return axios.get('/api/data');
    }, [])

    //가로 막대그래프,CPU, Memory 사용량 변화
    useEffect(() => {
        // getResourceData();
        const makeData = () => {
            const data = getResourceData();

            data.then((res) => {
                console.log('res.data', res.data)
                //테두리 생성
                const widthSize = 300;
                const heightSize = 200;

                const ySize = 40;
                const padding = ySize + 5;

                //지우고
                d3.select(d3Ref.current).selectAll('svg').remove();
                // d3.select(d3Ref.current).selectAll('rect').remove();
                // d3.select(d3Ref.current).selectAll('text').remove();

                //새로만들고
                const svgCanvas = d3.select(d3Ref.current)
                    .append("svg")
                    .attr('width', widthSize)
                    .attr('height', heightSize)
                    .style('border', '1px solid black')
                //실제 데이터 생성
                svgCanvas.selectAll('rect')
                    .data(res.data)
                    .enter()
                    .append('rect')
                    .attr('width', data => widthSize * (data.value))
                    .attr('height', ySize)
                    .attr('fill', data => data.value >= 0.7 ? 'red' : 'green')
                    .attr('x', 0)
                    .attr('y', (data, iter) => iter * (padding))
                //label 작업
                svgCanvas.selectAll('text')
                    .data(res.data)
                    .enter()
                    .append('text')
                    .attr('x', '68%')
                    .attr('y', (data, iter) => iter * (padding) + ySize / 2)
                    // .attr('fill', 'orange')
                    .style('text-align', 'right')
                    .text(data => data.text + ',' + (data.value * 100).toFixed(2) + '%')

            })
        }

        // setInterval(makeData, 2000);
        makeData();

    }, [d3Ref, getResourceData])

    useEffect(() => {
        // getResourceData()
        //   .then((res) => {
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        d3.select(d3RefLine.current).selectAll('svg').remove();
        // append the svg object to the body of the page
        var svg = d3.select(d3RefLine.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv")
            .then(res => {
                return res.map(d => ({ date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }));
            }).then((data) => {

                // console.log('>> data', data);
                // const pareX = (date) => d3.timeParse("%Y-%m-%d")(date);

                console.log('2018-04-21', ('2018-04-21'))
                // Add X axis --> it is a date format
                console.log('..... > ', data, d3.extent(data, d => d.date))
                var x = d3.scaleTime()
                    .domain(d3.extent(data, (d) => (d.date)))
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));
                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([8000, 9200])
                    .range([height, 0]);


                svg.append("g")
                    .call(d3.axisLeft(y));
                // Add the line
                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "#69b3a2")
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.line()
                        .x(function (d) { return x((d.date)) })
                        .y(function (d) { return y(d.value) })
                    )
                // Add the points
                svg
                    .append("g")
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return x((d.date)) })
                    .attr("cy", function (d) { return y(d.value) })
                    .attr("r", 5)
                    .attr("fill", "#69b3a2")
            })

    }, [d3RefLine])

    // })

    return (
        <div>
            <div>
                메모리 사용량
        <div ref={d3Ref} style={{ width: '300px', height: '200px' }}></div>
                <div ref={d3RefLine} style={{ width: '300px', height: '200px' }}></div>

            </div>
        </div>
    );
}

export default ResourceView;
