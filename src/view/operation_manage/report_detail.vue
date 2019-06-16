<template>
  <div class="reportDetail">
    <div class="but">
	  	<Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
	  	<Button type="primary" @click="goHistory" class="fr marginRight30">返回</Button>
	  </div>
	  
  </div>
</template>

<script type="text/ecmascript-6">
import { reportDetailCtrl } from "../../view_js/operation_manage/report_detail";
export default {
  mixins: [reportDetailCtrl]
};
</script>