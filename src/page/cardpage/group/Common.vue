<script>
export default {  
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getItems: function () {
      let items = []
      if (this.item && this.item.cards && this.item.cards.length) {
        items = this.item.cards
      }
      return items
    },    
  },
  methods: {
    getItemByIndex(index) {
      let items = this.getItems
      if (items && items.length > index) {
        return items[index]
      }
      return null
    }, 
  }
}
</script>
