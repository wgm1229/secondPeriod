<template>
    <div>
        项目首页{{$route.params.id}}
    </div>
</template>

<script>
    export default {
        created () {
            console.log(this.$route.params);
        },
    }
</script>

<style lang="scss" scoped>

</style>