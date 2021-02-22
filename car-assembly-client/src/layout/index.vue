<template>
    <div class="app-layout">
        <nav-bar />
        <app-main />
    </div>
</template>

<script>
import NavBar from './components/NavBar';
import AppMain from './components/AppMain';

export default {
    name: 'AppLayout',
    components: {
        NavBar,
        AppMain
    }
};
</script>

<style lang="less" scoped>
.app-layout {
    min-width: 1280px;
}
</style>