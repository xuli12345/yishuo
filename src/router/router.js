/*  路由配置  */
/* ---------------vue默认配置 -------------- */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* ---------------业务功能配置 -------------- */
// 所有菜单的视口
const viewport = Vue.component('viewport', {
    template: `<div>
    <router-view></router-view>
  </div>`
})

/*-----首页路由start-----*/
const General_view = () =>
    import ('../view/general_view/general_view');

const generalView = [{
        path: '/general_view',
        component: General_view,
        name: 'general_view',
        leaf: true, //只有一个,不写则代表有孩子节点
        title: '首页',
        meta: {
            title: '首页'
        },
        iconCls: 'android-home'
    }]
    /*-----首页路由end-----*/


/*-----登录路由start-----*/
const Login = () =>
    import ("../view/login/login.vue")

const login = [{
    path: "/login",
    component: Login,
    name: "login",
    title: "登录界面",
    meta: {
        title: "登录界面"
    }
}];
/*-----登录路由end-----*/

/*-----创作平台路由star-----*/
//版权方管理
const Writer_list = () =>
    import ('../view/create_terrace/writer_manage/writer_list');
const Authentication_list = () =>
    import ('../view/create_terrace/writer_manage/authentication_list');
const Writer_edit = () =>
    import ('../view/create_terrace/writer_manage/writer_edit');
// 任务管理
const Task_list = () =>
    import ('../view/create_terrace/task_manage/task_list');
const Task_report = () =>
    import ('../view/create_terrace/task_manage/task_report');
const Task_sort = () =>
    import ('../view/create_terrace/task_manage/task_sort');
const Task_edit = () =>
    import ('../view/create_terrace/task_manage/task_edit');
//主播管理
const Anchor_manage = () =>
    import ('../view/create_terrace/anchor_manage');
//有声作品
const Audio_works = () =>
    import ('../view/create_terrace/audio_works');
//配置
const createTerrace = [{
        path: '/createTerrace',
        component: viewport,
        name: 'createTerrace',
        title: "创作平台",
        meta: {
            title: '创作平台'
        },
        redirect: {
            name: 'anchor_manage'
        },
        iconCls: "leaf", //图标
        isThree: true, //是否是3级目录,true为是
        children: [{
                path: '/writerManage',
                component: viewport,
                name: 'writerManage',
                title: '版权方管理',
                meta: {
                    title: '版权方管理'
                },
                redirect: {
                    name: 'Writer_list'
                },
                iconCls: "ios-filing", //图标
                isThreeChild: true, //是否有第三级目录，true为是
                children: [{
                        path: '/writer_list',
                        component: Writer_list,
                        name: 'writer_list',
                        title: '版权方列表',
                        meta: {
                            title: '版权方列表'
                        }
                    },
                    {
                        path: '/authentication_list',
                        component: Authentication_list,
                        name: 'authentication_list',
                        title: '版权方认证管理',
                        meta: {
                            title: '版权方认证管理'
                        }
                    },
                    {
                        path: "/writer_edit",
                        component: Writer_edit,
                        name: "writer_edit",
                        meta: {
                            title: "版权方编辑"
                        },
                        isDetail: true //是详情页
                    }
                ]
            },
            {
                path: '/taskManage',
                component: viewport,
                name: 'taskManage',
                title: '任务管理',
                meta: {
                    title: '任务管理'
                },
                redirect: {
                    name: 'task_list'
                },
                iconCls: "ios-filing", //图标
                isThreeChild: true, //是否有第三级目录，true为是
                children: [{
                        path: '/task_list',
                        component: Task_list,
                        name: 'task_list',
                        title: '任务列表',
                        meta: {
                            title: '任务列表'
                        }
                    },
                    {
                        path: '/task_sort',
                        component: Task_sort,
                        name: 'task_sort',
                        title: '任务分类管理',
                        meta: {
                            title: '任务分类管理'
                        }
                    },
                    {
                        path: '/task_report',
                        component: Task_report,
                        name: 'task_report',
                        title: '任务举报管理',
                        meta: {
                            title: '任务举报管理'
                        }
                    },
                    {
                        path: "/task_edit",
                        component: Task_edit,
                        name: "task_edit",
                        meta: {
                            title: "任务编辑"
                        },
                        isDetail: true //是详情页
                    }
                ]
            },
            {
                path: '/anchor_manage',
                component: Anchor_manage,
                name: 'anchor_manage',
                title: '主播管理',
                meta: {
                    title: '主播管理'
                }
            },
            {
                path: "/audio_works",
                component: Audio_works,
                name: "audio_works",
                title: "有声作品",
                meta: {
                    title: "有声作品"
                }
            }
        ]
    }]
    /*-----创作平台路由end-----*/

