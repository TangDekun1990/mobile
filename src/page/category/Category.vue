<template>
    <div class="ui-category-wrapper">
        <div class="category-wrapper">
            <div class="category-flex">
                <div class="category-sidebar">
                    <ul>
                        <li class="item" v-for='item in items' v-bind:key="item.id">
                            <a href="">{{ item.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="category-content"></div>
            </div>
        </div>

        <tab-bar></tab-bar>
    </div>
</template>

<script>
    import tabBar from '../../components/common/Tabbar'
    import { loadItems } from '../../service/category'
    export default {
        data(){
            return {
                items: [],
                isLoading: false, 
            }
        },
        components: {
            tabBar
        },
        created(){
            this.loadItem()
        },
        methods: {
            loadItem() {  
                this.isLoading = true 
                loadItems(null, null).then(res => { 
                    console.log(res)
                    this.isLoading = false        
                    this.items = Object.assign([], res.categories)         
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import 'src/style/_variable.scss';
    @import 'src/style/mixin.scss';
    .ui-category-wrapper {
        .category-wrapper{
            position: absolute;
            bottom: 50px;
            width: 100%;
            top: 0px;
            .category-flex {
                display: flex;
                -webkit-display: flex;
                width: 100%;
                position: absolute;
                bottom: 0px;
                width: 100%;
                top: 0px;
                .category-sidebar {
                    flex-basis: 140px;
                    background-color: #F0F2F5;
                    ul {
                        li {
                            display: block;
                            padding: 20px 11px;
                            a {
                                color: #4E545D;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                            }
                        }
                    }
                }
                .category-content {
                    width: 100%;
                    background-color: #fff;
                }
            }
        }
    }
</style>


