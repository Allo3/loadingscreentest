
document.addEventListener("mousemove", function(event) {
  const cursor = document.getElementById("cursor");
  cursor.style.left = `${event.pageX}px`;
  cursor.style.top = `${event.pageY}px`;
});




const app = new Vue({
  el: '#app',
  data: {
    count:0,
    music:false,
    settings:false,
    keyboard:false,
    connect:'E',
    isPlaying: false,
    selectedMusicIndex: 0,
    volume: 0.5,
    isMuted: false,
    musicList: [
      {label: 'Billy Bob', title: 'Intro Liberty', url: 'https://www.youtube.com/watch?v=65NF8dvJUmg&pp=ygUPYmFzcyBhbmQgYm91bmNl', cover: './rte.jpg' }
    ],
    progress: 0,
    resources:{
      info:"LOADING MAP FILES..."
    },
    description:'Description about button in few words are there',
    keyinfo:{
      ['F1']:{
        description:'You can unlock the phone with this command'
      }
    },
    social: [
      {
        name: "DISCORD",
        icon: "discord",
        position: { left: '2.5rem', width: 3.375, height: 2.375 },
        iconPosition: { left: 2.45 }
      },
      {
        name: "WEB",
        icon: "web",
        position: { left: '3.2rem', width: 2.375, height: 2.375 },
        iconPosition: { left: 2.8 }
      },
      {
        name: "TWITTER",
        icon: "twitter",
        position: { left: '2.5rem', width: 2.375, height: 2.375 },
        iconPosition: { left: 2.8 }
      },
      {
        name: "INSTAGRAM",
        icon: "instagram",
        position: { left: '2rem', width: 2.375, height: 2.375 },
        iconPosition: { left: 2.8 }
      }
    ],
    gallery:[
      {
        background:'bg-1'
      }, 
      {
        background:'bg-2'
      },
      {
        background:'bg-3'
      },
      {
        background:'bg-4'
      },
    ],
    updates:[
      {
        border:'border-shadow',
        text:'Added some cool stuff for our players'
      },
      {
        border:'border-white',
        text:'Added some cool stuff for our players'
      },
      {
        border:'border-shadow',
        text:'Added some cool stuff for our players'
      },
      {
        border:'border-white',
        text:'Added some cool stuff for our players'
      },
      {
        border:'border-shadow',
        text:'Added some cool stuff for our players'
      },
      {
        border:'border-white',
        text:'Added some cool stuff for our players'
      },
      {
        border:'border-shadow',
        text:'Added some cool stuff for our players'
      },
    ],
    commands:[
      {
        header:"HUD",
        description:"Description about button in few words are there"
      }, 
      {
        header:"HUD",
        description:"Description about button in few words are there"
      }, 
      {
        header:"HUD",
        description:"Description about button in few words are there"
      }, 
      {
        header:"HUD",
        description:"Description about button in few words are there"
      }, 
      {
        header:"HUD",
        description:"Description about button in few words are there"
      }, 
      {
        header:"HUD",
        description:"Description about button in few words are there"
      }, 
      {
        header:"HUD",
        description:"Description about button in few words are there"
      }, 
    ],
    showModal: false,
    currentImage: null,
    selectedImage: null,
    radius: 70, 
    bar: {
      '1': { load: 0, max: 400, multiplier: 3.5, pi: 1 },
      '2': { load: 0, max: 520, multiplier: 3.5, pi: 1.75 },
      '3': { load: 0, max: 500, multiplier: 4.5, pi: 2.1 }
    },
  },
  computed: {
    selectedMusic: function () {
      return this.musicList[this.selectedMusicIndex];
    }
  },
   methods: {
    musicControl(){
      this.music = !this.music
    },
    typeClick(type){
      if (type == 'keyboard'){
        this.keyboard = !this.keyboard
      }
    },
    togglePlay: function () {
      var audioPlayer = this.$refs.audioPlayer;
      if (this.isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    toggleMute: function () {
      var audioPlayer = this.$refs.audioPlayer;
      if (this.isMuted) {
        audioPlayer.muted = false;
      } else {
        audioPlayer.muted = true;
      }
      this.isMuted = !this.isMuted;
    },
    nextMusic: function () {
      this.selectedMusicIndex = (this.selectedMusicIndex + 1) % this.musicList.length;
      this.resetAudio();
    },
    previousMusic: function () {
      this.selectedMusicIndex = (this.selectedMusicIndex - 1 + this.musicList.length) % this.musicList.length;
      this.resetAudio();
    },
    resetAudio: function () {
      var audioPlayer = this.$refs.audioPlayer;
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      this.isPlaying = false;
      audioPlayer.volume = this.volume;
      setTimeout(() => {
        audioPlayer.play();
        this.isPlaying = true;
      }, 88);
    },
    updateProgress: function () {
      var audioPlayer = this.$refs.audioPlayer;
      var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      this.progress = progress.toFixed(2);
    },
    increaseVolume: function () {
      if (this.volume < 1) {
        this.volume += 0.1;
        var audioPlayer = this.$refs.audioPlayer;
        audioPlayer.volume = this.volume;
      }
    },
    decreaseVolume: function () {
      if (this.volume > 0) {
        this.volume -= 0.1;
        var audioPlayer = this.$refs.audioPlayer;
        audioPlayer.volume = this.volume;
      }
    },
    animateWelcome() {
      const animatedWelcome = this.$refs.animatedWelcome;
      anime({
        targets: animatedWelcome,
        opacity: [1, 0.2], 
        duration: 1000, 
        direction: 'alternate',
        loop: true, 
        easing: 'easeInOutSine', 
      });
    },
    watch: {
      selectedMusic: function () {
        this.resetAudio();
      }
    },
    animateText() {
      const animatedText = this.$refs.animatedText;
      anime({
        targets: animatedText,
        translateX: ['-10px', '10px'], 
        duration: 2000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
      });
    },
    keyString(key) {
      this.description = this.keyinfo[key].description;
      const firstChar = key.charAt(0,1).toUpperCase();
      this.connect = firstChar
    },
    circumference(type) {
      const barInfo = this.bar[type];
      if(barInfo) {
        return 2 * barInfo.pi * Math.PI * this.radius;
      }
      return 0;
    },
    dasharray(type) {
      const barInfo = this.bar[type];
      if (barInfo) {
        const percentage = (barInfo.load * barInfo.multiplier) / barInfo.max;
        const dashLength = this.circumference(type) * percentage;
        const gapLength = this.circumference(type) - dashLength;
        return `${dashLength} ${gapLength}`;
      }
      return '0 0';
    },
    openImage(eyes, index) {
      const target = this.$refs.imageDivs[index];
      anime({
        targets: target,
        scale: [1, 1.1],
        duration: 500,
        direction: 'alternate',
        easing: 'easeInOutSine',
      });
    
      this.showModal = true;
      this.currentImage = eyes;
    
      this.$nextTick(() => {
        anime({
          targets: this.$refs.modalImage,
          translateY: [-600, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutCubic',
        });
      });
    },    
    closeImage() {
      this.showModal = false;
      this.currentImage = null;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    }
    
  },
  mounted() {
    this.animateText();
    this.animateWelcome();
    var audioPlayer = this.$refs.audioPlayer;
    audioPlayer.play();
    this.isPlaying = true;
    document.addEventListener('keydown', (e) => {
      if (this.showModal && e.keyCode === 27) {
        this.closeImage();
      }
    });
    anime({
      targets: this.$refs.header,
      translateY: ['-100%', '0%'],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeInOutExpo',
      delay: 100
    });
  },
  computed: {
    selectedMusic: function () {
      return this.musicList[this.selectedMusicIndex];
    }
  },
  
  })
  
  document.onkeyup = function (data) {
    if (data.which == 27) {
      $.post(`https://${GetParentResourceName()}/exit`, JSON.stringify({}));
    }
  };

  let intervalId; 
  const handlers = {
    startInitFunctionOrder(data) {
      if (intervalId) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(() => {
        if (app.count < 100) {
          app.count += 1;
        } else {
          clearInterval(intervalId); 
        }
      }, 135); 
    },

    initFunctionInvoking(data) {
      const threshold = 75;
      const fastIncrement = 2;
      const slowIncrement = 0.5;
      let interval = setInterval(() => {        
        let percentage = Math.min(Math.floor(data.idx / app.count * 105), 100);  
        let increment = percentage >= threshold ? slowIncrement : fastIncrement;
        app.resources.info = "VERIFYING SERVER FILES..."

        if (app.bar['1'].load >= 105) {
          let remaining = app.bar['1'].load % app.bar['1'].max;
          app.bar['1'].load = Math.min(app.bar['1'].load + (app.bar['1'].max - remaining), 100);
        } else {
          app.bar['1'].load += increment;
        }
      }, 5000);
    },
    
  

  startDataFileEntries(data) {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      if (app.count < 100) {
        app.count += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 130); 
    let bar2_percentage = Math.min(Math.floor(app.count * app.bar['2'].pi), 100);
    let bar3_percentage = Math.min(Math.floor(app.count * app.bar['3'].pi), 100);
    if (app.bar['1'].load >= 99) {
      app.bar['2'].load = bar2_percentage;
      app.bar['3'].load = bar3_percentage;
    }
    let interval = setInterval(() => {
      Object.keys(app.bar).forEach(key => {
        let increment;
        if (key === '3') {
          increment = app.bar[key].load >= 75 ? 0.25 : 0.5; // bar 3 için dolma hızını yavaşlatıyoruz
        } else {
          increment = app.bar[key].load >= 75 ? 0.5 : 2;
        }
        app.bar[key].load += increment;
        
        // Check if the bar is full
        if (app.bar[key].load >= app.bar[key].max) {
          app.bar[key].load = 0;
        }
  
        // Check if the bar has reached 100
        if (app.bar[key].load >= 100) {
          let remaining = app.bar[key].load % app.bar[key].max;
          app.bar[key].load += (app.bar[key].max - remaining);
        }
      });
    }, 100);  
  },

    performMapLoadFunction(data) {
        app.resources.info = "LOADING MAP FILES..."
    },
};

window.addEventListener("message", function (e) {
  console.log("DATA DATA " + JSON.stringify(e.data));
  if(handlers[e.data.eventName]) {
      handlers[e.data.eventName](e.data);
  }
});
