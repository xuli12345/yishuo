export const memberSratisticsCtrl = {
  name: "memberSratistics",
  data() {
    return {
      formItem: {
        startDate: "",
        endDate: "",
        startDateNumber: "",
        endDateNumber: "",
        days: 13
      },
      iosAndAndriod: [{
          value: "andriod",
          label: "andriod"
        },
        {
          value: "ios",
          label: "ios"
        }
      ],
      numberArr: [],
      dateArr: [],
      model1: ""
    };
  },
  mounted() {
    this.createdEcharts();
  },
  updated() {},
  methods: {
    //生成echarts图表
    createdEcharts() {
      const myChart = echarts.init(document.getElementById("addMember"));
      const option = {
        color: ["yellowgreen"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "blue"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          data: this.dateArr,
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: {
          type: "value"
        },
        series: [{
            name: "新增会员",
            data: this.numberArr,
            type: "bar"
          },
          {
            name: "新增会员",
            data: this.numberArr,
            type: "line",
            color: "skyblue"
          }
        ]
      };
      myChart.setOption(option);
    },
    //初始化数据
    initData() {
      this.formItem.startDateNumber = new Date().getTime() - 518400000 * 2;
      this.formItem.endDateNumber = new Date().getTime();
      this.formItem.startDate = this.formatTime(
        new Date(this.formItem.startDateNumber)
      );
      this.formItem.endDate = this.formatTime(
        new Date(this.formItem.endDateNumber)
      );
    },
    searchDate() {
      this.formItem.days =
        (new Date(this.formItem.endDate).getTime() -
          new Date(this.formItem.startDate).getTime()) /
        86400000 +
        1;
      this.createNumberArr();
      this.createDateArr();
      this.createdEcharts();
    },
    //生成数组
    createNumberArr() {
      let numberArr = [];
      for (let i = 0; i < this.formItem.days; i++) {
        let data = Math.floor(100 + Math.random() * 600);
        numberArr.push(data);
      }
      this.numberArr = numberArr;
    },
    //生成日期数组
    createDateArr() {
      let dateArr = [];
      for (let i = 0; i < this.formItem.days; i++) {
        let data = this.formatTime(
          new Date(this.formItem.endDate) - i * 86400000
        );
        dateArr.push(data);
      }
      this.dateArr = dateArr.reverse();
    }
  },
  created() {
    this.initData();
    this.createDateArr();
    this.createNumberArr();
  }

}
