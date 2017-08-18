  <template>
  <div>
  <h1> Gerador de memes </h1>
  
  <div id="picForm">
        <input id="pic" type="file"/>
        <button v-on:click="loadImageInCanvas">carregar imagem </button>
  </div>
  <div id="formTextMemes" hidden>
      Topo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <textarea id="textTopMeme" style="margin-left: 0px; margin-right: 0px; width: 380px" v-on:input='fillCanvasTopText'/><br>
      Rodapé:
      <textarea id="textBottomMeme" style="margin-left: 0px; margin-right: 0px; width: 380px" v-on:input="fillCanvasBottomText"/>
  </div>
  <canvas id="tela" :width='widthDisplay' :height='heightDisplay'>
  </canvas>
  </div> 
</template>

<script>
// eslint-disable-next-line
export default {
  data () {
    return {
      widthDisplay: 600,
      heightDisplay: 451,
      nextXPoint: 0,
      nextYPoint: 0,
      brush: null
    }
  },
  mounted () {
  },
  methods: {
    loadImageInCanvas () {
      let self = this
      let input = document.getElementById('pic')
      if (input.files[0]) {
        let file = input.files[0]
        var c = document.querySelector('#tela')
        var ctx = c.getContext('2d')
        var fr = new FileReader()
        fr.onload = function () {
          let img = new Image()
          img.onload = function () {
            // set context object the parameters, that will be lost out of load
            ctx.drawImage(img, 0, 0, self.widthDisplay, self.heightDisplay)
            self.showInputsToEditMemesText()
          }
          img.src = fr.result
        }
        fr.readAsDataURL(file)
        self.showInputsToEditMemesText()
      }
    },
    showInputsToEditMemesText () {
      document.getElementById('formTextMemes').hidden = false
      document.getElementById('picForm').hidden = true
      document.getElementById('formTextMemes').className = 'centralizationBlock'
    },
    fillCanvasTopText (event) {
      let char = event.data
      let charStyle = {
        size: '80px',
        font: 'Times new roman',
        baseline: 'top',
        fillStyle: 'white'
      }
      if ((this.nextXPoint <= this.widthDisplay) && (this.nextXPoint + 35 <= this.widthDisplay)) {
        this.paintLetterAtCoords(char, this.nextXPoint, this.nextYPoint, charStyle)
        this.nextXPoint = this.nextXPoint + 35
        // console.log('xpoint + ', 'prev> ', previousXPoint, 'next> ', this.nextXPoint)
      } else {
        this.nextXPoint = 0
        this.nextYPoint = this.nextYPoint + 60
        this.paintLetterAtCoords(char, this.nextXPoint, this.nextYPoint, charStyle)
        this.nextXPoint = this.nextXPoint + 35
      }
    },
    fillCanvasBottomText () {
    },
    paintLetterAtCoords (pressedKey, xPoint, yPoint, charStyle) {
      // Get canvas context
      let whiteBoard = document.getElementById('tela')
      this.brush = whiteBoard.getContext('2d')
      if (pressedKey === null && xPoint > 0) {
        console.log('xpoint - ', 'prev> ', this.nextXPoint, 'next> ', this.nextXPoint - 35)
        this.nextXPoint = this.nextXPoint - 35
      } else {
        // seting style of char
        this.brush.font = charStyle.size + ' ' + charStyle.font // size and type of caracter in the same line
        this.brush.textBaseline = charStyle.baseline
        this.brush.fillStyle = charStyle.fillStyle
        // Drawing
        this.brush.fillText(pressedKey, xPoint, yPoint)
      }
    }
  }
}
</script>

<style scoped>
  .centralizationBlock {
    display: block;
    align-content: center;
  }
</style>
