Component({
  properties: {
    width: {
      type: Number,
      value: 125,
    },
    height: {
      type: Number,
      value: 125,
    },
    top: {
      type: Number,
      value: 50,
    },
    opacity: {
      type: Number,
      value: 0.2,
    },
    fontsize: {
      type: Number,
      value: 12,
    },
    zindex: {
      type: Number,
      value: 1000,
    },
    contents: {
      type: Array,
      value: [],
    },
  },
  data: {
    src: '',
  },
  observers: {
    contents: function (contents) {
      this.setData({ src: '' }, () => {
        this.createWatermark(contents);
      });
    },
  },
  methods: {
    createWatermark(textList) {
      if (!textList.length) return;
      const query = wx.createSelectorQuery();
      query
        .in(this)
        .select('#watermark')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');

          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          ctx.scale(dpr, dpr);

          ctx.rotate((-20 * Math.PI) / 180);
          ctx.fillStyle = `rgba(0,0,0,${this.data.opacity})`;
          ctx.font = `${this.data.fontsize}px`;
          ctx.textAlign = 'center';
          textList.forEach((text, index) => {
            ctx.fillText(text, res[0].width / 2 - 20, this.data.top + index * 16);
          });

          const src = canvas.toDataURL();
          this.setData({
            src,
          });
        });
    },
  },
});
