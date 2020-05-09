//获取应用实例
var app = getApp()
Page({
  // 数据
  data: {
  },
  // 页面加载
  onLoad: function () {
  }, onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快找公厕-出门必备',
      path: '/pages/author/author'
    }
  }, copyJfinalxueyuan: function () {
    wx.setClipboardData({
      data: 'http://jfinalxueyuan.com',
      success: function () {
        wx.showToast({
          title: '网址已复制',
        })
      }
    })
  }, copyJboltcn:function(){
    wx.setClipboardData({
      data: 'http://jbolt.cn',
      success: function () {
        wx.showToast({
          title: '网址已复制',
        })
      }
    })
  }, copyWechat:function(){
    wx.setClipboardData({
      data: '18766735632',
      success:function(){
        wx.showToast({
          title: '微信号已复制',
        })
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