// 引入SDK核心类
var amapFile = require('../../resources/map/amap-wx.js');
Page({
  data: {
    tabNames:['步行','驾车','骑行'],
    TabCur: 0,
    scrollLeft: 0,
    param:{},
    steps: {},
    walkClass:"primary",
    driveClass:'default',
    ridingClass: 'default'
  },
  onLoad: function (option) {
    var param = JSON.parse(option.param);
    var that = this;
    that.setData({ param: param});
    that.doWalk();
  
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    });

    switch (this.data.TabCur){
        case 0:
          this.doWalk();
        break;
        case 1:
          this.doDrive();
        break;
        case 2:
          this.doRiding();
        break;
    }
  },
  doDrive:function(){
    wx.showLoading({ title: "别急，稍等!" });
    wx.setNavigationBarTitle({title:"驾车路径指导"});
    var that = this;
    that.setData({ walkClass: "default", driveClass: 'primary', ridingClass: 'default'});
    var param=that.data.param;
    var amapInstance = new amapFile.AMapWX({ key: "d2257193c82af6214206626489003d04" });
    //进行路径规划查询
    amapInstance.getDrivingRoute({
      origin: param.origin,
      destination: param.destination,
      success: function (data) {
        wx.hideLoading();
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }
      },
      fail: function (info) {
        wx.hideLoading();
      }
    })
  },doWalk:function(){
    wx.showLoading({ title: "别急，稍等!" });
    wx.setNavigationBarTitle({title:"步行路径指导"});
    var that = this;
    var param = that.data.param;
    that.setData({ walkClass: "primary", driveClass: 'default', ridingClass: 'default' });
    var amapInstance = new amapFile.AMapWX({ key: "d2257193c82af6214206626489003d04" });
    //进行路径规划查询
    amapInstance.getWalkingRoute({
      origin: param.origin,
      destination: param.destination,
      success: function (data) {
        wx.hideLoading();
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }
      },
      fail: function (info) {
        wx.hideLoading();
      }
    })
  }, doRiding: function () {
    wx.showLoading({ title: "别急，稍等!" });
    wx.setNavigationBarTitle({ title: "骑行路径指导" });
    var that = this;
    var param = that.data.param;
    that.setData({ walkClass: "default", driveClass: 'default',ridingClass:'primary' });
    var amapInstance = new amapFile.AMapWX({ key: "d2257193c82af6214206626489003d04" });
    //进行路径规划查询
    amapInstance.getRidingRoute({
      origin: param.origin,
      destination: param.destination,
      success: function (data) {
        wx.hideLoading();
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }
      },
      fail: function (info) {
        wx.hideLoading();
      }
    })
  }, onShareAppMessage: function (res) {

    return {
      title: '快找公厕-出门必备',
      path: '/pages/index/index',
      imageUrl: '/images/sharebg.jpg'
    }
  }
})