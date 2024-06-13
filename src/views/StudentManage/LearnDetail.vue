<template>
    <div id="LearnDetail">
        <div style="background-color: #0052d9;padding: 10px">
            <h1 style="color: #ffffff;margin-left: 20px;">学习情况</h1>
            <p style="color: #ffffff;margin-left: 20px;">这是{{ username }}的学习情况</p>
        </div>

        <div class="content">

            <div class="column">
                <t-card style="height: 50%;margin: 20px">
                    <LearnTime></LearnTime>
                </t-card>
                <t-card style="height: 50%;margin: 20px">
                    <LearnActivity></LearnActivity>
                </t-card>
            </div>
            <div class="column">
                <t-card style="height: 100%;margin-top:20px">
                    <LearnKnowledge></LearnKnowledge>
                </t-card>
            </div>
            <div class="column">
                <t-card style="height: 50%;margin: 20px">
                    <LearnScore></LearnScore>
                </t-card>
                <t-card style="height: 50%;margin: 20px">
                    <LearnTime_Course></LearnTime_Course>
                </t-card>
            </div>
        </div>
    </div>
</template>

<script>
import LearnActivity from './LearnDetailChart/learnactivity'
import LearnTime from './LearnDetailChart/learntime.vue'
import LearnKnowledge from './LearnDetailChart/learnknowledge.vue'
import LearnScore from './LearnDetailChart/learnscore.vue'
import LearnTime_Course from './LearnDetailChart/learntime_course.vue'
export default {
    name: 'LearnDetail',
    data() {
        return {
            userid: '',
            username: ''
        };
    },
    components: {
        LearnTime,
        LearnActivity,
        LearnKnowledge,
        LearnScore,
        LearnTime_Course
    },
    created() {
        // 使用 this.$route.query.query 来获取路由参数
        this.userid = this.$route.query.query || '';
        this.username = this.$route.query.username || '';
    },
    methods: {
    }
}
</script>

<style scoped>
.content {
    display: flex;
    width: 100%;
    height: 75vh;
}

.column {
    flex: 1;
    padding: 10px;

}
</style>
