<template>
    <Drawer @on-close="closeUploadDrawer(false)" class="upload-device-drawer" :title="[object Object]" width="400" v-model="selfShowDrawer" :mask-closable="false" :styles="styles">
        <div>
            <form ref="uploadForm" :style= "{display: 'inline-block'}">
                <input type="hidden" name="pid" v-model="pid"/>
                <label class="upload-title"><span>*</span>{{$tc('page.common.uploadFile',2)}}</label>
                <label>
                    <input type="file" style="display: none;" name="excelFile" id="excel-file" @change="changeFile"/>
                    <a style="line-height: 26px;" class="ivu-btn ivu-btn-primary">{{[object Object]}}</a>
                </label>
            </form>
            <p style="display:inline-block;float: right;margin-top: 3px;">
                <Popover
                    :content="[object Object]"
                    position="left">
                </Popover>
            </p>
            <p style="margin: 20px 0;" v-if="selectFileName!=''">{{[object Object]}}{{selectFileName}}</p>
            <div class="template-block">
                <span>{{[object Object]}}</span>
                <a style="float: right;" :href="`${getBaseUrl}/developer/common/v1/Device/DownloadTemplate?pid=${pid}&token=${token}`" target="_blank">{{[object Object]}}</a>
            </div>
        </div>
        <div v-if="isEnd" style="color:#999999;font-size:14px">
            <span style="font-size: 16px; color: #333333;margin: 25px 0 10px;display: block;">{{[object Object]}}</span>
            <p>{{[object Object]}}<span style="color: #57A2FF;">{{uploadResult.total}}</span>{{[object Object]}}</p>
            <p>{{[object Object]}}<span style="color: #57A2FF;">{{uploadResult.succ}}</span>{{[object Object]}}</p>
            <p>{{[object Object]}}<span style="color: #FB892D;">{{uploadResult.fail}}</span>{{[object Object]}}</p>
        </div>
        <div class="drawer-footer-wrapper">
            <Button v-if="!isEnd" style="margin-right: 20px;" type="primary" @click="toUploadFile" :loading="uploadLoading">{{[object Object]}}</Button>
            <Button v-if="!isEnd" @click="closeUploadDrawer(false)">{{[object Object]}}</Button>
            <Button v-if="isEnd" type="primary" @click="closeUploadDrawer(true)">{{[object Object]}}</Button>
        </div>
    </Drawer>
</template>

<script>
import {Drawer, Popover, Button, Tips} from 'onenet_components'
export default {
    name: 'addDevices',
    props: {
        showDrawer: {
            type: Boolean,
            default(){
                return false
            },
        },
        uploddXlsxUri: {
            type: String,
            default(){
                return '/common/v1/Device/AddDeviceBatch'
            },
        }
    },
    watch:{
        showDrawer(value){
            this.selfShowDrawer = value;
        }
    },
    data(){
        return {
            selfShowDrawer: this.showDrawer,
            styles: {
                overflow: 'auto',
                position: 'static',
                padding: '20px 45px 80px',
            },
            uploadResult:{
                total: 0,
                succ: 0,
                fail: 0
            },
            uplaodHeaders:{
                'Content-Type': 'multipart/form-data',
                'token': localStorage.developer_token
            },
            fileTypes:['xlsx'],
            isEnd: false,
            uploadLoading: false,
            pid: this.$route.query.pid,
            token: localStorage.developer_token,
            selectFileName: ''
        }
    },
    computed:{
        getBaseUrl(){
            return process.env.NODE_ENV === 'production' ? '' : 'http://dev.onenetv3.com';
        }
    },
    methods:{
        closeUploadDrawer(reload){
            this.$refs.uploadForm.reset();
            this.isEnd = false;
            this.uploadLoading = false;
            this.selectFileName = '';
            this.$emit('close-drawer', reload);
        },
        changeFile(){
            var formData = new FormData(this.$refs.uploadForm);
            var file = formData.get("excelFile");
            this.selectFileName = file.name;
        },
        toUploadFile(){
            var formData = new FormData(this.$refs.uploadForm);
            var file = formData.get("excelFile");
            if(this.selectFileName==''){
                Tips({message: undefined, type: 'error'});
            }else if(this.fileTypes.indexOf(file.name.split('.')[1])<0){
                Tips({message: undefined, type: 'error'});
            }else if(file.size/1024/1024>3){
                Tips({message: undefined, type: 'error'});
            }else{
                formData.set('pid', this.pid);
                this.uploadLoading = true;
                this.$axios.other({
                    method: 'post',
                    url: this.uploddXlsxUri,
                    data:  formData,
                    headers: this.uplaodHeaders
                },true).then(res=>{
                    this.uploadResult.total= res.data.all_total;
                    this.uploadResult.succ= res.data.succ_total;
                    this.uploadResult.fail= res.data.fail_total;
                    this.$emit('to-load');
                    this.uploadLoading = false;
                    this.isEnd = true;
                }).catch(error=>{
                    this.uploadLoading = false;
                    Tips({message: error.code==-9527 ? undefined : error.msg, type: 'error'});
                })
            }
        },
    },
    components:{
        Drawer, Popover, Button
    }
};
</script>
<style lang="less">
.upload-device-drawer{
    .upload-title{
        font-size: 14px;
        color: #666666;
        span{
            font-size: 12px;
            color: #19BBFF;
            vertical-align: middle;
        }
    }
    .template-block{
        line-height: 26px;
        padding: 0 10px;
        width: 100%;
        height: 26px;
        background-color: #FAFAFA;
        color: #999999;
        font-size: 12px;
        margin-top: 15px;
    }
}
</style>
123132