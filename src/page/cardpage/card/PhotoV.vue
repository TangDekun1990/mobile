<script>
export default {
  data() {
    return {
      photoHeight: 0, 
    }
  },  
  computed: {    
    getPhotoStyle: function () { 
      return {
        height: this.photoHeight + 'px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.photoHeight = this.$el.clientWidth - 10
    })
  },
}
</script>