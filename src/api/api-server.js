/*接口配置：  后台接口 */
import {
    axios
} from './axios'

let $api = {} //存放所有接口
    /* ---------------基础配置 -------------- */
    // $api.serverUrl = "http://192.168.2.126:8080/MessagePush/"; //李爽
    // $api.serverUrl = "http://192.168.2.113:8080/MessagePush/"; //杜胜飞
    //开发环境
    //$api.serverUrl = "http://14.152.90.85:8082/yishuo_kaifa/";
    //$api.uploadUrl = "http://14.152.90.85:8082/yishuo_kaifa/";
    //$api.fileUrl = "http://www30.1shuo.com/";
    //30测试站
$api.serverUrl = "http://www30.1shuo.com:8082/yishuo_30test/";
$api.fileUrl = "http://www30.1shuo.com/";
$api.uploadUrl = "http://www30.1shuo.com:8082/yishuo_30test/";
$api.baUrl = "http://www30.1shuo.com/"; //14.152.90.85
$api.cpUrl = "http://cp.1shuo.com/"; //创作平台url

$api.uuid = "efb421ec-5056-4c21-a594-e5437bbdd63d";
/* -----------------业务配置------------- */

/*------- 登录 start------*/
/**
 *@param login_type	[登录类型	是]  [邮箱名登录1 手机号登录2 用户名登录4 微博登录8 QQ登录16 微信登录32
  @param username		[用户名	是]
  @param password		[密码	否]
  @param nickname		[昵称	否]
  @param avatar		[头像地址	否]
  @param reg_channel		[注册渠道	否]
 */
$api.login = function( //接收页面传入的参数
        login_type,
        username,
        password,
        nickname,
        avatar,
        reg_channel
    ) {
        const url = $api.serverUrl + 'yishuo/api_web/account/login'

        const data = Object.assign({}, { //传给后台的参数
            login_type,
            username,
            password,
            nickname,
            avatar,
            reg_channel
        })

        return axios(url, data)
    }
    /*------- 登录 end------*/


/*------- 系统管理 start------*/
/*------- 系统管理 end------*/

/*------- 内容管理 start------*/
// 声音管理 - 获取声音类别
/**
 *@param p_id	[类型父id	否（不传时查询父类别列表）]
 */
$api.getCategory = function( //接收页面传入的参数
        uuid,
        p_id
    ) {
        const url = $api.serverUrl + 'yishuo/api_web/api/category/get_category'

        const data = Object.assign({}, { //传给后台的参数
            uuid,
            p_id
        })
        return axios(url, data)
    }
    /*------- 内容管理 end------*/

/*------- xh start -------*/
/*运营管理 --  举报管理*/
//获取举报列表
$api.getReportList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/inform_service/get_inform_list';
        return axios(url, params);
    }
    //删除举报
$api.deleteReport = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/inform_service/delete_inform';
        return axios(url, params);
    }
    //获取举报详情
$api.getReportDetail = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/inform_service/get_inform_information';
        return axios(url, params);
    }
    //处理举报
$api.dealReport = function(params) {
    const url = $api.serverUrl + 'yishuo/api_web/inform_service/deal_inform';
    return axios(url, params);
}

/*内容管理 start*/
/*声音管理*/
//获取声音列表
$api.getVoiceList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/get_voice_list_info';
        return axios(url, params);
    }
    //推荐声音
$api.recommendVoice = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/recommend_voice';
        return axios(url, params);
    }
    //编辑声音（添加声音）
$api.editVoice = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/edit_voice';
        return axios(url, params);
    }
    //删除声音
$api.deleteVoice = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/batch_delete_voice';
        return axios(url, params);
    }
    //获取分类列表
$api.getCategoryList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/category/get_category';
        return axios(url, params);
    }
    //获取APP专栏
$api.getAppTypeList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/get_section_type_list';
        return axios(url, params);
    }
    //获取用户专辑列表
$api.getUserAlbumList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/album/get_album_name';
        return axios(url, params);
    }
    //获取标签限制个数
$api.getConfigTagCount = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/config/get_config_list';
        return axios(url, params);
    }
    /*批量添加声音*/
    //提交添加
$api.addVocie = function(params) {
    const url = $api.serverUrl + 'yishuo/api_web/api/voice/batch_add_voice';
    return axios(url, params);
}

/*推荐管理 start*/
/*用户推荐*/
//获取用户推荐列表
$api.getUserRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/user/get_picked_anchor_list_info';
        return axios(url, params);
    }
    //修改用户推荐
$api.editUserRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/user/edit_picked_anchor';
        return axios(url, params);
    }
    //删除用户推荐
$api.deleteUserRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/user/delete_picked_anchor';
        return axios(url, params);
    }
    /*热门声音推荐*/
    //获取声音推荐列表
$api.getVoiceRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/get_picked_hot_voice_list';
        return axios(url, params);
    }
    //修改声音推荐
$api.editVoiceRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/edit_picked_hot_voice';
        return axios(url, params);
    }
    //删除声音推荐
$api.deleteVoiceRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/voice/cancel_recommend_voice';
        return axios(url, params);
    }
    /*专辑推荐*/
    //获取专辑推荐列表
$api.getAlbumRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/album/get_recommend_album_list';
        return axios(url, params);
    }
    //修改专辑推荐
$api.editAlbumRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/album/edit_recommend_album_order';
        return axios(url, params);
    }
    //删除专辑推荐
