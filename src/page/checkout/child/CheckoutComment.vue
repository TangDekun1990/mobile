<template>
  <div class="comment-container">    
    <label class="title">买家留言：</label>
    <div class="bottom-wrapper">
      <textarea 
        placeholder="选填：对本次交易的说明（建议填写已和卖家协商一致的内容）" 
        v-model="value" 
        @input="onInput">        
      </textarea>
    </div>       
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    default: {
      type: String,
    },    
  },
  data () {
    return {
      value: this.default
    }
  }, 
  methods: {
    ...mapMutations({
      saveCommentInfo: 'saveCommentInfo',  
    }),
    onInput() {
      if (this.value) {
        this.saveCommentInfo({ comment: this.value })
      }
    },
  } 
}
</script>

<style lang="scss" scoped>
  .comment-container {    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff; 
    .bottom-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      height: 80px;
      margin: 15px;      
      textarea {
        flex: 1;
        font-size: 14px;
        color: #4E545D;
        background-color: #F7F8FA;
        padding: 10px;
        border: none;
        border-radius: 2px;
        &:focus {
          outline-style: none;
        }
      }
    }    
  }
  .title {
    width: 100px;
    font-size: 16px;
    color: #4E545D;
    margin-left: 14px;
    margin-top: 15px;
  } 
</style>


