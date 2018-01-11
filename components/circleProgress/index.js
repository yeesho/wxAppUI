// components/circleProgress/index.js

Component({
  properties: {
    progressId: {
      type: String,
      value: 'firstProgressId'
    },

    size: {
      type: Number,
      value: 100
    },

    borderWidth: {
      type: Number,
      value: 5
    },

    duration: {
      type: Number,
      value: 2000
    },

    progress: {
      type: Number,
      value: 2
    },

    max: {
      type: Number,
      value: 10
    },

    backgroundColor: {
      type: String,
      value: '#e2e2e2'
    },

    borderColor: {
      type: String,
      value: 'red'
    },

    showProgress: {
      type: Boolean,
      value: true
    },

    fontColor: {
      type: String,
      value: '#000000'
    },

    fontSize: {
      type: Number,
      value: 25
    }
  },

  data: {

  },

  ready () {
    const frameDuration = 17
    const { progressId, duration } = this.properties
    const startTime = Date.now()

    let ctx = wx.createCanvasContext(progressId, this)
    this.ctx = ctx

    this.timer = setInterval(() => {
      const per = Math.min(1.0, (Date.now() - startTime) / duration)
      drawing(ctx, per, this.properties)

      if(per >= 1){
        clearInterval(this.timer)
      }
    }, frameDuration)
  },

  methods: {
    startProssage () {

    },

    changeProssage () {

    }
  }
})

function progressInit (ctx, data) {
  const {
    progressId,
    size,
    borderWidth,
    duration,
    progress,
    max,
    backgroundColor,
    borderColor,
    showProgress,
    fontColor,
    fontSize } = data

  const border = parseInt(borderWidth)
  const radius = (parseFloat(size) - border) / 2
  const center = {
    x: parseFloat(size) / 2,
    y: parseFloat(size) / 2
  }
  const rate = parseFloat(progress / max)

  ctx.beginPath()
  ctx.setStrokeStyle(backgroundColor)
  ctx.setLineWidth(border)
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
  ctx.draw()
}

function drawing (ctx, per, data) {
  const {
    progressId,
    size,
    borderWidth,
    duration,
    progress,
    max,
    backgroundColor,
    borderColor,
    showProgress,
    fontColor,
    fontSize } = data

  const border = parseInt(borderWidth)
  const radius = (parseFloat(size) - border) / 2
  const center = {
    x: parseFloat(size) / 2,
    y: parseFloat(size) / 2
  }
  const rate = parseFloat(progress / max)

  ctx.setStrokeStyle(backgroundColor)
  ctx.setLineWidth(border)
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
  
  ctx.beginPath()
  ctx.setStrokeStyle(borderColor)
  ctx.setLineCap('round')
  ctx.setLineJoin('round')

  if (per >= 1 && progress === max) {
    ctx.arc(center.x, center.y, radius, 0,2 * Math.PI)
  } else {
    ctx.arc(center.x, center.y, radius, 1.5 * Math.PI, (rate * per * 2 - 0.5) * Math.PI)
  }

  ctx.stroke()
  ctx.closePath()

  if (showProgress) {
    ctx.setFillStyle(fontColor)
    ctx.setFontSize(fontSize)
    const d = Math.ceil(progress * per) 
    const fontDigit = d.toString().length
    const centerx_patch = fontSize * fontDigit / 4 + (fontSize / 8) / 2
    const centery_patch = (fontSize / 2) / 1.25
    ctx.fillText(d, center.x - centerx_patch, center.y + centery_patch)
  }
  ctx.draw()
}
