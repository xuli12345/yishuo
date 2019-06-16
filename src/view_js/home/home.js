import countUp from "../../components/countUp";
import inforCard from "../../components/inforCard";
export const homeCtrl = {
  //name: "home",
  components: {
    countUp,
    inforCard
  },
  data() {
    return {
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      }
    };
  },
  mounted() {
    //上周每日来访量统计
    this.$nextTick(() => {
      let visiteVolume = echarts.init(
        document.getElementById("visite_volume_con")
      );
      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      for (let i = 0; i < 20; i++) {
        xAxisData.push("类目" + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          top: 0,
          left: "2%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: [
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期天"
          ],
          nameTextStyle: {
            color: "#c3c3c3"
          }
        },
        series: [{
          name: "访问量",
          type: "bar",
          data: [{
              value: 453682,
              name: "Mon",
              itemStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              }
            },
            {
              value: 879545,
              name: "Tues",
              itemStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              }
            },
            {
              value: 2354678,
              name: "Wed",
              itemStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              }
            },
            {
              value: 1598403,
              name: "Thur",
              itemStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              }
            },
            {
              value: 543250,
              name: "Fri",
              itemStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              }
            },
            {
              value: 1305923,
              name: "Sat",
              itemStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              }
            },
            {
              value: 1103456,
              name: "Sun",
              itemStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              }
            }
          ]
        }]
      };

      visiteVolume.setOption(option);

      window.addEventListener("resize", function () {
        visiteVolume.resize();
      });
    });
    //数据来源统计
    this.$nextTick(() => {
      var dataSourcePie = echarts.init(
        document.getElementById("data_source_con")
      );
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: ["ios", "android", "pc", "web", "others"]
        },
        series: [{
          name: "访问来源",
          type: "pie",
          radius: "66%",
          center: ["50%", "60%"],
          data: [{
              value: 2103456,
              name: "ios",
              itemStyle: {
                normal: {
                  color: "#9bd598"
                }
              }
            },
            {
              value: 1305923,
              name: "android",
              itemStyle: {
                normal: {
                  color: "#ffd58f"
                }
              }
            },
            {
              value: 543250,
              name: "pc",
              itemStyle: {
                normal: {
                  color: "#abd5f2"
                }
              }
            },
            {
              value: 798403,
              name: "web",
              itemStyle: {
                normal: {
                  color: "#ab8df2"
                }
              }
            },
            {
              value: 302340,
              name: "others",
              itemStyle: {
                normal: {
                  color: "#e14f60"
                }
              }
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }]
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function () {
        dataSourcePie.resize();
      });
    });


    //上周流量统计
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      grid: {
        top: "3%",
        left: "1.2%",
        right: "1%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [{
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      }],
      yAxis: [{
        type: "value"
      }],
      series: [{
          name: "andriod",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {
              color: "#2d8cf0"
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "ios",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {
              color: "#10A6FF"
            }
          },
          data: [257, 358, 278, 234, 290, 330, 310]
        },
        {
          name: "web",
          type: "line",
          stack: "总量",
          areaStyle: {
            normal: {
              color: "#0C17A6"
            }
          },
          data: [379, 268, 354, 269, 310, 478, 358]
        }
      ]
    };
    const serviceRequestCharts = echarts.init(
      document.getElementById("service_request_con")
    );
    serviceRequestCharts.setOption(option);

    window.addEventListener("resize", function () {
      serviceRequestCharts.resize();
    });
  },
  created() {},
  methods: {}
};
