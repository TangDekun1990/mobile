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
    isLeft: function () {      
      return this.isCardGroup('L')
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
    isCardGroup(style) {
      let layout = this.item ? this.item.layout : null          
      if (layout && layout.length && layout.indexOf(style) >= 0) {        
        return true
      }
      return false
    },    
  }
}
</script>
