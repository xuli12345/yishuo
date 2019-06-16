export const usersStatisticsCtrl = {
  name: "usersStatistics",
  data() {
    return {
      formItem: {
        startDate: "",
        endDate: "",
        startDateNumber: "",
        endDateNumber: "",
        days: 7
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
      const myChart = echarts.init(document.getElementById("addUser"));
      const option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dateArr
        },
        yAxis: {
          type: "value"
        },
        series: [{
          name: "新增用户",
          type: "line",
          stack: "总量",
          data: this.numberArr
        }]
      };
      myChart.setOption(option);
    },
    //初始化数据
    initData() {
      this.formItem.startDateNumber = new Date().getTime() - 518400000;
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
        let data = Math.floor(200 + Math.random() * 800);
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
