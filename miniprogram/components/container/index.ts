Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    safeBottom: {
      type: Boolean,
      value: true,
    },
    headerBgColor: {
      type: String,
      value: 'transparent',
    },
    showLoading: {
      type: Boolean,
      value: false,
    },
    loadingText: {
      type: String,
      value: '加载中',
    },
    showFixedBottom: {
      type: Boolean,
      value: true,
    },
    // 内容区模式
    contentArea: {
      type: Boolean,
      value: false,
    },
    showWatermark: {
      type: Boolean,
      value: false,
    },
    watermarkContent: {
      type: Array,
      value: [],
    },
  },
  data: {
    headerHeight: 44,
    bottomHeight: 34,
  },
  ready() {
    this.updateHeaderAndBottomHeight()
  },
  methods: {
    updateHeaderAndBottomHeight() {
      const query = this.createSelectorQuery()
      query
        .select('.container-header-fixed')
        .boundingClientRect((rect) => {
          this.setData({ headerHeight: rect.height })
        })
        .exec()
      query
        .select('.container-bottom-fixed')
        .boundingClientRect((rect) => {
          this.setData({ bottomHeight: rect.height })
        })
        .exec()
    },
  },
})
