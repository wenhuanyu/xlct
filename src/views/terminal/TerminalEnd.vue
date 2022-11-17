<template>
  <div class="terminal-bg">
    <div class="sheet">
      <div class="exam-end">
        <p class="content_"><span class="content_span" >量表名称：</span>
            <i class="content_i"><template v-for="item in info.table">{{ item }};</template></i>
        </p>
        <p><span>测评时间：</span>{{ info.submit_time }}</p>
        <p><span>测评时长：</span> {{ info.use_time }}</p>
      </div>
      <div class="button-wrap">
          <div class="submit-question" @click="exam_end">
              <span>结 束</span>
              <img src="../../assets/images/submit.png" alt="">
          </div>
        <span>{{ second }}s后自动关闭.....</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name    : "TerminalEnd",
    data() {
        return {
            info  : {},
            second: 5,
            timer : null,
        };
    },
    computed: {},
    watch   : {},
    mounted() {
        this.getInfo()
        this.timer = setInterval(() => {
            if (this.second === 0) {
                this.exam_end();
            } else {
                this.second--;
            }
        }, 1000)

    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods : {
        getInfo(){
            this.$axios.post('term/user/endInfo', {exam_id: this.$route.query.exam_id,type:this.$route.query.type}).then(res => {
                this.info = res.data.info;
            })
        },
        exam_end() {
            console.log('this.$route.query',this.$route.query)
            this.$axios.post('term/index/end', {
                patient_id:this.$route.query.patient_id,
                exam_id: this.$route.query.exam_id,
                type:this.$route.query.type
            }).then(res => {
                 this.$message.success(res.data.info);
                if(res.data.data.music_time === 0){
                    this.$router.push({name: "TerminalWait"})
                }else{
                    this.$router.push(
                        {
                            name: "CalmWait" ,
                            query: {
                                test_paper_id: this.$route.query.test_paper_id,
                                type:this.$route.query.type,
                                music_path : this.$route.query.music_path ,
                                music_time : this.$route.query.music_time,
                                music_name : this.$route.query.music_name,
                                music_cover : this.$route.query.music_cover,
                                prompt_message : this.$route.query.prompt_message,
                            }
                        }
                    )
                }
            })
        }
    },
}
</script>

<style scoped lang="scss">
.terminal-bg {
    width: 100vw;
    height: 100vh;
    background-image: url(../../assets/images/terminal-bg.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    padding: 77px 161px;
}

.sheet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    width: 1702px;
    height: 840px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.69) 0%, #ffffff 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.submit-question {
    width: 222px;
    height: 78px;
    //background-size: 100% 100%;
    //background-position: center;
    //background-repeat: no-repeat;
    line-height: 78px;
    font-size: 25px;
    font-weight: bold;
    color: #FFFFFF;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-image: url(../../assets/images/button4.png);
    background: linear-gradient(180deg, #AF88FF 0%, #7A40F2 100%);
    box-shadow: 0px 6px 0px 0px #601FE6;
    border-radius: 34px 35px 35px 34px;
    img {
        width: 28px;
        height: 28px;
        margin-left: 15px;
    }
}

::v-deep .el-button > span {
    display: flex;
    justify-content: center;
    align-items: center;
}

.exam-end {
    width: 70%;

    > p {
        > span {
            color: #333333;
            font-size: 32px;
        }

        font-size: 36px;
        color: #7A40F2;
    }
}

.button-wrap, .exam-end {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}

.button-wrap {
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    > span {
        position: absolute;
        font-size: 22px;
        right: 0;
    }
}
.content_{
    display: flex;
}
.content_i{
    display: block;
    font-style: normal;
    height: 380px;
    overflow: auto;
    width: 86%;
}
.content_span{
    display: inline-block;
    width: 14%;
}
.content_i::-webkit-scrollbar {
    display: block;
    width: 9px;
    height: 9px;
}

.content_i::-webkit-scrollbar-thumb{
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: #D8D8D8;;
}

.content_i::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: #F7F7F7;
    border-radius: 10px;
}
</style>
