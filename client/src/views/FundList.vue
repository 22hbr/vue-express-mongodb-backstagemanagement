<template>
  <div class="fundList">
    <div class="searchForm">
      时间筛选: <el-date-picker v-model="selectedTime" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
        format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss"
        style="width: 260px;flex: none;" 11 />
      <el-button type="primary" @click="search" style="margin-left: 10px;">搜索</el-button>
      <el-button type="primary" @click="reset">重置</el-button>

      <el-button type="primary" style="margin-left: auto;" @click="addFund">添加</el-button>
    </div>
    <div class="showContent">
      <el-table :data="tableData" height="430">
        <el-table-column sortable fixed width="180" prop="date" label="创建时间" />
        <el-table-column prop="type" label="收支类型" />
        <el-table-column prop="description" label="收支描述" />
        <el-table-column prop="income" label="收入">
          <template #default="{ row }">
            <span style="color: green;">+{{ row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出">
          <template #default="{ row }">
            <span style="color: red;">-{{ row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户">
          <template #default="{ row }">
            <span style="color: blue;">{{ row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="updateFund(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteFund(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!-- total, sizes, prev, pager, next, jumper -->
      <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next,total,sizes, " :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" width="400">
    <el-form label-width="100px" label-position="left">
      <el-form-item label="收支类型" required>
        <el-select v-model="fundForm.type" placeholder="请选择收支类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支描述" required>
        <el-input type="textarea" v-model="fundForm.description" placeholder="请输入收支描述" />
      </el-form-item>
      <el-form-item label="收入" required>
        <el-input-number v-model.number="fundForm.income" :min="0" />
      </el-form-item>
      <el-form-item label="支出" required>
        <el-input-number v-model.number="fundForm.expend" :min="0" />
      </el-form-item>
      <el-form-item label="账户" required>
        <el-input v-model="fundForm.cash" placeholder="请输入账户" />
      </el-form-item>
      <el-form-item label="备注" required>
        <el-input type="textarea" v-model="fundForm.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="!validateFundForm()">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { searchAllProfiles, getProfileById, addProfile, updateProfile, deleteProfile } from '../api/api';
import { ElMessage, ElMessageBox } from 'element-plus';
const searchForm = ref({
  startTime: '',
  endTime: ''
});
const selectedTime = ref([null, null]);
const tableData = ref();
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const dialogVisible = ref(false);
let title = ref("");
const fundForm = ref({
  type: '',
  description: '',
  income: null,
  expend: null,
  cash: '',
  remark: ''
});
const options = [
  { value: '工资', label: '工资' },
  { value: '投资', label: '投资' },
  { value: '生活', label: '生活' },
  { value: '娱乐', label: '娱乐' },
  { value: '其他', label: '其他' }
];
const userId = ref();

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  const params = {
    startDate: searchForm.value.startTime,
    endDate: searchForm.value.endTime,
    pageNum: currentPage.value,
    pageSize: pageSize.value
  }
  const result = await searchAllProfiles(params);
  if (result.data.code == 1) {
    console.log(result.data.data, 'allData.');
    tableData.value = result.data.data;
    total.value = result.data.total;
  } else {
    tableData.value = [];
    total.value = 0;
  }
};

const search = () => {
  searchForm.value.startTime = selectedTime.value ? selectedTime.value[0] : '';
  searchForm.value.endTime = selectedTime.value ? selectedTime.value[1] : '';
  fetchData();
};

const reset = () => {
  selectedTime.value = [null, null];
  searchForm.value = {
    startTime: '',
    endTime: ''
  };
  fetchData();
};

const addFund = async () => {
  dialogVisible.value = true;
  title.value = "添加收支记录";
};

const updateFund = async (row) => {
  dialogVisible.value = true;
  title.value = "编辑收支记录";
  userId.value = row._id;
  const userIfon = await getProfileById(userId.value);
  fundForm.value = userIfon.data.data;
};

const deleteFund = async (row) => {
  ElMessageBox.confirm(
    `确定删除当前${row.type}收支记录吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const res = await deleteProfile(row._id);
      if (res.data.code == 1) {
        fetchData();
        ElMessage.success('删除成功');
      } else {
        ElMessage.error('删除失败');
      }
    });
};

const validateFundForm = () => {
  if (
    fundForm.value.type &&
    fundForm.value.description &&
    (fundForm.value.income !== null) &&
    (fundForm.value.expend !== null) &&
    fundForm.value.cash &&
    fundForm.value.remark
  ) {
    return true;
  } else {
    return false;
  }
};

const onSubmit = async () => {
  if (fundForm.value.income == null) {
    fundForm.value.income = 0;
  }
  if (title.value == '添加收支记录') {
    const result = await addProfile(fundForm.value);
    if (result.data.code == 1) {
      fetchData();
      ElMessage.success('添加成功');
      dialogVisible.value = false;
    } else {
      ElMessage.error('添加失败');
    };
  } else if (title.value == '编辑收支记录') {
    const result = await updateProfile(userId.value, fundForm.value);
    if (result.data.code == 1) {
      fetchData();
      ElMessage.success('更新成功');
      dialogVisible.value = false;
    } else {
      ElMessage.error('更新失败');
    };
  }
  // 清空表单
  fundForm.value = {
    // time: '',
    type: '',
    description: '',
    income: null,
    expend: null,
    cash: '',
    remark: ''
  };
};

const cancel = () => {
  dialogVisible.value = false;
};

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  currentPage.value = 1;
  fetchData();
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchData();
};

</script>
<style scoped>
.fundList {
  width: 100%;

  .searchForm {
    margin: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  /* 这里导致严重的报错问题
  ERROR
  Resizeobserver loop completed with undelivered notifications.
  at handleError(webpack-internal:///./node_modules/webpack-dev-server/client/overlay-js:251:58)
  at eval(webpack-internal:///./node_modules/webpack-dev-server/client/overlay.js:27e:7)
  ERROR
  Resizeobserver loop completed with undelivered notifications.
  at handleError(webpack-internal:///./node_modules/webpack-dev-server/client/overlay.js:251:58)
  at eval(webpack-internal:///./node_modules/webpack-dev-server/client/overlay.js:27e:7)
  原因？？？？ */
  .showContent {
    /* width: 100%; */
    margin: 20px;
  }

  .pagination {
    margin: 20px;
    display: flex;
    justify-content: flex-end;
    /* text-align: right; */
  }


}
</style>