/*----lmr start----*/
/*-----直播管理路由star-----*/
const Live_comment = () =>
    import ('../view/live_background_manage/live_manage/live_comment');
const Live_list = () =>
    import ('../view/live_background_manage/live_manage/live_list');
const Live_detail = () =>
    import ('../view/live_background_manage/live_manage/live_detail');
const Voice_sound_list = () =>
    import ('../view/live_background_manage/voice_sound_manage/voice_sound_list');

//配置
const liveManage = [{
        path: "/liveBackgroundManage",
        component: viewport,
        name: "liveBackgroundManage",
        title: "直播后台",
        meta: {
            title: "直播后台"
        },
        redirect: {
            name: 'live_list'
        },
        iconCls: "monitor", //图标
        isThree: true, //是否是3级目录,true为是
        children: [{
                path: '/liveManage',
                component: viewport,
                name: 'liveManage',
                title: '直播管理',
                meta: {
                    title: '直播管理'
                },
                redirect: {
                    name: 'live_list'
                },
                iconCls: "iphone", //图标
                isThreeChild: true, //是否有第三级目录，true为是
                children: [{
                        path: "/live_list",
                        component: Live_list,
                        name: "live_list",
                        title: "直播列表",
                        meta: {
                            title: "直播列表"
                        }
                    },
                    {
                        path: "/voice_sound_list",
                        component: Voice_sound_list,
                        name: "voice_sound_list",
                        title: "音效列表",
                        meta: {
                            title: "音效列表"
                        }
                    },
                ]
            },
            {
                path: "/live_comment",
                component: Live_comment,
                name: "live_comment",
                title: "直播评论",
                meta: {
                    title: "直播评论"
                }
            },
            {
                path: "/live_detail",
                component: Live_detail,
                name: "live_detail",
                title: "直播详情",
                meta: {
                    title: "直播详情"
                },
                isDetail: true
            }
        ]
    }]
    /*-----直播管理路由end-----*/

/*-----礼物管理路由start-----*/
const Gift_list = () =>
    import ('../view/gift_manage/gift_list');
//配置
const giftManage = [{
        path: "/gift_manage",
        component: viewport,
        name: "gift_manage",
        title: "礼物管理",
        meta: {
            title: "礼物管理"
        },
        redirect: {
            name: 'gift_list'
        },
        iconCls: "heart", //图标
        children: [{
            path: "/gift_list",
            component: Gift_list,
            name: "gift_list",
            title: "礼物列表",
            meta: {
                title: "礼物列表"
            }
        }]
    }]
    /*-----礼物管理路由end-----*/
    /*----lmr end----*/

/*-----运营管理star-----*/
//推送管理
const Push_manage = () =>
    import ('../view/operation_manage/push_manage');
//举报管理
const Report_manage = () =>
    import ('../view/operation_manage/report_manage');
//举报详情
const Report_detail = () =>
    import ('../view/operation_manage/report_detail');

//配置
const operationManage = [{
        path: "/operationsManage",
        component: viewport,
        name: "operationsManage",
        title: "运营管理",
        meta: {
            title: "运营管理"
        },
        redirect: {
            name: "push_manage"
        },
        iconCls: "plane", //图标
        children: [{
                path: "/push_manage",
                component: Push_manage,
                name: "push_manage",
                title: "推送管理",
                meta: {
                    title: "推送管理"
                }
            },
            {
                path: "/report_manage",
                component: Report_manage,
                name: "report_manage",
                title: "举报管理",
                meta: {
                    title: "举报管理"
                }
            },
            {
                path: "/report_detail",
                component: Report_detail,
                name: "report_detail",
                meta: {
                    title: "举报详情"
                },
                isDetail: true
            }
        ]

    }]
    /*-----运营管理end-----*/

