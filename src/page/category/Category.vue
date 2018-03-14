<template>
    <div class="ui-category-wrapper">
        <div class="category-wrapper">
            <div class="category-flex">
                <div class="category-sidebar">
                    <ul>
                        <li class="item" v-for='item in items' v-bind:key="item.id" v-on:click='setIsActiveByClick(item)' v-bind:class="{'sidbaractive': item.id == currentItem.id, 'noActive' : item.id != currentItem.id}">
                            <a>{{ item.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="category-content" v-if='currentItem.more'>
                    <ul>
                        <li class="item" v-for='item in currentItem.categories' v-bind:key = "item.id">
                            <a>{{item.name}}</a>
                        </li>
                    </ul>
                </div>
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
                currentItem: {}
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
                loadItems(null, null).then(res => {  
                    let data = res.categories      
                    this.items = Object.assign([], data, this.items);
                    this.currentItem = this.items[0]
                })
            },
            setIsActiveByClick(item) {
                this.currentItem = item;
            },
            getContentById() {

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
                        li.noActive {
                            background-color: #F0F2F5;
                            border-left: 0px;
                            a {
                                color: #4E545D;
                            }
                        }
                        li.sidbaractive{
                            background-color: #FFFFFF;
                            border-left: 2px solid #FC2E39;
                            a {
                                color: #FC2E39;
                            }
                        }
                    }
                }
                .category-content {
                    width: 100%;
                    background-color: #fff;
                    ul {
                        height: 100%;
                        overflow: auto;
                        li {
                            display: block;
                            padding: 20px 0px;
                            text-align: center;
                            cursor: pointer;
                            a {
                                color: #7C7F88;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


