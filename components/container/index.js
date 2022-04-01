Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    showCustomHeader: {
      type: Boolean,
      value: false,
    },
    safeBottom: {
      type: Boolean,
      value: true,
    },
    searchConfig: {
      type: Object,
      value: () => ({
        show: false,
        value: '',
        placeholder: '',
        showLocation: false,
        disabled: false,
        showAction: false,
      }),
    },
    headerBgColor: {
      type: String,
      value: 'transparent',
    },
    loadConfig: {
      type: Object,
      value: () => ({
        show: false,
        status: 'loadmore',
      }),
    },
    showFixedBottom: {
      type: Boolean,
      value: true,
    },
    showWatermark: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    headerHeight: 44,
    bottomHeight: 34,
  },
  ready() {
    this.updateHeaderAndBottomHeight();
  },
  methods: {
    updateHeaderAndBottomHeight() {
      const query = this.createSelectorQuery();
      query
        .select('.container-header-fixed')
        .boundingClientRect((rect) => {
          this.setData({ headerHeight: rect.height });
        })
        .exec();
      query
        .select('.container-bottom-fixed')
        .boundingClientRect((rect) => {
          this.setData({ bottomHeight: rect.height });
        })
        .exec();
    },
  },
});
