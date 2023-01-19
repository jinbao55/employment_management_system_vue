/**
* 图表界面
*/
<template>
  <!-- 组件主盒子 -->
  <div class="stbox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>就业统计</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索，切换 -->
    <el-row :gutter="23">
      <el-col :span="18">
        <div class="stbgc">
          <el-row :gutter="23">
            <el-col :span="7">
              <el-input size="small" v-model="sce.college" placeholder="输入学院搜索"></el-input>
            </el-col>
            <el-col :span="7">
              <el-input size="small" v-model="sce.major" placeholder="输入专业搜索"></el-input>
            </el-col>
            <el-col :span="3" class="stsearch">
              <el-button size="small" type="primary" @click="search">搜索</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="stbgc">
          <el-row>
            <el-col :span="8" class="text-c">
              <el-radio v-model="sce.year" label="2020">近三年</el-radio>
            </el-col>
            <el-col :span="8" class="text-c">
              <el-radio v-model="sce.year" label="2018">近五年</el-radio>
            </el-col>
            <el-col :span="8" class="text-c">
              <el-radio v-model="sce.year" label="2013">近十年</el-radio>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 统计图 -->
    <el-row :gutter="23">
      <el-col :span="8" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="SCEchart"></div>
        </div>
      </el-col>
      <el-col :span="8" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="SUMEchart"></div>
        </div>
      </el-col>
      <el-col :span="8" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="ClickEchart"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 统计图 -->
    <div>
      <el-row :gutter="23">
        <el-col :span="12" class="text-c">
          <div class="paybox">
            <div class="cavasbox" ref="payEchart"></div>
          </div>
        </el-col>
        <el-col :span="12" class="text-c">
          <div class="paybox">
            <div class="cavasbox" ref="payNumEchart"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import {
  NumberOfGraduates,
  workNumber,
  noWork,
  workTypeStatistics,
  cooperativeCompanies
} from '../../api/statisticsUrl'


import Chart from 'echarts'
export default {
  name: "welcome",
  data() {
    return {

      sce: {
        college: '',
        major: '',
        year: '2013',
        token: localStorage.getItem('logintoken')
      },


      machineNo: '',
      type: 'day',
      //  历年毕业人数
      SCEoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}年 : {c}人"
        },
        legend: {
          data: [{
            name: '历年毕业人数',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          //历年毕业人数X轴
          data: '',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: {
          name: '历年毕业人数',
          type: 'bar',
          barGap: 0,
          //历年毕业人数Y轴
          data: '',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new Chart.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new Chart.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          }
        }
      },
      //  历年就业人数
      SUMoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '历年就业人数',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: '',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: {
          name: '历年就业人数',
          //   type: 'bar',
          type: 'line',
          barGap: 0,
          data: '',
          barWidth: 10,
          itemStyle: {
            color: "#108ff9"
          }
        }
      },
      //  历年升学人数
      Clickoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}年 : {c}人"
        },
        legend: {
          data: [{
            name: '历年升学人数',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: '',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: {
          name: '历年升学人数',
          type: 'bar',
          barGap: 0,
          data: '',
          barWidth: 10,
          itemStyle: {
            color: "#48cefd"
          }
        }
      },
      //  支付方式统计
      payoption: {
        backgroundColor: '#00152a',
        title: {
          text: '学生就业类型统计',
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 40000,
          max: 180000,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series:
          {
            name: '就业类型统计（人数）',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '支付宝' },
              { value: 310, name: '银商二维码' },
              { value: 274, name: '会员' },
              { value: 235, name: '微信支付' },
              { value: 100, name: 'Pos通' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#27a828',
                shadowBlur: 100,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }

      },
      payNumoption: {
        backgroundColor: '#00152a',
        title: {
          text: '所有合作企业类型统计',
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 1,
          max: 8,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series:
          {
            name: '就业类型统计（人数）',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '支付宝' },
              { value: 310, name: '银商二维码' },
              { value: 274, name: '会员' },
              { value: 235, name: '微信支付' },
              { value: 100, name: 'Pos通' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#27a828',
                shadowBlur: 100,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }

      },
    }
  },
  // 导入组件
  components: {
    // 点聚合组件
  },
  // 创建完毕状态(里面是操作)
  created() { },
  // 挂载结束状态(里面是操作)
  mounted() {
    this.getSCE(this.sce)
    this.getSUM(this.sce)
    this.getClick(this.sce)
    this.getpay(this.sce)
    this.getpayNum()
  },
  // 里面的函数只有调用才会执行
  methods: {

    // 交易总笔数
    getSCE(parameter) {
      //发送请求
      NumberOfGraduates(parameter).then(res => {
        this.SCEoption.xAxis.data = res.data.x
        this.SCEoption.series.data=res.data.y
        this.chart = Chart.init(this.$refs.SCEchart)
        this.chart.setOption(this.SCEoption)
      })
    },
    // 交易总金额
    getSUM(parameter) {
      workNumber(parameter).then(res => {
        this.SUMoption.xAxis.data = res.data.x
        this.SUMoption.series.data=res.data.y
        this.chart = Chart.init(this.$refs.SUMEchart)
        this.chart.setOption(this.SUMoption)
      })
    },
    // 历年升学人数
    getClick(parameter) {
      noWork(parameter).then(res => {
        this.Clickoption.xAxis.data = res.data.x
        this.Clickoption.series.data=res.data.y
        this.chart = Chart.init(this.$refs.ClickEchart)
        this.chart.setOption(this.Clickoption)
      })
    },
    // 就业类型统计统计
    getpay(parameter) {
      workTypeStatistics(parameter).then(res => {
        this.payoption.series.data=res.data
        this.chart = Chart.init(this.$refs.payEchart)
        this.chart.setOption(this.payoption)
      })
    },
    // 支付方式统计
    getpayNum() {
      cooperativeCompanies().then(res => {
        this.payNumoption.series.data=res.data
        this.chart = Chart.init(this.$refs.payNumEchart)
        this.chart.setOption(this.payNumoption)
      })

    },
    // 搜索事件
    search() {
      this.getSCE(this.sce)
      this.getSUM(this.sce)
      this.getClick(this.sce)
      this.getpay(this.sce)
    },

  }
};
</script>
<style>
.stbox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.stbgc {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  padding: 0px 16px;
}
.stsearch {
  text-align: center;
}
.text-c {
  text-align: center;
}
.st-gbox {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 5px;
  height: 30vh;
  box-sizing: border-box;
  padding: 10px;
}
.cavasbox {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.paybox {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 20px;
  height: 32vh;
}
</style>