$api.deleteAlbumRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/album/cancel_recommend_album';
        return axios(url, params);
    }
    /*标签推荐*/
    //获取标签推荐列表
$api.getLabelRecommend = function(params) {
        const url = $api.serverUrl + '';
        return axios(url, params);
    }
    //修改标签推荐
$api.editLabelRecommend = function(params) {
        const url = $api.serverUrl + '';
        return axios(url, params);
    }
    //删除标签推荐
$api.deleteLabelRecommend = function(params) {
        const url = $api.serverUrl + '';
        return axios(url, params);
    }
    /*新用户推荐*/
    //获取新用户推荐列表
$api.getNewUserRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/user/get_new_user_recommend_list';
        return axios(url, params);
    }
    //新增新用户推荐
$api.addNewUserRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/user/add_new_user_recommend';
        return axios(url, params);
    }
    //修改新用户推荐
$api.editNewUserRecommend = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/user/edit_new_user_recommend';
        return axios(url, params);
    }
    //删除新用户推荐
$api.deleteNewUserRecommend = function(params) {
    const url = $api.serverUrl + 'yishuo/api_web/api/user/delete_new_user_recommend';
    return axios(url, params);
}

/*------- xh end -------*/

/*-------lmr start -------*/
/*----- 直播管理 -----*/
//直播列表
$api.getLiveList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/get_live_list';
        return axios(url, params);
    }
    //直播列表获取原先角色卡位数
$api.getRoleCardNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/get_role_card_number';
        return axios(url, params);
    }
    //直播列表设置角色卡位数
$api.setRoleCardNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/set_role_card_number';
        return axios(url, params);
    }
    //直播列表获取背景图数
$api.getBackgroundImgNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/get_background_image_number';
        return axios(url, params);
    }
    //直播列表设置背景图数
$api.setBackgroundImgNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/set_background_image_number';
        return axios(url, params);
    }
    //直播列表获取连麦数
$api.getLinkNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/link_number/get_link_number';
        return axios(url, params);
    }
    //直播列表设置连麦数
$api.setLinkNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/link_number/set_link_number';
        return axios(url, params);
    }
    //直播列表获取点赞数
$api.getLikeNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/get_live_like_number_information';
        return axios(url, params);
    }
    //直播列表设置点赞数
$api.setLikeNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/set_live_like_number';
        return axios(url, params);
    }
    //直播列表获取机器人数
$api.getRobotNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/get_live_robot_information';
        return axios(url, params);
    }
    //直播列表设置机器人数
$api.setRobotNumber = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/set_live_robot';
        return axios(url, params);
    }
    //禁用直播
$api.setLiveForbid = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/set_forbid_live';
        return axios(url, params);
    }
    //隐藏直播
$api.setLiveHide = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/set_hide_live';
        return axios(url, params);
    }
    //直播详情
$api.getLiveDetail = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/live/get_live_information';
        return axios(url, params);
    }
    //礼物管理
    //礼物列表
$api.getGiftList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/get_gift_list';
        return axios(url, params);
    }
    //礼物特效
$api.getGiftEffect = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/get_special_effect_information';
        return axios(url, params);
    }
    //礼物和宝箱集合
$api.getGiftAndTreasure = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/get_gift_and_trasure_box_information';
        return axios(url, params);
    }
    //添加礼物
$api.addGift = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/add_gift';
        return axios(url, params);
    }
    //添加宝箱
$api.addTreasure = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/add_treasure_box';
        return axios(url, params);
    }
    //编辑礼物、宝箱
$api.editGiftTreasure = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/edit_gift';
        return axios(url, params);
    }
    //获取礼物其他信息
$api.getGiftOtherInfo = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/get_other_parameter_information';
        return axios(url, params);
    }
    //获取礼物详情
$api.getGiftDetail = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/gift/watch_gift_info';
        return axios(url, params);
    }
    //获取音效列表
$api.getVoiceSoundList = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/voice_sound/get_voice_sound_list';
        return axios(url, params);
    }
    /*----lmr end ----*/
    /*----创作平台 lx start ----*/
    // 版权方管理
$api.writerList = function(params) {
    const url = $api.serverUrl + 'yishuo/api_web/api/cp/get_writer_list_info';
    return axios(url, params);
}

// 版权方认证列表、版权方编辑列表(二者同一个接口)
$api.authenticationList = function(params) {
    const url = $api.serverUrl + 'yishuo/api_web/api/cp/get_cp_auth_veri_list_info';
    return axios(url, params);
}

// 确定版权方编辑列表
$api.confirmEditWriter = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/cp/edit_cp_auth_veri';
        return axios(url, params);
    }
    // 删除版权方认证列表某行信息
$api.delAuthenticationCol = function(params) {
    const url = $api.serverUrl + 'yishuo/api_web/api/cp/del_cp_auth_veri';
    return axios(url, params);
}


// 任务列表
$api.getTaskListInfo = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/cp/get_task_list_info';
        return axios(url, params);
    }
    /*获取任务推荐标签列表*/
$api.getRecommendType = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/cp/get_task_recommend_type';
        return axios(url, params);
    }
    //任务删除
$api.delTaskInfo = function(params) {
        const url = $api.serverUrl + 'yishuo/api_web/api/cp/del_task_info';
        return axios(url, params);
    }
    //任务编辑

$api.editTaskInfo = function(params) {
    const url = $api.serverUrl + 'yishuo/api_web/api/cp/edit_task_info';
    return axios(url, params);
}

/*----创作平台 lx end ----*/

export default $api;