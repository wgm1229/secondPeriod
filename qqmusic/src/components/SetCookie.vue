<template>
  <van-button type="primary" @click="handleCookie">
    设置真实cookie
  </van-button>
</template>

<script>
import request from '../utils/request'
export default {
  methods: {
    handleCookie() {
      request.post(`/hehe/user/setCookie`,{
        data:`pgv_pvi=3002812416; RK=fVLo7OeGU6; ptcz=cafe7219d95e33411d598f30c1a3e08ef60eee903cb444cf248f3db2cfc6567a; pgv_pvid=6810199600; o_cookie=597665748; pac_uid=1_597665748; pgv_si=s4284793856; pgv_info=ssid=s4855929026; yqq_stat=0; ts_refer=github.com/jsososo/qqmusic-cookie-porter; ts_uid=8362366973; euin=7KEl7wCk7ivF; tmeLoginType=2; psrf_qqunionid=; psrf_qqopenid=1C943987466A70DDBABF6DF820F3E15E; psrf_qqaccess_token=532505D328EDD29EFC071BF4E4FD6B3A; psrf_qqrefresh_token=DF676456EE7D2E681B02A5E96CD2BABA; uin=597665748; ts_last=y.qq.com/; userAction=1; psrf_access_token_expiresAt=1615724297; psrf_musickey_createtime=1607948297; qm_keyst=Q_H_L_2a0MN-50emVtYHCdTFb61c1SuJXWT6TDTXQgp_95tqZnmQxhyPYw0wDTTi9D724; qqmusic_key=Q_H_L_2a0MN-50emVtYHCdTFb61c1SuJXWT6TDTXQgp_95tqZnmQxhyPYw0wDTTi9D724`
      })
    }
  },
}
</script>

