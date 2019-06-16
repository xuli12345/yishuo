<template>
  <div>
    <div class="fontBigSize alignCenter fontBoldWeight marginTop30">任务编辑</div>
    <template>
      <div class="fontMiddleSize writerEdit marginBottom30">
        <div class="marginTop20">
          <label class="formLabel marginRight20">任务编号</label>
          <Input class="width800" v-model="taskEditData.id" disabled/>
        </div>
        <div class="marginTop20">
          <label class="formLabel marginRight20">任务名称</label>
          <Input class="width800" v-model="taskEditData.title" disabled/>
        </div>
        <div class="marginTop20  flex" v-if="taskEditData.task_pic">
          <label class="formLabel marginRight20">任务图片</label>
          <img :src="taskImg" alt="" class="cardImg">
        </div>
        <div class="marginTop20">
          <label class="formLabel marginRight20">任务描述</label>
          <Input class="width800" type="textarea" v-model="taskEditData.desc" disabled/>
        </div>
        <div class="marginTop20">
          <label class="editLabelColor formLabel marginRight20">发布人</label>
          <Input class="width800" v-model="taskEditData.nickname" disabled/>
        </div>
        <div class="marginTop20  flex">
          <label class="editLabelColor formLabel marginRight20">任务发布时间</label>
          <Input class="width800" v-model="taskEditData.create_time" disabled/>
        </div>
        <div class="marginTop20">
          <label class="editLabelColor formLabel marginRight20">任务要求</label>
          <Input class="width800" v-model="taskEditData.requirement" disabled/>
        </div>
        <div class="marginTop20">
          <label for="email" class="formLabel marginRight20">任务领取人</label>
          <span class="marginRight10" v-for="item in taskEditData.subtask_list">
            <Icon style="position:relative;top:5px" v-if="item.nickname" type="ios-person" size="24" /> {{item.nickname}}
          </span>
        </div>
        <div class="marginTop20">
          <label for="qqNum" class="editLabelColor formLabel marginRight20">任务热度(看的人数)</label>
          <Input class="width800" disabled/>
        </div>
        <div class="marginTop20">
          <label for="wxNUm" class="editLabelColor formLabel marginRight20">任务截止时间</label>
          <Input class="width800" v-model="taskEditData.end_time" disabled/>
        </div>
        <div class="marginTop20">
          <label for="intro" class="editLabelColor formLabel marginRight20">任务文稿</label>
          <Button type="primary">查看</Button>
          <Button type="primary">
            <a :href="downloadHref" :fileurl="downloadHref" style="color:#fff;">下载</a>
          </Button>
        </div>
        <div class="marginTop20">
          <label for="address" class="editLabelColor formLabel marginRight20">任务标签</label>
          <span class="marginRight20" v-for="item in taskEditData.tag_list">{{item}}</span>
        </div>
        <div class="marginTop20 flex">
          <label for="address" class="editLabelColor formLabel marginRight20">任务类别</label>
          <!-- <CheckboxGroup v-model="checkBoxTask" style="color: #468847">
            <Checkbox  v-for="item in taskSort" :key="item.id" :label="item.id">{{item.name}}</Checkbox>
          </CheckboxGroup> -->
        </div>
        <div class="marginTop20 ">
          <label for="checkBack" class="editLabelColor formLabel marginRight20">是否置顶</label>
          <Select class="searchSelect width100" v-model="taskEditData.is_top">
            <Option value="1">是</Option>
            <Option value="0">否</Option>
          </Select>
        </div>
        <div class="marginTop20">
          <label for="checkBack" class="editLabelColor formLabel marginRight20">推荐标签</label>
          <Select class="width100" v-model="recommend_type_id">
            <Option value="0">无</Option>
            <Option v-for="item in recommend_type_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <span>
            <a href="#">编辑推荐标签</a>
          </span>
        </div>
        <div class="marginTop20">
          <label for="checkStatus" class="editLabelColor formLabel marginRight20">是否下架</label>
          <RadioGroup v-model="taskEditData.task_status">
            <Radio v-if="taskEditData.task_status== '6'" label="6">是</Radio>
            <Radio v-else-if="taskEditData.task_status== '4' " label="4">是</Radio>
            <Radio v-else label="6">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </div>

        <div class="marginTop20 marginBottom30 fr" style="margin-right:345px;">
          <Button @click="cancel" class="borderNone">取消</Button>
          <Button type="primary" @click="confirmEdit">确定</Button>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { taskEditCtrl } from "view_js/create_terrace/task_manage/task_edit";
export default {
  mixins: [taskEditCtrl],
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "static/sass/base"

</style>

