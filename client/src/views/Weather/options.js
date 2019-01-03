// 引入 ECharts 主模块
import echarts from "echarts";
var options = {
    firstOption(data1, data2, date) {
        let title = "最高&最低气温";
        return {
            title: {
                text: title,
                left: '50%',
                textStyle: {
                    color: "#fff"
                },
                textAlign: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#7588E4',
                },
                extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
            },
            legend: {
                right: 20,
                orient: 'vertical',
                textStyle: {
                    color: "#fff"
                },
                data: ['最高', '最低']
            },
            xAxis: {
                type: 'category',
                data: date,
                boundaryGap: false,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        color: "#fff",
                        fontSize: 14
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#fff']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    margin: 10,
                    formatter: (value) => {
                        return value + ' ℃';
                    },
                    textStyle: {
                        fontSize: 14
                    }
                }
            },
            series: [{
                name: '最高',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: data1,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(246, 200, 37,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(246, 200, 37,0.2)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f7b851'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }, {
                name: '最低',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: data2,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(45, 138, 224,.3)'
                        }, {
                            offset: 1,
                            color: 'rgba(45, 138, 224,.3)'
                        }], false)
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409eff'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3
                    }
                }
            }]
        }
    },
    secondOption(data, date) {

        return {
            title: {
                text: '相对湿度',
                left: '50%',
                textStyle: {
                    color: "#fff"
                },
                textAlign: 'center'
            },
            xAxis: {
                data: date,
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    barWidth: '50',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#188df0' }
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ]
                            )
                        }
                    },
                    data
                }
            ]
        };
    },
    thirdOption(data,xdata) {
        return {
            title: {
                text: '降水量',
                left: '50%',
                textStyle: {
                    color: "#fff"
                },
                textAlign: 'center'
            },
            xAxis: {
                type: 'category',
                // boundaryGap: false,
                data: xdata,
                triggerEvent: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,.6)'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 16,
                    textShadowColor: '#000',
                    textShadowOffsetY: 1
                }
            },
            yAxis: {
                name: '（mm）',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 16,
                    textShadowColor: '#000',
                    textShadowOffsetY: 1
                },
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,.6)'
                    }
                },
                axisTick: {
                    show: true
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 16,
                    textShadowColor: '#000',
                    textShadowOffsetY: 2
                }
            },
            series: [{
                data: data,
                type: 'line',
                symbol: 'circle',
                symbolSize: 12,
                color: '#FEC201',
                lineStyle: {
                    color: "#03E0F2"
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#FEC201',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                areaStyle: {
                    color: 'rgba(1,98,133,0.6)'
                }
            }, {
                type: 'pictorialBar',
                data: data,
                barGap: "10%",
                symbolRepeat: true,
                symbolMargin: 2,
                symbol: "rect",
                symbolSize: 1,
                color: '#03E0F2',
                symbolClip: true

            }]
        }
    }
}
export default options;