<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
export default {
    data() {
        return {
            // url: decodeURIComponent(this.$route.query.url)
						url: undefined,
        };
    },
		computed: {
		},
		onLoad(options) {
			this.url = decodeURIComponent(options.url) 
		},
		methods: {}
};
</script>