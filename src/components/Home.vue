<template lang="">
    <div>
        <Blog/>
        <InternetPrice/>
        <Shop/>
    </div>
</template>
<script>

import InternetPrice from '@/views/prices/EthernetPrice.vue'; 
import Blog from '@/views/Blog.vue';
import Shop from '@/views/Shop.vue';

export default {
    components: {
        InternetPrice,
        Blog,
        Shop
    }
    
}
</script>
<style lang="">
    
</style>