<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center">
      <qriously :value="user.uid" :size="150" />
      <v-dialog v-model="dialog" fullscreen>
        <v-btn slot="activator" color="amber" dark @click="cameraStart">
          QRコードを読んで友達登録する
        </v-btn>
        <v-card>
          <video :width="width" :height="height" autoplay />
          <v-btn
            color="transparent"
            dark
            icon
            fixed
            left
            top
            @click="cameraStop"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import jsQR from 'jsqr'

export default {
  name: 'Qr',
  props: {
    user: Object
  },
  data() {
    return {
      dialog: '',
      currentStream: null,
      width: window.innerWidth,
      height: window.innerHeight,
      readQrResult: null,
      searchInterval: null
    }
  },
  watch: {
    async readQrResult(newVal, oldVal) {
      await this.$store.dispatch('ADD_FRIEND', {
        user: this.user,
        frinedId: newVal || null
      })
      this.cameraStop()
    }
  },
  methods: {
    cameraStart() {
      const p = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: this.width,
          height: this.height,
          facingMode: 'environment',
          frameRate: { ideal: 5, max: 15 }
        }
      })
      p.then(mediaStream => {
        this.currentStream = mediaStream
        document.querySelector('video').srcObject = mediaStream
      })

      const video = document.querySelector('video')
      const canv = document.createElement('canvas')
      canv.height = this.height
      canv.width = this.width
      const context = canv.getContext('2d')

      this.searchInterval = setInterval(() => {
        context.drawImage(video, 0, 0, this.width, this.height)
        const imageData = context.getImageData(0, 0, this.width, this.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)
        if (code) {
          this.readQrResult = code.data
        }
      }, 500)
    },
    cameraStop() {
      this.dialog = false
      clearInterval(this.searchInterval)
      this.currentStream.getVideoTracks().forEach(devise => {
        devise.stop()
      })
      this.currentStream = null
    }
  }
}
</script>
