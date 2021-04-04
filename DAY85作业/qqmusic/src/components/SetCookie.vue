<template>
  <div>
    <van-button type="primary" @click="handleCookie">设置真实cookie</van-button>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  methods: {
    handleCookie() {
        request.post('/hehe/user/setCookie',{
            data:`tvfe_boss_uuid=cf33c8059a9b6d77; pgv_pvid=4117897321; pgv_pvi=6314300416; RK=p9zRnEmCQK; ptcz=fd370e9d6b7c39bdbfde77decb4f5b7c87f023bcaddf2f33cf7ce324d911b730; ts_uid=3161512681; tmeLoginType=2; uin=1156916870; psrf_qqopenid=5B8E89E4B03FFCE842A34BEE36D0CEF1; qqmusic_key=Q_H_L_2q00C060eidatMUeUXOzHa6xnN512bP8goXNulz1H_b9qA9AKIxPMAfJtc8vNi1; euin=oK6k7wE57wclon**; qm_keyst=Q_H_L_2q00C060eidatMUeUXOzHa6xnN512bP8goXNulz1H_b9qA9AKIxPMAfJtc8vNi1; psrf_qqrefresh_token=E431D0F863E2EFF0341294431738D21E; psrf_access_token_expiresAt=1619175181; psrf_qqaccess_token=FED16DCED079CDE2D1D997D9AD2EF056; psrf_qqunionid=; psrf_musickey_createtime=1611399181; userAction=1; ts_last=y.qq.com/download/download.html; ts_refer=www.baidu.com/link`
        })
    },
  },
};
</script>

