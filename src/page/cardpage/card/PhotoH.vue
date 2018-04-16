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
        width: this.photoWidth + 'px',
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.photoWidth = this.$el.clientHeight - 10
    })
  },
}
</script>