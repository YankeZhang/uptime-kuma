<template>
    <div class="mb-3">
        <label for="appkey" class="form-label">{{ $t("appkey") }}<span style="color: red;"><sup>*</sup></span></label>
        <input id="appKey" v-model="$parent.notification.appKey" type="text" class="form-control" required>

        <label for="appSecret" class="form-label">{{ $t("appSecret") }}<span style="color: red;"><sup>*</sup></span></label>
        <input id="appSecret" v-model="$parent.notification.appSecret" type="text" class="form-control" required>

        <label for="teamAccessToken" class="form-label">{{ $t("teamAccessToken") }}<span style="color: red;"><sup>*</sup></span></label>
        <input id="teamAccessToken" v-model="$parent.notification.teamAccessToken" type="text" class="form-control" required>


        <div class="form-text">
            <i18n-t tag="p" keypath="Read more:">
                <a href="https://me.jd.com/openplatform/docs?docs=%2Fdocs%2Fserver%2Fauth%2Faccess-token&activeTab=server&ts=123" target="_blank">https://me.jd.com/openplatform/docs?docs=%2Fdocs%2Fserver%2Fauth%2Faccess-token&activeTab=server&ts=123</a>
            </i18n-t>
        </div>
    </div>
</template>