/*---xh start---*/
/*推荐管理*/
//用户推荐
const User_recommend = () =>
    import ('../view/recommend_manage/user_recommend');
//声音推荐
const Voice_recommend = () =>
    import ('../view/recommend_manage/voice_recommend');
//专辑推荐
const Album_recommend = () =>
    import ('../view/recommend_manage/album_recommend');
//标签推荐
const Label_recommend = () =>
    import ('../view/recommend_manage/label_recommend');
//新用户推荐
const New_User_recommend = () =>
    import ('../view/recommend_manage/new_user_recommend');

const recommendManage = [{
    path: '/recommendManage',
    component: viewport,
    name: 'recommendManage',
    title: "推荐管理",
    meta: {
        title: '推荐管理'
    },
    redirect: {
        name: 'user_recommend'
    },
    iconCls: "checkmark", //图标
    children: [{
            path: '/user_recommend',
            component: User_recommend,
            name: 'user_recommend',
            title: '用户推荐',
            meta: {
                title: '用户推荐'
            }
        },
        {
            path: '/voice_recommend',
            component: Voice_recommend,
            name: 'voice_recommend',
            title: '热门声音推荐',
            meta: {
                title: '热门声音推荐'
            }
        },
        {
            path: '/album_recommend',
            component: Album_recommend,
            name: 'album_recommend',
            title: '专辑推荐',
            meta: {
                title: '专辑推荐'
            }
        },
        {
            path: '/label_recommend',
            component: Label_recommend,
            name: 'label_recommend',
            title: '标签推荐',
            meta: {
                title: '标签推荐'
            }
        },
        {
            path: '/new_user_recommend',
            component: New_User_recommend,
            name: 'new_user_recommend',
            title: '新用户推荐',
            meta: {
                title: '新用户推荐'
            }
        }
    ]
}]

/*内容管理*/
//声音管理
const Voice_manage = () =>
    import ('../view/content_manage/voice_manage');

const contentManage = [{
        path: '/contentManage',
        component: viewport,
        name: 'contentManage',
        title: "内容管理",
        meta: {
            title: '创作平台'
        },
        redirect: {
            name: 'voice_manage'
        },
        iconCls: "folder",
        //isThree: true, //是否是3级目录,true为是
        children: [{
            path: '/voice_manage',
            component: Voice_manage,
            name: 'voice_manage',
            title: '声音管理',
            meta: {
                title: '声音管理'
            }
        }]
    }]
    /*内容管理*/
    //声音管理
const DemoMsg = () =>
    import ('../view/demo_manage/demo_manage');

const demoMsg = [{
    path: '/demoMsg',
    component: viewport,
    name: 'demoMsg',
    title: "demo管理",
    meta: {
        title: 'demo平台'
    },
    redirect: {
        name: '/demo_manage'
    },
    iconCls: "folder",
    //isThree: true, //是否是3级目录,true为是
    children: [{
        path: '/demo_manage',
        component: DemoMsg,
        name: 'demo_manage',
        title: 'demo管理',
        meta: {
            title: 'demo管理'
        }
    }]
}]

/*---xh end---*/

//主界面view
const Admin = () =>
    import ("../view/index");
//主界面路由
const admin = [{
    path: "/admin",
    component: Admin,
    name: "admin",
    redirect: {
        name: "general_view"
    },
    title: "管理页面",
    meta: {
        title: "管理页面"
    },
    children: [
        ...generalView,
        ...contentManage,
        ...recommendManage,
        ...createTerrace,
        ...liveManage,
        ...giftManage,
        ...operationManage,
        ...demoMsg
    ]
}];
const redirectRouter = [{
    path: "/",
    redirect: {
        name: "login"
    }
}];


// 整合路由
let router = new VueRouter({
    routes: [...redirectRouter, ...login, ...admin],
    mode: "history"
});
router.afterEach((to, from, next) => {
    let routerTitle = "";
    if (to.meta.title) {
        routerTitle = `${to.meta.title}`;
    } else {
        routerTitle = "后台管理系统";
    }
    document.title = routerTitle;
});



export default router